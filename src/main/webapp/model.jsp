<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body>


	
	<!-- Modal 添加难题 -->
	<div class="modal fade" id="addProblem" tabindex="-1" role="dialog"
			aria-labelledby="gaProgress">
			<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title" id="myModalLabel1">生产难题属性评价</h4>
			</div>
			<div class="modal-body">
				
				<div class="row">
					<div class="col-lg-1"></div>
				
					<div class="col-lg-11">
						<div class="col-lg-10">
							<h5>(*)难题描述：</h5>
							<textarea class="form-control" id="pdescriptoin" ></textarea>
						</div>
						
						<div class="col-lg-10">
	     					 <h5>(*)难题类别选择：</h5>
								<div id="operationSelected1" class="radio"
									style="position: relative; left: 100px">
									<label> <input type="radio" name="optionsRadios1"
										id="optionsRadios1" value="1" checked> 宏观主动难题
									</label> 
									<label> <input type="radio" name="optionsRadios1"
										id="optionsRadios1" value="2"> 局部被动难题
									</label> 
								</div>
					   </div>	
					   <div class="col-lg-10">
	     					 <h5>(*)影响范围选择：</h5>
								<div id="operationSelected2" class="radio"
									style="position: relative; left: 100px">
									<label> <input type="radio" name="optionsRadios2"
										id="optionsRadios2" value="1" checked> 车间局部
									</label> 
									<label> <input type="radio" name="optionsRadios2"
										id="optionsRadios2" value="2" > 单车间
									</label> 
									<label> <input type="radio" name="optionsRadios2"
										id="optionsRadios2" value="3"> 多车间
									</label>
									<label> <input type="radio" name="optionsRadios2"
										id="optionsRadios2" value="4"> 企业层面
									</label> 
								</div>
					   </div>				
						<div class="col-lg-10">
							<br>
							<div class="input-group">
								<span class="input-group-addon">经济损失（元）</span> 
								<input type="text"	class="form-control" id="pcost" value="100" >
							</div>
						</div>
						
						<div class="col-lg-10">
							<br>
							<div class="input-group">
								<span class="input-group-addon">人员规模（个）</span> 
								<input type="text"	class="form-control" id="ppeople1" value="10" style="text-align:center">
								<span class="input-group-addon">-</span> 
								<input type="text"	class="form-control" id="ppeople2" value="20" style="text-align:center">
							</div>
						</div>
						
						<div class="col-lg-10">
							<br>
							<div class="input-group">
								<span class="input-group-addon">持续时间（天）</span> 
								<input type="text"	class="form-control" id="pperid" value="100" >
							</div>
						</div>
						
						<div class="col-lg-10">
							<br>
							<div>
								<h5>难题紧急程度：</h5>
							  	 <input type="range" name="range_speed" id="range_speed" value="10" oninput="changeSpeed()" style="display:inline"/>
							   <span id="rushValue" style="display:inline">很低</span>
							</div> 
							
						</div>
						
						<div class="col-lg-10">
							<br>
							<div>
								<h5>备注：</h5>
							  	<textarea class="form-control" id="comment" ></textarea>
							</div>
							
						</div>
					
					</div>
					
				
				</div>
			
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" id ="problemBtn">确定</button>
				<button type="button"  class="btn btn-primary" data-dismiss="modal">关闭</button>
			</div>
		</div>
	</div>
