<%
String userid = (String) session.getAttribute("userid");
if (userid == null || userid.equals("")) {
    // Not logged in, go back to login page
    response.sendRedirect("../index.jsp");
    return;
}
%>

<!DOCTYPE html>  
<html>  
<head>  
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">  
<title>Add User Success</title>  
</head>  
<body>  
  
<p>Record successfully saved!</p>  
<jsp:include page="userform.html"></jsp:include>  
  
</body>  
</html>  
