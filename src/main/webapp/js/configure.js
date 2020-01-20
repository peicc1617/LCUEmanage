


function problemConfig() {
	
	var tableData = $('#problemsTable').bootstrapTable('getData');
	
	if (tableData.length < 1) {
		$("#alreadyHaveProblems").css("display","none");
		$("#notHaveProblems").css("display","inline");
	} else {
		$("#alreadyHaveProblems").css("display","inline");
		$("#notHaveProblems").css("display","none");
		
		
		var allPro = tableData.length;
		var pro1 = 0;
		var pro2 = 0;
		for (var p in tableData) {
			if (tableData[p].ptype == "宏观主动难题") {
				pro1 ++;
			} else {
				pro2 ++;
			}
		}
		$("#allPro").text(allPro);
		$("#pro1").text(pro1);
		$("#pro2").text(pro2);
		
	}

}

function backToHome() {
	
	
	$("#home").addClass("active");
	$("#hometab").parent().addClass("active");
	$("#configure").removeClass("active")
	$("#configuretab").parent().removeClass("active");
}


function problemSelect(index) {
	var selected = "#recommend" + index;
	var selectedProblem = $(selected).text();
	$("#targetProblem").text(selectedProblem);

}


//两个操作中的 查看
function targetProblemCheck(id) {
	
	var allProblems = $('#problemsTable').bootstrapTable('getData');
	var index = 0;
	
	for (var i in allProblems) {
		if (allProblems[i].id == id) {
			index = i ;
			break;
		}
	}
	
	$(".edit")[index].click();
	$("#problemBtn").css("display","none");
	
}

