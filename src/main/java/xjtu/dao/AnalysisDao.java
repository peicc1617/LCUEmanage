package xjtu.dao;

import xjtu.model.Activity;
import xjtu.model.AnalysisItems;
import xjtu.util.Dbutil;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AnalysisDao {
	
	public int addAnalysisItems(String projectId,String type,AnalysisItems[] items) throws Exception {
		
		Dbutil dbutil = new Dbutil();
		Connection con = dbutil.getConnection();
		
		//添加之前先删除
		String delsql = "delete from analysis_w_s where projectId = ?";
		PreparedStatement delprst = con.prepareStatement(delsql);
		delprst.setString(1, projectId);
		delprst.executeUpdate();
		
		
		String sql = "INSERT INTO analysis_w_s(projectId,type,itemName,weightValue,standardValue) VALUES(?,?,?,?,?)";
		PreparedStatement prst = con.prepareStatement(sql);
		
		for (int i=0;i<items.length;i++) {
			prst.setString(1,projectId);
			prst.setString(2, type);
			prst.setString(3, items[i].getItemName());
			prst.setString(4, items[i].getWeightValue());
			prst.setString(5, items[i].getStandardValue());
			prst.executeUpdate();
		}
		
		con.close();
		return 0;
		
	}

	
	public void addAnalysisValues(String projectId, String type,AnalysisItems[] analysisValues,String performance) throws Exception {
		
		Dbutil dbutil = new Dbutil();
		Connection con = dbutil.getConnection();
		
		
		//添加之前先删除
		String delsql = "delete from analysis_item where projectId = ?";
		PreparedStatement delprst = con.prepareStatement(delsql);
		delprst.setString(1, projectId);
		delprst.executeUpdate();
		
		
		String sql = "INSERT INTO analysis_item(projectId,type,itemName,value,performance) VALUES(?,?,?,?,?)";
		PreparedStatement prst = con.prepareStatement(sql);
		
		for (int i=0;i<analysisValues.length;i++) {
			prst.setString(1,projectId);
			prst.setString(2,type);
			prst.setString(3, analysisValues[i].getItemName());
			prst.setString(4, analysisValues[i].getValue());
			prst.setString(5,performance);
			prst.executeUpdate();
		}
		
		
		con.close();
		return;
		
	}
	

	

	public Map<String,List<String>> getAllAnalysisValues(String projectId) throws Exception {
		
		Map<String,List<String>> res = new HashMap<String, List<String>>();
		
		List<String> type = new ArrayList<String>();
		List<String> item = new ArrayList<String>();
		List<String> value = new ArrayList<String>();
		List<String> performance = new ArrayList<String>();
		
		Dbutil dbutil = new Dbutil();
		Connection con = dbutil.getConnection();
		
		String sql1 = "SELECT * from analysis_item WHERE projectId = ?";
		PreparedStatement prst = con.prepareStatement(sql1);
		prst.setString(1, projectId);
		ResultSet rs = prst.executeQuery();
		
		while (rs.next()) {
			type.add(rs.getString("type"));
			item.add(rs.getString("itemName"));
			value.add(rs.getString("value"));
			performance.add(rs.getString("performance"));
		}
		con.close();
		
		res.put("type", type);
		res.put("item", item);
		res.put("value", value);
		res.put("performance", performance);
		
		return res;
	}


	public Map<String, List<String>> getAllAnalysisWandS(String projectId, String type) throws Exception {
		
		Map<String,List<String>>  result = new HashMap<String, List<String>>();
		List<String> weight = new ArrayList<String>();
		List<String> standard = new ArrayList<String>();
		
		Dbutil dbutil = new Dbutil();
		Connection con = dbutil.getConnection();
		
		String sql1 = "SELECT * from analysis_w_s WHERE projectId = ? and type = ?";
		PreparedStatement prst = con.prepareStatement(sql1);
		prst.setString(1, projectId);
		prst.setString(2, type);
		
		ResultSet rs = prst.executeQuery();
		
		while (rs.next()) {
			weight.add(rs.getString("weightValue"));
			standard.add(rs.getString("standardValue"));
		}
		
		con.close();
		result.put("weight", weight);
		result.put("standard", standard);
		
		return result;
		
	}


	

	
	
}
