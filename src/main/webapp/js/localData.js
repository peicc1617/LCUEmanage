var innoMethod = [ 
	
		{
			"name":"DMAIC",
			"descriptoin":"DMAIC是六西格玛管理中流程改善的重要工具",
			"URI": "/templates/project/problem.html?referID=1",
			"type": "templet",
			
			"filed":{
				"quality":["质量保证","质量控制"],
				"design":[],
				"efficiency":[],
				"resources":[],
				"manager":["质量管理","生产管理","成本管理"],
			},
			"lifecycle":["制造"],
			"organizational":["流程生产","混合生产"],
			"batch":["大批量"],
			"mode":["自制生产"],
		},
		
		{
			"name":"VSM",
			"descriptoin":"VSM是精益制造生产系统框架下的一种用来描述物流和信息流的形象化工具",
			"URI": "/templates/project/problem.html?referID=3",
			"type": "templet",
			
			"filed":{
				"quality":[],
				"design":[],
				"efficiency":["现场管理","生产布局","物流信息","生产浪费"],
				"resources":["人力资源","设备资源","物料资源","服务资源"],
				"manager":["生产管理","物料管理","成本管理"],
			},
			"lifecycle":["制造","运维","整机装配"],
			"organizational":["离散生产","流程生产","混合生产"],
			"batch":["大批量","小批量生产","单件生产"],
			"mode":["自制生产","外协生产","外购生产"],
		},
		
		{
			"name":"SIPOC",
			"descriptoin":"SIPOC模型是组织系统模型，用于流程管理和改进的技术",
			"URI": "/SIPOC?referID=1",
			"type": "basic",
			
			"filed":{
				"quality":["质量计划"],
				"design":[],
				"efficiency":["现场管理","物流信息"],
				"resources":["设备资源","物料资源","服务资源"],
				"manager":["生产管理","物料管理","成本管理"],
			},
			
			"lifecycle":["研发设计","制造","运维"],
			"organizational":["离散生产","流程生产","混合生产"],
			"batch":["大批量","小批量生产","单件生产"],
			"mode":["自制生产","外协生产","外购生产"],
		},
		
		
		{
			"name":"鱼骨图",
			"descriptoin":"鱼骨图是一种从人机料法环分析原因的工具",
			"URI": "/fishbone?referID=1",
			"type": "basic",
			
			"filed":{
				"quality":[],
				"design":[],
				"efficiency":["现场管理","生产浪费"],
				"resources":["人力资源","设备资源","物料资源"],
				"manager":["计划管理","生产管理","物料管理","成本管理"],
			},
			
			"lifecycle":["研发设计","制造","运维"],
			"organizational":["离散生产","流程生产","混合生产"],
			"batch":["大批量","小批量生产","单件生产"],
			"mode":["自制生产","外协生产","外购生产"],
		},
		
		
		{
			"name":"PQ分析法",
			"descriptoin":"PQ分析法用来对生产的产品按照数量进行分类，然后根据分类结果对生产车间进行布局优化",
			"URI": "/PQanalysis?referID=1",
			"type": "basic",
			
			"filed":{
				"quality":[],
				"design":[],
				"efficiency":["现场管理","生产布局","生产浪费"],
				"resources":["设备资源","物料资源"],
				"manager":["生产管理","物料管理","成本管理"],
			},
			
			"lifecycle":["制造","运维"],
			"organizational":["流程生产","混合生产"],
			"batch":["大批量","小批量生产"],
			"mode":["自制生产","外协生产"],
		},
		
		
		{
			"name":"kano分析",
			"descriptoin":"kano分析以分析用户需求对用户满意的影响为基础，体现了产品性能和用户满意之间的非线性关系",
			"URI": "/kano?referID=1",
			"type": "basic",
			
			"filed":{
				"quality":[],
				"design":["功能设计","产品设计","系统设计"],
				"efficiency":[],
				"resources":["人力资源"],
				"manager":["成本管理"],
			},
			
			"lifecycle":["研发设计","运维"],
			"organizational":["流程生产","混合生产","离散生产"],
			"batch":["大批量","小批量生产","单件生产"],
			"mode":["自制生产","外协生产","外购生产"],
		},
		
		{
			"name":"工艺性能分析",
			"descriptoin":"工艺性能分析用于分析工艺性能，寻找工艺网络中的关键节点",
			"URI": "/mepn?referID=1",
			"type": "basic",
			
			"filed":{
				"quality":["质量保证"],
				"design":[],
				"efficiency":[],
				"resources":["物料资源"],
				"manager":["质量管理","成本管理"],
			},
			
			"lifecycle":["制造"],
			"organizational":["流程生产","混合生产","离散生产"],
			"batch":["大批量","小批量生产","单件生产"],
			"mode":["自制生产","外协生产"],
		},
		
		{
			"name":"质量预测",
			"descriptoin":"采用智能算法进行质量预测",
			"URI": "/predict?referID=1",
			"type": "basic",
			
			"filed":{
				"quality":["质量保证","质量计划"],
				"design":[],
				"efficiency":[],
				"resources":[],
				"manager":["质量管理"],
			},
			
			"lifecycle":["制造"],
			"organizational":["流程生产","混合生产","离散生产"],
			"batch":["大批量","小批量生产","单件生产"],
			"mode":["自制生产","外协生产"],
		},
	
] 
		
