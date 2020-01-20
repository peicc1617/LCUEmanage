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
import xjtu.model.Activity;
import xjtu.service.AuthCheck;

@Controller
public class ActivityController {

	@ResponseBody
	@RequestMapping("addActivity")
	public int addActivity(Activity activity,HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Map map = (Map)session.getAttribute("userInfo");
		
		int userId = (Integer.parseInt((String) map.get("id")));
		activity.setCreatorId(userId);
		
		int activityId = 0;
		
		try {
			//检测权限，只有当前用户是project的创建者才可以添加活动
			if (AuthCheck.isUserCreatedProject(userId, Integer.toString(activity.getProjectId()))) {
				
				ActivityDao ad = new ActivityDao();
				activityId = ad.addActivity(activity);
				
			}
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		
		
		return activityId;
		
	}
	
	
	@ResponseBody
	@RequestMapping("updateActivity")
	public boolean updateActivity(Activity activity,HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Map map = (Map)session.getAttribute("userInfo");
		
		int userId = (Integer.parseInt((String) map.get("id")));
		activity.setCreatorId(userId);
		
		
		try {
			//检测权限，只有当前用户是project的创建者才可以添加活动
			if (AuthCheck.isUserCreatedProject(userId, Integer.toString(activity.getProjectId()))) {
				
				ActivityDao ad = new ActivityDao();
				ad.updateActivity(activity);
				return true;
				
			}
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		
		
		return false;
		
	}
	
	
	
	@ResponseBody
	@RequestMapping("deleteActivity")
	public boolean deleteActivity(String activityId,String projectId,HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Map map = (Map)session.getAttribute("userInfo");
		
		int userId = (Integer.parseInt((String) map.get("id")));
		
		try {
			//检测权限，只有当前用户是project的创建者才可以删除活动
			if (AuthCheck.isUserCreatedProject(userId, projectId)) {
				
				ActivityDao ad = new ActivityDao();
				ad.deleteActivity(activityId);
				return true;
				
			}
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		
		
		return false;
	}
	
	
	
	
	@ResponseBody
	@RequestMapping("getAllActivity")
	public List<Activity> getAllActivity(String problemId,String projectId,HttpServletRequest request) {
		
		List<Activity> result = new ArrayList<Activity>();
		
		HttpSession session = request.getSession();
		Map map = (Map)session.getAttribute("userInfo");
		
		int userId = (Integer.parseInt((String) map.get("id")));
		
		try {
			//检测权限，只有当前用户是project的参与者才可以查看活动
			if (AuthCheck.isUserRelatedtoProject(userId, projectId)) {
				
				ActivityDao ad = new ActivityDao();
				result = ad.getAllActivity(problemId);
				
			}
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		
		
		return result;
	}
	
}
