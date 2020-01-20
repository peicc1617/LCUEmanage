<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body>

	<!-- 监控模态框 -->
		<div class="modal fade bs-example-modal-lg" id="monitorModal" tabindex="-1" role="dialog" aria-hidden="true">
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
					<div class="modal-body">
							
						<div class="row" style="margin-right: 0px;margin-left: 0px;">
							<div class="col-sm-12 col-sm-12">
									
									<div class="widget-box">
											<div class="widget-header widget-header-blue widget-header-flat">
												<h4 class="widget-title lighter">项目进度</h4>
												
												<!-- <div class="widget-toolbar">
													<label>
														<small class="green">
															<b>Validation</b>
														</small>
						
														<input id="skip-validation" type="checkbox" class="ace ace-switch ace-switch-4">
														<span class="lbl middle"></span>
													</label>
												</div> -->
											</div>
						
											<div class="widget-body">
												<div class="widget-main">
													<div id="fuelux-wizard-container" class="no-steps-container">
														<div>
															<ul class="steps" style="margin-left: 0">
																<li data-step="1" class="active">
																	<span class="step">1</span>
																	<span class="title">导入</span>
																</li>
						
																<li data-step="2" class="">
																	<span class="step">2</span>
																	<span class="title">配置</span>
																</li>
						
																<li data-step="3">
																	<span class="step">3</span>
																	<span class="title">使用</span>
																</li>
						
																<li data-step="4">
																	<span class="step">4</span>
																	<span class="title">评估</span>
																</li>
															</ul>
														</div>
													
													</div>
						
													<hr>
												</div><!-- /.widget-main -->
											</div><!-- /.widget-body -->
										
						
									</div>
								
									
									
									<div class="widget-box">
											<div class="widget-header widget-header-blue widget-header-flat">
												<h4 class="widget-title lighter">项目概览</h4>
											</div>
											
							
							
											<div class="widget-body">
												<div class="widget-main">
													
														
														<div class="row">
															<div class="space-6"></div>
						
															<div class="col-sm-10 col-xs-10 infobox-container">
																<div class="infobox infobox-green">
																	<div class="infobox-icon">
																		<i class="ace-icon fa fa-anchor"></i>
																	</div>
																	<div class="infobox-data">
																		<span class="infobox-data-number" id="ProjectInfo_problemNum">0</span>
																		<div class="infobox-content">项目生产难题</div>
																	</div>
																</div>
																
																<div class="infobox infobox-green2">
																	<div class="infobox-icon">
																		<i class="ace-icon fa fa-cubes"></i>
																	</div>
																	<div class="infobox-data">
																		<span class="infobox-data-number" id="ProjectInfo_gpNum">0</span>
																		<div class="infobox-content">主动生产难题</div>
																	</div>
																</div>
																
																<div class="infobox infobox-orange">
																	<div class="infobox-icon">
																		<i class="ace-icon fa fa-anchor"></i>
																	</div>
																	<div class="infobox-data">
																		<span class="infobox-data-number" id="ProjectInfo_lpNum">0</span>
																		<div class="infobox-content">被动生产难题</div>
																	</div>
																</div>
																
						
																<div class="infobox infobox-blue">
																	<div class="infobox-icon">
																		<i class="ace-icon fa fa-user"></i>
																	</div>
						
																	<div class="infobox-data">
																		<span class="infobox-data-number" id="ProjectInfo_peopleNum">0</span>
																		<div class="infobox-content">项目参与人数</div>
																	</div>
						
																</div>
						
																<div class="infobox infobox-pink">
																	<div class="infobox-icon">
																		<i class="ace-icon fa fa-shopping-cart"></i>
																	</div>
						
																	<div class="infobox-data">
																		<span class="infobox-data-number" id="ProjectInfo_TargetNum">0</span>
																		<div class="infobox-content">目标生产难题</div>
																	</div>
																</div>
						
																<div class="infobox infobox-red">
																	<div class="infobox-icon">
																		<i class="ace-icon fa fa-flask"></i>
																	</div>
						
																	<div class="infobox-data">
																		<span class="infobox-data-number" id="ProjectInfo_MethodNum">0</span>
																		<div class="infobox-content">创新方法</div>
																	</div>
																</div>
																
																
																<div class="infobox infobox-orange2">
																	<div class="infobox-icon">
																		<i class="ace-icon fa fa-clock-o"></i>
																	</div>
						
																	<div class="infobox-data">
																		<span class="infobox-data-number" id="ProjectInfo_time">0</span>
																		<div class="infobox-content">项目持续天数</div>
																	</div>
																</div>
																
																<div class="infobox infobox-blue2">
																	<div class="infobox-icon">
																		<i class="ace-icon fa fa-bar-chart"></i>
																	</div>
						
																	<div class="infobox-data">
																		<span class="infobox-data-number" id="ProjectInfo_performance">0</span>
																		<div class="infobox-content">项目综合绩效</div>
																	</div>
																</div>
						
						
															</div>
						
															<div class="vspace-12-sm"></div>
						
															<!-- <div class="col-sm-5">
																<div class="widget-box">
																	<div class="widget-header widget-header-flat widget-header-small">
																		<h5 class="widget-title">
																			<i class="ace-icon fa fa-signal"></i>
																			Traffic Sources
																		</h5>
						
																		<div class="widget-toolbar no-border">
																			<div class="inline dropdown-hover">
																				<button class="btn btn-minier btn-primary">
																					This Week
																					<i class="ace-icon fa fa-angle-down icon-on-right bigger-110"></i>
																				</button>
						
																				<ul class="dropdown-menu dropdown-menu-right dropdown-125 dropdown-lighter dropdown-close dropdown-caret">
																					<li class="active">
																						<a href="#" class="blue">
																							<i class="ace-icon fa fa-caret-right bigger-110">&nbsp;</i>
																							This Week
																						</a>
																					</li>
						
																					<li>
																						<a href="#">
																							<i class="ace-icon fa fa-caret-right bigger-110 invisible">&nbsp;</i>
																							Last Week
																						</a>
																					</li>
						
																					<li>
																						<a href="#">
																							<i class="ace-icon fa fa-caret-right bigger-110 invisible">&nbsp;</i>
																							This Month
																						</a>
																					</li>
						
																					<li>
																						<a href="#">
																							<i class="ace-icon fa fa-caret-right bigger-110 invisible">&nbsp;</i>
																							Last Month
																						</a>
																					</li>
																				</ul>
																			</div>
																		</div>
																	</div>
						
																	<div class="widget-body">
																		<div class="widget-main">
																			<div id="piechart-placeholder" style="width: 90%; min-height: 150px; padding: 0px; position: relative;"><canvas class="flot-base" style="direction: ltr; position: absolute; left: 0px; top: 0px; width: 467px; height: 150px;" width="467" height="150"></canvas><canvas class="flot-overlay" width="467" height="150" style="direction: ltr; position: absolute; left: 0px; top: 0px; width: 467px; height: 150px;"></canvas><div class="legend"><div style="position: absolute; width: 105px; height: 110px; top: 15px; right: -30px; background-color: rgb(255, 255, 255); opacity: 0.85;"> </div><table style="position:absolute;top:15px;right:-30px;;font-size:smaller;color:#545454"><tbody><tr><td class="legendColorBox"><div style="border:1px solid null;padding:1px"><div style="width:4px;height:0;border:5px solid #68BC31;overflow:hidden"></div></div></td><td class="legendLabel">social networks</td></tr><tr><td class="legendColorBox"><div style="border:1px solid null;padding:1px"><div style="width:4px;height:0;border:5px solid #2091CF;overflow:hidden"></div></div></td><td class="legendLabel">search engines</td></tr><tr><td class="legendColorBox"><div style="border:1px solid null;padding:1px"><div style="width:4px;height:0;border:5px solid #AF4E96;overflow:hidden"></div></div></td><td class="legendLabel">ad campaigns</td></tr><tr><td class="legendColorBox"><div style="border:1px solid null;padding:1px"><div style="width:4px;height:0;border:5px solid #DA5430;overflow:hidden"></div></div></td><td class="legendLabel">direct traffic</td></tr><tr><td class="legendColorBox"><div style="border:1px solid null;padding:1px"><div style="width:4px;height:0;border:5px solid #FEE074;overflow:hidden"></div></div></td><td class="legendLabel">other</td></tr></tbody></table></div></div>
						
																			<div class="hr hr8 hr-double"></div>
						
																			<div class="clearfix">
																				<div class="grid3">
																					<span class="grey">
																						<i class="ace-icon fa fa-facebook-square fa-2x blue"></i>
																						&nbsp; likes
																					</span>
																					<h4 class="bigger pull-right">1,255</h4>
																				</div>
						
																				<div class="grid3">
																					<span class="grey">
																						<i class="ace-icon fa fa-twitter-square fa-2x purple"></i>
																						&nbsp; tweets
																					</span>
																					<h4 class="bigger pull-right">941</h4>
																				</div>
						
																				<div class="grid3">
																					<span class="grey">
																						<i class="ace-icon fa fa-pinterest-square fa-2x red"></i>
																						&nbsp; pins
																					</span>
																					<h4 class="bigger pull-right">1,050</h4>
																				</div>
																			</div>
																		</div>/.widget-main
																	</div>/.widget-body
																</div>/.widget-box
															</div>/.col
														 -->
														
														</div>
														
														
														
												</div><!-- /.widget-main -->
											</div><!-- /.widget-body -->
										
						
									</div>
								
								
									
									<div class="widget-box">
											<div class="widget-header widget-header-blue widget-header-flat">
												<h4 class="widget-title lighter">过程监控</h4>
											
											
												</div>
						
											<div class="widget-body">
												<div class="widget-main">
													
													
													<table id="monitorProblemsTable" 
														data-height=750 
														data-toggle="table"
														data-pagination="true" 
														data-unique-id="id"
														data-page-size=30
														data-detail-view="true"
														data-detail-formatter="detailFormatter"
														data-page-list=[10,30,50,All] 
														data-side-pagination="client" >
														<thead>
													       <tr>
													       	   <th data-field="pid" data-visible="false"></th>
													           <th data-field="pdescriptoin">难题描述</th>
													           <th data-field="ptype">难题类别</th>
													           <th data-field="puser">添加者</th>
													           <th data-field="precommend">推荐度</th>
													           <th data-field="pcomment">备注</th>
													           <th data-field="createTime">时间</th>
													           
													           
													           <th data-field="ptarget">是否目标生产难题</th>
													           <th data-field="pplan">是否规划</th>
													           <th data-field="pplanContent" data-visible="false"></th>
													           
													           <th data-field="pmethod" data-visible="false">已匹配创新方法</th>
													           <th data-field="pprogress" data-visible="false">解决进度</th>
													          
													       </tr>
													   </thead>
													</table>
													
													
												</div><!-- /.widget-main -->
											</div><!-- /.widget-body -->
										
						
									</div>
								
							</div>
						</div>
									
							
					
					
					
					</div>
					
					
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" data-dismiss="modal">
							确认
						</button>
					</div>
				</div>
			</div>
		</div>


</body>
</html>