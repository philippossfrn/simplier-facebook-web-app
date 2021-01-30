/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author philippos
 */
 
import gr.csd.uoc.cs359.winter2019.logbook.db.UserDB;
import gr.csd.uoc.cs359.winter2019.logbook.model.User;

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
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpSession;



/**
 *
 * @author philippos
 */
@WebServlet(urlPatterns = {"/log_in_servlet"})
public class log_in_servlet extends HttpServlet {

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
            throws ServletException, IOException, ClassNotFoundException {
        // I will return json format to my http request
        response.setContentType("application/json");
        //PrintWriter out = response.getWriter();
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            System.out.println("I am in my log_in servlet!!!!");
            // Get the user fields
            //String params = request.getQueryString();
            String username = request.getParameter("username");
            System.out.println(username);
            String password = request.getParameter("password");
            // There will be parameter named what ONLY when log_out request will come 
            // Else is Null
//            String what = request.getParameter("what");
//            if(what != null){
//                //session.getAttribute("username").toString()
//                HttpSession session=request.getSession();
//                String test = session.getAttribute("username").toString();
//                                            String goodbye_msg = "{";
//                          goodbye_msg += "\"username\": \""+test+"\" ";
//            goodbye_msg += ",";
//            goodbye_msg += "\"what\": \""+"server_says_goodbye"+"\" ";
//            goodbye_msg += "}";
//            out.print(goodbye_msg);
//                session.invalidate();
//                RequestDispatcher req_dis = getServletContext().getRequestDispatcher("register.html");
////                        response.sendRedirect("log_out_servlet");
//                req_dis.forward(request, response);
//            }
            
            // Put all fields of user fields to an arraylist
            // I will parse it to make_invalid_list function later
            ArrayList<String> user_fileds = new ArrayList<String>();
            user_fileds.add(username);
            user_fileds.add(password);
            // This list i will return it if there no errors 
            String original_list = "{";
            original_list += "\"username\": \""+username+"\" ";
            original_list += ",";
            original_list += "\"password\": \""+password+"\" ";
            original_list += ",";
            original_list += "\"errors\": \""+"nop"+"\" ";
            original_list += "}";
            //System.out.println("???????????????????"+original_list);
            
            // I will return this when username & password are valid 
            // but username has not been found in Database
            String custom_error = "{";
            custom_error += "\"errors\": \""+"username_not_found"+"\" ";
            custom_error += "}";
            
            // I will return this when username & password are valid 
            // username found but password is not match 
            String custom_error_pass = "{";
            custom_error_pass += "\"errors\": \""+"password_not_match"+"\" ";
            custom_error_pass += "}";
            
            // I will return this when user is logged in 
            String welcome_msg = "{";
            welcome_msg += "\"username\": \""+username+"\" ";
            welcome_msg += ",";
            welcome_msg += "\"errors\": \""+"server_says_welcome"+"\" ";
            welcome_msg += "}";
            
            // Call make_invalid_list function 
            // Pass the user fields(arraylist) to the function by reference
            // It will return a string in json format which i will print it as my servlet response
            String invalid_list = make_invalid_list(user_fileds);
            
            // If the length of invalid list is 18 means that only contains this
            // {"errors": "nop" } so return proceed to check if this username exists and
            // confirm password
            // If it's not 18 means that at least one error detected so return the invalid list
            if(invalid_list.length() == 18){
                // if user gave correct data check if exists in Data base
                UserDB access_db = new UserDB();
                List <String> list_with_all_usernames = access_db.getAllUsersNames();
                if(list_with_all_usernames.contains(username)){
                    User get_user = access_db.getUser(username);
                    if (get_user.getPassword().equals(password)){
                        // Now user can log in
                        out.print(welcome_msg);
                        ///RequestDispatcher req_dis = request.getRequestDispatcher("log_out_servlet");
                        HttpSession session=request.getSession();  
                        session.setAttribute("username",username);
                        RequestDispatcher req_dis = getServletContext().getRequestDispatcher("register.html");
//                        response.sendRedirect("log_out_servlet");
                        req_dis.forward(request, response);
                    }else{
                        // username found but wrong password
                        out.print(custom_error_pass);
                        out.flush();
                        out.close();
                    }
                }else{
                    // means that username is not found
                    out.print(custom_error);
                    out.flush();
                    out.close();
                }
//                User get_user = access_db.getUser(username);
//                System.out.println(get_user.getPassword());
//                System.out.println("======================================");
//                System.out.println(get_user);
//                System.out.println(original_list);

            }else{
                System.out.println("9999999999999999999999999999999");
                out.print(invalid_list);
                out.flush();
                out.close();
            }
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
        try {
            processRequest(request, response);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(log_in_servlet.class.getName()).log(Level.SEVERE, null, ex);
        }
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
        try {
            processRequest(request, response);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(log_in_servlet.class.getName()).log(Level.SEVERE, null, ex);
        }
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
            if(!user_fields.get(1).matches("^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9]).{3,}")){
                invalid_user_fields.put("password",user_fields.get(1));
                if (first_entry_flag){
                    invalid_list += "\"password\": \""+"Can't show you that! It's not safe"+"\" ";
                    first_entry_flag = false;
                }else{
                    invalid_list += ",";
                    invalid_list += "\"password\": \""+"Can't show you that! It's not safe"+"\" ";
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