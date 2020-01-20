<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>LCUE管理</title>
</head>

	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="description" content="overview &amp; stats" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta charset="UTF-8">

	<!--前台css和js-->
	  <link rel="stylesheet" href="../webresources/ace-master/assets/css/bootstrap.min.css"/>
	  <link rel="stylesheet" href="../webresources/ace-master/assets/css/ace.min.css"/>
	  <link rel="stylesheet" href="../webresources/ace-master/assets/font-awesome/4.5.0/css/font-awesome.min.css"/>
	  <link rel="stylesheet" href="../webresources/ace-master/assets/css/ace-rtl.min.css"/>
	  <link rel="stylesheet" href="../webresources/ace-master/assets/css/ace-skins.min.css"/>
	  <link rel="stylesheet" href="../webresources/common/css/searchStyle.css"/>
	  
	  
	 <link rel="stylesheet" href="../webresources/ace-master/assets/css/bootstrap-editable.min.css">
	  <link rel="stylesheet" href="../webresources/bootstrap/bootstrap-table/bootstrap-table.css">
	
	
	
	  <script type="text/javascript" src="../webresources/ace-master/assets/js/ace-extra.min.js"></script>
	  <script type="text/javascript" src="../webresources/ace-master/assets/js/jquery-2.1.4.min.js"></script>
	  <script type="text/javascript" src="../webresources/ace-master/assets/js/ace.min.js"></script>
	  <script type="text/javascript" src="../webresources/ace-master/assets/js/bootstrap.min.js"></script>
	  
	  <!--监控-->
	  <script type="text/javascript" src="../webresources/ace-master/assets/js/wizard.min.js"></script>
	  <script type="text/javascript" src="../webresources/ace-master/assets/js/select2.min.js"></script>
	  
	  
	  <script type="text/javascript" src="../webresources/ace-master/assets/js/jquery.dataTables.min.js"></script>
	  <script type="text/javascript" src="../webresources/ace-master/assets/js/jquery.dataTables.bootstrap.min.js"></script>
	  <script type="text/javascript" src="../webresources/ace-master/assets/js/jquery-ui.custom.min.js"></script>
	  <script type="text/javascript" src="../webresources/ace-master/assets/js/jquery.ui.touch-punch.min.js"></script>
	  <script type="text/javascript" src="../webresources/ace-master/assets/js/ace-elements.min.js"></script>
	  <script type="text/javascript" src="../webresources/ace-master/assets/js/jquery.mobile.custom.min.js"></script>

	 <script type="text/javascript"  src="../webresources/ace-master/assets/js/bootstrap-editable.min.js"></script>
	

<body class="no-skin">
	<!--嵌入导航栏-->
	<div class="navbar navbar-default" id="navbar">
		 
	</div>
	
	
<div class="main-container ace-save-state" id="main-container">
		<!-- 侧边栏 -->
		



		<!-- 模态框 -->
		<%@include file ="navList.jsp"%> 
		
		
		<div class="main-content">
			<!--面包屑-->
			<div class="breadcrumbs ace-save-state" id="breadcrumbsHtml">
				<ul class="breadcrumb">
					<li>
						<i class="ace-icon fa fa-home home-icon"></i>
						<a href="#">创新方法工具平台</a>
					</li>
					<li class="active showAppNameDiv">LCUE管理</li>
					<li class="active" id="globalProjectName" ></li>
					<li  id="globalProjectId"  style="display:none"></li>
				</ul>
				
				<a onclick="monitorProject()">
					<i class="ace-icon fa fa-tasks bigger-120 icon-only" style="float:right;right: 20px;margin-top: 15px;margin-right: 15px;"> 项目监控</i>
				 </a>
				 
				 
			</div>
			<!-- 项目管理 -->
			<div class="tab-content" style="border: 0;margin: auto;">
				<div class="tab-pane" id="projectManagementDiv">
					<div class="col-xs-12">
						<div class="table-header">项目管理</div>
						<div>
							<table id="dynamic-table" class="table table-striped table-bordered table-hover display" cellspacing="0" width="100%">
								<thead>
									<tr>
										<th id="projectName">项目名</th>
										<th id="id">编号</th>
										<th id="createDate">创建时间</th>
										<th id="editTime">最近修改时间</th>
										<th id="memo">备注</th>
										<th>操作</th>
									</tr>
								</thead>
							</table>
						</div>
					</div>
				</div>
			</div>
			
			
		<!-- main界面 -->
		<%@include file ="main.jsp"%> 
			
			
		
		</div>
		<!--页面底部-->
		<div class="footer">
			<div class="footer-inner">
				<div class="footer-content" style="left: 2px;right: 2px;padding: 0px;">
					<ul>
						<span class="bigger-120">
							<span class="blue bolder">
								<a href="http://cadcam.xjtu.edu.cn/">西安交通大学CAD/CAM研究室 </a>
							</span>
						</span>
						<span>Copyright&copy; 2018</span>
					</ul>
				</div>
			</div>
		</div>
	</div>
	


