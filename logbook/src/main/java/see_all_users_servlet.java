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
@WebServlet(urlPatterns = {"/see_all_users_servlet"})
public class see_all_users_servlet extends HttpServlet {

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
            System.out.println("I am in my see_all_users_servlet servlet!!!!");
            // Who is using this session??
            String goodbye_msg = "{";
            goodbye_msg += "\"username\": \""+"sth"+"\" ";
            goodbye_msg += ",";
            goodbye_msg += "\"what\": \""+"server_says_goodbye"+"\" ";
            goodbye_msg += "}";
            
            
            String all_usernames_in_db = "{";
            //all_usernames_in_db += "\"username\": \""+"sth"+"\" ";
//            all_usernames_in_db += ",";
//            all_usernames_in_db += "\"what\": \""+"server_says_goodbye"+"\" ";
//            all_usernames_in_db += "}";
            //out.print(all_usernames_in_db);
            UserDB access_db = new UserDB();
            List <String> list_with_all_usernames = access_db.getAllUsersNames();
            
            if (list_with_all_usernames.isEmpty()){
                all_usernames_in_db += "\"what\": \""+"Total 0"+"\" ";
                
            }else if (list_with_all_usernames.size() == 1){
                all_usernames_in_db += "\"username\": \""+list_with_all_usernames.get(0)+"\" ";
                all_usernames_in_db += ",";
                all_usernames_in_db += "\"what\": \""+"Total 1"+"\" ";
                
            }else if (list_with_all_usernames.size() > 1){
                for(int i=0;i<list_with_all_usernames.size();i++){
                    if (i == 0){
                        all_usernames_in_db += "\"username"+i+"\": \""+list_with_all_usernames.get(i)+"\" ";  
                    }else{
                        all_usernames_in_db += ",";
                        all_usernames_in_db += "\"username"+i+"\": \""+list_with_all_usernames.get(i)+"\" ";  
                    }
                      
                } 
                all_usernames_in_db += ",";
                all_usernames_in_db += "\"what\": \""+"Total usernames in DB: "+list_with_all_usernames.size()+"\" ";
                
            }
            all_usernames_in_db += "}";
            
             System.out.println("?????????????????????????????????????");
             System.out.println(all_usernames_in_db);
            out.print(all_usernames_in_db);

            //System.out.println(list_with_all_usernames);
//            List <User> all_users2 = access_db.getUsers();
//            System.out.println("???????????");
//            System.out.println(all_users2);
            //Close servlet connection
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
        
}