//两个操作中的 删除
function targetProblemDelete(id) {
	
	var projectId =  $("#globalProjectId").text();
	$.ajax({
    	type: "post",
        url: "deleteProblemTarget",
        data: {
        	"projectId": projectId,
        	"problemsId": id
        },
        success: function (status) {
        	if (status) {
        		var divId = "targrtProblem" + id;
        		$("#"+divId).remove();
        		
        	} else {
        		alert('权限不足');
        	}
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {//输出错误信息
            alert('删除失败，请稍后重试');
        }
    });
	
	
	
}


function manualSelect() {
	$("#selectProblem").modal("show");
	$('#problemsTable1').bootstrapTable('removeAll');
	
	var allProblems = $('#problemsTable').bootstrapTable('getData');
	
	for (var i in allProblems) {
		var rowdata= {
				id: allProblems[i].id,
				pdescriptoin: allProblems[i].pdescriptoin,
				ptype: allProblems[i].ptype,
				recommendValue: allProblems[i].recommendValue.toFixed(2)
		    };
		$('#problemsTable1').bootstrapTable('append', rowdata);
	}
	
	
}

function manualSelectConfirm() {
	var selected = $('#problemsTable1').bootstrapTable('getSelections');
	if (selected.length == 0) {
		return;
	}
	
	//如果选择的难题已经添加，则不再重新添加
	var toadd = new Array();
	var addedId = new Array();
	
	var addedItem = $("#targetProblems").children("div");
	for (var i=0;i<addedItem.length;i++) {
		addedId.push(parseInt(addedItem[i].id.replace("targrtProblem","")));
	}
	
	for (var i=0;i<selected.length;i++) {
		var notadded = true;
		for (var j=0;j<addedId.length;j++) {
			if (selected[i].id == addedId[j]) {
				notadded = false;
				break;
			}
		}
		if (notadded) {
			toadd.push(selected[i]);
		}
	}
	
	if (toadd.length > 0) {
		addTargetProblemItem(toadd);
	}
	
	$("#selectProblem").modal("hide");
}



//添加目标难题
function addTargetProblemItem(targrtProblem) {
	
	//添加到后台----------
	var problemsIds = new Array();
	var projectId =  $("#globalProjectId").text();
	
	for (var i in targrtProblem) {
		problemsIds.push(targrtProblem[i].id);
	}
	
	$.ajax({
    	type: "post",
        url: "updataProblemTarget",
        data: {
        	"projectId": projectId,
        	"problemsIds": problemsIds,
        },
        success: function (status) {
        	if (status) {
        		addItemToDiv(targrtProblem);
        		
        	} else {
        		alert('权限不足');
        	}
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {//输出错误信息
            alert('添加失败，请稍后重试');
        }
    });
	
	
}


function addItemToDiv(targrtProblem) {
	//添加到前台----------
	for (var i =0;i<targrtProblem.length;i++) {
		
		
		var btnhtml = "";
		if (targrtProblem[i].ptype == "宏观主动难题") {
			btnhtml = "<button class=\"btn btn-sm btn-white btn-info\" style=\"margin-left:50px\" onclick=\"problemPlan(" + 
				targrtProblem[i].id + ",'"+ targrtProblem[i].pdescriptoin +"')\">进行规划</button>";
		}
		
		var htmlContent =
			"<div class=\"itemdiv dialogdiv\" id=\"targrtProblem" + targrtProblem[i].id + "\">" + 
				"<div class=\"body\">" +
					"<div class=\"name\">" +
						"<h5 style=\"color:#337ab7\">推荐度：" + Number(targrtProblem[i].recommendValue).toFixed(2) + 
							  btnhtml +
						"</h5>" +
					"</div>" +
					"<div class=\"text\">" + targrtProblem[i].pdescriptoin + "</div>" + 
					
		             "<div class=\"tools\" style=\"display:inline\">" + 
						"<div class=\"inline position-relative\">" +
							"<button class=\"btn btn-minier bigger btn-danger dropdown-toggle\" data-toggle=\"dropdown\">" + 
								"<i class=\"ace-icon fa fa-angle-down icon-only bigger-120\"></i> 操作" +
							"</button>" +
	
							"<ul class=\"dropdown-menu dropdown-only-icon dropdown-yellow dropdown-menu-right dropdown-caret dropdown-close\">" + 
								"<li>" +
									"<a href=\"javascript:void(0)\" onclick=\"targetProblemCheck(" + targrtProblem[i].id +")\" class=\"tooltip-error\" data-rel=\"tooltip\">" + 
										"<span class=\"blue\"><i class=\"fa fa-eye bigger-110\"></i> 查看</span>" +
									"</a>" +
								"</li>" +
							    
							    "<li>" +
									"<a href=\"javascript:void(0)\" onclick=\"targetProblemDelete(" + targrtProblem[i].id +")\" class=\"tooltip-error\" data-rel=\"tooltip\">" + 
										"<span class=\"red\"><i class=\"fa fa-trash bigger-110\"></i> 删除</span>" +
									"</a>" +
								"</li>" +
							"</ul>" +
						"</div>" +
					"</div>" +
				"</div>" +
			"</div>";
		
		$("#targetProblems").append(htmlContent);
		
	}
	
}

function problemSort() {
	//$("#recommentResult").css("display","none");
	$("#waitingForComplete").modal("show");
	setTimeout(doProblemSort , parseInt(Math.random() * 300) + 300);
	$("#waiting").css("display","inline");
	$("#completed").css("display","none");
}



function doProblemSort() {

	var allProblems = $('#problemsTable').bootstrapTable('getData');
	var recommendValues = runTOPSIS(allProblems);

	//将结果保存在table字段中
	var maxValue = 0;
	var maxValueIndex = 0;
	
	for (var i in recommendValues) {
		if (recommendValues[i] >= maxValue) {
			maxValue = recommendValues[i];
			maxValueIndex = i;
		}
		$('#problemsTable').bootstrapTable('updateCell',{index:i,field:'recommendValue',value:recommendValues[i]});
	}
	
	//结果保存后台
	var projectId =  $("#globalProjectId").text();
	var peoblemsIds = new Array();
	
	for (var i in allProblems) {
		peoblemsIds.push(allProblems[i].id);
	}
	
	
	$.ajax({
    	type: "post",
        url: "updataProblemPriority",
        data: {
        	"projectId": projectId,
        	"peoblemsIds": peoblemsIds,
        	"recommendValues": recommendValues
        },
        success: function (status) {
        	if (status) {
        		
        		var problemsArr = new Array();
        		problemsArr.push(allProblems[maxValueIndex]);
        		
        		if ($("#targetProblems").children("div").length == 0) {
        			//默认推荐目标难题为priority最大的难题
        			addTargetProblemItem(problemsArr);
        		}
        		
        		//$("#recommentResult").css("display","inline");
        		$("#waiting").css("display","none");
        		$("#completed").css("display","inline");
        		
        	} else {
        		alert('权限不足');
        		$("#waitingForComplete").modal("hide");
        	}
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {//输出错误信息
            alert('添加后台失败，请稍后重试');
        }
    });
	
	
}




function getAllTargetProblems(projectId) {
	
	$("#targetProblems").empty();
	
	$.ajax({
    	type: "post",
        url: "getAllTargetProblems",
        data: {
        	"projectId": projectId,
        },
        success: function (result) {
        	
        	addItemToDiv(result);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {//输出错误信息
        	console.log("获取目标难题数据失败" + textStatus);
        }
    });
	
	
}




function problemPlan(problemId,peoblemName) {
	
	$("#problemPlan").css("display","block");
	
	//显示要规划的目标难题
	$("#targetProblemForPlan").text(peoblemName);
	$("#targetProblemForPlanId").text(problemId);
	//清空activity区域
	$("#targetProblemArea").empty();
	
	var projectId = $("#globalProjectId").text();
	
	$.ajax({
    	type: "post",
        url: "getAllActivity",
        data: {
        	"problemId":problemId,
        	"projectId":projectId
        },
        
        success: function (result) {
    		for (var i=0;i<result.length;i++) {
    			addActivityItemToDiv(result[i]);
    		}
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {//输出错误信息
        	 console.log('获取activity失败'+textStatus);
        }
    });
	
	
}



function addOrUpdateActivity(index) {
	
	setPlaceholder();
	
	$("#addActivity").modal("show");
	$("#activityBtn").unbind("click");
	
	if (index) { //编辑
		
		var event = $("#activityEvent"+index).text().split(",");
		var ploblem = $("#activityProblem"+index).text().split(",");
		var activityName = $("#activityActivity"+index).text();
		
		//先clean
		$("#eventTagsdiv").find(".tag").remove()
		$("#problemTagsdiv").find(".tag").remove();
		//添加
		
		$("#activityName").val(activityName);
		addTagToArea("eventTags",event);
		addTagToArea("problemTags",ploblem);
		
		$("#activityBtn").click(index,addActivityItem);
		
	} else { //添加
		$("#activityBtn").click(addActivityItem);
	}
	
	//$("#activityBtn").css("display","inline");
}


function deleteActivity(index) {
	
	var projectId = $("#globalProjectId").text();
	
	$.ajax({
    	type: "post",
        url: "deleteActivity",
        data: {
        	"activityId":index,
        	"projectId":projectId
        },
        
        success: function (result) {
        	if (result) { 
        		
        		$("#activity"+index).remove();

        	} else { //权限不足
        		alert("权限不足")
        	}
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {//输出错误信息
            alert('配置失败，请稍后重试');
        }
    });
	
	
	
}


function addActivityItem(Event) {
	
	var index = Event.data;
	
	var projectId = $("#globalProjectId").text();
	
	var problemId = $("#targetProblemForPlanId").text();
	var activityName = $("#activityName").val();
	
	var enventInput = $("#eventTagsdiv").children(".tags").children(".tag").text();
	var envent = enventInput.substring(0,enventInput.length-1).split("×");
	
	var activityProblemInput = $("#problemTagsdiv").children(".tags").children(".tag").text();
	var activityProblem = activityProblemInput.substring(0,activityProblemInput.length-1).split("×");
	
	var activityData = {
			"problemId": problemId,
			"activityName": activityName,
			"envent": envent.toString(),
			"activityProblem": activityProblem.toString(),
			"projectId": projectId
	    };
	
	

	if (index) { //编辑
		
		activityData.id = index;
		
		$.ajax({
	    	type: "post",
	        url: "updateActivity",
	        data: activityData,
	        
	        success: function (result) {
	        	if (result) { 
	        		updateItemToDiv(activityData);
	        	} else { //权限不足
	        		alert("权限不足")
	        	}
	        },
	        error: function (XMLHttpRequest, textStatus, errorThrown) {//输出错误信息
	            alert('配置失败，请稍后重试');
	        }
	    });
		
		
	} else { //添加
			$.ajax({
		    	type: "post",
		        url: "addActivity",
		        data: activityData,
		        
		        success: function (result) {
		        	if (result == 0) { //权限不足
		        		alert("权限不足")
		        	} else {
		        		activityData.id = result;
		        		addActivityItemToDiv(activityData);
		        	}
		        	
		        },
		        error: function (XMLHttpRequest, textStatus, errorThrown) {//输出错误信息
		            alert('添加失败，请稍后重试');
		        }
		    });
		
	}
	
}

function updateItemToDiv(activityData) {
	
	
	var activityId = activityData.id;
	$("#activityActivity"+activityId).text(activityData.activityName);
	$("#activityEvent"+activityId).text(activityData.envent);
	$("#activityProblem"+activityId).text(activityData.activityProblem);
	
}
function addActivityItemToDiv(activityData) {
	
	 var html = "<div class=\"itemdiv dialogdiv\" id=\"activity" + activityData.id + "\">" +
					"<div class=\"user\">" +
						 "<img alt=\"生产活动\" src=\"css/images/activity.png\">" +
					"</div>" +
				
					"<div class=\"body\">" +
						"<div class=\"name\">" +
							"<h5 style=\"color:#337ab7\"><strong>生产活动：</strong>" +
								"<span id=\"activityActivity" + activityData.id + "\">" + activityData.activityName + "</span>" +
							"</h5>" +
							
							"<h5 style=\"color:#337ab7\"><strong>生产事件：</strong>" +
							   "<span id=\"activityEvent" + activityData.id + "\">" + activityData.envent + "</span>" +
							"</h5>" +
							
							"<h5 style=\"color:#337ab7\"><strong>生产难题：</strong>" +
							   "<span id=\"activityProblem" + activityData.id + "\">"+ activityData.activityProblem + "</span>" +
							"</h5>" +
						"</div>" +
						 
					  " <div class=\"tools\" style=\"display:inline\">" +
						   	"<div class=\"inline position-relative\">" +
						   		"<button class=\"btn btn-minier bigger btn-info\" onclick=\"addOrUpdateActivity(" + activityData.id + ")\">" + 
						   			"<i class=\"fa fa-cog icon-only bigger-120\"></i> 重新配置" +
						   		"</button>" +
						   		
						   		"<button class=\"btn btn-minier bigger btn-danger\" onclick=\"deleteActivity(" + activityData.id + ")\">" + 
						   			"<i class=\"fa fa-times-circle icon-only bigger-120\"></i> 删除" +
						   		"</button>" +
						   	"</div>" +
					   "</div>" +
				 	 "</div>" +
			  "</div>";
	 
	 $("#targetProblemArea").append(html);
	 
}


function setPlaceholder() {
	var tag_input = $('#eventTags');
	//设置placeholder
    tag_input.tag(
    		{placeholder: tag_input.attr('placeholder') }
    )
    
    var tag_input1 = $('#problemTags');
	//设置placeholder
    tag_input1.tag(
    		 {placeholder: tag_input1.attr('placeholder') }
    )
    
    //programmatically add/remove a tag
   // var $tag_obj = $('#eventTags').data('tag');
    // $tag_obj.add('Programmatically Added');

    // var index = $tag_obj.inValues('some tag');
    // $tag_obj.remove(index);
	
}


function addTagToArea(AreaId,tags) {
	
	var tag_obj = $('#'+AreaId).data('tag');
	for (var i in tags) {
		tag_obj.add(tags[i]);
	}
	
}
