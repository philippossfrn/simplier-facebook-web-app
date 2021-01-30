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
import java.util.List;



/**
 *
 * @author philippos
 */
@WebServlet(urlPatterns = {"/get_coords_for_every_user_post"})
public class get_coords_for_every_user_post extends HttpServlet {

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
            System.out.println("I am in get all user post  servlet!!!!");
            HttpSession session=request.getSession();
            String who_is_logged_in = session.getAttribute("username").toString();
            PostDB access_post_db = new PostDB();
            
            List<Post> all_posts_from_db = new ArrayList<>();
            all_posts_from_db = access_post_db.getPosts();
            System.out.println("All posts!!!!!!!!!!!!!!!!!!!!!!!" + who_is_logged_in);
            //all_posts_from_db.size()
            int total_user_posts = 0;
            String all_user_posts = "{";
            all_user_posts += "\"username\": \""+who_is_logged_in+"\" ";
            all_user_posts += ",";
            all_user_posts += "\"post\":";
            all_user_posts += "[";
            boolean first_post_of_user = true;
            for(int i=0;i<all_posts_from_db.size();i++){
                System.out.println("Compare "+who_is_logged_in+"with " +all_posts_from_db.get(i).getUserName());
                if ( who_is_logged_in.equals(all_posts_from_db.get(i).getUserName()) ){
                    //all_posts_from_db.get(i).getPostID()
                    //User posts deleted
                    if(first_post_of_user){
                        all_user_posts += all_posts_from_db.get(i).getLongitude()+","+all_posts_from_db.get(i).getLatitude();
                        first_post_of_user = false;
                    }else{
                        all_user_posts += ",";
                        all_user_posts += all_posts_from_db.get(i).getLongitude()+","+all_posts_from_db.get(i).getLatitude();
                    }
                    //all_user_posts += all_posts_from_db.get(i).getLongitude()+","+all_posts_from_db.get(i).getLatitude();
                    //all_user_posts += "\""+"post"+total_user_posts+"\": \""+all_posts_from_db.get(i).getLongitude()+","+all_posts_from_db.get(i).getLatitude()+"\" ";
                    total_user_posts++; //
                }
            }
            all_user_posts += "]";
            all_user_posts += ",";
            all_user_posts += "\"total_posts\": \""+total_user_posts+"\" ";
            all_user_posts += "}";
            System.out.println("========================");
            System.out.println(all_user_posts);
            out.print(all_user_posts);
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

