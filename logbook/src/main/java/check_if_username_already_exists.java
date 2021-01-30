
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
import java.util.Arrays;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;



/**
 *
 * @author philippos
 */
//@WebServlet(urlPatterns = {"/check_if_username_already_exists"})
public class check_if_username_already_exists extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, ClassNotFoundException {
        // I will return json format to my http request and then to callback function
        //response.setContentType("text/html;charset=UTF-8");
        response.setContentType("application/json");
        try (PrintWriter out = response.getWriter()) {
            System.out.println("I am in my servlet to check username3!!!!");
            String what_to_do = request.getParameter("what_to_do");
//            UserDB test = new UserDB();
//            User get_user = test.getUser("superman");
//            System.out.println(get_user.getEmail());
            // If equals to zero then user is typing to username field so check if
            // username already exists in DB
            if(what_to_do.compareTo("check_if_username_exists") == 0){
                String username = request.getParameter("username");
                System.out.println("!!!!"+username);
                //String email = request.getParameter("email");
                UserDB call_userdb = new UserDB();
                // checkValidUserName returns false if username already EXISTS
                boolean exists_or_nah = call_userdb.checkValidUserName(username);
    //            List<String> list = new ArrayList<String>();
    //            list = call_userdb.getAllUsersNames();
    //            System.out.println(Arrays.toString(list.toArray()));
                String invalid_list = "{";
                // checkValidUserName returns false if username already EXISTS
                if(!exists_or_nah){
                    invalid_list += "\"username_already_exists\": \""+"yes"+"\" ";
                    System.out.println("YES!!!!");

                }else{
                    invalid_list += "\"username_already_exists\": \""+"nop"+"\" ";
                    System.out.println("NO!!!!");
                }
                invalid_list += "}";
                out.print(invalid_list);
            }else{
                // If you are here then user is typing to email field so
                // check if the email is already exists in DB
                String email = request.getParameter("email");
                System.out.println("!!!!"+email);
                //String email = request.getParameter("email");
                UserDB call_userdb = new UserDB();
                // checkValidUserName returns false if email already EXISTS
                boolean exists_or_nah = call_userdb.checkValidEmail(email);
    //            List<String> list = new ArrayList<String>();
    //            list = call_userdb.getAllUsersNames();
    //            System.out.println(Arrays.toString(list.toArray()));
                
                String invalid_list = "{";
                // checkValidUserName returns false if email already EXISTS
                if(!exists_or_nah){
                    invalid_list += "\"email_already_exists\": \""+"yes"+"\" ";
                    System.out.println("YES!!!!");

                }else{
                    invalid_list += "\"email_already_exists\": \""+"nop"+"\" ";
                    System.out.println("NO!!!!");
                }
                invalid_list += "}";
                out.print(invalid_list);
            }
        }
    }
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
            Logger.getLogger(check_if_username_already_exists.class.getName()).log(Level.SEVERE, null, ex);
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
            Logger.getLogger(check_if_username_already_exists.class.getName()).log(Level.SEVERE, null, ex);
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
}