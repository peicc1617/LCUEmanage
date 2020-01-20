package xjtu.dao;

import xjtu.model.Project;
import xjtu.util.Dbutil;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class ProjectDao {
	
	public int addNewProject(Project project) throws Exception {
		
		int userid = 0;
		
		Dbutil dbutil = new Dbutil();
		Connection con = dbutil.getConnection();
		
		String sql = "INSERT INTO project(projectName,creatorId,creatorName,createTime,memo,result) VALUES(?,?,?,?,?,?)";
		
		PreparedStatement prst = con.prepareStatement(sql);
		
		prst.setString(1,project.getProjectName());
		prst.setInt(2,project.getCreatorId());
		prst.setString(3, project.getCreatorName());
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd,HH:mm");
		Date d = sdf.parse(project.getCreateTime());
		prst.setDate(4, new java.sql.Date(d.getTime()));
		
		prst.setString(5, project.getMemo());
		prst.setString(6, project.getResult());
		prst.executeUpdate();
		
		String idSql = "SELECT max(id) currentId FROM project";
		PreparedStatement prst1 = con.prepareStatement(idSql);
		ResultSet rs = prst1.executeQuery();
		if (rs.next()) {
			userid = rs.getInt("currentId");
			
		}
		con.close();
		
		return userid;
		
	}

	
	public void deleteProject(int projectId) throws Exception {
		Dbutil dbutil = new Dbutil();
		Connection con = dbutil.getConnection();
		String sql = "UPDATE project SET isDeleted = ? WHERE id = ?";
		
		PreparedStatement prst = con.prepareStatement(sql);
		
		prst.setBoolean(1,true);
		prst.setInt(2, projectId);
		
		prst.executeUpdate();
		
		con.close();
		
	}
	
	
	public Map<String,List<Project>> getAllProject(int userId) throws Exception{
		
		Map<String,List<Project>> result = new HashMap<String,List<Project>>();
		
		List<Project> creatorList = new ArrayList<Project>();
		List<Project> participantList = new ArrayList<Project>();
		
		Dbutil dbutil = new Dbutil();
		Connection con = dbutil.getConnection();
		
		String sql1 = "SELECT * from project WHERE creatorId = ? AND isDeleted = false";
		PreparedStatement prst1 = con.prepareStatement(sql1);
		prst1.setInt(1, userId);
		ResultSet rs = prst1.executeQuery();
		while (rs.next()) {
			Project p = new Project();
			p.setId(rs.getInt("id"));
			p.setProjectName(rs.getString("projectName"));
			p.setCreatorId(rs.getInt("creatorId"));
			p.setCreatorName(rs.getString("creatorName"));
			
			SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd,HH:mm");
			p.setCreateTime(format.format(rs.getDate("createTime")));
			p.setMemo(rs.getString("memo"));
			p.setResult(rs.getString("result"));
			
			creatorList.add(p);
		}
		
		
		String sql2 = "SELECT * from project WHERE projectName in (SELECT projectName  from user_participant_project WHERE participantId = ?) AND isDeleted = false";
		PreparedStatement prst2 = con.prepareStatement(sql2);
		prst2.setInt(1, userId);
		
		rs = prst2.executeQuery();
		
		while (rs.next()) {
			Project p = new Project();
			p.setId(rs.getInt("id"));
			p.setProjectName(rs.getString("projectName"));
			p.setCreatorId(rs.getInt("creatorId"));
			p.setCreatorName(rs.getString("creatorName"));
			
			SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd,HH:mm");
			p.setCreateTime(format.format(rs.getDate("createTime")));
			p.setMemo(rs.getString("memo"));
			p.setResult(rs.getString("result"));
			
			participantList.add(p);
		}
		
		con.close();
		result.put("created", creatorList);
		result.put("participanted", participantList);
		
		return result;
	}


	public boolean isProjectExist(String projectName,int userId) throws Exception {
		// TODO Auto-generated method stub
		Dbutil dbutil = new Dbutil();
		Connection con = dbutil.getConnection();
		
		String sql = "SELECT * from project WHERE projectName = ? AND creatorId = ? AND isDeleted = false";
		PreparedStatement prst1 = con.prepareStatement(sql);
		prst1.setString(1,projectName);
		prst1.setInt(2,userId);
		ResultSet rs = prst1.executeQuery();
		if (rs.next()) {
			return true;
		}
		return false;
		
	}
	
	public int getCreatorId(int projectId) throws Exception {
		// TODO Auto-generated method stub
		Dbutil dbutil = new Dbutil();
		Connection con = dbutil.getConnection();
		
		String sql = "SELECT creatorId from project WHERE id = ? AND isDeleted = false";
		PreparedStatement prst1 = con.prepareStatement(sql);
		prst1.setInt(1,projectId);
		ResultSet rs = prst1.executeQuery();
		if (rs.next()) {
			return rs.getInt("creatorId");
		}
		return 0;
		
	}


	public void addParticipantUser(String projectId, String projectName, String[] userids,String creatorId) throws Exception {
		Dbutil dbutil = new Dbutil();
		Connection con = dbutil.getConnection();
		
		for (int i=0;i<userids.length;i++) {
			String sql = "INSERT INTO user_participant_project(projectId,projectName,participantId,creatorId) VALUES(?,?,?,?)";
			
			PreparedStatement prst = con.prepareStatement(sql);
			
			prst.setInt(1,Integer.parseInt(projectId));
			prst.setString(2,projectName);
			prst.setInt(3,Integer.parseInt(userids[i]));
			prst.setInt(4,Integer.parseInt(creatorId));
			
			prst.executeUpdate();
			
		}
		
		
		con.close();
	}


	public List<Integer> getPanticipantId(int projectId) throws Exception {
		
		Dbutil dbutil = new Dbutil();
		Connection con = dbutil.getConnection();
		
		
		List<Integer> ids = new ArrayList<Integer>();
		
		String sql = "SELECT participantId from user_participant_project WHERE projectId = ?";
		PreparedStatement prst1 = con.prepareStatement(sql);
		prst1.setInt(1,projectId);
		ResultSet rs = prst1.executeQuery();
		
		while (rs.next()) {
			ids.add(rs.getInt("participantId"));
		}
		return ids;
	}

	
	
	
	
	
	//监控
	public Map<String, String> getProjectInfo(String projectId) throws Exception {
		
		Map<String,String> res = new HashMap<String,String>();
		
		Dbutil dbutil = new Dbutil();
		Connection con = dbutil.getConnection();
		
		String sql = "SELECT * from problem WHERE projectId = ? AND isDeleted = false";
		PreparedStatement prst = con.prepareStatement(sql);
		prst.setString(1,projectId);
		ResultSet rs = prst.executeQuery();
		
		int gp = 0;
		int lp = 0;
		Set<String> people = new HashSet<String>();
		int target = 0;
		
		Set<String> method = new HashSet<String>();
		
		String date = "";
		String performance = "0";
		
		while (rs.next()) {
			if (rs.getString("ptype").equals("局部被动难题")) {
				lp ++;
			} else {
				gp ++;
			}
			
			people.add(rs.getString("creatorName"));
			if (rs.getBoolean("isTarget")) {
				target ++;
			}
			
			date = rs.getDate("createTime").toString();
		}
		
		
		
		String sql1 = "SELECT * from problem_method WHERE projectId = ?";
		PreparedStatement prst1 = con.prepareStatement(sql1);
		prst1.setString(1,projectId);
		ResultSet rs1 = prst1.executeQuery();
		
		while (rs1.next()) {
			if (rs1.getString("methodName") != "" && rs1.getString("methodName") != null) {
				method.add(rs1.getString("methodName"));
			} 
		}
		
		String sql2 = "SELECT * from analysis_item WHERE projectId = ?";
		PreparedStatement prst2 = con.prepareStatement(sql2);
		prst2.setString(1,projectId);
		ResultSet rs2 = prst2.executeQuery();
		
		if (rs2.next()) {
			performance = rs2.getString("performance");
		}
		
		res.put("allP", String.valueOf(gp+lp));
		res.put("gP", String.valueOf(gp));
		res.put("lP", String.valueOf(lp));
		res.put("people", String.valueOf(people.size()));
		res.put("target", String.valueOf(target));
		res.put("date", date);
		
		res.put("method", String.valueOf(method.size()));
		
		res.put("performance", performance);
		
		con.close();
		
		return res;
	}

}
