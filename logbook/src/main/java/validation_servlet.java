/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author philippos
 */
 

 
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
//import jdk.internal.util.xml.impl.Pair;
import java.lang.*; 
import java.io.FileWriter;



/**
 *
 * @author philippos
 */
@WebServlet(urlPatterns = {"/validation_servlet"})
public class validation_servlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    //"{\"my_key\": \"" +username+ "\"}";
    //"{"+"\"my_key\": \""+username+"\" "+","+" \"username\": \""+username+"\""+"}";
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // I will return json format to my http request
        response.setContentType("application/json");
        //PrintWriter out = response.getWriter();
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            System.out.println("I am in my servlet!!!!");
            // Get the user fields
            //String params = request.getQueryString();
            String username = request.getParameter("username");
            String email = request.getParameter("email");
            String password = request.getParameter("password");
            String password_conf = request.getParameter("password_conf");
            String first_name = request.getParameter("first_name");
            String last_name = request.getParameter("last_name");
            String bday = request.getParameter("bday");
            String gender = request.getParameter("gender");
            String country = request.getParameter("country");
            String city = request.getParameter("city");
            String address = request.getParameter("address");
            String profession = request.getParameter("profession");
            String hobbies = request.getParameter("hobbies");
            String more_infos = request.getParameter("more_infos");
            
            // Put all fields of user fields to an arraylist
            // I will parse it to make_invalid_list function later
            ArrayList<String> user_fileds = new ArrayList<String>();
            user_fileds.add(username);
            user_fileds.add(email);
            user_fileds.add(password);
            user_fileds.add(password_conf);
            user_fileds.add(first_name);
            user_fileds.add(last_name);
            user_fileds.add(bday);
            user_fileds.add(gender);
            user_fileds.add(country);
            user_fileds.add(city);
            user_fileds.add(address);
            user_fileds.add(profession);
            user_fileds.add(hobbies);
            user_fileds.add(more_infos);
            // This list i will return it if there no errors 
            String original_list = "{";
            original_list += "\"username\": \""+username+"\" ";
            original_list += ",";
            original_list += "\"email\": \""+email+"\" ";
            original_list += ",";
            original_list += "\"password\": \""+password+"\" ";
            original_list += ",";
            original_list += "\"password_conf\": \""+password_conf+"\" ";
            original_list += ",";
            original_list += "\"first_name\": \""+first_name+"\" ";
            original_list += ",";
            original_list += "\"last_name\": \""+last_name+"\" ";
            original_list += ",";
            original_list += "\"bday\": \""+bday+"\" ";
            original_list += ",";
            original_list += "\"gender\": \""+gender+"\" ";
            original_list += ",";
            original_list += "\"country\": \""+country+"\" ";
            original_list += ",";
            original_list += "\"city\": \""+city+"\" ";
            original_list += ",";
            original_list += "\"address\": \""+address+"\" ";
            original_list += ",";
            original_list += "\"profession\": \""+profession+"\" ";
            original_list += ",";
            original_list += "\"hobbies\": \""+hobbies+"\" ";
            original_list += ",";
            original_list += "\"more_infos\": \""+more_infos+"\" ";
            original_list += ",";
            original_list += "\"errors\": \""+"nop"+"\" ";
            original_list += "}";
            // HashMap<String, String> invalid_list = tmp.make_invalid_list(user_fileds);
            
            // Call make_invalid_list function 
            // Pass the user fields(arraylist) to the function by reference
            // It will return a string in json format which i will print it as my servlet response
            String invalid_list = make_invalid_list(user_fileds);
            // If the length of invalid list is 19 means that only contains this
            // {"errors": "nop" } so return original list 
            // If it's not 18 means that at least one error detected so return the invalid list
            if(invalid_list.length() == 18){
                out.print(original_list);
            }else{
                out.print(invalid_list); 
            }
            out.flush();
            out.close();
        }
    }
        // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
        
        // This function is responsible to return a string in json format with 
        // all invalids fields
        // I am using + operator to concat strings together
        // I am checking if the string i will concat is the first one continue
        // else put a comma first --means that already another "entry" was concated
        public String make_invalid_list(ArrayList<String> user_fields){
            String invalid_list = "{";
            boolean first_entry_flag = true;
            HashMap<String, String> invalid_user_fields=invalid_user_fields = new HashMap<String, String>();
            if(!user_fields.get(0).matches("[A-Za-z]{8,}")){
                invalid_user_fields.put("username",user_fields.get(0));
                if (first_entry_flag){
                    invalid_list += "\"username\": \""+user_fields.get(0)+"\" ";
                    first_entry_flag = false;
                }else{
                    invalid_list += ",";
                    invalid_list += "\"username\": \""+user_fields.get(0)+"\" ";
                }
            }
            if(!user_fields.get(1).matches("[^@]+@[^@]+\\.[a-zA-Z]{2,6}")){
                invalid_user_fields.put("email",user_fields.get(1));
                if (first_entry_flag){
                    invalid_list += "\"email\": \""+user_fields.get(1)+"\" ";
                    first_entry_flag = false;
                }else{
                    invalid_list += ",";
                    invalid_list += "\"email\": \""+user_fields.get(1)+"\" ";
                }
            }
            if(!user_fields.get(2).matches("^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9]).{3,}")){
                invalid_user_fields.put("password",user_fields.get(2));
                if (first_entry_flag){
                    invalid_list += "\"password\": \""+"Can't show you that! It's not safe"+"\" ";
                    first_entry_flag = false;
                }else{
                    invalid_list += ",";
                    invalid_list += "\"password\": \""+"Can't show you that! It's not safe"+"\" ";
                }
            }
            if(!user_fields.get(3).matches("^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9]).{3,}")){
                invalid_user_fields.put("password_conf",user_fields.get(3));
                if (first_entry_flag){
                    invalid_list += "\"password_conf\": \""+"Can't show you that! It's not safe"+"\" ";
                    first_entry_flag = false;
                }else{
                    invalid_list += ",";
                    invalid_list += "\"password_conf\": \""+"Can't show you that! It's not safe"+"\" ";
                }
            }
            if(!user_fields.get(4).matches("([A-Za-z]){3,15}")){
                invalid_user_fields.put("first_name",user_fields.get(4));
                if (first_entry_flag){
                    invalid_list += "\"first_name\": \""+user_fields.get(4)+"\" ";
                    first_entry_flag = false;
                }else{
                    invalid_list += ",";
                    invalid_list += "\"first_name\": \""+user_fields.get(4)+"\" ";
                }
            }
            if(!user_fields.get(5).matches("([A-Za-z]){3,15}")){
                invalid_user_fields.put("last_name",user_fields.get(5));
                if (first_entry_flag){
                    invalid_list += "\"last_name\": \""+user_fields.get(5)+"\" ";
                    first_entry_flag = false;
                }else{
                    invalid_list += ",";
                    invalid_list += "\"last_name\": \""+user_fields.get(5)+"\" ";
                }
            }
            if(!user_fields.get(9).matches("([A-Za-zΑ-Ωα-ω]){2,20}")){
                invalid_user_fields.put("city",user_fields.get(9));
                if (first_entry_flag){
                    invalid_list += "\"city\": \""+user_fields.get(9)+"\" ";
                    first_entry_flag = false;
                }else{
                    invalid_list += ",";
                    invalid_list += "\"city\": \""+user_fields.get(9)+"\" ";
                }
            }
            if(!user_fields.get(11).matches("([A-Za-z]){3,15}")){
                invalid_user_fields.put("profession",user_fields.get(11));
                if (first_entry_flag){
                    invalid_list += "\"profession\": \""+user_fields.get(11)+"\" ";
                    first_entry_flag = false;
                }else{
                    invalid_list += ",";
                    invalid_list += "\"profession\": \""+user_fields.get(11)+"\" ";
                }
            }
            if (user_fields.get(2).compareTo(user_fields.get(3)) != 0){
                if (first_entry_flag){
                    invalid_list += "\"missmatch\": \""+"Passwords don't match"+"\" ";
                    first_entry_flag = false;
                }else{
                    invalid_list += ",";
                    invalid_list += "\"missmatch\": \""+"Passwords don't match"+"\" ";
                }
            }
            if (first_entry_flag){
                invalid_list += "\"errors\": \""+"nop"+"\" ";
                first_entry_flag = false;
            }else{
                invalid_list += ",";
                invalid_list += "\"errors\": \""+"sure"+"\" ";
            }
            invalid_list += "}";
            return(invalid_list);
       }
}
                         
