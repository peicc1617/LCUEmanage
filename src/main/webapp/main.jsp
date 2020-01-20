<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

</head>
<body>
		
<div class="row" style="margin-right: 0px;margin-left: 0px;">
	<div class="col-sm-12">
		<div class="tabbable">
			
			<ul class="nav nav-tabs">
				<li role="presentation" class="active"><a href="#home" id="hometab" aria-controls="home" role="tab" data-toggle="tab">
					<i class="glyphicon glyphicon-home"></i> 导入</a></li>
				<li role="presentation" ><a href="#configure" id="configuretab" aria-controls="configure" role="tab" data-toggle="tab" onclick="problemConfig()">
					<i class="glyphicon glyphicon-cog"></i> 配置</a></li>
				<li role="presentation"><a href="#useuse" id="useusetab" aria-controls="useuse" role="tab" data-toggle="tab" onclick="useuse()">
					<i class="glyphicon glyphicon-th"></i> 使用</a></li>
				<li role="presentation"><a href="#analysisRes" id="analysisRestab" aria-controls="analysisRes" role="tab" data-toggle="tab" onclick="analysis()">
					<i class="glyphicon glyphicon-th"></i> 评估</a></li>
		
			</ul>
			
			
			<div class="tab-content" id="pageContent">
					<div role="tabpanel" class="tab-pane active" id="home">
						<div class="row">
						
						<div class="col-xs-12 col-sm-12 widget-container-col ui-sortable" id="widget-container-col-1">
							<div class="widget-box ui-sortable-handle" id="widget-box-1">
								<div class="widget-header">
									<h4 class="widget-title">知识管理</h4>
									<div class="widget-toolbar">
										<a href="#" data-action="collapse">
											<i class="ace-icon fa fa-chevron-up"></i>
										</a>
									</div>
								</div>

								<div class="widget-body" style="display: block;">
									<div class="widget-main ace-scroll scroll-disabled" style="position: relative;"><div class="scroll-track" style="display: none;"><div class="scroll-bar" style="top: 0px;"></div></div><div class="scroll-content" style="">
										
										<p class="alert alert-info">
											在导入过程中，需要掌握多创新方法使用的基本知识，为后续的创新方法使用打下基础  <a href="http://innovation.xjtu.edu.cn/InnovationTrain/index" style="font-size:20px; float:right;margin-right:100px;">在线培训</a>
										</p>
									</div></div>
								</div>
							</div>
						</div>
						
						
						<div class="col-xs-12 col-sm-12 widget-container-col ui-sortable" id="widget-container-col-1">
							<div class="widget-box ui-sortable-handle" id="widget-box-1">
								<div class="widget-header">
									<h4 class="widget-title">组织管理</h4>
									<div class="widget-toolbar">
										<a href="#" data-action="collapse">
											<i class="ace-icon fa fa-chevron-up"></i>
										</a>

									</div>
								</div>

								<div class="widget-body" style="display: block;">
									<div class="widget-main ace-scroll scroll-disabled" style="position: relative;">
										<div class="widget-body" style="display: block;">
											<div class="widget-main ace-scroll scroll-disabled" style="position: relative;">
													
												<div class="scroll-content" style="">
													<p class="alert alert-info">
														在导入过程中，组织管理的主要任务是配置项目组相应人员
													</p>
												</div>
											</div>
										</div>
										<div class="row">
											<div class=" col-xs-1 col-sm-1" >
											</div>
											
											<div class="widget-box col-xs-8 col-sm-8" id="222" style="border: 2px solid #2980B9;">
												<div class="widget-header" style="background: #2980B9; color: #FFF">
													<div style="float: left">
														<h5>
															<i class="fa fa-steam"></i>
															项目组成员
														</h5>
													</div>
													<div class="" style="float: right; margin-top: 10px; margin-right: 15px">
														<a href="#"  onclick="addProjectUser()">
															<i class="fa fa-plus" style="color: #FFF"></i>
														</a>
													</div>
												</div>
												<div class="widget-body">
														<p class="alert alert-success">项目创建者: <strong id="projectCreator"></strong></p>
												</div>
												
												
												<div class="clearfix" id="projectUser">
													
													<!-- <div class="itemdiv memberdiv" id=userid>
															<div class="body">
																<div class="name">
																	<span  class="blue"><i class="fa fa-user"></i> 张斌斌</span>
																</div>
																<span class="label label-warning label-sm">操作</span>
																<div class="inline position-relative">
																	<button class="btn btn-minier btn-yellow btn-no-border dropdown-toggle" data-toggle="dropdown">
																		<i class="ace-icon fa fa-angle-down icon-only bigge r-120"></i>
																	</button>

																	<ul class="dropdown-menu dropdown-only-icon dropdown-yellow dropdown-menu-right dropdown-caret dropdown-close">
																		<li>
																			<a href="#" onclick="removeUser(userId)">
																				<span class="red">
																					删除<i class="ace-icon fa fa-trash-o bigger-110"></i>
																				</span>
																			</a>
																		</li>
																	</ul>
																</div>
															</div>
													</div> -->
												
												</div>
												
												
											</div>
										
										</div>
										
									</div>
								</div>
							</div>
						</div>
								
						
						<div class="col-xs-12 col-sm-12 widget-container-col ui-sortable" id="widget-container-col-1">
							<div class="widget-box ui-sortable-handle" id="widget-box-1">
								<div class="widget-header">
									<h4 class="widget-title">难题管理 </h4>
									
									<div class="widget-toolbar">
										<a href="#" data-action="fullscreen" class="orange2">
											<i class="ace-icon fa fa-expand"></i>
										</a>
										
										<a href="#" data-action="collapse">
											<i class="ace-icon fa fa-chevron-up"></i>
										</a>
										
									</div>
								</div>
								

								<div class="widget-body" style="display: block;">
									<div class="widget-main ace-scroll scroll-disabled" style="position: relative;">
										
										 <div id="toolbar" class="btn-group btn-group-sm">
											<button type="button" class="btn btn-info" onclick="addProblem()">
												<i class="glyphicon glyphicon-plus"></i> 添加
											</button>
											<button type="button" class="btn btn-info"
												style="margin-right: 40px" onclick="deleteProblem()">
												<i class="glyphicon glyphicon-trash"></i> 删除
											</button>
											
											<!-- <button type="button" class="btn btn-info" id="saveProject"
												value="false" style="align: right" onclick="saveProject()">
												<i class="glyphicon glyphicon-cloud"> 保存工程</i>
											</button> -->
											
											
										</div> 
									
										<table id="problemsTable" 
											data-height=750 
											data-toggle="table"
											data-search="true" 
											data-show-refresh="true" 
											data-show-toggle="true"
											data-pagination="true" 
											data-unique-id="id"
											data-page-size=30
											data-page-list=[10,30,50,All] 
											data-side-pagination="client" >
											<thead>
										       <tr>
										       		<th data-field="state" data-checkbox="true"></th>
										       		<th data-field="id" data-visible="false">Id</th>
										       		
										           <th data-field="pdescriptoin">难题描述</th>
										           <th data-field="ptype">难题类别</th>
										           <th data-field="pscope">影响范围</th>
										           <th data-field="pcost">经济损失（元）</th>
										           <th data-field="ppeople">人员规模（个）</th>
										           <th data-field="pperid">持续时间（天）</th>
										           <th data-field="prush">紧急程度</th>
										           <th data-field="prushVal" data-visible="false">紧急程度</th>
										           
										           <th data-field="pcomment">备注</th>
										           <th data-field="creatorName">添加者</th>
										           
										           <th data-field="recommendValue" data-visible="false"></th>
										           <th data-field="isTarget" data-visible="false"></th>
										           
										           <th data-field="action" data-formatter="actionFormatter"
														data-events="actionEvents">编辑</th>
										       </tr>
										   </thead>
										</table>
								</div>
							</div>
							</div>
						</div>
						
			
				</div>
		</div>

				
					<div role="tabpanel" class="tab-pane " id="configure">
						<div class="row">
									
									
							<div class="col-xs-12 col-sm-12">
									<div class="widget-box">
										<div class="widget-header">
											<h4 class="widget-title"> 难题管理</h4>
											<div class="widget-toolbar">
													<a href="#" data-action="collapse">
														<i class="ace-icon fa fa-chevron-up"></i>
													</a>
											</div>
										</div>
				
										<div class="widget-body">
											<div class="widget-main no-padding">
												<br>
												<div class="scroll-content" id="alreadyHaveProblems" style="display:none">
													<p class="alert alert-success">
														在导入过程中，已收集到企业的生存难题<font size="5" id ="allPro">0</font>个; 其中主动难题<font size="5" id ="pro1">0</font>个; 被动难题<font size="5" id ="pro2">0</font>个;
														<a href="javascript:void(0)" onclick="problemSort()" style="font-size:20px; float:right;margin-right:100px;">难题智能排序</a>
													</p>
												</div>
												
												<div class="scroll-content" id="notHaveProblems" style="display:none">
													<p class="alert alert-danger">
													没有添加生产难题，无法配置。——在导入过程中，需要完成对企业生产难题的提取与添加。
													<a href="javascript:void(0)" onclick="backToHome()" style="font-size:20px; float:right;margin-right:100px;">继续添加生产难题</a>
													</p>
												</div>
												
												
											</div><!-- /.widget-main -->
										</div><!-- /.widget-body -->
									
									
									</div><!-- /.widget-box -->
							
							</div>
							
							
								
							<div class="col-xs-12 col-sm-12" id="recommentResult" >
									<div class="widget-box">
										<div class="widget-header">
											<h4 class="widget-title lighter smaller"> 目标难题
												<button type="button" class="btn btn-sm btn-white btn-danger"  onclick="manualSelect()">添加</button>
											</h4>
											<div class="widget-toolbar">
													<a href="#" data-action="collapse">
														<i class="ace-icon fa fa-chevron-up"></i>
													</a>
											</div>
				
										</div>
				
										<div class="widget-body">
											<div class="widget-main no-padding" id="targetProblems">
												<br>
												
											</div><!-- /.widget-main -->
										</div><!-- /.widget-body -->
									
									
									</div><!-- /.widget-box -->
							
							</div>
							
								
								
							<div class="col-xs-12 col-sm-12" id="problemPlan" style="display:none">
									<div class="widget-box">
										<div class="widget-header">
											<h4 class="widget-title"> 难题规划</h4>
											<div class="widget-toolbar">
													<a href="#" data-action="collapse">
														<i class="ace-icon fa fa-chevron-up"></i>
													</a>
											</div>
										</div>
										<div class="col-xs-1 col-sm-1">
										</div>
					
										<div class="widget-body col-xs-10 col-sm-10">
											
											<br>
											<div class="widget-main no-padding">
											
												<div class="scroll-content">
													<h4 class="green">
														<i class="fa fa-bullseye blue"></i> 
														<span id="targetProblemForPlan"></span>
														<span id="targetProblemForPlanId" style="display:none"></span>
													</h4>
												</div>
												
												
												<div class="itemdiv dialogdiv">
												
													<div class="user">
														 <img alt="生产活动" src="css/images/activity.png">
													</div>
													<h2 style="padding-left:50px;padding-top:6px">开始
														<button class="btn btn-mini bigger btn-info" onclick="addOrUpdateActivity()">
															   			<i class="fa fa-plus-square icon-only bigger-120"></i> 添加新活动
														</button>
													</h2>
										  		 </div>
										
											</div>
											
											<div class="widget-main no-padding" id="targetProblemArea">
												
												<!-- 
												<div class="itemdiv dialogdiv" id="defaultActivity"> 
												
													<div class="user">
														 <img alt="生产活动" src="css/images/activity.png">
													</div>
												
													<div class="body">
														<div class="name">
															<h5 style="color:#337ab7"><strong>生产活动：</strong>
																<span id="activityActivity"></span>
															</h5>
															
															<h5 style="color:#337ab7"><strong>生产事件：</strong>
																<span id="activityEvent"></span>
															</h5>
															
															<h5 style="color:#337ab7"><strong>生产难题：</strong>
																<span id="activityProblem"></span>
															</h5>
														</div>
											  		 
													   <div class="tools" style="display:inline">
														   	<div class="inline position-relative">
														   		<button class="btn btn-minier bigger btn-info" onclick="configureActivity()">
														   			<i class="fa fa-cog icon-only bigger-120"></i> 配置
														   		</button>
														   		
														   		<button class="btn btn-minier bigger btn-danger" onclick="deleteActivity()">
														   			<i class="fa fa-times-circle icon-only bigger-120"></i> 删除
														   		</button>
														   		
														   	</div>
													   </div>
												 	 </div>
										  	    </div>
										  	 
										  	  -->
												
											</div><!-- /.widget-main -->
										</div><!-- /.widget-body -->
									
									</div><!-- /.widget-box -->
							
							</div>
							
							
							
								
								
					</div>
				
				</div>
				
					
					<div role="tabpanel" class="tab-pane " id="useuse">
						<div class="row">
							<div class="col-xs-12 col-sm-12">
									<div class="widget-box">
										<div class="widget-header">
											<h4 class="widget-title">创新方法匹配</h4>
											<div class="widget-toolbar">
													<a href="#" data-action="collapse">
														<i class="ace-icon fa fa-chevron-up"></i>
													</a>
											</div>
										</div>
										
										<div class="widget-body">
											<div class="widget-main no-padding">
											<br>
												<div class="scroll-content" id="targetProblemsNotExist" style="display:none">
													<p class="alert alert-danger">
														目标生产难题生产难题没有确定。——在配置过程中，需要确定企业的目标生产难题。
														<a href="javascript:void(0)" onclick="backToConfigure()" style="font-size:20px; float:right;margin-right:100px;">选择目标生产难题</a>
													</p>
												</div>
												
												<div class="scroll-content" id="targetProblemsExist">
													<p class="alert alert-success" >
														在使用过程中完成对生产难题的属性设置后便可以匹配到对应的创新方法。
													</p>
												</div>
										   </div>
										   <br><br>
										   <div id="use-panel-area">
										   
										   
										<!-- 
										   <div class="panel panel-default">
													<div class="panel-heading">
														<a href="#faq-1-1" data-toggle="collapse" class="accordion-toggle" aria-expanded="true">
															<i class="pull-right ace-icon fa fa-chevron-down" data-icon-hide="ace-icon fa fa-chevron-down" data-icon-show="ace-icon fa fa-chevron-left"></i>

															<i class="ace-icon fa fa-user bigger-130"></i>
															&nbsp; <span id="problemNameforMatch">High life accusamus terry richardson ad squid?</span>
														</a>
														
														<button class="btn btn-sm btn-white btn-danger" onclick="setAttr(id)">设置属性</button>
													</div>

													<div class="panel-collapse collapse in" id="faq-1-1" aria-expanded="true">
														<div class="panel-body">
															<div class="col-xs-5 col-sm-5">
																<span id="problemAttrs" style="font-size:15px;color:blue"> </span>
															</div>
															<div class="col-xs-2 col-sm-2">
																<a id="matchButton" href="javascript:void(0)" onclick="methodMatch()" style="font-size:18px;">匹配创新方法</a>
															</div>
															<div class="col-xs-5 col-sm-5">
																	<div class="itemdiv dialogdiv" id="matchedMethodArea">
																		<div class="body" style="margin-left:-50px;">
																			<div class="name">
																				<h5 style="color:#337ab7" id="matchDegree">dasdas</h5>
																			</div>
																			<div class="text">
																				<span id="matchedMethodName">hkjh很快就会看见好看就会看见 </span>
																				<span class="help-button" data-toggle="tooltip" data-placement="left" title="生产难题由生产事件触发生产">?</span>
																			</div>
																			
																			<br>
																			
																			<button class="btn btn-mini bigger btn-danger" onclick="manualSelect()">
																				<i class="ace-icon fa fa-cogs  bigger-140"></i> 选择模板创新方法
																			</button>
																			
																			<button class="btn btn-mini bigger btn-danger" onclick="manualSelect()">
																				<i class="ace-icon fa fa-cog  bigger-140"></i> 选择基础创新方法
																			</button>
																		</div>
																	</div>
															</div>
														</div>
													</div>
											</div>
											
											<div class="panel panel-default">
													<div class="panel-heading">
														<a href="#faq-1-2"  data-toggle="collapse" class="accordion-toggle" aria-expanded="true">
															<i class="pull-right ace-icon fa fa-chevron-down" data-icon-hide="ace-icon fa fa-chevron-down" data-icon-show="ace-icon fa fa-chevron-left"></i>

															<i class="fa fa-cubes"></i>
															&nbsp; Can I have nested questions?
														</a>
													</div>

													<div class="panel-collapse collapse in" id="faq-1-2" aria-expanded="true" style="">
														<div class="panel-body">
															<div id="faq-list-nested-1" class="panel-group accordion-style1 accordion-style2">
															
																 <div class="panel panel-default">
													<div class="panel-heading">
														<a href="#faq-1-1" data-toggle="collapse" class="accordion-toggle" aria-expanded="true" style="display:inline">
															<i class="pull-right ace-icon fa fa-chevron-down" data-icon-hide="ace-icon fa fa-chevron-down" data-icon-show="ace-icon fa fa-chevron-left"></i>

															<i class="ace-icon fa fa-user bigger-130"></i>
															&nbsp; <span id="problemNameforMatch">High life accusamus terry richardson ad squid?</span>
														</a>
														<button style="display:inline" class="btn btn-sm btn-white btn-danger" onclick="setAttr(id)">设置属性</button>
														
													</div>

													<div class="panel-collapse collapse in" id="faq-1-1" aria-expanded="true">
														<div class="panel-body">
															<div class="col-xs-5 col-sm-5">
																<span id="problemAttrs" style="font-size:15px;color:blue"> </span>
															</div>
															<div class="col-xs-2 col-sm-2">
																<a id="matchButton" href="javascript:void(0)" onclick="methodMatch()" style="font-size:18px;">匹配创新方法</a>
															</div>
															<div class="col-xs-5 col-sm-5">
																	<div class="itemdiv dialogdiv" id="matchedMethodArea">
																		<div class="body" style="margin-left:-50px;">
																			<div class="name">
																				<h5 style="color:#337ab7" id="matchDegree">dasdas</h5>
																			</div>
																			<div class="text">
																				<span id="matchedMethodName">hkjh很快就会看见好看就会看见 </span>
																				<span class="help-button" data-toggle="tooltip" data-placement="left" title="生产难题由生产事件触发生产">?</span>
																			</div>
																			
																			<br>
																			
																			<button class="btn btn-mini bigger btn-danger" onclick="manualSelect()">
																				<i class="ace-icon fa fa-cogs  bigger-140"></i> 选择模板创新方法
																			</button>
																			
																			<button class="btn btn-mini bigger btn-danger" onclick="manualSelect()">
																				<i class="ace-icon fa fa-cog  bigger-140"></i> 选择基础创新方法
																			</button>
																		</div>
																	</div>
															</div>
														</div>
													</div>
											</div>
											
																
	

															</div>
														</div>
													</div>
											</div>
										   
										 -->
										</div>
									</div>
										
								</div>
									
							</div>
									
									
						</div>
					
					
					</div>
	
				
					
					<div role="tabpanel" class="tab-pane " id="analysisRes">
						<div class="row">
							<div class="col-xs-12 col-sm-12">
									<div class="widget-box">
										<div class="widget-header">
											<h4 class="widget-title">应用评估</h4>
											<div class="widget-toolbar">
													<a href="#" data-action="collapse">
														<i class="ace-icon fa fa-chevron-up"></i>
													</a>
											</div>
										</div>
										
										<div class="widget-body">
											<div class="widget-main no-padding">
											<br>
												
											<div class="scroll-content" id="targetProblemsExist">
												<p class="alert alert-success" >
													创新方法应用综合绩效评估可以用量化指标表示导入创新方法给企业带来的综合绩效
												</p>
												
												<div class="form-group" style="padding-left:20px">

													<div class="clearfix">
														<span style="font-size :18px">企业类型：</span>
														<select class="input-medium valid" id="typeOfEnterprise" name="typeOfEnterprise" aria-required="true" aria-describedby="platform-error" aria-invalid="false">
															<option value="designType">研发设计型</option>
															<option value="produceType">生产制造型</option>
															<option value="serverType">运维服务型</option>
														</select>
														
														<button class="btn btn-info" style="font-size :12px" onclick="selfDefineAnalysisItem()">
															<i class="ace-icon fa fa-wrench  bigger-110 icon-only"></i>&nbsp&nbsp 指标配置
														</button>
														
														
														<button class="btn btn-info" style="font-size :12px" onclick="selfDefineAnalysisSandW()">
															<i class="ace-icon fa fa-wrench  bigger-110 icon-only"></i>&nbsp&nbsp 权重配置
														</button>
														
													</div>
													
													
													
												</div>
											</div>
												
												
											<div id="typeIsDesignType" >
												
												<div class="row" id="typeIsDesignTypeItem">
													<div class="col-lg-1"></div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">专利授权数量</span>
																 <input type="text" class="form-control" id="design1" value="" aria-label="...">
															</div>
														</div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">自有非专利数量</span> <input type="text"
																	class="form-control" id="design2" value="" aria-label="...">
															</div>
														</div>
						
														<br> <br>
														<div class="col-lg-1"></div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">技术推广数量</span> <input type="text"
																	class="form-control" id="design3" value=""
																	aria-label="...">
															</div>
														</div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">形成案例数量</span> <input type="text"
																	class="form-control" id="design4" value=""
																	aria-label="...">
															</div>
															<!-- /input-group -->
														</div>
														<!-- /.col-lg-6 -->
													
												<br><br>
													
													
													<div class="col-lg-1"></div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">创新活动项目个数</span> <input type="text"
																	class="form-control" id="design5" value="" aria-label="...">
															</div>
														</div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">创新活动平均周期</span> <input type="text"
																	class="form-control" id="design6" value="" aria-label="...">
															</div>
														</div>
						
														<br> <br>
														<div class="col-lg-1"></div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">生产难题数量</span> <input type="text"
																	class="form-control" id="design7" value=""
																	aria-label="...">
															</div>
														</div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">已解决生产难题数量</span> <input type="text"
																	class="form-control" id="design8" value=""
																	aria-label="...">
															</div>
															<!-- /input-group -->
														</div>
														<br> <br>
														<div class="col-lg-1"></div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">应用创新方法数量</span> <input type="text"
																	class="form-control" id="design9" value=""
																	aria-label="...">
															</div>
															<!-- /input-group -->
														</div>
												
												<br><br>
												
													
													<div class="col-lg-1"></div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">新产品研发周期</span> <input type="text"
																	class="form-control" id="design10" value="" aria-label="...">
															</div>
														</div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">设计失误频次</span> <input type="text"
																	class="form-control" id="design11" value="" aria-label="...">
															</div>
														</div>
						
														<br> <br>
														<div class="col-lg-1"></div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">人均提案数</span> <input type="text"
																	class="form-control" id="design12" value=""
																	aria-label="...">
															</div>
														</div>
														
												
												<br><br>
												
													
													<div class="col-lg-1"></div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">培训次数</span> <input type="text"
																	class="form-control" id="design13" value="" aria-label="...">
															</div>
														</div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">培训人数</span> <input type="text"
																	class="form-control" id="design14" value="" aria-label="...">
															</div>
														</div>
						
														<br> <br>
														<div class="col-lg-1"></div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">培训通过率</span> <input type="text"
																	class="form-control" id="design15" value=""
																	aria-label="...">
															</div>
														</div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">导入创新方法数量</span> <input type="text"
																	class="form-control" id="design16" value=""
																	aria-label="...">
															</div>
															<!-- /input-group -->
														</div>
														
														<br> <br>
														<div class="col-lg-1"></div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">单位人时收益</span> <input type="text"
																	class="form-control" id="design17" value=""
																	aria-label="...">
															</div>
														</div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">单位人时成本</span> <input type="text"
																	class="form-control" id="design18" value=""
																	aria-label="...">
															</div>
															<!-- /input-group -->
														</div>
												
												<br>
												</div>
											</div>
												
											
											<div id="typeIsProduceType" style="display: none">
												
												<div class="row" id="typeIsProduceTypeItem">
													<div class="col-lg-1"></div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">合格率</span> <input type="text"
																	class="form-control" id="produce1" value="" aria-label="...">
															</div>
														</div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">返工率</span> <input type="text"
																	class="form-control" id="produce2" value="" aria-label="...">
															</div>
														</div>
						
														<br> <br>
														<div class="col-lg-1"></div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">废品率</span> <input type="text"
																	class="form-control" id="produce3" value=""
																	aria-label="...">
															</div>
														</div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">产量</span> <input type="text"
																	class="form-control" id="produce4" value=""
																	aria-label="...">
															</div>
															<!-- /input-group -->
														</div>
														<!-- /.col-lg-6 -->
													
												<br><br>
													
													
													<div class="col-lg-1"></div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">创新活动项目个数</span> <input type="text"
																	class="form-control" id="produce5" value="" aria-label="...">
															</div>
														</div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">创新活动平均周期</span> <input type="text"
																	class="form-control" id="produce6" value="" aria-label="...">
															</div>
														</div>
						
														<br> <br>
														<div class="col-lg-1"></div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">生产难题数量</span> <input type="text"
																	class="form-control" id="produce7" value=""
																	aria-label="...">
															</div>
														</div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">已解决生产难题数量</span> <input type="text"
																	class="form-control" id="produce8" value=""
																	aria-label="...">
															</div>
															<!-- /input-group -->
														</div>
														<br> <br>
														<div class="col-lg-1"></div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">应用创新方法数量</span> <input type="text"
																	class="form-control" id="produce9" value=""
																	aria-label="...">
															</div>
															<!-- /input-group -->
														</div>
												
												<br><br>
												
													
													<div class="col-lg-1"></div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">质量事故次数</span> <input type="text"
																	class="form-control" id="produce10" value="" aria-label="...">
															</div>
														</div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">产品生产周期</span> <input type="text"
																	class="form-control" id="produce11" value="" aria-label="...">
															</div>
														</div>
						
														<br> <br>
														<div class="col-lg-1"></div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">平均产线停滞时间</span> <input type="text"
																	class="form-control" id="produce12" value=""
																	aria-label="...">
															</div>
														</div>
														
												
												<br><br>
												
													
													<div class="col-lg-1"></div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">培训次数</span> <input type="text"
																	class="form-control" id="produce13" value="" aria-label="...">
															</div>
														</div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">培训人数</span> <input type="text"
																	class="form-control" id="produce14" value="" aria-label="...">
															</div>
														</div>
						
														<br> <br>
														<div class="col-lg-1"></div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">培训通过率</span> <input type="text"
																	class="form-control" id="produce15" value=""
																	aria-label="...">
															</div>
														</div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">导入创新方法数量</span> <input type="text"
																	class="form-control" id="produce16" value=""
																	aria-label="...">
															</div>
															<!-- /input-group -->
														</div>
														
														<br> <br>
														<div class="col-lg-1"></div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">单位人时收益</span> <input type="text"
																	class="form-control" id="produce17" value=""
																	aria-label="...">
															</div>
														</div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">单位人时成本</span> <input type="text"
																	class="form-control" id="produce18" value=""
																	aria-label="...">
															</div>
															<!-- /input-group -->
														</div>
												
												<br>
												</div>
											</div>
												
											
											<div id="typeIsServerType" style="display: none">
												
												<div class="row" id="typeIsServerTypeItem">
													<div class="col-lg-1"></div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">客户投诉率</span> <input type="text"
																	class="form-control" id="server1" value="" aria-label="...">
															</div>
														</div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">及时交货率</span> <input type="text"
																	class="form-control" id="server2" value="" aria-label="...">
															</div>
														</div>
						
														<br> <br>
														<div class="col-lg-1"></div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">销售增长率</span> <input type="text"
																	class="form-control" id="server3" value=""
																	aria-label="...">
															</div>
														</div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">订单数量</span> <input type="text"
																	class="form-control" id="server4" value=""
																	aria-label="...">
															</div>
															<!-- /input-group -->
														</div>
														<!-- /.col-lg-6 -->
													
												<br><br>
													
													
													<div class="col-lg-1"></div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">创新活动项目个数</span> <input type="text"
																	class="form-control" id="server5" value="" aria-label="...">
															</div>
														</div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">创新活动平均周期</span> <input type="text"
																	class="form-control" id="server6" value="" aria-label="...">
															</div>
														</div>
						
														<br> <br>
														<div class="col-lg-1"></div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">生产难题数量</span> <input type="text"
																	class="form-control" id="server7" value=""
																	aria-label="...">
															</div>
														</div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">以解决生产难题数量</span> <input type="text"
																	class="form-control" id="server8" value=""
																	aria-label="...">
															</div>
															<!-- /input-group -->
														</div>
														<br> <br>
														<div class="col-lg-1"></div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">应用创新方法数量</span> <input type="text"
																	class="form-control" id="server9" value=""
																	aria-label="...">
															</div>
															<!-- /input-group -->
														</div>
												
												<br><br>
												
													
													<div class="col-lg-1"></div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">销售预测准确率</span> <input type="text"
																	class="form-control" id="server10" value="" aria-label="...">
															</div>
														</div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">售后运维频次</span> <input type="text"
																	class="form-control" id="server11" value="" aria-label="...">
															</div>
														</div>
						
														<br> <br>
														<div class="col-lg-1"></div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">售后运维成本</span> <input type="text"
																	class="form-control" id="server12" value=""
																	aria-label="...">
															</div>
														</div>
														
												
												<br><br>
												
													
													<div class="col-lg-1"></div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">培训次数</span> <input type="text"
																	class="form-control" id="server13" value="" aria-label="...">
															</div>
														</div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">培训人数</span> <input type="text"
																	class="form-control" id="server14" value="" aria-label="...">
															</div>
														</div>
						
														<br> <br>
														<div class="col-lg-1"></div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">培训通过率</span> <input type="text"
																	class="form-control" id="server15" value=""
																	aria-label="...">
															</div>
														</div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">导入创新方法数量</span> <input type="text"
																	class="form-control" id="server16" value=""
																	aria-label="...">
															</div>
															<!-- /input-group -->
														</div>
														
														<br> <br>
														<div class="col-lg-1"></div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">单位人时收益</span> <input type="text"
																	class="form-control" id="server17" value=""
																	aria-label="...">
															</div>
														</div>
														<div class="col-lg-5">
															<div class="input-group">
																<span class="input-group-addon">单位人时成本</span> <input type="text"
																	class="form-control" id="server18" value=""
																	aria-label="...">
															</div>
															<!-- /input-group -->
														</div>
												
												<br>
												</div>
											</div>
												
													
												
												<br><br>
												<button class="btn btn-success btn-next" style="margin-left:50px" onclick="calculatePerformance()">
													综合效益计算
													<i class="ace-icon fa fa-arrow-right icon-on-right"></i>
												</button>
												
												<div id = "performanceArea" style="display:none">
													<span class="alert alert-success" >
														项目综合绩效量化值为：
														<span id = "performanceValue" style="font-size:20px; padding-left:10px"> </span>
													</span>
													
													
													<div class="rating inline" id="flagNum">
														<label class="control-label no-padding-top"> 评级 </label>
														<i data-alt="1" id="star1" class="star-on-png" ></i>&nbsp;
														<i data-alt="2" id="star2" class="star-off-png" ></i>&nbsp;
														<i data-alt="3" id="star3" class="star-off-png" ></i>&nbsp;
														<i data-alt="4" id="star4" class="star-off-png" ></i>&nbsp;
														<i data-alt="5" id="star5" class="star-off-png" ></i>
													</div>
												</div>
												
										   </div>
										   <br>
										   
										  
										  
									</div>
										
								</div>
									
							</div>
									
									
						</div>
					
					
					</div>
	
				
					
					
			</div>
	   </div>
	
	</div>
</div>
			
	
		
</body>
</html>