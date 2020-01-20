package xjtu.dao;

import xjtu.model.Activity;
import xjtu.util.Dbutil;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class ActivityDao {
	
	public int addActivity(Activity activity) throws Exception {
		
		int activityid = 0;
		
		Dbutil dbutil = new Dbutil();
		Connection con = dbutil.getConnection();
		
		
		String sql = "INSERT INTO acivity(activityName,problemId,envent,activityProblem,projectId,creatorId) VALUES(?,?,?,?,?,?)";
		
		PreparedStatement prst = con.prepareStatement(sql);
		
		prst.setString(1,activity.getActivityName());
		prst.setInt(2, activity.getProblemId());
		prst.setString(3, activity.getEnvent().toString());
		prst.setString(4, activity.getActivityProblem().toString());
		
		prst.setInt(5, activity.getProjectId());
		prst.setInt(6, activity.getCreatorId());
		
		prst.executeUpdate();
		
		String idSql = "SELECT max(id) currentId FROM acivity";
		PreparedStatement prst1 = con.prepareStatement(idSql);
		ResultSet rs = prst1.executeQuery();
		if (rs.next()) {
			activityid = rs.getInt("currentId");
			
		}
		con.close();
		return activityid;
		
	}

	public void updateActivity(Activity activity) throws Exception {
		Dbutil dbutil = new Dbutil();
		Connection con = dbutil.getConnection();
		String sql = "UPDATE acivity SET activityName = ?,envent = ?, activityProblem = ? WHERE id = ?";
		PreparedStatement prst = con.prepareStatement(sql);
		
		prst.setString(1, activity.getActivityName());
		prst.setString(2, activity.getEnvent().toString());
		prst.setString(3, activity.getActivityProblem().toString());
		prst.setInt(4, activity.getId());
		
		prst.executeUpdate();
		
		con.close();
		
	}

	public void deleteActivity(String activityId) throws Exception {
		Dbutil dbutil = new Dbutil();
		Connection con = dbutil.getConnection();
		
		String sql = "UPDATE acivity SET isDeleted = ? WHERE id = ?";
		PreparedStatement prst = con.prepareStatement(sql);
		prst.setBoolean(1, true);
		prst.setInt(2,Integer.parseInt(activityId));
		prst.executeUpdate();
		
		con.close();
		
	}

	public List<Activity> getAllActivity(String problemId) throws Exception {
		
		List<Activity> activityList = new ArrayList<Activity>();
		
		Dbutil dbutil = new Dbutil();
		Connection con = dbutil.getConnection();
		
		String sql1 = "SELECT * from acivity WHERE problemId = ? AND isDeleted = false ORDER BY id";
		PreparedStatement prst = con.prepareStatement(sql1);
		prst.setInt(1, Integer.parseInt(problemId));
		ResultSet rs = prst.executeQuery();
		
		while (rs.next()) {
			Activity ac = new Activity();
			ac.setId(rs.getInt("id"));
			ac.setActivityName(rs.getString("activityName"));
			ac.setProblemId(rs.getInt("problemId"));
			ac.setEnvent(rs.getString("envent"));
			ac.setActivityProblem(rs.getString("activityProblem"));
			ac.setProjectId(rs.getInt("projectId"));
			
			
			activityList.add(ac);
		}
		
		con.close();
		return activityList;
	}

	
	
}
