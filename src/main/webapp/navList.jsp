<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body>


	<div id="sidebar" class="sidebar responsive   ace-save-state" data-sidebar="true" data-sidebar-scroll="true" data-sidebar-hover="true">

   <div class="sidebar-shortcuts" id="sidebar-shortcuts">
				<div class="sidebar-shortcuts-large" id="sidebar-shortcuts-large">
					<button class="btn btn-success" title="查看项目" data-toggle="tab" href="" id="checkProjectMana" >
						<i class="ace-icon fa fa-table"></i>
					</button>
					<button class="btn btn-info" data-toggle="modal" data-target="#newProjectModal" title="新建项目">
						<i class="ace-icon fa fa-plus"></i>
					</button>
					<button class="btn btn-warning" title="使用帮助" data-toggle="modal" data-target="#helpModal">
						<i class="ace-icon fa fa-question-circle"></i>
					</button>
					<button class="btn btn-danger" title="我的主页">
						<i class="ace-icon fa fa-paper-plane"></i>
					</button>
				</div>
				<div class="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini">
					<span class="btn btn-success"></span>
					<span class="btn btn-info"></span>
					<span class="btn btn-warning"></span>
					<span class="btn btn-danger"></span>
				</div>
			</div>
    <!-- /.sidebar-shortcuts -->

    <ul class="nav nav-list" style="top: 0px;">
        <li class="">
            <a href="index.html">
                <i class="menu-icon fa fa-tachometer"></i>
                <span class="menu-text"> 个人首页 </span>
            </a>

            <b class="arrow"></b>
        </li>

        <li class="open active">
       		<a href="#" class="dropdown-toggle">
                <i class="menu-icon fa fa-list"></i>
                <span class="menu-text">我创建的 </span>

                <b class="arrow fa fa-angle-down"></b>
            </a>

            <b class="arrow"></b>

            <ul class="submenu" id="createdProject">
            
            </ul>
       
        </li>

        <li class="">
            <a href="#" class="dropdown-toggle">
                <i class="menu-icon fa fa-list"></i>
                <span class="menu-text">我加入的 </span>

                <b class="arrow fa fa-angle-down"></b>
            </a>

            <b class="arrow"></b>

            <ul class="submenu" id="participantedProject">
                
            </ul>
        </li>

    </ul>
    <!-- /.nav-list -->

    <div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
        <i id="sidebar-toggle-icon" class="ace-icon fa fa-angle-double-left ace-save-state" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
    </div>
</div>
		
</body>
</html>