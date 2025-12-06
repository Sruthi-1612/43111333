<%@ page import ="java.sql.*" %>
<%
String userid = request.getParameter("uname");    
String pwd = request.getParameter("pass");
Class.forName("com.mysql.jdbc.Driver");
Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/test",
"root", "password");
Statement st = con.createStatement();
ResultSet rs;
rs = st.executeQuery("select * from members where uname='" + userid + "' and pass='" + pwd + "'");
if (rs.next()) {
    session.setAttribute("userid", userid);
    response.sendRedirect("crud/index.jsp");   // <-- important change
} else {
    out.println("Invalid password <a href='index.jsp'>try again</a>");
}
%>

