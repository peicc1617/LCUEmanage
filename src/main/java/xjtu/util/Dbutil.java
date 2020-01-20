package xjtu.util;

import java.sql.Connection;
import java.sql.DriverManager;

public class Dbutil {
	
	private String driver = "com.mysql.jdbc.Driver";
	private String url = "jdbc:mysql://innovation.xjtu.edu.cn:3306/lcue_manager?characterEncoding=utf8&useSSL=false";
	private String user = "xjtucad";
	private String password = "xjtucad";
	private Connection con;
	
	public Dbutil() {
		
	}
	public Dbutil(String url) {
		this.url = url;
	}

	public Connection getConnection() throws Exception{
		Class.forName(driver);
		con = DriverManager.getConnection(url, user, password);
		return con;
	}
	 
	 public void close() throws Exception{
			 if(con != null){
				 con.close();
			 }
		 
	 }
}
