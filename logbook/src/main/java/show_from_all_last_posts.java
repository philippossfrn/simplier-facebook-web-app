/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import gr.csd.uoc.cs359.winter2019.logbook.db.PostDB;
import gr.csd.uoc.cs359.winter2019.logbook.db.UserDB;
import gr.csd.uoc.cs359.winter2019.logbook.model.Post;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Kostantinosgregoriou
 */
@WebServlet(urlPatterns = {"/show_from_all_last_posts"})
public class show_from_all_last_posts extends HttpServlet {
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
            System.out.println("I am in my see_from_all_post servlet!!!!");
            // Who is using this session??
//            String goodbye_msg = "{";
//            goodbye_msg += "\"username\": \""+"sth"+"\" ";
//            goodbye_msg += ",";
//            goodbye_msg += "\"what\": \""+"server_says_goodbye"+"\" ";
//            goodbye_msg += "}";
//            
            
            String all_last_posts = "{";
            //all_usernames_in_db += "\"username\": \""+"sth"+"\" ";
//            all_usernames_in_db += ",";
//            all_usernames_in_db += "\"what\": \""+"server_says_goodbye"+"\" ";
//            all_usernames_in_db += "}";
            //out.print(all_usernames_in_db);
          //  PostDB access_db = new PostDB();
            List <Post> list_with_all_last_posts = PostDB.getTop10RecentPosts();
              for(int i=0;i<list_with_all_last_posts.size();i++){
                  if(i==9){
                   all_last_posts += "\"post_id"+i+"\": \""+list_with_all_last_posts.get(i).getPostID().toString()+"\" ";
                        all_last_posts += ",";
                   all_last_posts += "\"username"+i+"\": \""+list_with_all_last_posts.get(i).getUserName()+"\" ";
                        all_last_posts += ",";
                        all_last_posts += "\"desc"+i+"\": \""+list_with_all_last_posts.get(i).getDescription()+"\" ";  
                        all_last_posts += ",";
                         all_last_posts += "\"resourceurl"+i+"\": \""+list_with_all_last_posts.get(i).getResourceURL()+"\" "; 
                        all_last_posts += ",";
                        all_last_posts += "\"imageurl"+i+"\": \""+list_with_all_last_posts.get(i).getImageURL()+"\" "; 
                         all_last_posts += ",";
                        all_last_posts += "\"image64"+i+"\": \""+list_with_all_last_posts.get(i).getImageBase64()+"\" ";
                          all_last_posts += ",";
                        all_last_posts += "\"lat"+i+"\": \""+list_with_all_last_posts.get(i).getLatitude()+"\" "; 
                        all_last_posts += ",";
                        all_last_posts += "\"lon"+i+"\": \""+list_with_all_last_posts.get(i).getLongitude()+"\" "; 
                    all_last_posts += ",";
                      all_last_posts += "\"cretatedat"+i+"\": \""+list_with_all_last_posts.get(i).getCreatedAt()+"\" "; 
                  all_last_posts += ",";
                      all_last_posts += "\""+i+"\": \""+"next"+"\" "; }
                  else{
                        all_last_posts += "\"post_id"+i+"\": \""+list_with_all_last_posts.get(i).getPostID().toString()+"\" ";
                        all_last_posts += ",";
                        all_last_posts += "\"username"+i+"\": \""+list_with_all_last_posts.get(i).getUserName()+"\" ";
                        all_last_posts += ",";
                        all_last_posts += "\"desc"+i+"\": \""+list_with_all_last_posts.get(i).getDescription()+"\" ";  
                        all_last_posts += ",";
                         all_last_posts += "\"resourceurl"+i+"\": \""+list_with_all_last_posts.get(i).getResourceURL()+"\" "; 
                        all_last_posts += ",";
                        all_last_posts += "\"imageurl"+i+"\": \""+list_with_all_last_posts.get(i).getImageURL()+"\" "; 
                         all_last_posts += ",";
                        all_last_posts += "\"image64"+i+"\": \""+list_with_all_last_posts.get(i).getImageBase64()+"\" ";
                          all_last_posts += ",";
                        all_last_posts += "\"lat"+i+"\": \""+list_with_all_last_posts.get(i).getLatitude()+"\" "; 
                        all_last_posts += ",";
                        all_last_posts += "\"lon"+i+"\": \""+list_with_all_last_posts.get(i).getLongitude()+"\" "; 
                    all_last_posts += ",";
                      all_last_posts += "\"createdat"+i+"\": \""+list_with_all_last_posts.get(i).getCreatedAt()+"\" "; 
                      all_last_posts += ",";
                      all_last_posts += "\""+i+"\": \""+"next"+"\", "; }
                    
              } 
                 
//            if (list_with_all_last_posts.isEmpty()){
//                all_last_posts += "\"what\": \""+"Total 0"+"\" ";
//                
//            }else if (list_with_all_last_posts.size() == 1){
//                all_last_posts += "\"username\": \""+list_with_all_last_posts.get(0)+"\" ";
//                all_last_posts += ",";
//                all_last_posts += "\"what\": \""+"Total 1"+"\" ";
//                
//            }else if (list_with_all_last_posts.size() > 1){
//                for(int i=0;i<list_with_all_last_posts.size();i++){
//                    if (i == 0){
//                        all_last_posts += "\"username"+i+"\": \""+list_with_all_last_posts.get(i)+"\" ";  
//                    }else{
//                        all_last_posts += ",";
//                        all_last_posts += "\"username"+i+"\": \""+list_with_all_last_posts.get(i)+"\" ";  
//                    }
//                      
//                } 
//                all_last_posts += ",";
//                all_last_posts += "\"what\": \""+"Total usernames in DB: "+list_with_all_usernames.size()+"\" ";
//                
//            }

    
         all_last_posts += '}';
            
             System.out.println("?????????????????????????????????????");
             System.out.println(all_last_posts);
            out.print(all_last_posts);

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
