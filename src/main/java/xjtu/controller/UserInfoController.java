package xjtu.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import xjtu.dao.ProblemDao;
import xjtu.dao.ProjectDao;
import xjtu.dao.UserInfoDao;
import xjtu.model.UserInfo;
import xjtu.service.AuthCheck;

@Controller
public class UserInfoController {
	
	
	
	@ResponseBody
	@RequestMapping("getUserInfo")
	public List<UserInfo> getUserInfo(HttpServletRequest request) {
		
		List<UserInfo> result = new ArrayList<UserInfo>();
		
		HttpSession session = request.getSession();
		Map map = (Map)session.getAttribute("userInfo");
		int userId = Integer.parseInt((String) map.get("id"));
		
		String auth = (String) map.get("permission");
		
		UserInfoDao ui = new UserInfoDao(); 
		try {
			result = ui.getAllUser(auth, userId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
		
	}
	
	@ResponseBody
	@RequestMapping("addParticipantUser")
	public String getUserInfo(@RequestParam(value = "userids[]")String[] userids,String projectId,String projectName,HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Map map = (Map)session.getAttribute("userInfo");
		String creatorId = (String) map.get("id");
		
		ProjectDao pd = new ProjectDao(); 
		try {
			pd.addParticipantUser(projectId, projectName,userids,creatorId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "success";
		
	}
	
	
	
	
	
	
	@ResponseBody
	@RequestMapping("getAllProjectUsers")
	public List<UserInfo> getAllProjectUsers(String projectId,HttpServletRequest request) {
		
		List<UserInfo> result = new ArrayList<UserInfo>();
		
		
		UserInfoDao ui = new UserInfoDao(); 
		try {
			result = ui.getAllProjectUser(projectId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
		
	}
	
	
	
	@ResponseBody
	@RequestMapping("deleteUser")
	public String deleteUser(String userId,String projectId,HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Map map = (Map)session.getAttribute("userInfo");
		
		int currentUserId = Integer.parseInt((String) map.get("id"));
		
		try {
			if (AuthCheck.isUserCreatedProject(currentUserId, projectId)) {
				
				UserInfoDao ui = new UserInfoDao();
				ui.deleteUser(projectId,userId);
				return "success";
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return "NotEnoughAuth";
		
	}

}
