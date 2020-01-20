package xjtu.dao;

import xjtu.model.MonitorProblem;
import xjtu.model.Problem;
import xjtu.model.ProblemMethod;
import xjtu.util.Dbutil;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class ProblemDao {
	
	public int addNewProblem(Problem problem) throws Exception {
		
		int userid = 0;
		
		Dbutil dbutil = new Dbutil();
		Connection con = dbutil.getConnection();
		
		String sql = "INSERT INTO problem(creatorName,creatorId,projectName,projectId,pdescriptoin,ptype,pscope,pcost,ppeople,pperid,prush,prushVal,pcomment) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";
		
		PreparedStatement prst = con.prepareStatement(sql);
		
		prst.setString(1,problem.getCreatorName());
		prst.setInt(2,problem.getCreatorId());
		prst.setString(3, problem.getProjectName());
		prst.setInt(4, problem.getProjectId());
		
		prst.setString(5, problem.getPdescriptoin());
		prst.setString(6, problem.getPtype());
		prst.setString(7, problem.getPscope());
		prst.setDouble(8, problem.getPcost());

		prst.setString(9, problem.getPpeople());
		prst.setDouble(10, problem.getPperid());
		prst.setString(11, problem.getPrush());
		prst.setDouble(12, problem.getPrushVal());
		prst.setString(13, problem.getPcomment());
		
		prst.executeUpdate();
		
		String idSql = "SELECT max(id) currentId FROM problem";
		PreparedStatement prst1 = con.prepareStatement(idSql);
		ResultSet rs = prst1.executeQuery();
		if (rs.next()) {
			userid = rs.getInt("currentId");
			
		}
		con.close();
		return userid;
	}
	
	
	public void editProblem(Problem problem) throws Exception {
		
		Dbutil dbutil = new Dbutil();
		Connection con = dbutil.getConnection();
		String sql = "UPDATE problem SET pdescriptoin = ?,ptype = ?, pscope = ?,pcost = ?,ppeople = ?,pperid = ?,prush = ?,prushVal = ?,pcomment=? WHERE id = ?";
		PreparedStatement prst = con.prepareStatement(sql);
		
		prst.setString(1, problem.getPdescriptoin());
		prst.setString(2, problem.getPtype());
		prst.setString(3, problem.getPscope());
		prst.setDouble(4, problem.getPcost());

		prst.setString(5, problem.getPpeople());
		prst.setDouble(6, problem.getPperid());
		prst.setString(7, problem.getPrush());
		prst.setDouble(8, problem.getPrushVal());
		prst.setString(9, problem.getPcomment());
		prst.setInt(10, problem.getId());
		
		prst.executeUpdate();
		
		con.close();
	}
	
	


	public void deleteProblem(List<Integer> ids) throws Exception {
		
		Dbutil dbutil = new Dbutil();
		Connection con = dbutil.getConnection();
		
		for (int i=0;i<ids.size();i++) {
			String sql = "UPDATE problem SET isDeleted = ? WHERE id = ?";
			PreparedStatement prst = con.prepareStatement(sql);
			prst.setBoolean(1,true);
			prst.setInt(2,ids.get(i));
			prst.executeUpdate();
		} 
		
		con.close();
		
	}


	
	
	public int getCreatorId(int problemId) throws Exception {
		// TODO Auto-generated method stub
		int userId = 0;
		Dbutil dbutil = new Dbutil();
		Connection con = dbutil.getConnection();
		
		String sql = "SELECT creatorId from problem WHERE id = ? ";
		PreparedStatement prst1 = con.prepareStatement(sql);
		prst1.setInt(1,problemId);
		ResultSet rs = prst1.executeQuery();
		if (rs.next()) {
			userId = rs.getInt("creatorId");
		}
		con.close();
		return userId;
		
	}
	
	
	public int getProjectId(int problemId) throws Exception {
		
		int projectId = 0;
		
		Dbutil dbutil = new Dbutil();
		Connection con = dbutil.getConnection();
		
		String sql = "SELECT projectId from problem WHERE id = ? ";
		PreparedStatement prst1 = con.prepareStatement(sql);
		prst1.setInt(1,problemId);
		ResultSet rs = prst1.executeQuery();
		if (rs.next()) {
			projectId =  rs.getInt("projectId");
		}
		con.close();
		return projectId;
	}


	public List<Problem> getAllProblem(int projectId) throws Exception {

		
		List<Problem> problemList = new ArrayList<Problem>();
		
		
		Dbutil dbutil = new Dbutil();
		Connection con = dbutil.getConnection();
		
		String sql1 = "SELECT * from problem WHERE projectId = ? AND isDeleted = false";
		PreparedStatement prst = con.prepareStatement(sql1);
		prst.setInt(1, projectId);
		ResultSet rs = prst.executeQuery();
		
		while (rs.next()) {
			Problem p = new Problem();
			p.setId(rs.getInt("id"));
			p.setCreatorName(rs.getString("creatorName"));
			p.setCreatorId(rs.getInt("creatorId"));
			p.setProjectName(rs.getString("projectName"));
			p.setProjectId(rs.getInt("projectId"));
			p.setPdescriptoin(rs.getString("pdescriptoin"));
			p.setPtype(rs.getString("ptype"));
			p.setPscope(rs.getString("pscope"));
			p.setPcost(rs.getDouble("pcost"));
			p.setPpeople(rs.getString("ppeople"));
			p.setPperid(rs.getDouble("pperid"));
			p.setPrush(rs.getString("prush"));
			p.setPrushVal(rs.getDouble("prushVal"));
			p.setPcomment(rs.getString("pcomment"));
			
			p.setRecommendValue(rs.getDouble("recommendValue"));
			
			
			problemList.add(p);
		}
		
		con.close();
		return problemList;
	}


	public void updataRecommendValue(String[] peoblemsIds, String[] recommendValues) throws Exception {
		
		if (peoblemsIds.length == 0 || peoblemsIds.length != recommendValues.length) {
			
			throw new Exception("难题排序时，传入后台参数长度不一致");
		}
		
		
		Dbutil dbutil = new Dbutil();
		Connection con = dbutil.getConnection();
		
		for (int i=0;i<peoblemsIds.length;i++) {
			String sql = "UPDATE problem SET recommendValue = ? WHERE id = ?";
			PreparedStatement prst = con.prepareStatement(sql);
			prst.setDouble(1, Double.parseDouble(recommendValues[i]));
			prst.setInt(2,Integer.parseInt(peoblemsIds[i]));
			prst.executeUpdate();
		}
		
		con.close();
		
	}
	
	
	public void updataTarget(String[] peoblemsIds) throws Exception {
		
		Dbutil dbutil = new Dbutil();
		Connection con = dbutil.getConnection();
		
		for (int i=0;i<peoblemsIds.length;i++) {
			String sql = "UPDATE problem SET isTarget = ? WHERE id = ?";
			PreparedStatement prst = con.prepareStatement(sql);
			prst.setBoolean(1, true);
			prst.setInt(2,Integer.parseInt(peoblemsIds[i]));
			prst.executeUpdate();
		}
		
		con.close();
		
	}


	public List<Problem> getAllTargetProblem(int projectId) throws Exception {
		
		List<Problem> problemList = new ArrayList<Problem>();
		
		Dbutil dbutil = new Dbutil();
		Connection con = dbutil.getConnection();
		
		String sql1 = "SELECT * from problem WHERE projectId = ? AND isDeleted = false AND isTarget = true ORDER BY recommendValue DESC";
		PreparedStatement prst = con.prepareStatement(sql1);
		prst.setInt(1, projectId);
		ResultSet rs = prst.executeQuery();
		
		while (rs.next()) {
			Problem p = new Problem();
			p.setId(rs.getInt("id"));
			p.setCreatorName(rs.getString("creatorName"));
			p.setPdescriptoin(rs.getString("pdescriptoin"));
			p.setPtype(rs.getString("ptype"));
			p.setPcomment(rs.getString("pcomment"));
			
			p.setRecommendValue(rs.getDouble("recommendValue"));
			
			problemList.add(p);
		}
		
		con.close();
		return problemList;
	}


	public void deleteTarget(String problemsId) throws Exception {
		
		Dbutil dbutil = new Dbutil();
		Connection con = dbutil.getConnection();
		
		String sql = "UPDATE problem SET isTarget = ? WHERE id = ?";
		PreparedStatement prst = con.prepareStatement(sql);
		prst.setBoolean(1, false);
		prst.setInt(2,Integer.parseInt(problemsId));
		prst.executeUpdate();
		
		con.close();
	}

	
	//监控

	
	public List<MonitorProblem> getAllMonitorProblem(int projectId) throws Exception {

		
		List<MonitorProblem> problemList = new ArrayList<MonitorProblem>();
		
		
		Dbutil dbutil = new Dbutil();
		Connection con = dbutil.getConnection();
		
		String sql = "SELECT problem.id,problem.creatorName,problem.pdescriptoin,problem.ptype,problem.recommendValue,problem.isTarget,problem.pcomment,problem.createTime, acivity.activityName,acivity.envent,acivity.activityProblem FROM problem " + 
				"LEFT JOIN acivity ON (problem.id = acivity.problemId AND acivity.isDeleted = FALSE) WHERE problem.projectId = ? AND problem.isDeleted = FALSE ORDER BY problem.id";
		PreparedStatement prst = con.prepareStatement(sql);
		prst.setInt(1, projectId);
		ResultSet rs = prst.executeQuery();
		
		while (rs.next()) {
			
			MonitorProblem p = new MonitorProblem();
			
			p.setPid(rs.getInt("id"));
			p.setPuser(rs.getString("creatorName"));
			p.setPdescriptoin(rs.getString("pdescriptoin"));
			p.setPtype(rs.getString("ptype"));
			p.setPrecommend(rs.getDouble("recommendValue"));
			p.setPtarget(rs.getBoolean("isTarget"));
			
			p.setPcomment(rs.getString("pcomment"));
			p.setCreateTime(rs.getTimestamp("createTime").toString());
			
			if (rs.getString("ptype").equals("局部被动难题")) {
				p.setPplan("NoNeed");
			} else {
				String plan = "{" + "\"activityName\":" + "\"" + rs.getString("activityName") + "\"" + ",";
				plan = plan + "\"envent\":" + "\"" + rs.getString("envent") + "\"" + ",";
				plan = plan + "\"activityProblem\":" + "\"" + rs.getString("activityProblem") + "\"" + "}";
				p.setPplan(plan);
			}
			
				problemList.add(p);
		}
			
		
		con.close();
		return problemList;
	}

	
	
	
	public List<ProblemMethod> getProblemMethodInfo(String problemId,String problemType) throws Exception {

		List<ProblemMethod> list = new ArrayList<ProblemMethod>();
		Dbutil dbutil = new Dbutil();
		Connection con = dbutil.getConnection();
		
		String sql = "SELECT * from problem_method WHERE problemId = ? ";
		String pid = problemId;
		
		if (problemType.equals("宏观主动难题")) {
			sql = "SELECT * from problem_method WHERE problemId like ? ";
			pid = "ChildP_" + problemId + "%";
		}
		
		PreparedStatement prst = con.prepareStatement(sql);
		prst.setString(1, pid);
		
		ResultSet rs = prst.executeQuery();
		
		while (rs.next()) {
			ProblemMethod pm = new ProblemMethod();
			pm.setProblemId(rs.getString("problemId"));
			pm.setPdescriptoin(rs.getString("pdescriptoin"));
			pm.setPattr(rs.getString("pattr"));
			pm.setMethodName(rs.getString("methodName"));
			pm.setMdescriptoin(rs.getString("mdescriptoin"));
			pm.setmRecommendValue(rs.getDouble("mRecommendValue"));
			pm.setMethodURI(rs.getString("methodURI"));
			
			list.add(pm);
		}
		
		con.close();
		
		
		return list;
		
	}


	
	
	
}
