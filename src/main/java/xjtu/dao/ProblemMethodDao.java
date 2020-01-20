package xjtu.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import xjtu.model.Activity;
import xjtu.model.ProblemMethod;
import xjtu.util.Dbutil;

public class ProblemMethodDao {

	public void addAttr(ProblemMethod problemMethod) throws Exception {
		
		
		Dbutil dbutil = new Dbutil();
		Connection con = dbutil.getConnection();
		
		String sql = "SELECT * FROM problem_method WHERE problemId = ?";
		
		PreparedStatement prst = con.prepareStatement(sql);
		
		prst.setString(1,problemMethod.getProblemId());
		
		ResultSet rs = prst.executeQuery();
		if (rs.next()) {
			String sql1 = "UPDATE problem_method SET pattr = ? WHERE problemId = ?";
			PreparedStatement prst1 = con.prepareStatement(sql1);
			prst1.setString(1,problemMethod.getPattr());
			prst1.setString(2,problemMethod.getProblemId());
			prst1.executeUpdate();
		} else {
			String sql1 =  "INSERT INTO problem_method(problemId,projectId,pdescriptoin,pattr) VALUES(?,?,?,?)";
			PreparedStatement prst1 = con.prepareStatement(sql1);
			prst1.setString(1,problemMethod.getProblemId());
			prst1.setInt(2,problemMethod.getProjectId());
			prst1.setString(3, problemMethod.getPdescriptoin());
			prst1.setString(4, problemMethod.getPattr());
			prst1.executeUpdate();
		}
		con.close();
		
	}

	public void addMethod(ProblemMethod problemMethod) throws Exception {
		
		Dbutil dbutil = new Dbutil();
		Connection con = dbutil.getConnection();
		String sql1 = "UPDATE problem_method SET methodName = ?,mdescriptoin=?,mRecommendValue=?,methodURI=? WHERE problemId = ?";
		PreparedStatement prst1 = con.prepareStatement(sql1);
		prst1.setString(1,problemMethod.getMethodName());
		prst1.setString(2,problemMethod.getMdescriptoin());
		prst1.setDouble(3, problemMethod.getmRecommendValue());
		prst1.setString(4, problemMethod.getMethodURI());
		prst1.setString(5,problemMethod.getProblemId());
		prst1.executeUpdate();
		con.close();
		
	}

	public List<ProblemMethod> getAllAttrAndMethod(String projectId) throws Exception {
		
		List<ProblemMethod> list = new ArrayList<ProblemMethod>();
		
		Dbutil dbutil = new Dbutil();
		Connection con = dbutil.getConnection();
		
		String sql = "SELECT * from problem_method WHERE projectId = ? ";
		PreparedStatement prst = con.prepareStatement(sql);
		prst.setString(1, projectId);
		
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
