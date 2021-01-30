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
@WebServlet(urlPatterns = {"/get_another_user_posts_from_db"})
public class get_another_user_posts_from_db extends HttpServlet {

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
            
            
            String which_user = request.getParameter("username");
            System.out.println("I am in get another user post  servlet!!!!"+which_user);
            PostDB access_post_db = new PostDB();
            List<Post> user_ten_recent_posts = new ArrayList<>();
            user_ten_recent_posts = access_post_db.getTop10RecentPostsOfUser(which_user);
            System.out.println("????????????????????????????");
//            System.out.println(user_ten_recent_posts);
//            System.out.println("NUMBER OF POSTS: " + user_ten_recent_posts.size());
            if (user_ten_recent_posts.size() == 0){
                String user_has_no_posts = "{";
                user_has_no_posts += "\"username\": \""+which_user+"\" ";
                user_has_no_posts += ",";
                user_has_no_posts += "\"total_posts\": \""+0+"\" ";
                user_has_no_posts += "}";
                System.out.println(user_has_no_posts);
                out.print(user_has_no_posts);
                out.flush();
                out.close();
            }
            Post first_post = user_ten_recent_posts.get(0);
            //out.print();
            String user_ten_posts = "{";
            user_ten_posts += "\"username\": \""+which_user+"\" ";
            
            boolean flag = false;
            for(int i=0;i<user_ten_recent_posts.size();i++){
                Post get_next_post = user_ten_recent_posts.get(i);
                String post = "[";
                
                String post_id = get_next_post.getPostID().toString();
                String desc = get_next_post.getDescription();
                String img_url  = get_next_post.getImageURL();
                String base_64  = get_next_post.getImageBase64();
                String lat = get_next_post.getLatitude();
                String lon = get_next_post.getLongitude();
                String createdat = get_next_post.getCreatedAt();
                post += post_id;
                post += ",";
                post += desc;
                post += ",";
                post += img_url;
                post += ",";
                post += lat;
                post += ",";
                post += lon;
                post += ",";
                post += createdat;
                post += ",";
                post += base_64.replace(",", "edwprepinampikomma");
                post += "]";
//                if(flag) // && (i+1 != user_ten_recent_posts.size())
//                   user_ten_posts += ",";
                user_ten_posts += ",";
                if (i == 0)
                    user_ten_posts += "\""+"first"+"\": \""+post+"\" ";
                if (i == 1)
                    user_ten_posts += "\""+"second"+"\": \""+post+"\" ";
                if (i == 2)
                    user_ten_posts += "\""+"third"+"\": \""+post+"\" ";
                if (i == 3)
                    user_ten_posts += "\""+"fourth"+"\": \""+post+"\" ";
                if (i == 4)
                    user_ten_posts += "\""+"fifth"+"\": \""+post+"\" ";
                if (i == 5)
                    user_ten_posts += "\""+"sixth"+"\": \""+post+"\" ";
                if (i == 6)
                    user_ten_posts += "\""+"seventh"+"\": \""+post+"\" ";
                if (i == 7)
                    user_ten_posts += "\""+"eighth"+"\": \""+post+"\" ";
                if (i == 8)
                    user_ten_posts += "\""+"ninth"+"\": \""+post+"\" ";
                if (i == 9)
                    user_ten_posts += "\""+"tenth"+"\": \""+post+"\" ";
                flag = true;
            }
            user_ten_posts += ",";
            user_ten_posts += "\"total_posts\": \""+user_ten_recent_posts.size()+"\" ";
            user_ten_posts += "}";
            
            out.print(user_ten_posts);
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
