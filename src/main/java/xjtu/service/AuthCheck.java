package xjtu.service;

import java.util.List;

import xjtu.dao.ProblemDao;
import xjtu.dao.ProjectDao;

public class AuthCheck {
	
	
	public static boolean isUserRelatedtoProblem(int userId,int problemId) throws Exception {
		
		
		ProjectDao pd = new ProjectDao();
		ProblemDao pb = new ProblemDao();
		
		int projectId = pb.getProjectId(problemId);
		
		int projectCreatorId = pd.getCreatorId(projectId);
		
		if (userId == projectCreatorId) {
			return true;
		}
		
		
		int problemCreatorId = pb.getCreatorId(problemId);
		
		if (userId == problemCreatorId) {
			return true;
		}
		
		return false;
	}

	public static boolean isUserCreatedProject(int currentUserId, String projectId) throws Exception {
		
		ProjectDao pd = new ProjectDao();
		int projectCreatorId = pd.getCreatorId(Integer.parseInt(projectId));
		
		if (currentUserId == projectCreatorId) {
			return true;
		}
		
		return false;
	}
	
	public static boolean isUserParticipantProject(int currentUserId, String projectId) throws Exception {
		
		ProjectDao pd = new ProjectDao();
		List<Integer> projectParticipantId = pd.getPanticipantId(Integer.parseInt(projectId));
		
		for (int i=0;i<projectParticipantId.size();i++) {
			if (currentUserId == projectParticipantId.get(i)) {
				return true;
			}
		}
		
		return false;
	}

	public static boolean isUserRelatedtoProject(int userId, String projectId) throws Exception {
		
		
		return isUserCreatedProject(userId,projectId) || isUserParticipantProject(userId,projectId);
	}

		
}