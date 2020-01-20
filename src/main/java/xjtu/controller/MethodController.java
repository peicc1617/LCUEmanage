package xjtu.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import xjtu.dao.ActivityDao;
import xjtu.dao.ProblemMethodDao;
import xjtu.model.Activity;
import xjtu.model.ProblemMethod;
import xjtu.service.AuthCheck;

@Controller
public class MethodController {

	@ResponseBody
	@RequestMapping("addAttr")
	public String addAttr(ProblemMethod problemMethod,HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Map map = (Map)session.getAttribute("userInfo");
		int userId = (Integer.parseInt((String) map.get("id")));
		
		String projectId = Integer.toString(problemMethod.getProjectId());
		
		try {
			//检测权限，只有当前用户是project的创建者才可以添加
			if (AuthCheck.isUserRelatedtoProject(userId, projectId)) {
				
				ProblemMethodDao pmd= new ProblemMethodDao();
				pmd.addAttr(problemMethod);
			}
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		
		return "success";
		
	}
	
	
	@ResponseBody
	@RequestMapping("addMethod")
	public String addMethod(ProblemMethod problemMethod,HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Map map = (Map)session.getAttribute("userInfo");
		int userId = (Integer.parseInt((String) map.get("id")));
		
		
		String projectId = Integer.toString(problemMethod.getProjectId());
		
		try {
			//检测权限，只有当前用户是project的创建者才可以添加
			if (AuthCheck.isUserRelatedtoProject(userId, projectId)) {
				ProblemMethodDao pmd= new ProblemMethodDao();
				pmd.addMethod(problemMethod);
				
			}
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		
		return "success";
		
	}
	
	
	
	@ResponseBody
	@RequestMapping("getAllAttrAndMethod")
	public List<ProblemMethod> getAllAttrAndMethod(String projectId,HttpServletRequest request) {
		
		List<ProblemMethod> result = new ArrayList<ProblemMethod>();
		
		HttpSession session = request.getSession();
		Map map = (Map)session.getAttribute("userInfo");
		
		int userId = (Integer.parseInt((String) map.get("id")));
		
		try {
			//检测权限，只有当前用户是project的参与者才可以查看活动
			if (AuthCheck.isUserRelatedtoProject(userId, projectId)) {
				
				ProblemMethodDao pmd= new ProblemMethodDao();
				result = pmd.getAllAttrAndMethod(projectId);
				
			}
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		
		
		return result;
	}
	
}
