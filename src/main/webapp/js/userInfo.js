function addProjectUser() {
	
	if($('#globalProjectName').text().trim() == "") {
		alert("请新建工程，然后项目组成员");
		return;
	}
	
	//从后台获取用户列表
	$.ajax({
    	type: "post",
        url: "getUserInfo",
        
        success: function (result) {
        	
        	$('#projectUserTable').bootstrapTable('removeAll');
        	
        	if (result.length > 0) {
        		for (var i=0;i<result.length;i++) {
        			$('#projectUserTable').bootstrapTable('append', result[i]);
        		}
        	}
        	
        	$("#addProjectUser").modal("show");
        	
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {//输出错误信息
            alert('添加失败，请稍后重试');
        }
    });
	
	
}


function addUserItem() {
	//获取选择的元素
	var usersSelected = $('#projectUserTable').bootstrapTable('getSelections');
	
	var usersAdded = $("#projectUser").children();
	
	var usersToadd = new Array();
	
	var usersToaddId = new Array();
	
	for (var i=0; i<usersSelected.length; i++) {
		var toadd = true;
		for (var j=0; j<usersAdded.length; j++) {
			if (usersSelected[i].id == usersAdded[j].id) {
				toadd = false;
				break;
			}
		}
		if (toadd) {
			usersToadd.push(usersSelected[i]);
			usersToaddId.push(usersSelected[i].id);
		}
	}
	
	if (usersToadd.length < 1) {
		return;
	}
	
	$.ajax({
    	type: "post",
        url: "addParticipantUser",
        data: {"userids": usersToaddId,
        	   "projectId": $("#globalProjectId").text(),
        	   "projectName": $('#globalProjectName').text()
        },
        success: function (result) {
        	
        	addUserToDiv(usersToadd,0);
        	
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {//输出错误信息
            alert('添加失败，请稍后重试');
        }
    });
	

}


function getAllUsers(projectId) {
	
	$.ajax({
    	type: "post",
        url: "getAllProjectUsers",
        data: {
        	   "projectId": projectId 
        	  
        },
        success: function (result) {
        		$("#projectUser").empty();
        		addUserToDiv(result,1);
        	}
        });
        	
	
}


function removeUser(userid) {
	
	var  projectId = $("#globalProjectId").text();
	
	$.ajax({
    	type: "post",
        url: "deleteUser",
        data: {
        	   "userId": userid,
        	   "projectId": projectId
        	  
        },
        success: function (result) {
        		if (result == "NotEnoughAuth") {
        			alert("权限不足，只有项目创建者才可以删除");
        			return;
        		}
        		$("#projectUser").children("#"+userid).remove();
        	},
        	
        error: function (XMLHttpRequest, textStatus, errorThrown) {//输出错误信息
                alert('删除失败，请稍后重试');
            }	
        
        });
}


//前台添加函数
function addUserToDiv(usersToadd,index) {
	
	if (index == 1) {
		$("#projectCreator").text(usersToadd[0].nickName); //返回结果第一个是project创建者
	}
	
	for (var i=index; i<usersToadd.length; i++) {
		
		$("#projectUser").append("<div class=\"itemdiv memberdiv\" id='"+ usersToadd[i].id +"'>" + 
										"<div class=\"body\">" +
											"<div class=\"name\">" +
												"<span  class=\"blue\"><i class=\"fa fa-user\"></i>" + usersToadd[i].nickName + "</span>" +
											 "</div>" +
											 "<span class=\"label label-warning label-sm\">操作</span>" +
											 "<div class=\"inline position-relative\">" +
												"<button class=\"btn btn-minier btn-yellow btn-no-border dropdown-toggle\" data-toggle=\"dropdown\">" +
													"<i class=\"ace-icon fa fa-angle-down icon-only bigge r-120\"></i>" +
												"</button>" +
												"<ul class=\"dropdown-menu dropdown-only-icon dropdown-yellow dropdown-menu-right dropdown-caret dropdown-close\">" +
												"<li>" +
													"<a href=\"#\" onclick=\"removeUser('" + usersToadd[i].id + "')\">" +
														"<span class=\"red\">" +
															"删除<i class=\"ace-icon fa fa-trash-o bigger-110\"></i>" +
														"</span>" +
													"</a>" +
												"</li>" +
											"</ul>" +
										"</div>" +
									"</div>" +
								"</div>");
		
	}
}
