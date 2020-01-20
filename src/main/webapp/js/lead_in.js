function addProblem() {
	
	if($('#globalProjectName').text().trim() == "") {
		alert("请新建工程，然后添加难题");
		return;
	}
	
	$("#addProblem").modal("show");
	$("#problemBtn").unbind("click");
	$("#problemBtn").click(addItem);
	
	$("#problemBtn").css("display","inline");
	
	
}


function addItem(event) {
//	alert(event.data.index );
	
	if (checkInput()) {
		
		var typeValue = "宏观主动难题";
		var scopeValue = "车间局部";
		
		if ($('input[name="optionsRadios1"]:checked').val() == 2) {
			typeValue = "局部被动难题";
		}
		
		if ($('input[name="optionsRadios2"]:checked').val() == 2) {
			scopeValue = "单车间";
		}
		if ($('input[name="optionsRadios2"]:checked').val() == 3) {
			scopeValue = "多车间";
		}
		if ($('input[name="optionsRadios2"]:checked').val() == 4) {
			scopeValue = "企业层面";
		}
		
		var datanum = $('#problemsTable').bootstrapTable('getData').length;

		var rowdata= {
				projectName: $('#globalProjectName').text(),
				projectId: $("#globalProjectId").text(),
		
				pdescriptoin: $("#pdescriptoin").val(),
				ptype: typeValue,
				pscope: scopeValue,
				pcost: $("#pcost").val(),
				ppeople: $("#ppeople1").val() + "-" +$("#ppeople2").val(),
				pperid: $("#pperid").val(),
				prush: $("#rushValue").text(),
				prushVal:$("#rushValue").val(),
				pcomment: $("#comment").val() 
		    };
		
		if (rowdata.prushVal == "") {
			rowdata.prushVal = 1;
		}
		
		if (event.data != null) {
			
			rowdata["id"] = $('#problemsTable').bootstrapTable('getData')[event.data].id;
			
			$.ajax({
	        	type: "post",
	            url: "editProblem",
	            data: rowdata,
	            success: function (status) {
	            	if (status) {
	            		$('#problemsTable').bootstrapTable('updateRow',{index: event.data, row: rowdata});
	            	} else {
	            		alert('权限不足');
	            	}
	            },
	            error: function (XMLHttpRequest, textStatus, errorThrown) {//输出错误信息
	                alert('编辑失败，请稍后重试');
	            }
	        });
			
			
			
		} else {
			
			$.ajax({
	        	type: "post",
	            url: "addProblem",
	            data: rowdata,
	            success: function (result) {
	            	rowdata["id"] = result.currentId;
	            	rowdata["creatorName"] = result.creatorName;
	            	$('#problemsTable').bootstrapTable('append', rowdata);
	            },
	            error: function (XMLHttpRequest, textStatus, errorThrown) {//输出错误信息
	                alert('添加失败，请稍后重试');
	            }
	        });
			
			
		}
		
	
	}
	
}


function actionFormatter(value, row, index) {
    return [
        '<a class="edit ml10" href="javascript:void(0)" title="Edit">',
        '<i class="glyphicon glyphicon-edit"></i> 编辑',
        '</a>'
    ].join('');
}

window.actionEvents = {
    'click .edit': function (e, value, row, index) {
    	$('#addProblem').modal('show');
    	$("#problemBtn").css("display","inline");
    	
    	if (row.ptype == "宏观主动难题") {
    		$('input[name="optionsRadios1"]')[0].checked = true;
    	} else {
    		$('input[name="optionsRadios1"]')[1].checked = true;
    	}
    	
    	if (row.pscope == "车间局部") {
    		$('input[name="optionsRadios2"]')[0].checked = true;
    	} else if (row.pscope == "单车间"){
    		$('input[name="optionsRadios2"]')[1].checked = true;
    	} else if (row.pscope == "多车间"){
    		$('input[name="optionsRadios2"]')[2].checked = true;
    	} else if (row.pscope == "企业层面"){
    		$('input[name="optionsRadios2"]')[3].checked = true;
    	}
    	
    	$("#pdescriptoin").val(row.pdescriptoin);
    	$("#pcost").val(row.pcost);
    	
    	var ppeople = row.ppeople;
    	$("#ppeople1").val(ppeople.split("-")[0]);
    	$("#ppeople2").val(ppeople.split("-")[1]);
    	
    	$("#pperid").val(row.pperid);
    	$("#rushValue").text(row.prush);
    	
    	var valStr = row.prushVal + "% 100%";
    	$('#range_speed').css({
    		  "background-size": valStr
    		})
    	$('#range_speed').val(row.prushVal);
    	
    	$("#comment").val(row.pcomment); //不可见，不能改
    	
    	updateindex = index;
    	$("#problemBtn").unbind("click");
    	$("#problemBtn").click(index,addItem);
     }
 };


function deleteProblem() {
	
	//遍历数组中的每个元素，并按照return中的计算方式 形成一个新的元素，放入返回的数组中
	var ids = $.map($('#problemsTable').bootstrapTable('getSelections'), function (row) {
        return row.id;
    });
	
	
	$.ajax({
    	type: "post",
        url: "deleteProblem",
        data: {"ids":ids},
        success: function (toDelete) {
        	
        	$('#problemsTable').bootstrapTable('remove', {field: 'id', values: toDelete});
        	
        	if (toDelete.length < ids.length) {
        		alert('权限不足，部分难题无法删除');
        	}
        	
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {//输出错误信息
            alert('删除失败，请稍后重试');
        }
    });
	

}



function checkInput() {
	
	if ($("#pdescriptoin").val().trim()=="") {
		alert('难题描述不能为空');
		return false;
	} 
	
	if (! Number($("#pcost").val())) {
		alert('经济损失必须为数字');
		return false;
	} 
	
	if (! Number.isInteger(parseFloat($("#ppeople1").val())) || ! Number.isInteger(parseFloat($("#ppeople2").val()))) {
		alert('经济损失必须为整数');
		return false;
	} 
	
	if (! Number($("#pcost").val())) {
		alert('经济损失必须为数字');
		return false;
	} 
	
	return true;
}







//加载难题列表
function getAllProblems(projectId) {
	
	
	$.ajax({
    	type: "post",
        url: "getAllProblem",
        data: {
        	"projectId":projectId
        },
        
        success: function (result) {
        	
        	$('#problemsTable').bootstrapTable('removeAll');
        	
        	if (result.length > 0) {
        		for (var i=0;i<result.length;i++) {
        			$('#problemsTable').bootstrapTable('append', result[i]);
        		}
        	}
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {//输出错误信息
            alert('读取难题失败，请稍后重试');
        }
    });
	
	
}


//进度条函数
function changeSpeed() {
	var value = $('#range_speed').val();
	var valStr = value + "% 100%";
	
	$('#range_speed').css({
	  "background-size": valStr
	})
	var str = ["很低","低","一般","高","很高"];
	var inputvar = str[parseInt(value/20)];
	$('#rushValue').val(value);
	$('#rushValue').html(inputvar);
	//$("input[name='animat_speed']").val(inputvar);
};