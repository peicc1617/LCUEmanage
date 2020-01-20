
$(function() {
        
     $("span.editable").editable({
    		 type: "text",                //编辑框的类型。支持text|textarea|select|date|checklist等
             title: "输入变量",              //编辑框的标题
             disabled: false,             //是否禁用编辑
             validate: function (value) { //字段验证
                 if (!$.trim(value)) {
                     return '不能为空';
                 }
             }
     });
       
});

$("#typeOfEnterprise").change(function(){
		
	    var opt=$("#typeOfEnterprise").val();
	    
	    if (opt == "designType") {
	    	
	    	$("#typeIsDesignType").css("display","inline");
	    	$("#typeIsProduceType").css("display","none");
	    	$("#typeIsServerType").css("display","none");
	    	
	    } else if (opt == "produceType") {
	    	
	    	$("#typeIsDesignType").css("display","none");
	    	$("#typeIsProduceType").css("display","inline");
	    	$("#typeIsServerType").css("display","none");
	    	
	    } else {
	    	
	    	$("#typeIsDesignType").css("display","none");
	    	$("#typeIsProduceType").css("display","none");
	    	$("#typeIsServerType").css("display","inline");
	    }
	    
	});
	


function analysis() {
	
	//加载数据
	var projectId =  $("#globalProjectId").text();
	
	if (projectId=="") {
		return;
	}
	
	$.ajax({
    	type: "post",
        url: "getAllAnalysisValues",
        data: {
        	"projectId": projectId,
        },
        success: function (result) {
        	addToanalysisItemBody(result);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {//输出错误信息
        	console.log("获取数据失败" + textStatus);
        }
    });
	
	
}



function selfDefineAnalysisItem() {
	
	 $("#selfDefineAnalysisItem").modal("show");
	
	 $("#inputs").empty();
	 
	 var opt = $("#typeOfEnterprise").val();
 	 var items = $("#typeIsDesignType").find("span.input-group-addon");
 	
		if (opt == "produceType") {
			 items = $("#typeIsProduceType").find("span.input-group-addon");
		}
		if (opt == "serverType") {
			 items = $("#typeIsServerType").find("span.input-group-addon");
		}
		
		for (var i=0;i<items.length;i++) {
			 var item = items[i].innerHTML;
			 addInputElement(item);
		 }
	
}

function addInputElement(title) {
	
	var num = $("#inputs").children().length + 1;
	if (!title) {
		title = "指标" + num;
	}
	
	var html = "<li class=\"item-blue clearfix ui-sortable-handle\" style=\"position: relative; opacity: 1; left: 0px; top: 0px; z-index: auto;\">" +
					"<label class=\"inline\"> " +
						"<span class=\"editable editable-click editable-open\">"+ title + "</span>" +
						"</label>" +
					"<div class=\"pull-right action-buttons\">" +
						"<a href=\"#\" class=\"red\" onclick=\"deleteElement(this)\">" +
						"<i class=\"ace-icon fa fa-trash-o bigger-130\">" +
						"</i></a><span class=\"vbar\">" + "</span>" +
					"</div>" +
				"</li>";
	$("#inputs").append(html);
	
	$("span.editable").editable({
		 type: "text",                //编辑框的类型。支持text|textarea|select|date|checklist等
         title: "输入变量",              //编辑框的标题
         disabled: false,             //是否禁用编辑
         validate: function (value) { //字段验证
             if (!$.trim(value)) {
                 return '不能为空';
             }
      }
 });
	
}

function deleteElement(e) {
	$(e).parents("li")[0].remove();
}


function selfDefineAnalysisSandW() {
	
	 var opt = $("#typeOfEnterprise").val();
	 var projectId =  $("#globalProjectId").text();
	 
	 if (projectId == "") {
		 alert("请先创建工程");
		 return;
	 }
	 
	 
	 $("#selfDefineAnalysisWandS").modal("show");
		
	 $("#analysisItemBody").empty();
	//先请求后台数据，如果后台没有已配置数据，加载默认数据
		
	 
	 
	 $.ajax({
	    	type: "post",
	        url: "getAllAnalysisWandS",
	        data: {
	        	"projectId": projectId,
	        	"type":opt,
	        },
	        success: function (result) {
	        	
	        	var res = getWeightAndStandard("designType");
	        	var items = $("#typeIsDesignType").find("span.input-group-addon");
	        	
        		if (opt == "produceType") {
        			 res = getWeightAndStandard("produceType");
        			 items = $("#typeIsProduceType").find("span.input-group-addon");
        		}
        		if (opt == "serverType") {
        			 res = getWeightAndStandard("serverType"); 
        			 items = $("#typeIsServerType").find("span.input-group-addon");
        		}
	    		var weight = res.w;
	    		var standard = res.s;
	        	
	    		//如果后台有数据，使用后台数据
	        	if (result.weight.length > 0) {
	        		 weight = result.weight;
	        		 standard = result.standard;
	        	} 
	        	
		       	 for (var i=0;i<items.length;i++) {
		       		 var item = items[i].innerHTML;
		       		 var ww = weight[i];
		       		 var ss = standard[i];
		       		 addItemAndCof2Model(item,ww,ss);
		       	 }
	        	
	        
	        },
	        error: function (XMLHttpRequest, textStatus, errorThrown) {//输出错误信息
	        	console.log("获取数据失败" + textStatus);
	        }
	    });
	 
	
}


function analysisItemConfirm() {
	
	var opt = $("#typeOfEnterprise").val();
	var inputs = $("#inputs").find("span.editable");
	var id = "#typeIsDesignTypeItem";
	
	if (opt == "produceType") {
		 id = "#typeIsProduceTypeItem";
	}
	if (opt == "serverType") {
		 items = "#typeIsServerTypeItem";
	}
	
	$(id).empty();
	
	
	for (var i=0;i<inputs.length;i++) {
		var titleName = inputs[i].innerHTML;
		addAnalysisItem(i,id,titleName);
	}
}

function addAnalysisItem(i,id,titleName,value) {
	
	if(! value) {
		value = "";
	}
	
	var html = "<div class=\"col-lg-5\">\r\n" + 
		"															<div class=\"input-group\">\r\n" + 
		"																<span class=\"input-group-addon\">"+ titleName +"</span> <input type=\"text\"\r\n" + 
		"																	class=\"form-control\" id=\"design2\" value=\""+ value +"\" aria-label=\"...\">\r\n" + 
		"															</div>\r\n" + 
		"														</div>";
	var html0 = "<div class=\"col-lg-1\"></div>";
	
	if (i % 2==0) {
		$(id).append(html0);
		$(id).append(html);
	} else {
		$(id).append(html);
		$(id).append("<br><br>");
	}
	
	
}


//保存配置数据到数据库

function weightAndStandardConfirm() {
	
	var items = $("#analysisItemBody").find("h5");
	var weights = $("#analysisItemBody").find("input.ww");
	var standard = $("#analysisItemBody").find("input.ss");
	
	var analysisItems = new Array();
	for (var i=0;i<items.length;i++) {
		var item = items[i].innerHTML;
		var w = weights[i].value;
		var s = standard[i].value;
		if (checkNumber(w) && checkNumber(s.split("-")[0]) && checkNumber(s.split("-")[1])) {
			
			var obj = {
					itemName: item,
					weightValue: w,
					standardValue: s
			}
			analysisItems.push(obj);
			
		} else {
			return;
		}
		
	}
	
	var projectId =  $("#globalProjectId").text();
	var type = $("#typeOfEnterprise").val();
	
	$.ajax({
    	type: "post",
        url: "addAnalysisItems",
        data: {
        	"projectId": projectId,
        	"type":type,
        	"analysisItems": JSON.stringify(analysisItems)
        },
        success: function (status) {
        	if (status=="NotPermit") {
        		alert('权限不足');
        	}
        	
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {//输出错误信息
            alert('数据保存失败，请稍后重试');
        }
    });
	
	$("#selfDefineAnalysisWandS").modal("hide");
	
}


function calculatePerformance() {
	
	 var opt = $("#typeOfEnterprise").val();
	 
	 var values = $("#typeIsDesignType").find("input.form-control");
	 var items = $("#typeIsDesignType").find("span.input-group-addon"); 
	 
	 if (opt == "produceType") {
		 values = $("#typeIsProduceType").find("input.form-control");
		 items = $("#typeIsProduceType").find("span.input-group-addon"); 
	 }
	 if (opt == "serverType") {
		 values = $("#typeIsServerType").find("input.form-control");
		 items = $("#typeIsServerType").find("span.input-group-addon"); 
	 }
	 
	 var projectId =  $("#globalProjectId").text();
	 
	 if (projectId == "") {
		 alert("请先创建工程");
		 return;
	 }
	 
	
	 var analysisItems = new Array();
		for (var i=0;i<items.length;i++) {
			var item = items[i].innerHTML;
			var v = values[i].value;
			
			if (checkNumber(v)) {
				var obj = {
						itemName: item,
						value: v
				}
				analysisItems.push(obj);
			} else {
				return;
			}
			
		}
	 
	
	var performance = 0;	
	//读取配置的权重信息
	
	 var projectId =  $("#globalProjectId").text();
	 var type = $("#typeOfEnterprise").val();
	 
	 $.ajax({
	    	type: "post",
	        url: "checkConfig",
	        data: {
	        	"projectId": projectId,
	        	"type": type
	        },
	        success: function (res) {
	        	
	        	var weights = getWeightAndStandard(type).w;
        		var standards = getWeightAndStandard(type).s;
        		var isPos = getWeightAndStandard(type).f;
        		
        		
	        	if (res.weight.length > 0) { //没有配置权重和系数，使用默认的
	        		weights = res.weight;
	        		standards = res.standard;
	        	} 
	        	performance = docalculate(values,weights,standards,isPos).toFixed(4);
	        	
	        	$("#performanceArea").css("display","inline");
	        	$("#performanceValue").text(performance);
	        	showStar(performance);
	        	
	        	//保存数据
		       	 $.ajax({
		       	    	type: "post",
		       	        url: "addAnalysisValues",
		       	        data: {
		       	        	"projectId": projectId,
		       	        	"type": type,
		       	        	"analysisValues": JSON.stringify(analysisItems),
		       	        	"performance": performance
		       	        },
		       	        success: function (status) {
		       	        	if (status=="NotPermit") {
		       	        		alert('权限不足');
		       	        	}
		       	        	
		       	        },
		       	        error: function (XMLHttpRequest, textStatus, errorThrown) {//输出错误信息
		       	            alert('数据保存失败，请稍后重试');
		       	        }
		       	    });
		        	
		        },
	        error: function (XMLHttpRequest, textStatus, errorThrown) {//输出错误信息
	            alert('获取后台数据失败，请稍后重试');
	        }
	    });
	
	
}


function docalculate(values,weights,standards,isPos) {
	
	 if (values.length < 1) {
		 return 0;
	 }
	 
	 var sum = 0;
	 for (var i=0;i<values.length;i++) {
		 var v = parseFloat(values[i].value);
		 var w = parseFloat(weights[i]);
		 var s1 = parseFloat(standards[i].split("-")[0]);
		 var s2 = parseFloat(standards[i].split("-")[1]);
		 var f = isPos[i];
		 
		 if (f) {
			 var sv = v;
			 if (v >= s2) {
				 sv = 1;
			 } else if (v <= s1) {
				 sv = 0;
			 } else {
				 sv = (v-s1)/(s2-s1); 
			 }
			 sum = sum + sv * w;
		 } else {
			 var sv = v;
			 if (v >= s2) {
				 sv = 0;
			 } else if (v <= s1) {
				 sv = 1;
			 } else {
				 sv = (s2-v)/(s2-s1); 
			 }
			 sum = sum + sv * w;
		 }
	 }
	
	 return sum;
	
}


function addToanalysisItemBody(res) {
	
	if (res.type.length < 1) {
		return;
	}
	
	var type = res.type[0];
	var id = "";
	var performance = res.performance[0];
	
	$("#typeOfEnterprise").val(type);
	
	var typeName = type;
	if (type == "designType") {
		id = "#typeIsDesignTypeItem";
		typeName = "typeIsDesignType";
    	$("#typeIsDesignType").css("display","inline");
    	$("#typeIsProduceType").css("display","none");
    	$("#typeIsServerType").css("display","none");
    } else if (type == "produceType") {
    	id = "#typeIsProduceTypeItem";
    	typeName = "typeIsProduceType";
    	$("#typeIsDesignType").css("display","none");
    	$("#typeIsProduceType").css("display","inline");
    	$("#typeIsServerType").css("display","none");
    } else {
    	id = "#typeIsServerTypeItem";
    	typeName = "typeIsServerType";
    	$("#typeIsDesignType").css("display","none");
    	$("#typeIsProduceType").css("display","none");
    	$("#typeIsServerType").css("display","inline");
    }
	
	$(id).empty();
	
	for (var i=0;i<res.item.length;i++) {
		var titleName = res.item[i];
		addAnalysisItem(i,id,titleName,res.value[i]);
	}
	
	/*var values = $("#"+typeName).find("input.form-control");
	for (var i=0;i<res.value.length;i++) {
		$(values[i]).val(res.value[i]);
	}*/
	
	$("#performanceArea").css("display","inline");
	$("#performanceValue").text(performance);
	showStar(performance);
}

//定义默认的权重和标准值，权重由ANP计算得来

function getWeightAndStandard(type) {

	//默认设计类
	 var weight = [0.025,0.021,0.019,0.015,0.023,0.016,0.027,0.033,0.026,0.034,0.025,0.031,0.012,0.015,0.033,0.027,0.314,0.292];
	 var standard = ["1-10","1-10","1-10","1-10","1-5","10-60","1-20","1-20","1-30","10-90","1-5","1-6","1-7","1-50","0.1-0.9","1-30","10-20","1-20"];
	 //是否是正向指标
	 var ispos = [true,true,true,true,true,false,true,true,true,false,false,true,true,true,true,true,true,false];
	
   	if (type == "produceType") {
   		weight = [0.056,0.052,0.050,0.047,0.020,0.016,0.017,0.023,0.016,0.038,0.035,0.031,0.012,0.015,0.013,0.025,0.226,0.298];
   		standard = ["0-1","0-0.8","0-0.3","10-500","1-5","10-90","1-15","1-15","1-10","1-10","1-8","1-6","1-7","1-50","0.1-0.9","1-30","10-20","1-20"];
   	    ispos = [true,false,false,true,true,false,true,true,true,false,false,false,true,true,true,true,true,false];

   	}
   	
 	if (type == "serverType") {
   		weight = [0.046,0.042,0.045,0.047,0.034,0.021,0.017,0.023,0.016,0.028,0.031,0.041,0.012,0.015,0.015,0.025,0.236,0.296];
   		standard = ["0-1","0-1","0-1","10-500","1-5","10-90","1-15","1-15","1-10","0-1","1-10","1-60","1-7","1-50","0.1-0.9","1-30","10-20","1-20"];
   	    ispos = [false,true,true,true,true,false,true,true,true,true,false,false,true,true,true,true,true,false];

 	}
	
 	var res = {
 			w:weight,
 			s:standard,
 			f:ispos
 	}
 	return res;
}




function addItemAndCof2Model(item,ww,ss) {
	
	var html = "<div class=\"row\">" +
							"<div class=\"col-sm-3 col-xs-3\">" +
								"<h5>"+ item + "</h5>" +
							"</div>" +
							"<div class=\"col-sm-9 col-xs-9\">" +
								"<input type=\"text\" class=\"ss\" value="+ ss + ">" +
								"<input type=\"text\" class=\"ww\" value="+ ww + ">" +
							"</div>" +
					"</div>";
	
	$("#analysisItemBody").append(html);
}


function showStar(performance) {
	
	var num = parseFloat(performance);
	if (num > 0.2) {
		$("#star2").removeClass("star-off-png");
		$("#star2").addClass("star-on-png");
	}
	if (num > 0.4) {
		$("#star3").removeClass("star-off-png");
		$("#star3").addClass("star-on-png");
	}
	if (num > 0.6) {
		$("#star4").removeClass("star-off-png");
		$("#star4").addClass("star-on-png");
	}
	if (num > 0.8) {
		$("#star5").removeClass("star-off-png");
		$("#star5").addClass("star-on-png");
	}

	
}


function checkNumber(checkItem) {
	if (checkItem=="0") {
		return true;
	}
	
	if ((! Number(checkItem)) || checkItem.trim() == "") {
		alert('输入内容必须为数字，请检查');
		return false;
	} 
	
	return true;
}


