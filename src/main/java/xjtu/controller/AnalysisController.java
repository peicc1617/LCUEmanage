package xjtu.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import xjtu.dao.AnalysisDao;
import xjtu.model.AnalysisItems;
import xjtu.service.AuthCheck;
import xjtu.util.Jsonutil;


@Controller
public class AnalysisController {

	@ResponseBody
	@RequestMapping("addAnalysisItems")
	public String addAnalysisItems(String projectId,String type,String analysisItems,HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Map map = (Map)session.getAttribute("userInfo");
		int userId = (Integer.parseInt((String) map.get("id")));
		
		//System.out.println(projectId);
		
		
		AnalysisItems[] items = Jsonutil.getAttObj(analysisItems);
		//检测权限，只有当前用户是project的创建者才可以进行配置
		try {
			if (AuthCheck.isUserCreatedProject(userId, projectId)) {
				AnalysisDao ad = new AnalysisDao();
				ad.addAnalysisItems(projectId,type,items);
				
			} else {
				return "NotPermit";
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return "succeess";
		
		
	}
	
	
	
	@ResponseBody
	@RequestMapping("addAnalysisValues")
	public String addAnalysisValues(String projectId,String type,String analysisValues,String performance,HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Map map = (Map)session.getAttribute("userInfo");
		int userId = (Integer.parseInt((String) map.get("id")));
		
		
		AnalysisItems[] items = Jsonutil.getAttObj(analysisValues);
		//检测权限，只有当前用户是project的创建者才可以进行配置
		try {
			if (AuthCheck.isUserCreatedProject(userId, projectId)) {
				AnalysisDao ad = new AnalysisDao();
				ad.addAnalysisValues(projectId,type,items,performance);
				
			} else {
				return "NotPermit";
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return "succeess";
	}
	
	
	
	
	@ResponseBody
	@RequestMapping("getAllAnalysisValues")
	public Map<String,List<String>> getAllAnalysisValues(String projectId) {
		
		Map<String,List<String>> result = new HashMap<String, List<String>>();
		
		
		AnalysisDao ad = new AnalysisDao();
		try {
			result = ad.getAllAnalysisValues(projectId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
		
	}
	
	

	@ResponseBody
	@RequestMapping("getAllAnalysisWandS")
	public Map<String,List<String>> getAllAnalysisWandS(String projectId,String type) {
		
		Map<String,List<String>> result = new HashMap<String, List<String>>();
		
		
		AnalysisDao ad = new AnalysisDao();
		try {
			result = ad.getAllAnalysisWandS(projectId,type);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
		
	}
	
	
	@ResponseBody
	@RequestMapping("checkConfig")
	public Map<String,List<String>> checkConfig(String projectId,String type) {
		
		Map<String,List<String>>  result = new HashMap<String, List<String>>();
		AnalysisDao ad = new AnalysisDao();
		
		try {
			result = ad.getAllAnalysisWandS(projectId,type);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
		
	}
	
	
}