//    public class check_fields_class {
//        public ArrayList<String> make_invalid_list(ArrayList<String> user_fields)    {
//            ArrayList<String> invalid_user_fields = new ArrayList<String>();
//            if(!user_fields.get(0).matches("[A-Za-z]{8,}")){
//                invalid_user_fields.add(user_fields.get(0));
//            }
//            return(invalid_user_fields);
//       }
//    }
//    public boolean check_fields(ArrayList<String> user_fields){
//        boolean all_valid = true;
//        if (!user_fields.get(0).matches("[A-Za-z]{8,}") || //username
//            !user_fields.get(1).matches("[^@]+@[^@]+\\.[a-zA-Z]{2,6}") || //email
//            !user_fields.get(2).matches("^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9]).{3,}") || //password
//            !user_fields.get(3).matches("^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9]).{3,}") || //password_config
//            !user_fields.get(4).matches("([A-Za-z]){3,15}") || //first_name
//            !user_fields.get(5).matches("([A-Za-z]){3,15}") || //last_name
//            !user_fields.get(9).matches("([A-Za-zΑ-Ωα-ω]){2,20}") || //city
//            !user_fields.get(11).matches("([A-Za-z]){3,15}") ){ //profession
//           all_valid = false;
//        }
//        return all_valid;
//    }
//    public boolean cmpr_passwords(ArrayList<String> user_fields){
//        boolean passwords_matches = true;
//        if (user_fields.get(2).compareTo(user_fields.get(3)) != 0){
//            passwords_matches = false;
//        }
//        return passwords_matches;
//    }
//            String jsonStr = "{\"my_key\": \"my_value\"}";
//            out.print(jsonStr);
//            out.flush();
//            out.close();
//            out.println("</body>");
//            out.println("</html>");
//            RequestDispatcher view = request.getRequestDispatcher("test1/Web Pages/file.html");
//            view.forward(request, response); 
//            response.getWriter().write("sskhbskjbn"); ---> response body
//            if ( cmpr_passwords(user_fileds)){
//               //out.println("<p>All fields are valid</p>");
//            }else{
//               //out.println("<p>Some field is invalid or/and password didn't match</p>");
//            }