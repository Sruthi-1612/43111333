<%
String userid = (String) session.getAttribute("userid");
if (userid == null || userid.equals("")) {
    // Not logged in, go back to login page
    response.sendRedirect("../index.jsp");
    return;
}
%>

<%@page import="com.javatpoint.dao.UserDao"%>  
<jsp:useBean id="u" class="com.javatpoint.bean.User"></jsp:useBean>  
<jsp:setProperty property="*" name="u"/>  
<%  
UserDao.delete(u);  
response.sendRedirect("viewusers.jsp");  
%>  
