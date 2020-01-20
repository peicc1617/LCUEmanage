package xjtu.util;


import org.json.JSONArray;
import org.json.JSONObject;

import xjtu.model.AnalysisItems;

public class Jsonutil {

	public static AnalysisItems[] getAttObj(String analysisItems) {
		// TODO Auto-generated method stub
		JSONArray jsonarr = new JSONArray(analysisItems); 
		
		AnalysisItems[] items = new AnalysisItems[jsonarr.length()];
		
		for(int i=0; i<jsonarr.length(); i++) {
			JSONObject jsonObj = jsonarr.getJSONObject(i);
			AnalysisItems item = new AnalysisItems();
			
			item.setItemName((String) jsonObj.get("itemName"));
			
			if (jsonObj.has("standardValue")) {
				item.setStandardValue((String) jsonObj.get("standardValue"));
			}
			if (jsonObj.has("weightValue")) {
				item.setWeightValue((String) jsonObj.get("weightValue"));
			}
			if (jsonObj.has("value")) {
				item.setValue((String) jsonObj.get("value"));
			}
			
			items[i]  = item;
		}
		
		return items;
	}

}
