
function detailFormatter(index,row,element) {
    
	var html = "<div class=\"row\">\r\n" + 
	"\r\n" + 
	"									<div class=\"col-xs-7 col-sm-7\">\r\n" + 
	"										<div class=\"space visible-xs\"></div>\r\n" + 
	"\r\n" + 
	"										<div class=\"profile-user-info profile-user-info-striped\">\r\n" + 
	"											<div class=\"profile-info-row\">\r\n" + 
	"												<div class=\"profile-info-name\"> 难题描述 </div>\r\n" + 
	"\r\n" + 
	"												<div class=\"profile-info-value\">\r\n" + 
	"													<span>--PROBLEMDES--</span>\r\n" + 
	"												</div>\r\n" + 
	"											</div>\r\n" + 
	"											\r\n" + 
	"											<div class=\"profile-info-row\">\r\n" + 
	"												<div class=\"profile-info-name\"> 创建者 </div>\r\n" + 
	"\r\n" + 
	"												<div class=\"profile-info-value\">\r\n" + 
	"													<span>--UESENAME--</span>\r\n" + 
	"												</div>\r\n" + 
	"											</div>\r\n" + 
	"\r\n" + 
	"											<div class=\"profile-info-row\">\r\n" + 
	"												<div class=\"profile-info-name\"> 领域属性 </div>\r\n" + 
	"\r\n" + 
	"												<div class=\"profile-info-value\">\r\n" + 
	"													<span>--ATTR--</span>\r\n" + 
	"												</div>\r\n" + 
	"											</div>\r\n" + 
	"											\r\n" + 
	"											<div class=\"profile-info-row\">\r\n" + 
	"													<div class=\"profile-info-name\"> --METHODorPLAN-- </div>\r\n" + 
	"													<div class=\"profile-info-value\">\r\n" + 
	"														<span>--METHOD--</span>\r\n" + 
	"													</div>\r\n" + 
	"											</div>\r\n" + 
	"		\r\n" + 
	"													--CHILDCONENT--\r\n" + 
	"\r\n" + 
	"											<div class=\"profile-info-row\">\r\n" + 
	"												<div class=\"profile-info-name\"> 解决进度 </div>\r\n" + 
	"\r\n" + 
	"												<div class=\"profile-info-value\">\r\n" + 
	"													 <a target=\"_black\" href=\"/templates/project?problemID=--PROBLEMID--\"><span class=\"label label-sm --LABEL_COLOR--\">--PROGRESS--</span></a>\r\n" + 
	"												</div>\r\n" + 
	"											</div>\r\n" + 
	"\r\n" + 
	"										</div>\r\n" + 
	"									</div>\r\n" + 
	"									<div class=\"col-xs-3 col-sm-3\">\r\n" + 
	"										<div class=\"space visible-xs\"></div>\r\n" + 
	"										<h4 class=\"header blue lighter less-margin\">发送邮件给 --UESENAME--</h4>\r\n" + 
	"\r\n" + 
	"										<div class=\"space-6\"></div>\r\n" + 
	"\r\n" + 
	"											<fieldset>\r\n" + 
	"												<textarea class=\"width-100\" resize=\"none\" placeholder=\" \"></textarea>\r\n" + 
	"											</fieldset>\r\n" + 
	"\r\n" + 
	"											<div class=\"hr hr-dotted\"></div>\r\n" + 
	"\r\n" + 
	"											<div class=\"clearfix\">\r\n" + 
	"\r\n" + 
	"												<button class=\"pull-right btn btn-sm btn-primary btn-white btn-round\" type=\"button\">\r\n" + 
	"													提交\r\n" + 
	"													<i class=\"ace-icon fa fa-arrow-right icon-on-right bigger-110\"></i>\r\n" + 
	"												</button>\r\n" + 
	"											</div>\r\n" + 
	"									</div>\r\n" + 
	"								\r\n" + 
	"							</div>";
    
	
	var childHtml = "<div class=\"profile-info-row\"><div class=\"profile-info-name\"> 子难题 </div>\r\n" + 
	"	\r\n" + 
	"													<div class=\"profile-info-value\">\r\n" + 
	"														<span>--CHILDPROBLEM--</span>\r\n" + 
	"													</div>\r\n" + 
	"													\r\n" + 
	"													<div class=\"profile-info-name\"> 创新方法 </div>\r\n" + 
	"	\r\n" + 
	"													<div class=\"profile-info-value\">\r\n" + 
	"														<span>--CHILDMETHOD--</span>\r\n" + 
	"													</div></div>";
	

	$.ajax({
    	type: "get",
    	async: false,
        url: "monitor/getProblemMethodInfo",
        data: {
        	"problemId" : row.pid,
        	"problemType": row.ptype
        },
        
        success: function (result) {
        	
        	html = html.replace(/--PROBLEMDES--/g,row.pdescriptoin);
        	html = html.replace(/--UESENAME--/g,row.puser);
        	
        	if (result.length == 1) { //目标生产难题，局部被动
        		
        		html = html.replace(/--ATTR--/g,result[0].pattr);
        		
        		if (result[0].methodName == "") {
        			html = html.replace(/--METHODorPLAN--/g,"创新方法");
        			html = html.replace(/--METHOD--/g,"-");
            		html = html.replace(/--LABEL_COLOR--/g,"label-primary");
            		html = html.replace(/--PROGRESS--/g,"选择方法");
            		
        		} else {
        			html = html.replace(/--METHODorPLAN--/g,"创新方法");
        			html = html.replace(/--METHOD--/g,result[0].methodName);
            		html = html.replace(/--LABEL_COLOR--/g,"label-success");
            		html = html.replace(/--PROGRESS--/g,"正在解决");
            		html = html.replace(/--PROBLEMID--/g,row.pid);
        		}
        		
        		html = html.replace(/--CHILDCONENT--/g,"");
        		
        		
        	} else if (result.length > 1) { //目标生产难题，宏观主动生产难题
        		
        		html = html.replace(/--ATTR--/g,"-");
        		html = html.replace(/--METHODorPLAN--/g,"规划状态");
        		html = html.replace(/--METHOD--/g,"规划完成");
        		html = html.replace(/--LABEL_COLOR--/g,"label-info");
        		html = html.replace(/--PROGRESS--/g,"已规划，解决中");
        		html = html.replace(/--PROBLEMID--/g,row.pid);
        		
        		
        		var  childHtml2Add = "";
        		for (var i=0;i<result.length;i++) {
        			var temp = childHtml.replace(/--CHILDPROBLEM--/g,result[i].pdescriptoin);
        			temp = temp.replace(/--CHILDMETHOD--/g,result[i].methodName);
        			childHtml2Add = childHtml2Add + temp;
        		}
        		html = html.replace(/--CHILDCONENT--/g,childHtml2Add);
        		
        	}  else { //非目标生产难题
        		
        		if (row.type == "局部被动难题") {
        			html = html.replace(/--METHODorPLAN--/g,"创新方法");
        		} else {
        			html = html.replace(/--METHODorPLAN--/g,"规划状态");
        		}
        		html = html.replace(/--ATTR--/g,"-");
        		html = html.replace(/--METHOD--/g,"-");
        		html = html.replace(/--LABEL_COLOR--/g,"label-default");
        		html = html.replace(/--PROGRESS--/g,"录入");
        		html = html.replace(/--CHILDCONENT--/g,"");
        	}       		
        	
        }
	
	});
	
	
	
    return html;
}


