<%
String userid = (String) session.getAttribute("userid");
if (userid == null || userid.equals("")) {
    response.sendRedirect("../index.jsp");
    return;
}
%>

<!DOCTYPE html>  
<html>  
<head>  
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">  
<title>JSP CRUD Home</title>  
</head>  
<body>  

<h2>Welcome, <%= userid %></h2>
<p><a href="../logout.jsp">Logout</a></p>

<h1>JSP CRUD Example</h1>  
<a href="adduserform.jsp">Add User</a> |  
<a href="viewusers.jsp">View Users</a>  

</body>  
</html>
