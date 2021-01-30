/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author philippos
 */
 

 
import static com.sun.org.apache.xalan.internal.lib.ExsltDatetime.date;
import static com.sun.org.apache.xalan.internal.lib.ExsltDatetime.date;
import gr.csd.uoc.cs359.winter2019.logbook.db.PostDB;
import gr.csd.uoc.cs359.winter2019.logbook.db.UserDB;
import gr.csd.uoc.cs359.winter2019.logbook.model.Post;
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
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpSession;
import java.util.Calendar;
import javax.servlet.annotation.MultipartConfig;



/**
 *
 * @author philippos
 */
@WebServlet(urlPatterns = {"/post_servlet"})
@MultipartConfig(maxFileSize = 1011074)
public class post_servlet extends HttpServlet {

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
            System.out.println("I am in post  servlet!!!!");
            String desc = request.getParameter("desc");
            String lon = request.getParameter("lon");
            String lat = request.getParameter("lat");
            String url = request.getParameter("url");
            
            url = url.replace(" ", "+");
            
            Calendar cal = Calendar.getInstance();
            String time_of_creation = cal.getTime().toString();
            int hour_24 = cal.get(Calendar.HOUR_OF_DAY);
            int hour_12 = cal.get(Calendar.HOUR);
            int minutes = cal.get(Calendar.MINUTE);
            
            System.out.println("==================="+time_of_creation);  
            System.out.println("==================="+hour_24);  
            System.out.println("==================="+hour_12);  
            System.out.println("==================="+minutes);  
            
            HttpSession session=request.getSession();
            String who_is_logged_in = session.getAttribute("username").toString();
            System.out.println("I am in post  servlet!!!!"+ who_is_logged_in);
            
            Post create_new_post = new Post();
            create_new_post.setUserName(who_is_logged_in);
            create_new_post.setDescription(desc);
            create_new_post.setLatitude(lat);
            create_new_post.setLongitude(lon);
            if ("empty_url".equals(url)){
                create_new_post.setImageURL("empty_url");
                  
            }else{
                
                create_new_post.setImageBase64(url);
            }
            create_new_post.setCreatedAt(time_of_creation);
            
            //Add post to post database
            PostDB access_post_db = new PostDB();
            access_post_db.addPost(create_new_post);
            String user_data_same_as_in_db = "{";
            user_data_same_as_in_db += "\"username\": \""+who_is_logged_in+"\" ";
            user_data_same_as_in_db += ",";
            user_data_same_as_in_db += "\"desc\": \""+desc+"\" ";
            user_data_same_as_in_db += ",";
            user_data_same_as_in_db += "\"lon\": \""+lon+"\" ";
            user_data_same_as_in_db += ",";
            user_data_same_as_in_db += "\"lat\": \""+lat+"\" ";
            user_data_same_as_in_db += ",";
            user_data_same_as_in_db += "\"url\": \""+url+"\" ";
            user_data_same_as_in_db += ",";
            user_data_same_as_in_db += "\"createdat\": \""+time_of_creation+"\" ";
            user_data_same_as_in_db += ",";
            user_data_same_as_in_db += "\"all_good\": \""+"yes"+"\" ";
            user_data_same_as_in_db += "}";
            out.print(user_data_same_as_in_db);
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
        try {
            processRequest(request, response);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(add_user_to_db_servlet.class.getName()).log(Level.SEVERE, null, ex);
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
            Logger.getLogger(add_user_to_db_servlet.class.getName()).log(Level.SEVERE, null, ex);
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
    
        
        // Get todays date in proper format
        public String get_current_date(){
            LocalDate date = LocalDate.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            return date.format(formatter);
        }
}
