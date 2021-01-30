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
@WebServlet(urlPatterns = {"/get_user_data_from_db"})
public class get_user_data_from_db extends HttpServlet {

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
            System.out.println("I am in my get_user_data_from_db servlet!!!!");
            HttpSession session=request.getSession();
            // Who is using this session??
            String who_is_logged_in = session.getAttribute("username").toString();
            // get user from db
            UserDB access_db = new UserDB();
            User get_user = access_db.getUser(who_is_logged_in);
            String username = who_is_logged_in;
            String email = get_user.getEmail();
            String password = get_user.getPassword();
            String first_name = get_user.getFirstName();
            String last_name = get_user.getLastName();
            String bday = get_user.getBirthDate();
            String gender = get_user.getGender().toString();
            String country = get_user.getCountry();
            String city = get_user.getTown();
            String address = get_user.getAddress();
            String profession = get_user.getOccupation();
            String hobbies = get_user.getInterests();
            String more_infos = get_user.getInfo();
            
            System.out.println(get_user);
            // goodbye message --goes to handle_log_out_servlet_response
            String user_data_from_db = "{";
            user_data_from_db += "\"username\": \""+who_is_logged_in+"\" ";
            user_data_from_db += ",";
            user_data_from_db += "\"password\": \""+password+"\" ";
            user_data_from_db += ",";
            user_data_from_db += "\"email\": \""+email+"\" ";
            user_data_from_db += ",";
            user_data_from_db += "\"first_name\": \""+first_name+"\" ";
            user_data_from_db += ",";
            user_data_from_db += "\"last_name\": \""+last_name+"\" ";
            user_data_from_db += ",";
            user_data_from_db += "\"bday\": \""+bday+"\" ";
            user_data_from_db += ",";
            user_data_from_db += "\"gender\": \""+gender+"\" ";
            user_data_from_db += ",";
            user_data_from_db += "\"country\": \""+country+"\" ";
            user_data_from_db += ",";
            user_data_from_db += "\"city\": \""+city+"\" ";
            user_data_from_db += ",";
            user_data_from_db += "\"address\": \""+address+"\" ";
            user_data_from_db += ",";
            user_data_from_db += "\"profession\": \""+profession+"\" ";
            user_data_from_db += ",";
            user_data_from_db += "\"hobbies\": \""+hobbies+"\" ";
            user_data_from_db += ",";
            user_data_from_db += "\"more_infos\": \""+more_infos+"\" ";
            user_data_from_db += ",";
            user_data_from_db += "\"what\": \""+"fill_modal_with_these"+"\" ";
            user_data_from_db += "}";
            out.print(user_data_from_db);

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