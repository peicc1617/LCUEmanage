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

import xjtu.dao.ProblemDao;
import xjtu.model.Problem;
import xjtu.service.AuthCheck;

@Controller
public class ProblemController {

	@ResponseBody
	@RequestMapping("addProblem")
	public Map<String,String> addProblem(Problem problem,HttpServletRequest request) {
		
		Map<String,String> result = new HashMap<String,String>();
		
		HttpSession session = request.getSession();
		Map map = (Map)session.getAttribute("userInfo");
		
		problem.setCreatorName((String)map.get("nickName"));
		problem.setCreatorId(Integer.parseInt((String) map.get("id")));
		
		ProblemDao pb = new ProblemDao(); 
		int currentId = 0;
		try {
			currentId = pb.addNewProblem(problem);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		result.put("currentId", Integer.toString(currentId));
		result.put("creatorName", (String)map.get("nickName"));
		
		return result;
		
	}
	
	
	
	
	
	@ResponseBody
	@RequestMapping("editProblem")
	public boolean editProblem(Problem problem,HttpServletRequest request) {
		
		//System.out.println(project.getProjectName());
		
		HttpSession session = request.getSession();
		Map map = (Map)session.getAttribute("userInfo");
		
		int userId = (Integer.parseInt((String) map.get("id")));
		int problemId = problem.getId();
		
		try {
			//检测权限，只有当前用户是project的创建者或problem的创建者时才可以编辑problem
			if (AuthCheck.isUserRelatedtoProblem(userId, problemId)) {
				
				ProblemDao pb = new ProblemDao();
				pb.editProblem(problem);
				return true;
				
			}
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		
		
		return false;
		
	}
	
	
	@ResponseBody
	@RequestMapping("deleteProblem")
	public List<Integer>  deleteProblem(@RequestParam(value = "ids[]")String[] ids,HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Map map = (Map)session.getAttribute("userInfo");
		
		int userId = (Integer.parseInt((String) map.get("id")));
		
		List<Integer> toDelete = new ArrayList<Integer>();
		
		for (int i=0;i<ids.length;i++) {
			int problemId = Integer.parseInt(ids[i]);
			try {
				//检测权限，只有当前用户是project的创建者或problem的创建者时才可以删除problem
				if (AuthCheck.isUserRelatedtoProblem(userId, problemId)) {
					toDelete.add(problemId);
				}
			} catch (Exception e1) {
				e1.printStackTrace();
			}
			
		}
		
		ProblemDao pb = new ProblemDao();
		try {
			pb.deleteProblem(toDelete);;
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		return toDelete;
		
		
	}
	
	@ResponseBody
	@RequestMapping("getAllProblem")
	public List<Problem> getAllProblem(String projectId,HttpServletRequest request) {
		
		List<Problem> result = new ArrayList<Problem>();
		
		HttpSession session = request.getSession();
		Map map = (Map)session.getAttribute("userInfo");
		int userId = Integer.parseInt((String) map.get("id"));
		
		try {
			//检测权限，只有当前用户是project的创建者或参与者才可以查看project中的难题
			if (AuthCheck.isUserRelatedtoProject(userId, projectId)) {
				ProblemDao pb = new ProblemDao(); 
				try {
					result = pb.getAllProblem(Integer.parseInt(projectId));
				} catch (Exception e) {
					e.printStackTrace();
				}
				
			}
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		
		return result;
		
	}
	
	
}