</div>


	<!-- Modal 添加生产活动 -->
	<div class="modal fade" id="addActivity" tabindex="-1" role="dialog">
			<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title">生产活动</h4>
			</div>
			<div class="modal-body">
					<div class="form-group">
						<label class="col-sm-3 control-label no-padding-right" for="form-field-1"> 生产活动名称 </label>
						<div class="col-sm-9">
							<input type="text" id="activityName"  class="col-xs-10 col-sm-5">
						</div>
					</div>
					<br><br>
					
					<div class="form-group">
						<label class="col-sm-3 control-label no-padding-right" > 
							生产事件
							<span class="help-button" data-toggle="tooltip" data-placement="left" title="一个生产活动可以有多个生产事件">?</span>
						</label>
						<div class="col-sm-9">
							<div class="inline" id="eventTagsdiv">
								 <input type="text" id="eventTags" placeholder="添加生产事件 ...">
							</div>
						</div>
					</div>
					<br><br>
					
					
					<div class="form-group">
						<label class="col-sm-3 control-label no-padding-right" for="form-field-tags"> 
							生产难题
							<span class="help-button" data-toggle="tooltip" data-placement="left" title="生产难题由生产事件触发生产">?</span>
						</label>
						<div class="col-sm-9">
							<div class="inline" id="problemTagsdiv">
									<input type="text" id="problemTags" placeholder="添加生产难题 ...">
							</div>
						</div>
					</div>
			
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" id ="activityBtn">确定</button>
				<button type="button"  class="btn btn-primary" data-dismiss="modal">关闭</button>
			</div>
		</div>
	</div>
</div>



<!-- Modal 选择难题 -->
	<div class="modal fade" id="selectProblem" tabindex="-1" role="dialog">
			<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title">选择目标生产难题</h4>
			</div>
			<div class="modal-body">
				
				<div class="row">
						<table id="problemsTable1" 
								data-height=600 
								data-toggle="table" >
								 <thead>
							       <tr>
							      	   <th data-field="id" data-visible="false">Id</th>
							           <th data-field="pdescriptoin">难题描述</th>
							           <th data-field="ptype">难题类别</th>
							           <th data-field="recommendValue" >推荐度</th>
							       	   <th data-field="state" data-checkbox="true"></th>
							       </tr>
							   </thead>
							</table>
				</div>
				<br><br>
			
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" onclick ="manualSelectConfirm()">确定</button>
				<button type="button"  class="btn btn-primary" data-dismiss="modal">关闭</button>
			</div>
		</div>
	</div>
</div>

	
	<!-- Modal 配置难题 -->
	<div class="modal fade" id="confProblems" tabindex="-1" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title" id="myModalLabel1">生产难题属性设置</h4>
				</div>
				<div class="modal-body">
				<div class="row">
					<div class="col-xs-12 col-sm-12">
						<div id="comment-tab" class="tab-pane active">
							<div class="comments ace-scroll" style="position: relative;">
								<div class="scroll-content" style="max-height: 600px;">
									<div class="itemdiv commentdiv">
	
										<div class="body">
											<div class="name">
												<a href="#" style="font-size:16px" >已选择目标生产难题</a>
											</div>
											<br>
											<div class="text" >
												<i class="ace-icon fa fa-quote-left"></i>
												<span id="targetProblem2"></span>
											</div>
										</div>
									
									</div>
								</div>
							</div>
					  </div>
					  
					<div class="widget-box widget-color-blue2">
						<div class="widget-header">
							<h4 class="widget-title lighter smaller">设置难题属性</h4>
						</div>

						<div class="widget-body">
							<div class="widget-main padding-8">
								<ul id="tree1" class="tree tree-unselectable" role="tree">
									
								</ul>
							</div>
						</div>
					</div>
					  
				</div>
					
				
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" onclick="confProblemsConfirm()">确定</button>
					<button type="button" class="btn btn-primary" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>