<div id="modalFrameHtml">
		<!--新建模态框-->
		<div class="modal fade" id="newProjectModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title" id="newProjectModalTitle">
							新建项目
						</h4>
					</div>
					<div class="modal-body">
						<!-- <%--输入框组--%> -->
						<div class="input-group">
							<span class="input-group-addon">项目名：</span>
							<input type="text" class="form-control" placeholder="请输入项目名称" id="projectNameModal">
						</div>
						<br>
						<div class="input-group">
							<span class="input-group-addon">备 注：</span>
							<input type="text" class="form-control" placeholder="请输入备注" id="projectRemarkModal">
						</div>
						<br>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭
						</button>
						<button type="button" class="btn btn-primary" id="addProButton" onclick="addProject()">
							确认
						</button>
					</div>
				</div>
			</div>
		</div>
		
		<!--基本信息模态框-->
		<div class="modal fade" id="basicInfo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog"> 
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title" id="newProjectModalTitle">
							项目信息
						</h4>
					</div>
					<div class="modal-body">
						<div class="profile-user-info profile-user-info-striped">
							<div class="profile-info-row">
								<div class="profile-info-name"> 项目名： </div>

								<div class="profile-info-value">
									<span>
										<span class="block input-icon input-icon-right">
											<input type="text" id="modifyProjectNameModal" class="width-100">
										</span>
									</span>
								</div>
							</div>

							<div class="profile-info-row">
								<div class="profile-info-name"> 备 注： </div>

								<div class="profile-info-value">
									<span>
										<span class="block input-icon input-icon-right">
											<input type="text" id="modifyRemarkModal" class="width-100">
										</span>
									</span>
								</div>
							</div>

							<div class="profile-info-row">
								<div class="profile-info-name"> 创建时间： </div>
								<div class="profile-info-value">
									<span id="createTimeModal"></span>
								</div>
							</div>

							<div class="profile-info-row">
								<div class="profile-info-name">最近修改时间： </div>
								<div class="profile-info-value">
									<span id="editTimeModal"></span>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭
						</button>
						<button type="button" class="btn btn-primary" data-dismiss="modal" onclick="modifyData()">确认
						</button>
					</div>
				</div>
			</div>
		</div>
	
	</div>

 
 
<!-- 模态框 -->
<%@include file ="model.jsp"%> 
			
<%@include file ="monitor.jsp"%> 			 
 	
<!--  支持bootstrap-table的js、css -->
	
	<script type="text/javascript" src="../webresources/ace-master/assets/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="../webresources/bootstrap/bootstrap-table/bootstrap-table.js"></script>
	<script type="text/javascript" src="../webresources/bootstrap/bootstrap-table/locale/bootstrap-table-zh-CN.js"></script>
	<script type="text/javascript" src="../webresources/ace-master/assets/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="../webresources/ace-master/assets/js/jquery.dataTables.bootstrap.min.js"></script>
	<script type="text/javascript"  src="../webresources/ace-master/assets/js/ace-elements.min.js"></script>
	<script type="text/javascript"  src="../webresources/ace-master/assets/js/bootstrap-editable.min.js"></script>
	
	<script type="text/javascript" src="../webresources/ace-master/assets/js/bootstrap-tag.min.js"></script>
	
	
			
	<script src="../webresources/ace-master/assets/js/tree.min.js"></script>
	<script src="../webresources/ace-master/assets/js/ace-extra.min.js"></script>
	
	  	
	<script src="./js/index.js"></script>  	
	<script src="./js/lead_in.js"></script>
	<script src="./js/userInfo.js"></script>
	<script src="./js/topsisAlgorithm.js"></script>
	<script src="./js/configure.js"></script>
	<script src="./js/use.js"></script>
	<script src="./js/analysis.js"></script>
	
	<script src="./js/monitor.js"></script>
	
	
	<script src="./js/localData.js"></script>

	<script type="text/javascript" src="../webresources/common/js/nav-bar.js"></script>
	
	
	
	
	<script type="text/javascript">
			jQuery(function($) {
			
				$('[data-rel=tooltip]').tooltip();
			
				$('.select2').css('width','200px').select2({allowClear:true})
				.on('change', function(){
					$(this).closest('form').validate().element($(this));
				}); 
			
			
				var $validation = false;
				$('#fuelux-wizard-container')
				.ace_wizard({
					//step: 2 //optional argument. wizard will jump to step "2" at first
					//buttons: '.wizard-actions:eq(0)'
				})
				.on('actionclicked.fu.wizard' , function(e, info){
					if(info.step == 1 && $validation) {
						if(!$('#validation-form').valid()) e.preventDefault();
					}
				})
				//.on('changed.fu.wizard', function() {
				//})
				.on('finished.fu.wizard', function(e) {
					bootbox.dialog({
						message: "Thank you! Your information was successfully saved!", 
						buttons: {
							"success" : {
								"label" : "OK",
								"className" : "btn-sm btn-primary"
							}
						}
					});
				}).on('stepclick.fu.wizard', function(e){
					//e.preventDefault();//this will prevent clicking and selecting steps
				});
			
			
				//jump to a step
				/**
				var wizard = $('#fuelux-wizard-container').data('fu.wizard')
				wizard.currentStep = 3;
				wizard.setState();
				*/
			
				//determine selected step
				//wizard.selectedItem().step
			
			
			
				//hide or show the other form which requires validation
				//this is for demo only, you usullay want just one form in your application
				$('#skip-validation').removeAttr('checked').on('click', function(){
					$validation = this.checked;
					if(this.checked) {
						$('#sample-form').hide();
						$('#validation-form').removeClass('hide');
					}
					else {
						$('#validation-form').addClass('hide');
						$('#sample-form').show();
					}
				})
			
				//documentation : http://docs.jquery.com/Plugins/Validation/validate
			
			
				$('#modal-wizard-container').ace_wizard();
				$('#modal-wizard .wizard-actions .btn[data-dismiss=modal]').removeAttr('disabled');
				
				
				/**
				$('#date').datepicker({autoclose:true}).on('changeDate', function(ev) {
					$(this).closest('form').validate().element($(this));
				});
				
				$('#mychosen').chosen().on('change', function(ev) {
					$(this).closest('form').validate().element($(this));
				});
				*/
				$(document).one('ajaxloadstart.page', function(e) {
					//in ajax mode, remove remaining elements before leaving page
					$('[class*=select2]').remove();
				});
			})
		</script>
	
	
	
	
	
</body>
</html>