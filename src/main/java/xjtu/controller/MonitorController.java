package xjtu.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import xjtu.dao.ProblemDao;
import xjtu.dao.ProjectDao;
import xjtu.model.MonitorProblem;
import xjtu.model.ProblemMethod;
import xjtu.service.AuthCheck;

@Controller
public class MonitorController {

	@ResponseBody
	@RequestMapping("monitor/getAllProblemsInfo")
	public List<MonitorProblem> getAllMonitorProblem(String projectId,HttpServletRequest request) {
		
		List<MonitorProblem> result = new ArrayList<MonitorProblem>();
		
		HttpSession session = request.getSession();
		Map map = (Map)session.getAttribute("userInfo");
		int userId = Integer.parseInt((String) map.get("id"));
		
		try {
			//检测权限，只有当前用户是project的创建者或参与者才可以查看project中的难题
			if (AuthCheck.isUserRelatedtoProject(userId, projectId)) {
				ProblemDao pb = new ProblemDao(); 
				try {
					result = pb.getAllMonitorProblem(Integer.parseInt(projectId));
				} catch (Exception e) {
					e.printStackTrace();
				}
				
			}
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		
		return result;
	}
	
	
	
	@ResponseBody
	@RequestMapping("monitor/getProblemMethodInfo")
	public List<ProblemMethod> getProblemMethodInfo(String problemId,String problemType) {
		
		List<ProblemMethod> result = new ArrayList<ProblemMethod>();
		
		ProblemDao pb = new ProblemDao(); 
		try {
			result = pb.getProblemMethodInfo(problemId,problemType);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	@ResponseBody
	@RequestMapping("monitor/getProjectInfo")
	public Map<String,String> getProjectInfo(String projectId,HttpServletRequest request) {
		
		Map<String,String> result = new HashMap<String,String>();
		
		ProjectDao pd = new ProjectDao(); 
		try {
			result = pd.getProjectInfo(projectId);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return result;
		
	}
	
}
