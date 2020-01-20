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
public class TargetController {

	@ResponseBody
	@RequestMapping("updataProblemPriority")
	public boolean updataProblemPriority(String projectId,@RequestParam(value = "peoblemsIds[]")String[] peoblemsIds,@RequestParam(value = "recommendValues[]")String[] recommendValues,HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Map map = (Map)session.getAttribute("userInfo");
		
		int userId = (Integer.parseInt((String) map.get("id")));
		
		try {
			//检测权限，只有当前用户是project的创建者才可以进行难题排序
			if (AuthCheck.isUserCreatedProject(userId, projectId)) {
				
				ProblemDao pb = new ProblemDao();
				pb.updataRecommendValue(peoblemsIds,recommendValues);
				return true;
				
			}
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		
		
		return false;
		
	}
	
	
	@ResponseBody
	@RequestMapping("updataProblemTarget")
	public boolean updataProblemTarget(String projectId,@RequestParam(value = "problemsIds[]")String[] problemsIds,HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Map map = (Map)session.getAttribute("userInfo");
		
		int userId = (Integer.parseInt((String) map.get("id")));
		
		try {
			//检测权限，只有当前用户是project的创建者才可以进行设置目标难题
			if (AuthCheck.isUserCreatedProject(userId, projectId)) {
				
				ProblemDao pb = new ProblemDao();
				pb.updataTarget(problemsIds);
				return true;
				
			}
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		
		
		return false;
		
	}
	
	
	
	@ResponseBody
	@RequestMapping("deleteProblemTarget")
	public boolean deleteProblemTarget(String projectId,String problemsId,HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Map map = (Map)session.getAttribute("userInfo");
		
		int userId = (Integer.parseInt((String) map.get("id")));
		
		try {
			//检测权限，只有当前用户是project的创建者才可以进行设置目标难题
			if (AuthCheck.isUserCreatedProject(userId, projectId)) {
				
				ProblemDao pb = new ProblemDao();
				pb.deleteTarget(problemsId);
				return true;
				
			}
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		
		
		return false;
		
	}
	
	@ResponseBody
	@RequestMapping("getAllTargetProblems")
	public List<Problem> getAllTargetProblems(String projectId,HttpServletRequest request) {
		
		List<Problem> result = new ArrayList<Problem>();
		
		HttpSession session = request.getSession();
		Map map = (Map)session.getAttribute("userInfo");
		int userId = Integer.parseInt((String) map.get("id"));
		
		try {
			//检测权限，只有当前用户是project的创建者或参与者才可以查看project中的难题
			if (AuthCheck.isUserRelatedtoProject(userId, projectId)) {
				ProblemDao pb = new ProblemDao(); 
				try {
					result = pb.getAllTargetProblem(Integer.parseInt(projectId));
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