</div>

	
	
	
	<!-- Modal 等待 -->
	<div class="modal fade in" id=waitingForComplete tabindex="-1" role="dialog" >
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">×</span>
					</button>
					<h4 class="modal-title">等待排序完成...</h4>
				</div>
				<div class="modal-body">
					<div id="waiting" style="display: none;">
						<div style="text-align: center">
							<span style="font-size: 20px">排序中</span> <img src="./css/images/loader.gif" class="loading">
						</div>
					</div>
					<div id="completed" style="display: inline;">
						<div style="text-align: center">
							<span style="font-size: 20px">排序完成</span> <img src="./css/images/ok.png" class="loading">
						</div>
						<div style="text-align: right">
							<button type="button" class="btn btn-primary" data-dismiss="modal">关闭</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	

	<!-- Modal  添加成员 -->
	<div class="modal fade" id="addProjectUser">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
						<h4 class="modal-title" id="myModalLabel">选择成员</h4>
					</div>
					<div class="modal-body">
					
								<div class="widget-box widget-color-red3" id="widget-box-2">
									<div class="widget-header">
										<h5 class="widget-title bigger lighter">
											<i class="ace-icon fa fa-table"></i>
											成员列表
										</h5>
									</div>

									<div class="widget-body">
										<div class="widget-main no-padding">
										
										<table id="projectUserTable" 
											data-height=250
											data-toggle="table"
											data-search="true" 
											data-pagination="true" 
											data-page-size=30
											data-page-list=[10,30,All] 
											data-side-pagination="client" >
												<thead>
								       			 	 <tr>
											       	   <th data-field="id" data-visible="false">Id</th>
											           <th data-field="username"><i class="ace-icon fa fa-user"></i>用户名</th>
											           <th data-field="email"><i>@</i>邮箱</th>
											           <th data-field="nickName">备注</th>
											           <th data-field="state" data-checkbox="true"></th>
										           
										       		</tr>
										    	</thead>
										</table>
										
										</div>
									</div>
							</div>
						
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
						<button type="button" class="btn btn-primary" onclick="addUserItem()">添加</button>
					</div>
				</div>
			</div>


	</div>
	
	
	

<!-- Modal 选择创新方法 -->
	<div class="modal fade" id="selectMethod" tabindex="-1" role="dialog">
			<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title">选择创新方法</h4>
			</div>
			<div class="modal-body">
				
				<div class="row">
						<table id="methodTable" 
								data-height=600 
								data-toggle="table" >
								 <thead>
							       <tr>
							      	   <th data-field="problemId" data-visible="false"></th>
							           <th data-field="methodName">创新方法</th>
							           <th data-field="methodDesc">描述</th>
							           <th data-field="methodType" >类别</th>
							           <th data-field="URI" data-visible="false">URI</th>
							       	   <th data-field="state" data-checkbox="true"></th>
							       </tr>
							   </thead>
							</table>
				</div>
				<br><br>
			
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" onclick ="manualSelectBasicMethodConfirm()">确定</button>
				<button type="button"  class="btn btn-primary" data-dismiss="modal">关闭</button>
			</div>
		</div>
	</div>
</div>



<!-- Modal 绩效 -->
	<div class="modal fade" id="selfDefineAnalysisWandS" tabindex="-1" role="dialog">
			<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title">综合评价指标体系配置</h4>
			</div>
			<div class="modal-body" >
				
					<div class="row">
							<div class="col-sm-3 col-xs-3">
								<h4 style="color:blue">评价指标</h4>
							</div>
							
							
							<div class="col-sm-4 col-xs-4">
								<h4 style="color:blue">
									理论标准值区间 <i class="ace-icon fa fa-leaf blue"></i>
								</h4>
							</div>
							
							<div class="col-sm-4 col-xs-4">
								<h4 style="color:blue">
									指标权重 <i class="ace-icon fa fa-leaf green"></i>
								</h4>
							</div>
							
					</div>
					
					<div id="analysisItemBody">
					
					</div>	
					
			
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" onclick ="weightAndStandardConfirm()">确定</button>
				<button type="button"  class="btn btn-primary" data-dismiss="modal">关闭</button>
			</div>
		</div>
	</div>
</div>


<!-- Modal 绩效 -->
	<div class="modal fade" id="selfDefineAnalysisItem" tabindex="-1" role="dialog">
			<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title">综合评价指标体系配置</h4>
			</div>
			<div class="modal-body" >
						
				<div class="tab-content padding-8">
						<h4 class="smaller lighter green">
							<i class="ace-icon fa fa-list"></i>
							评价指标配置
							<button type="button" class="btn btn-info" onclick="addInputElement()" style="position: relative; float: right;">
								<i class="glyphicon glyphicon-plus"></i> 添加指标
							</button>
							
						</h4>
						<br>
						<ul id="inputs" class="item-list ui-sortable">
							
						
						</ul>
				</div>
					
			
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" onclick ="analysisItemConfirm()">确定</button>
				<button type="button"  class="btn btn-primary" data-dismiss="modal">关闭</button>
			</div>
		</div>
	</div>
</div>



</body>
</html>