
function useuse() {
	
	var projectId = $("#globalProjectId").text();
	if (projectId == "") {
		$("#targetProblemsNotExist").css("display","inline");
		$("#targetProblemsExist").css("display","none");
		return;
	}
	
	//请求难题信息
	$.ajax({
    	type: "post",
        url: "getAllTargetProblems",
        data: {
        	"projectId": projectId,
        },
        success: function (result) {
        	
        	if (result.length > 0) {
        		$("#targetProblemsNotExist").css("display","none");
        		$("#targetProblemsExist").css("display","inline");
        		addItemToUseDiv(result);
        		
        		//请求难题属性与匹配到的创新方法信息
        		$.ajax({
        	    	type: "post",
        	        url: "getAllAttrAndMethod",
        	        data: {
        	        	"projectId": projectId,
        	        },
        	        success: function (result) {
        	        	
        	        	for (var i=0;i<result.length;i++) {
        	        		
        	        		var id = result[i].problemId;
        	        		if (result[i].pattr != "") {
        	        			$("#problemAttrs" + id).text(result[i].pattr);
        	        			$("#matchButton" + id).css("display","block");
        	        		} 
        	        		
        	        		if (result[i].methodName != "") {
        	        			$("#matchedMethodName"+id).text(result[i].methodName);
        	                	$("#matchedMethodName"+id).attr("href",result[i].methodURI);
        	                	$("#matchDegree"+id).text("  推荐度  "+ result[i].mRecommendValue.toFixed(2));
        	                	$("#matchedMethodDesc"+id).text(result[i].mdescriptoin);
        	                	$("#matchedMethodArea"+id).css("display","block");
        	        		}
        	        		
        	            	
        	        	}
        	        	
        	        },
        	        error: function (XMLHttpRequest, textStatus, errorThrown) {//输出错误信息
        	        	console.log("获取目标难题数据失败" + textStatus);
        	        }
        	    });
        		
        		
        	}
        	
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {//输出错误信息
        	console.log("获取目标难题数据失败" + textStatus);
        }
    });
	
}


function addItemToUseDiv(targrtProblem) {
	
	$("#use-panel-area").empty();
	//构造前台页面
	for (var i =0;i<targrtProblem.length;i++) {
		
		if (targrtProblem[i].ptype == "局部被动难题") {
			var divId = "use-panel-area";
			addLocalProblemItem(targrtProblem[i],divId,false);
		} else {
			
			addGlobalProblemItem(targrtProblem[i]);
		}
	}
}


function addGlobalProblemItem(problem) {
	
	var projectId = $("#globalProjectId").text();
	
	var isProblemConfgure = true;
	
	$.ajax({
    	type: "post",
        url: "getAllActivity",
        async: false, 
        data: {
        	"problemId":problem.id,
        	"projectId":projectId
        },
        
        success: function (result) {
        	if (result.length > 0) { 
        		//添加宏观主动难题
        		var html = "<div class=\"panel panel-default\">" +
								"<div class=\"panel-heading\">" +
								 "<a href=\"#faq-1-" + problem.id + "\" data-toggle=\"collapse\" class=\"accordion-toggle\" aria-expanded=\"true\">" +
									"<i class=\"pull-right ace-icon fa fa-chevron-down\" data-icon-hide=\"ace-icon fa fa-chevron-down\" data-icon-show=\"ace-icon fa fa-chevron-left\"></i>" +
							
									"<i class=\"fa fa-cubes\"></i>&nbsp" + problem.pdescriptoin +
										"<i style=\"margin-left:20px\" class=\"green\">已配置</i>" +
								"</a>" +
								
							"</div>" +
							
							"<div class=\"panel-collapse collapse in\" id=\"faq-1-" + problem.id + "\" aria-expanded=\"true\">" +
								"<div class=\"panel-body\">" +
									"<div id=\"faq-list-" +  problem.id + "\" class=\"panel-group accordion-style1 accordion-style2\">"
							
									"</div>" +
								"</div>" +
							"</div>" +
							"</div>";
				
				$("#use-panel-area").append(html);
        		
        		//添加规划的子难题
        		for (var i=0;i<result.length;i++) {
        			
        			var activityProblem =  result[i].activityProblem.split(",");
        			
        			for (var j=0;j<activityProblem.length;j++) {
        				
        				if (activityProblem[j].trim() != "") {
        					var targrtProblem = {
                    				"id": String("ChildP_" + result[i].problemId) + "_" + String(result[i].id) + "_" + j, //id = problemId_activityId_activityIndex
                    				"pdescriptoin": activityProblem[j],
                    			}
            				
            				var divId = "faq-list-" + problem.id;
                			addLocalProblemItem(targrtProblem,divId,false);
            			}
        			}
        		}

        	} else { //难题未配置
        		var divId = "use-panel-area";
        		addLocalProblemItem(problem,divId,true);
        	}
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {//输出错误信息
            console.log('获取activity失败'+textStatus);
        }
    });
	
	
}


function addLocalProblemItem(problem,divId,isGlobal) {
	//isGlobal 区别未配置的宏观主动难题和局部被动难题
	
	var ihtml = " ";
	if (isGlobal) {
		ihtml = "<i style=\"margin-left:20px\" class=\"red\">未配置</i>";
	}
	
	var html = "<div class=\"panel panel-default\">" +
					"<div class=\"panel-heading\">" +
						"<a href=\"#faq-1-" + problem.id + "\" data-toggle=\"collapse\" style=\"display:inline\" class=\"accordion-toggle\" aria-expanded=\"true\">" +
							"<i class=\"pull-right ace-icon fa fa-chevron-down\" data-icon-hide=\"ace-icon fa fa-chevron-down\" data-icon-show=\"ace-icon fa fa-chevron-left\"></i>" +
							"<i class=\"fa fa-anchor bigger-130\"></i>&nbsp" + problem.pdescriptoin +
						"</a>" +
						
						"<button class=\"btn btn-sm btn-white btn-danger\" style=\"display:inline\" onclick=\"setProblemAttr('" + problem.id + "','" + problem.pdescriptoin + "')\">设置属性</button>" +
					     String(ihtml) +
					"</div>" + 
					
					"<div class=\"panel-collapse collapse in\" id=\"faq-1-" + problem.id + "\" aria-expanded=\"true\">" +
						"<div class=\"panel-body\">" +
							"<div class=\"col-xs-5 col-sm-5\">" +
								"<span id=\"problemAttrs" + problem.id + "\" style=\"font-size:15px;color:blue\"> </span>" +
							"</div>" +
							"<div class=\"col-xs-2 col-sm-2\">" +
								"<a id=\"matchButton" + problem.id + "\" href=\"javascript:void(0)\" onclick=\"methodMatch('" + problem.id + "')\" style=\"font-size:18px;display:none\">匹配创新方法</a>" +
							"</div>" +
							"<div class=\"col-xs-5 col-sm-5\">" +
									"<div class=\"itemdiv dialogdiv\" style=\"display:none\" id=\"matchedMethodArea" + problem.id + "\">" +
										"<div class=\"body\" style=\"margin-left:-50px\">" +
											"<div class=\"name\">" +
												"<a  href=\"\" target=\"view_window\" style=\"color:#337ab7\" id=\"matchedMethodName" + problem.id + "\"></a>" +
												"<span id=\"matchDegree" + problem.id + "\"></span>" + 
											"</div>" +
											"<div class=\"text\">" +
												"<span id=\"matchedMethodDesc" + problem.id + "\"></span>" +
											"</div><br>" +
											"<button class=\"btn btn-mini bigger btn-danger\" onclick=\"manualSelectTemplateMethod('" + problem.id + "')\">" +
												"<i class=\"ace-icon fa fa-cogs  bigger-140\"></i> 选择模板创新方法" +
											"</button>&nbsp&nbsp" +
											
											"<button class=\"btn btn-mini bigger btn-danger\" onclick=\"manualSelectBasicMethod('" + problem.id + "')\">" +
												"<i class=\"ace-icon fa fa-cog  bigger-140\"></i> 选择基础创新方法" +
											"</button>" +
										"</div>" +
									"</div>" +
							"</div>" +
						"</div>" +
					"</div>" +
				"</div>";

	
	$("#"+divId).append(html);
	
}


function manualSelectTemplateMethod(pId) {
	$('#methodTable').bootstrapTable('removeAll');
	
	$.ajax({
		url:"/templates/api/refer?order=asc",
		method:"get",
		success : function(res) {
			if (res.code != "1") {
				alert("请求发生错误！code=" + res.code);
				return;
			}
			var data = res.data;
			for (var i=0;i<data.length;i++) {
				var rowdata= {
						problemId: pId,
						methodName: data[i].referName,
						methodDesc: data[i].description,
						methodType: "templet",
						URI:"/templates/project/problem.html?referID=" + data[i].referID + "&problemID=" + pId
				    };
				$('#methodTable').bootstrapTable('append', rowdata);
			}
		}
		
	});
	
	$("#selectMethod").modal("show");
	
}

function manualSelectBasicMethod(pId) {
	
	$('#methodTable').bootstrapTable('removeAll');
	$.ajax({
		url:"/InnovationAPPManageKits/AppManager",
		method:"get",
		success : function(res) {
			
			res = eval(res);
			
			for (var i=0;i<res.length;i++) {
				var rowdata= {
						problemId: pId,
						methodName: res[i].displayName,
						methodDesc: res[i].webAppDescription,
						methodType: "basic",
						URI:res[i].appPath
				    };
				$('#methodTable').bootstrapTable('append', rowdata);
			}
			
		}
		
	});
	$("#selectMethod").modal("show");
}

function manualSelectBasicMethodConfirm() {
	var selected = $('#methodTable').bootstrapTable('getSelections');
	if (selected.length > 1) {
		alert("只能选一个创新方法")
		return;
	}
	var id = selected[0].problemId;
	
	var projectId = $("#globalProjectId").text();
	
	$.ajax({
    	type: "post",
        url: "addMethod",
        data: {
        	"problemId":id,
        	"projectId":projectId,
        	"methodName":selected[0].methodName,
        	"mdescriptoin": selected[0].methodDesc,
        	"methodURI" : selected[0].URI
        },
        
        success: function (result) {
        	$("#matchedMethodName"+id).text(selected[0].methodName);
        	$("#matchDegree"+id).text("");
        	$("#matchedMethodName"+id).attr("href",selected[0].URI);
        	$("#matchedMethodDesc"+id).text(selected[0].methodDesc);
        	
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {//输出错误信息
        	 console.log('addAttr失败'+textStatus);
        }
    });
	
	
}


function setProblemAttr(id,name) {
	
	$("#confProblems").modal("show");
	$("#targetProblem2").text(name);
	$("#targetProblem2").val(id);
}




function confProblemsConfirm() {
	
	var selectedAttrs = $(".tree-selected").find(".tree-label");
	var attrStr = "";
	
	var preAttr = "";
	var obj = new Object();
	
	for (var i = 0 ;i < selectedAttrs.length;i++) {
		
		var tempAttr = $(selectedAttrs[i]).parents("ul").prev();
		var topAttr = tempAttr[tempAttr.length-1].innerText;
		
		if (preAttr == topAttr) {
			attrStr += "[" + selectedAttrs[i].innerText + "] ";
		} else {
			attrStr += topAttr + ": [" + selectedAttrs[i].innerText + "] ";
		}
		obj[topAttr] += selectedAttrs[i].innerText + ',';
		preAttr = topAttr;
	}
	
	var id = $("#targetProblem2").val();
	var problemName = $("#targetProblem2").text();
	var projectId = $("#globalProjectId").text();
	
	$.ajax({
    	type: "post",
        url: "addAttr",
        data: {
        	"problemId":id,
        	"projectId":projectId,
        	"pdescriptoin":problemName,
        	"pattr": attrStr
        },
        
        success: function (result) {
        	
        	$("#problemAttrs" + id).text(attrStr);
        	$("#problemAttrs" + id).val(JSON.stringify(obj));
        	
        	$("#matchButton" + id).css("display","block");
        	
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {//输出错误信息
        	 console.log('addAttr失败'+textStatus);
        }
    });
	
	
	
	
}

function methodMatch(id) {
	
	var attrstr = $("#problemAttrs"+id).val();
	
	if ($("#problemAttrs"+id).text().trim() == "") {
		alert("请先设置目标难题属性");
		return;
	}
	
	var problem = JSON.parse(attrstr);
	
	matchDegree = new Array();
	for (var i=0; i<innoMethod.length; i++) {
		var method = innoMethod[i];
		matchDegree[i] = getMatch(problem,method);
	}
	//归一化
	var max = 0;
	var min = 10;
	for (var i in matchDegree) {
		max = Math.max(max,matchDegree[i]);
		min = Math.min(min,matchDegree[i]);
	}
	for (var i in matchDegree) {
		matchDegree[i] /= (max+min);
	}
	
	
	var maxDegree = 0;
	var pIndex = 0;
	for (var i in matchDegree) {
		if (matchDegree[i] > maxDegree) {
			maxDegree = matchDegree[i];
			pIndex = i;
		}
	}
	
	var projectId = $("#globalProjectId").text();
	
	$.ajax({
    	type: "post",
        url: "addMethod",
        data: {
        	"problemId":id,
        	"projectId":projectId,
        	"methodName":innoMethod[pIndex].name,
        	"mdescriptoin": innoMethod[pIndex].descriptoin,
        	"mRecommendValue": matchDegree[pIndex],
        	"methodURI" : innoMethod[pIndex].URI + "&problemID=" + id
        },
        
        success: function (result) {
        	
        	$("#matchedMethodName"+id).text(innoMethod[pIndex].name);
        	$("#matchedMethodName"+id).attr("href",innoMethod[pIndex].URI + "&problemID=" + id);
        	$("#matchDegree"+id).text("  推荐度  "+ matchDegree[pIndex].toFixed(2));
        	$("#matchedMethodDesc"+id).text(innoMethod[pIndex].descriptoin);
        	$("#matchedMethodArea"+id).css("display","block");
        	
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {//输出错误信息
        	 console.log('addAttr失败'+textStatus);
        }
    });
	
	
	
}

function getMatch(problem,method) {
	
	var num1 = 0;
	for (var index in problem) {
		
		var p = problem[index].split(",");
		var m = new Array();
		
		if (index.trim() == "领域属性") {
			mfiled = method["filed"];
			for (var f in mfiled) {
				m = m.concat(mfiled[f]);
			}
		} else if (index.trim() == "产品生命周期"){
			m = method["lifecycle"];
		} else if (index.trim() == "生产组织过程") {
			m = method["organizational"];
		} else if (index.trim() == "生产批次") {
			m = method["batch"];
		} else if (index.trim() == "生产模式") {
			m = method["mode"];
		}
		
		var num2 = 0;
		for (var i in p) {
			for (var j in m) {
				if (index == "领域属性") {
					if (p[i].indexOf(m[j]) >=0) {
						num1 ++;
					}
				} else {
					if (p[i].indexOf(m[j]) >=0) {
						num2 ++;
					}
				}
			}
		}
		
		if (num2 > 0) {
			num1 = num1*0.912 + num2*0.873;
		}
	}
	
	return num1;
}


function backToConfigure() {
	
	$("#configure").addClass("active");
	$("#configuretab").parent().addClass("active");
	$("#useuse").removeClass("active")
	$("#useusetab").parent().removeClass("active");
}

$(function(){
	var sampleData = initiateDemoData();

	$('#tree1').ace_tree({
		dataSource: sampleData['dataSource1'],
		multiSelect: true,
		cacheItems: true,
		'open-icon' : 'ace-icon tree-minus',
		'close-icon' : 'ace-icon tree-plus',
		'itemSelect' : true,
		'folderSelect': false,
		'selected-icon' : 'ace-icon fa fa-check',
		'unselected-icon' : 'ace-icon fa fa-times',
		loadingHTML : '<div class="tree-loading"><i class="ace-icon fa fa-refresh fa-spin blue"></i></div>'
	});
	
	
	function initiateDemoData(){
		var tree_data = {
			'filed' : {text: '领域属性', type: 'folder'},
			'lifecycle' : {text: '产品生命周期', type: 'folder'},
			'organizational' : {text: '生产组织过程', type: 'folder'},
			'batch' : {text: '生产批次', type: 'folder'},
			'mode' : {text: '生产模式', type: 'folder'},
		}
		
		tree_data['filed']['additionalParameters'] = {
			'children' : {
				'quality' : {text: '质量难题', type: 'folder'},
				'design' : {text: '设计难题', type: 'folder'},
				'efficiency' : {text: '效率难题', type: 'folder'},
				'resources' : {text: '资源难题', type: 'folder'},
				'manager' : {text: '管理难题', type: 'folder'},
			}
		}
		tree_data['lifecycle']['additionalParameters'] = {
				'children' : {
					'design' : {text: '研发设计', type: 'item'},
					'manufacture' : {text: '制造', type: 'item'},
					'peration ' : {text: '运维', type: 'item'},
					'assemble ' : {text: '整机装配', type: 'item'},
				}
			}
		tree_data['filed']['additionalParameters']['children']['quality']['additionalParameters'] = {
				'children' : {
					'qualityPlan' : {text: '质量计划', type: 'item'},
					'qualityEnsure' : {text: '质量保证', type: 'item'},
					'qualityControl' : {text: '质量控制', type: 'item'},
				}
		}
		
		
		tree_data['filed']['additionalParameters']['children']['design']['additionalParameters'] = {
				'children' : {
					'functionDesign' : {text: '功能设计', type: 'item'},
					'productDesign' : {text: '产品设计', type: 'item'},
					'systemDesign' : {text: '系统设计', type: 'item'},
				}
		}
		
		tree_data['filed']['additionalParameters']['children']['efficiency']['additionalParameters'] = {
				'children' : {
					'fieldManagement' : {text: '现场管理', type: 'item'},
					'layout' : {text: '生产布局', type: 'item'},
					'logistics' : {text: '物流信息', type: 'item'},
					'waste' : {text: '生产浪费', type: 'item'},
				}
		}
		
		tree_data['filed']['additionalParameters']['children']['resources']['additionalParameters'] = {
				'children' : {
					'humanResource' : {text: '人力资源', type: 'item'},
					'deviceResource' : {text: '设备资源', type: 'item'},
					'techResource' : {text: '技术资源', type: 'item'},
					'materielResource' : {text: '物料资源', type: 'item'},
					'serviceRssource' : {text: '服务资源', type: 'item'},
				}
		}
		
		tree_data['filed']['additionalParameters']['children']['manager']['additionalParameters'] = {
				'children' : {
					'planManager' : {text: '计划管理', type: 'item'},
					'produceManager' : {text: '生产管理', type: 'item'},
					'materielManger' : {text: '物资管理', type: 'item'},
					'qualityManager' : {text: '质量管理', type: 'item'},
					'costmanger' : {text: '成本管理', type: 'item'},
				}
		}
		
		

		tree_data['organizational']['additionalParameters'] = {
			'children' : {
				'apartments-rentals' : {text: '离散生产', type: 'item'},
				'office-space-rentals' : {text: '流程生产', type: 'item'},
				'vacation-rentals' : {text: '混合生产', type: 'item'}
			}
		}
		tree_data['batch']['additionalParameters'] = {
			'children' : {
				'apartments' : {text: '大批量生产', type: 'item'},
				'villas' : {text: '小批量生产', type: 'item'},
				'plots' : {text: '单件生产', type: 'item'}
			}
		}
		tree_data['mode']['additionalParameters'] = {
			'children' : {
				'cats' : {text: '自制生产', type: 'item'},
				'dogs' : {text: '外购生产', type: 'item'},
				'horses' : {text: '外协生产', type: 'item'},
			}
		}

		var dataSource1 = function(options, callback){
			var $data = null
			if (!("text" in options) && !("type" in options)){
				$data = tree_data;//the root tree
				callback({ data: $data });
				return;
			} else if("type" in options && options.type == "folder") {
				if("additionalParameters" in options && "children" in options.additionalParameters)
					$data = options.additionalParameters.children || {};
				else $data = {}//no data
			}
			
			if ($data != null) //this setTimeout is only for mimicking some random delay
				setTimeout(function(){callback({ data: $data });} , parseInt(Math.random() * 200) + 100);
		}
		
		return {'dataSource1': dataSource1}
	}

	});



