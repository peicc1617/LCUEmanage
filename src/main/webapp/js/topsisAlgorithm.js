
function runTOPSIS(allProblems) {

	var translatedProblems = new Array();
	var normalizedProblems = new Array();
	
	var posSolution = new Array();
	var negSolution = new Array();
	
	var coeff = new Array(); 
	
	var recommendValues = new Array();

	//转化为三角模糊数和区间数
	translate();
	//标准
	normalize();
	//确定正负理想解
	computeIdeaSolution();
	//确定系数
	computeCoeff();
	//计算综合优先度
	getPriority();
	
	
	return recommendValues;
	
	
	function getPriority() {
		
		var posDistance = new Array();
		var negDistance = new Array();
		
		var A = posSolution;
		var C = negSolution;
		var B = normalizedProblems;
		for (var i in normalizedProblems) {
			posDistance[i] = coeff[0] * Math.sqrt((Math.pow(A[0][0]-B[i][0][0],2) + Math.pow(A[0][1]-B[i][0][1],2) + Math.pow(A[0][2]-B[i][0][2],2))/3)
			                + coeff[1] * Math.abs(A[1]-B[i][1])
			                + coeff[2] * Math.sqrt((Math.pow(A[2][0]-B[i][2][0],2) + Math.pow(A[2][1]-B[i][2][1],2))/2)
			                + coeff[3] * Math.abs(A[3]-B[i][3])
			                + coeff[4] * Math.sqrt((Math.pow(A[4][0]-B[i][4][0],2) + Math.pow(A[4][1]-B[i][4][1],2) + Math.pow(A[4][2]-B[i][4][2],2))/3);
			
			negDistance[i] = coeff[0] * Math.sqrt((Math.pow(C[0][0]-B[i][0][0],2) + Math.pow(C[0][1]-B[i][0][1],2) + Math.pow(C[0][2]-B[i][0][2],2))/3)
            + coeff[1] * Math.abs(C[1]-B[i][1])
            + coeff[2] * Math.sqrt((Math.pow(C[2][0]-B[i][2][0],2) + Math.pow(C[2][1]-B[i][2][1],2))/2)
            + coeff[3] * Math.abs(C[3]-B[i][3])
            + coeff[4] * Math.sqrt((Math.pow(C[4][0]-B[i][4][0],2) + Math.pow(C[4][1]-B[i][4][1],2) + Math.pow(C[4][2]-B[i][4][2],2))/3);
		
			recommendValues[i] = negDistance[i]/(negDistance[i]+posDistance[i]);
		}
		
	}
	
	
	
	function computeCoeff() {
		var delta = new Array();
		for (var i in normalizedProblems) {
			delta[i] = new Array();
			
			delta[i][0] = Math.abs(posSolution[0][0] - normalizedProblems[i][0][0]) +
			 				Math.abs(posSolution[0][1] - normalizedProblems[i][0][1]) +
			 				 Math.abs(posSolution[0][2] - normalizedProblems[i][0][2]);
			delta[i][0] = delta[i][0]/3;
			delta[i][1] = Math.abs(posSolution[1] - normalizedProblems[i][1]);
			
			delta[i][2] = Math.abs(posSolution[2][0] - normalizedProblems[i][2][0]) +
							Math.abs(posSolution[2][1] - normalizedProblems[i][2][1]);
			delta[i][2] = delta[i][2]/2;
			delta[i][3] = Math.abs(posSolution[3] - normalizedProblems[i][3]);
			delta[i][4] = Math.abs(posSolution[4][0] - normalizedProblems[i][4][0]) +
				Math.abs(posSolution[4][1] - normalizedProblems[i][4][1]) +
				 Math.abs(posSolution[4][2] - normalizedProblems[i][4][2]);
			delta[i][4] = delta[i][4]/3;
		}
		
		var maxmax = delta[0][0];
		var minmin = delta[0][0];
		delta.forEach(function(item,indx,arr) {
			item.forEach(function(item1,indx1,arr1) {
				maxmax = Math.max(maxmax,item1);
				minmin = Math.min(minmin,item1);
				
			});
		});
		
		var R = new Array();
		var sumR = new Array();
		for (var i in normalizedProblems) {
			R[i] = new Array();
			for (var j in delta[i]) {
				R[i][j] = (minmin+0.5*maxmax) /(delta[i][j] + 0.5*maxmax);
				if (sumR[j] == undefined) {
					sumR[j] = R[i][j];
				} else {
					sumR[j] += R[i][j];
				}
			}
		}
		
		for (var j in sumR) {
			coeff[j] = sumR[j]/normalizedProblems.length;
		}
		
	}
	
	
	function computeIdeaSolution() {
		
		posSolution[0] = [0.05,0.05,0.05];
		posSolution[1] = 0.05;
		posSolution[2] = [0.05,0.05];
		posSolution[3] = 0.05;
		posSolution[4] = [0.05,0.05,0.05];
		
		negSolution[0] = [1,1,1];
		negSolution[1] = 1;
		negSolution[2] = [1,1];
		negSolution[3] = 1;
		negSolution[4] = [1,1,1];
		
		for (var i in normalizedProblems) {
			posSolution[0][0] = Math.max(posSolution[0][0],normalizedProblems[i][0][0]);
			posSolution[0][1] = Math.max(posSolution[0][1],normalizedProblems[i][0][1]);
			posSolution[0][2] = Math.max(posSolution[0][2],normalizedProblems[i][0][2]);
			posSolution[1] = Math.max(posSolution[1],normalizedProblems[i][1]);
			posSolution[2][0] = Math.max(posSolution[2][0],normalizedProblems[i][2][0]);
			posSolution[2][1] = Math.max(posSolution[2][1],normalizedProblems[i][2][1]);
			posSolution[3] = Math.max(posSolution[3],normalizedProblems[i][3]);
			posSolution[4][0] = Math.max(posSolution[4][0],normalizedProblems[i][4][0]);
			posSolution[4][1] = Math.max(posSolution[4][1],normalizedProblems[i][4][1]);
			posSolution[4][2] = Math.max(posSolution[4][2],normalizedProblems[i][4][2]);
			
			negSolution[0][0] = Math.max(negSolution[0][0],normalizedProblems[i][0][0]);
			negSolution[0][1] = Math.max(negSolution[0][1],normalizedProblems[i][0][1]);
			negSolution[0][2] = Math.max(negSolution[0][2],normalizedProblems[i][0][2]);
			negSolution[1] = Math.max(negSolution[1],normalizedProblems[i][1]);
			negSolution[2][0] = Math.max(negSolution[2][0],normalizedProblems[i][2][0]);
			negSolution[2][1] = Math.max(negSolution[2][1],normalizedProblems[i][2][1]);
			negSolution[3] = Math.max(negSolution[3],normalizedProblems[i][3]);
			negSolution[4][0] = Math.max(negSolution[4][0],normalizedProblems[i][4][0]);
			negSolution[4][1] = Math.max(negSolution[4][1],normalizedProblems[i][4][1]);
			negSolution[4][2] = Math.max(negSolution[4][2],normalizedProblems[i][4][2]);
		}
		
		
		
	}
	
	
	function normalize() {
		
		var scopeL = 0,scopeM = 0,scopeU = 0;
		var cost = 0;
		var peopleL = 0,peopleU = 0;
		var period = 0;
		var rushL = 0,rushM = 0,rushU = 0;
		
		for (var i in translatedProblems) {
			scopeL += translatedProblems[i][0][0] * translatedProblems[i][0][0];
			scopeM += translatedProblems[i][0][1] * translatedProblems[i][0][1];
			scopeU += translatedProblems[i][0][2] * translatedProblems[i][0][2];
			
			cost += translatedProblems[i][1] * translatedProblems[i][1];
			
			peopleL += translatedProblems[i][2][0] * translatedProblems[i][2][0];
			peopleU += translatedProblems[i][2][1] * translatedProblems[i][2][1];
			
			period += translatedProblems[i][3] * translatedProblems[i][3];
			
			rushL += translatedProblems[i][4][0] * translatedProblems[i][4][0];
			rushM += translatedProblems[i][4][1] * translatedProblems[i][4][1];
			rushU += translatedProblems[i][4][2] * translatedProblems[i][4][2];
			
		}
		
		
		for (var i in translatedProblems) {
			var temparr = new Array();
			temparr[0] = [translatedProblems[i][0][0]/ Math.sqrt(scopeU),
						translatedProblems[i][0][1]/ Math.sqrt(scopeM),
						translatedProblems[i][0][2]/ Math.sqrt(scopeL)];
			
			temparr[1] = translatedProblems[i][1] /Math.sqrt(cost);
			
			temparr[2] = [translatedProblems[i][2][0] /Math.sqrt(peopleU),
						translatedProblems[i][2][1] /Math.sqrt(peopleL)];
			
			temparr[3] = translatedProblems[i][3] /Math.sqrt(period);
				
			temparr[4] = [translatedProblems[i][4][0]/ Math.sqrt(scopeU),
				translatedProblems[i][4][1]/ Math.sqrt(scopeM),
				translatedProblems[i][4][2]/ Math.sqrt(scopeL)];
			
			normalizedProblems[i] = temparr;
		}
		
	}
	
	
	function translate() {
		
		for (var i in allProblems) {
			
			var temparr = new Array();
			
			//三角模糊数表示影响范围
			if (allProblems[i].pscope == "车间局部") {
				temparr[0] = [0.01, 0.1, 0.2];
			} else if (allProblems[i].pscope == "单车间") {
				temparr[0] = [0.3, 0.4, 0.5];
			} else if (allProblems[i].pscope == "多车间") {
				temparr[0] = [0.6, 0.7, 0.8];
			} else {
				temparr[0] = [0.9, 1.0, 1.0];
			}
			
			temparr[1] = parseInt(allProblems[i].pcost);
			
			var interval = allProblems[i].ppeople.split("-");
			temparr[2] = [parseInt(interval[0]), parseInt(interval[1])]; //区间数
			
			temparr[3] = parseInt(allProblems[i].pperid);
			
			//三角模糊数表示影响范围
			if (allProblems[i].prush == "很低") {
				temparr[4] = [0.01, 0.1, 0.2];
			} else if (allProblems[i].prush == "低") {
				temparr[4] = [0.2, 0.3, 0.4];
			} else if (allProblems[i].prush == "一般") {
				temparr[4] = [0.4, 0.5, 0.6];
			} else if (allProblems[i].prush == "高") {
				temparr[4] = [0.6, 0.7, 0.8];
			} else {
				temparr[4] = [0.8, 0.9, 1.0];
			}
			
			translatedProblems[i] = temparr;
		}
		
	}
	
}