function monitorProject() {
	
	var projectId = $("#globalProjectId").text();
	
	if (projectId == "") {
		alert("请选择要监控的项目");
		return;
	} else {
		$("#monitorModal").modal("show");
		
	  //导入过程监控
	   getAllProblemsInfo(projectId);
	   showProjectInfo(projectId);
		
	}
	
  
   
}


function showProjectInfo(projectId) {
	
	$.ajax({
    	type: "get",
        url: "monitor/getProjectInfo",
        data: {
        	"projectId" : projectId,
        },
        
        success: function (result) {
        	
        	$("#ProjectInfo_problemNum").text(result.allP);
        	$("#ProjectInfo_gpNum").text(result.gP);
        	$("#ProjectInfo_lpNum").text(result.lP);
        	
        	$("#ProjectInfo_peopleNum").text(result.people);
        	$("#ProjectInfo_TargetNum").text(result.target);
        	$("#ProjectInfo_MethodNum").text(result.method);
        	
        	
        	
        	
        	var date1 = Date.parse(result.date);
        	var currDate = Date.parse(new Date().toLocaleDateString());
            var dateSpan = Math.abs(currDate - date1);
            var iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
        	
        	$("#ProjectInfo_time").text(iDays);
        	
        	$("#ProjectInfo_performance").text(result.performance);
        	
        	
        	//控制进度条
        	var wizard = $('#fuelux-wizard-container').data('fu.wizard')
        	if (result.target == "0") {
				wizard.currentStep = 1;
        	} else if (result.method == "0") {
        		wizard.currentStep = 2;
        	} else if (result.performance == "0") {
        		wizard.currentStep = 3;
        	} else {
        		wizard.currentStep = 4;
        	}
        	
        	wizard.setState();
        	
        	
        }
     });
	
}










function getAllProblemsInfo(projectId) {
	
	$('#monitorProblemsTable').bootstrapTable('removeAll');
	
	$.ajax({
    	type: "get",
        url: "monitor/getAllProblemsInfo",
        data: {
        	"projectId" : projectId,
        },
        
        success: function (result) {
        	// 
        	var tempId = 0;
        	var res = new Array();
        	var j = 0;
        	for (var i=0;i<result.length;i++) {
        		if (tempId == result[i].pid) {
        			res[j-1].pplan = res[j-1].pplan + "," + result[i].pplan;
        		} else {
        			res[j] = result[i];
        			j++;
        		}
        		tempId = result[i].pid;
        	}
        
        	for (var i=0;i<res.length;i++) {
        		var rowdata= {
        				pid: res[i].pid,
        				pdescriptoin: res[i].pdescriptoin,
        				ptype: res[i].ptype,
        				puser: res[i].puser,
        				precommend: res[i].precommend.toFixed(3),
        				pcomment: res[i].pcomment,
        				createTime: res[i].createTime,
        		
        				pplanContent: "["+ res[i].pplan + "]"
        		    };
        		
        		if (res[i].ptarget) {
        			rowdata.ptarget = "<button class=\"btn btn-xs btn-warning\"><i class=\"ace-icon fa fa-flag bigger-120\"></i></button>";
        		} 
        		
        		if (res[i].pplan == "NoNeed") {
        		} else {
        			var content = eval(rowdata.pplanContent);
            		if (content[0].activityName != "null" && rowdata.ptype == "宏观主动难题") {
            			rowdata.pplan = "<button class=\"btn btn-xs btn-success\"><i class=\"ace-icon fa fa-check bigger-120\"></i></button>";
            		}
        		}
        		
        		$('#monitorProblemsTable').bootstrapTable('append', rowdata);
        	}
        	
        }
	});
	
}


