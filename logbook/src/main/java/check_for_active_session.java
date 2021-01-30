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
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpSession;



/**
 *
 * @author philippos
 */
@WebServlet(urlPatterns = {"/check_for_active_session"})
public class check_for_active_session extends HttpServlet {

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
            System.out.println("I am in check for active ession!!!!");
             Cookie cookies[]= request.getCookies();   
               if(cookies!=null){
               for(Cookie c : cookies){
               if(c.getName().equals("name")){
           System.out.println(c.getValue());
                   String answer = "{";
              answer += "\"all_good\": \""+"yeap"+"\" ";
     //         answer +="\"username\": \""+ c.getValue()+"\" ";
              answer += "}";
              out.print(answer);
               
               }
               }
               }else{
                   String answer = "{";
              answer += "\"all_good\": \""+"notck"+"\" ";
     //         answer +="\"username\": \""+ c.getValue()+"\" ";
              answer += "}";
              out.print(answer);
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

}