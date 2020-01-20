package xjtu.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import xjtu.dao.ProjectDao;
import xjtu.model.Project;

@Controller
public class ProjectController {

	@ResponseBody
	@RequestMapping("saveNewProject")
	public Map<String,String> saveNewProject(Project project,HttpServletRequest request) {
		
		Map<String,String> result = new HashMap<String,String>();
		
		HttpSession session = request.getSession();
		Map map = (Map)session.getAttribute("userInfo");
		
		project.setCreatorName((String)map.get("username"));
		String userId = (String) map.get("id");
		project.setCreatorId(Integer.parseInt(userId));
		
		ProjectDao pd = new ProjectDao(); 
		int currentId = 0;
		try {
			currentId = pd.addNewProject(project);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		result.put("currentId", Integer.toString(currentId));
		result.put("userId", userId);
		result.put("nickName", (String)map.get("nickName"));
		
		return result;
		
		
	}
	
	
	@ResponseBody
	@RequestMapping("removeProject")
	public String removeProject(String projectId) {
		
		ProjectDao pd = new ProjectDao(); 
		try {
			pd.deleteProject(Integer.parseInt(projectId));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "success";
		
	}
	
	@ResponseBody
	@RequestMapping("getAllProject")
	public Map<String,List<Project>> getAllProject(HttpServletRequest request) {
		
		Map<String,List<Project>> result = new HashMap<String,List<Project>>();
		
		HttpSession session = request.getSession();
		Map map = (Map)session.getAttribute("userInfo");
		
		int userId = Integer.parseInt((String) map.get("id"));
		
		ProjectDao pd = new ProjectDao(); 
		try {
			result = pd.getAllProject(userId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
		
	}
	
	@ResponseBody
	@RequestMapping("isProjectExist")
	public boolean isProjectExist(String projectName,HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Map map = (Map)session.getAttribute("userInfo");
		
		int userId = Integer.parseInt((String) map.get("id"));
		
		ProjectDao pd = new ProjectDao(); 
		boolean res = false;
		try {
			res = pd.isProjectExist(projectName,userId);;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return res;
		
	}
}
