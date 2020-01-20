$(function(){
	
	$.ajax({
    	type: "get",
        url: "getAllProject",
        
        success: function (result) {
        	var createdProject = result.created;
        	var participantedProject = result.participanted;
        	
        	for (var i in createdProject) {
        		var projectName = createdProject[i].projectName;
        		var currentId = createdProject[i].id;
        		
        		$("#createdProject").prepend("<li id='" + currentId + "'><a>" +
	                       "<i class=\"menu-icon fa fa-caret-right\"></i>" + 
	                       			"<i onclick=\"checkProject('"+ projectName + "','"+ currentId + "')\">" + projectName + "</i>" +
	                        "<i class=\"ace-icon fa fa-trash-o bigger-120 red\" style=\"float:right;padding-right:12px;z-index:2\" onclick=\"removeProject('" +
	                        	currentId + 
	                        "')\"></i> </a>  <b class=\"arrow\"></b> </li>"
	               )
        	}
        	
        	for (var i in participantedProject) {
        		var projectName = participantedProject[i].projectName;
        		var creatorId = participantedProject[i].creatorId;
        		var currentId = participantedProject[i].id;
        		
        		$("#participantedProject").prepend("<li id='" + currentId + "'><a title='" + creatorId + "'>" +
	                       "<i class=\"menu-icon fa fa-caret-right\"></i>" + 
	                       			"<i onclick=\"checkProject('" + projectName + "','"+ currentId + "')\">" + projectName + "</i>" +
	                        "</a>  <b class=\"arrow\"></b> </li>"
	               )
        	}
        	
        		
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {//打印错误信息
            console.log("XMLHttpRequest状态码：" + XMLHttpRequest.readyState);
            console.log("textStatus是：" + textStatus);
            console.log("errorThrown是：" + errorThrown);
        }
    });
	
	
})


function addProject() {
	 var projectName = $('#projectNameModal')[0].value.trim();//获取项目名
	 var createTime = new Date().toLocaleDateString() + ',' + new Date().getHours() + ':' + new Date().getMinutes();//获取项目创建时间
	 var memo = $('#projectRemarkModal')[0].value;//获取备注
	 var data = {
			"projectName": projectName,
	        "createTime": createTime,
	        "memo": memo,
	        "appResult": ""
	    };
	 
	
 	if (projectName === ''||projectName.match(/^\s*$/)) {
        alert("请输入项目名！！！");
        return;
    } 
    if (projectName.length > 25) {
        alert("项目名长度不能超过25个汉字，请重新输入");
        return;
    }
    
    //检测项目名是否存在
    $.ajax({
        type: "post",
        url: "isProjectExist",
        data: {
            "projectName": projectName
        },
        success: function (result) {
        	if (result) {
        		alert("项目名已存在，请重新输入");
                return;
        	}
        	
        	// 添加数据库
            $.ajax({
                type: "post",
                url: "saveNewProject",
                data: data,
                success: function (result) {
                	
                		//对页面进行重置
                		projectClear();

                		var currentId = result.currentId;
                		var userId = result.userId;
                		var nickName = result.nickName;
                	
                		
                    	$("#createdProject").prepend("<li id='" + currentId + "'><a>" +
        	                       "<i class=\"menu-icon fa fa-caret-right\"></i>" + 
        	                       			"<i onclick=\"checkProject('"+ projectName + "','"+ currentId + "')\">" + projectName + "</i>" +
        	                        "<i class=\"ace-icon fa fa-trash-o bigger-120 red\" style=\"float:right;padding-right:12px;z-index:2\" onclick=\"removeProject('" +
        	                        	currentId + 
        	                        "')\"></i> </a> <b class=\"arrow\"></b> </li>"
        	               )
                    	
                        //高亮项目
        	           // $('#createdProject').children('li').removeAttr("class");
                        //$('#createdProject').children('li').first().attr('class', 'active highlight');
                        //面包屑显示项目名
        	               
                        $("#globalProjectName").text(projectName);
                    	$("#globalProjectId").text(currentId);
                    	
                    	$("#projectCreator").text(nickName);
                      //  $('.showProjectNameDiv').removeAttr('style');
                     
                },
                
                error: function (XMLHttpRequest, textStatus, errorThrown) {//打印错误信息
                    console.log("XMLHttpRequest状态码：" + XMLHttpRequest.readyState);
                    console.log("textStatus是：" + textStatus);
                    console.log("errorThrown是：" + errorThrown);
                }
            });
            
            $('#newProjectModal').modal('hide');//隐藏模态框
    }});
    
    
    
}


function removeProject(projectId) {
	
	if (confirm("项目删除后将无法恢复，确认要删除吗？")) {
        $.ajax({
        	type: "post",
            url: "removeProject",
            data: {
                "projectId": projectId
            },
            success: function (result) {
            	
            	if ($('#globalProjectId').text() == projectId) {
            		location.reload();
            	} else {
            		
            		$("#"+projectId).remove();
            			
            		
            	}
            },
            
            error: function (XMLHttpRequest, textStatus, errorThrown) {//输出错误信息
                console.log("XMLHttpRequest请求状态码：" + XMLHttpRequest.status);
                console.log("XMLHttpRequest状态码：" + XMLHttpRequest.readyState);
                console.log("textStatus是：" + textStatus);
                console.log("errorThrown是：" + errorThrown);
                alert('项目删除失败，请稍后重试');
            }
        });
    }
	
}


function checkProject(projectName,projectId) {
	//面包屑显示项目名
    $('#globalProjectName').text(projectName);
    $("#globalProjectId").text(projectId);
    
    //导入界面显示
    getAllUsers(projectId);
    getAllProblems(projectId);
    
    //配置界面显示
    problemConfig();
    getAllTargetProblems(projectId);
    
    //使用界面显示
    useuse();
    
    
    //评估界面显示
    analysis();
}


function projectClear() {
	
	$('#problemsTable').bootstrapTable('removeAll');
	$("#projectUser").empty()
}
