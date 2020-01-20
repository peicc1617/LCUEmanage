package xjtu.dao;

import xjtu.model.Problem;
import xjtu.model.UserInfo;
import xjtu.util.Dbutil;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class UserInfoDao {
	
	
	public List<UserInfo> getAllUser(String auth,int userId) throws Exception {

		
		List<UserInfo> userList = new ArrayList<UserInfo>();
		
		String url = "jdbc:mysql://innovation.xjtu.edu.cn:3306/innovation_user_info?characterEncoding=utf8&useSSL=false";
		Dbutil dbutil = new Dbutil(url);
		Connection con = dbutil.getConnection();
		
		String sql = "SELECT * from user_info WHERE id != ? AND permission IN (?,?,?)";
		
		PreparedStatement prst = con.prepareStatement(sql);
		
		String permission1 = "user";
		String permission2 = "admin";
		String permission3 = "user";
		
		
		if (auth.equals("user")) {
			permission2 = "user";
		}
		
		if (auth.equals("superAdmin")) {
			permission3 = "superAdmin";
		}
		
		prst.setInt(1, userId);
		prst.setString(2, permission1);
		prst.setString(3, permission2);
		prst.setString(4, permission3);
		ResultSet rs = prst.executeQuery();
		
		while (rs.next()) {
			UserInfo u = new UserInfo();
			u.setId(rs.getInt("id"));
			u.setUsername(rs.getString("username"));
			u.setDomain(rs.getString("domain"));
			u.setPermission(rs.getString("permission"));
			u.setEmail(rs.getString("email"));
			u.setNickName(rs.getString("nickName"));
			u.setPhoneNumber(rs.getString("phoneNumber"));
			
			
			userList.add(u);
		}
		
		con.close();
		return userList;
	}
	

	public List<UserInfo> getAllProjectUser(String projectId) throws Exception {
		
		List<UserInfo> userList = new ArrayList<UserInfo>();
		List<Integer> userId = new ArrayList<Integer>();
		
		Dbutil dbutil = new Dbutil();
		Connection con = dbutil.getConnection();
		
		String sql = "SELECT creatorId , participantId from user_participant_project WHERE projectId = ? ";
		
		PreparedStatement prst = con.prepareStatement(sql);
		prst.setInt(1, Integer.parseInt(projectId));
		ResultSet rs = prst.executeQuery();
		
		
		//第一个User为project创建者，user_participant_project表进行冗余设计，避免多次查数据库
		if (rs.next()) {
			userId.add(rs.getInt("creatorId"));
			userId.add(rs.getInt("participantId"));
			while (rs.next()) {
				userId.add(rs.getInt("participantId"));
			}
			
		} else { //当在user_participant_project查不到，没有参与用户
			String sql1 = "SELECT creatorId from project WHERE id = ? ";
			
			prst = con.prepareStatement(sql1);
			prst.setInt(1, Integer.parseInt(projectId));
			ResultSet rs1 = prst.executeQuery();
			if (rs1.next()) {
				userId.add(rs1.getInt("creatorId"));
			}
		}
		con.close();
		
		userList = getUserInfoViaId(userId);
		
		return userList;
	}


	//从userIno表中获取用户信息
	private List<UserInfo> getUserInfoViaId(List<Integer> userId) throws Exception {
		
		//异常判断
		if (userId.size() == 0) {
			return null;
		}
		
		List<UserInfo> userList = new ArrayList<UserInfo>();
		
		String url = "jdbc:mysql://innovation.xjtu.edu.cn:3306/innovation_user_info?characterEncoding=utf8&useSSL=false";
		Dbutil dbutil = new Dbutil(url);
		Connection con = dbutil.getConnection();
		
		String idString = "(";
		
		for (int i=0;i<userId.size();i++) {
			idString += userId.get(i) + ",";
		}
		
		idString = idString.substring(0,idString.length()-1) + ")";
		
		
		String sql = "SELECT * from user_info WHERE id IN " + idString;
		PreparedStatement prst = con.prepareStatement(sql);
		ResultSet rs = prst.executeQuery();
		
		while (rs.next()) {
			UserInfo u = new UserInfo();
			u.setId(rs.getInt("id"));
			u.setUsername(rs.getString("username"));
			u.setDomain(rs.getString("domain"));
			u.setPermission(rs.getString("permission"));
			u.setEmail(rs.getString("email"));
			u.setNickName(rs.getString("nickName"));
			u.setPhoneNumber(rs.getString("phoneNumber"));
			
			if (u.getId() == userId.get(0)) { //如果是项目创建者，添加到list的第一位
				userList.add(0,u);
			} else {
				userList.add(u);
			}
		}
		
		con.close();
		
		return userList;
	}


	public void deleteUser(String projectId,String userId) throws Exception {
		
		Dbutil dbutil = new Dbutil();
		Connection con = dbutil.getConnection();
		
		String sql = "DELETE FROM user_participant_project where projectid=? AND participantId=?";
		
		PreparedStatement prst = con.prepareStatement(sql);
		prst.setInt(1, Integer.parseInt(projectId));
		prst.setInt(2, Integer.parseInt(userId));
		
		prst.executeUpdate();
		
		con.close();
		
		
	}

	
}
