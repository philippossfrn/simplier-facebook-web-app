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
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.logging.Level;
import java.util.logging.Logger;



/**
 *
 * @author philippos
 */
@WebServlet(urlPatterns = {"/update_user"})
public class update_user extends HttpServlet {

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
            System.out.println("I am in add user servlet!!!!");
            // Get the user fields
            //String params = request.getQueryString();
            String username = request.getParameter("username");
            String email = request.getParameter("email");
            String password = request.getParameter("password");
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
            
            // bday is mm/dd/yyyy i will change it to dd/mm/yyyy
            String bday_correct_format = change_date_format(bday);
            
            
            // it's the date user became member
            String current_date = get_current_date();
            
            // For debugging..comment out before push
            ArrayList<String> user_fields = new ArrayList<>();
            user_fields.add(username);
            user_fields.add(email);
            user_fields.add(password);
            user_fields.add(first_name);
            user_fields.add(last_name);
            user_fields.add(bday_correct_format);
            user_fields.add(gender);
            user_fields.add(country);
            user_fields.add(city);
            if(address != "")
                user_fields.add(address);
            user_fields.add(profession);
            if(hobbies != "")
                user_fields.add(hobbies);
            if(more_infos != "")
                user_fields.add(more_infos);
            user_fields.add(current_date);
            for(int i = 0; i < user_fields.size(); i++) {  
                if(user_fields.get(i) != null)
                    System.out.println(user_fields.get(i));
            }  
            
            // Create a new user
            User new_user = new User();
            new_user.setUserName(username);
            new_user.setEmail(email);
            new_user.setPassword(password);
            new_user.setFirstName(first_name);
            new_user.setLastName(last_name);
            new_user.setBirthDate(bday_correct_format);
            //it's the date user became member, can't change that
            new_user.setRegisteredSince(new_user.getRegisteredSince());
            new_user.setGender(gender);
            new_user.setCountry(country);
            new_user.setTown(city);
            if(address != "")
                new_user.setAddress(address);
            new_user.setOccupation(profession);
            if(hobbies != "")
                new_user.setInterests(hobbies);
            if(more_infos != "")
                new_user.setInfo(more_infos);
            // Add user to db
            UserDB new_user_db_instance = new UserDB();
            new_user_db_instance.updateUser(new_user);
            
            // Create string in json format 
            String user_data_same_as_in_db = "{";
            user_data_same_as_in_db += "\"username\": \""+username+"\" ";
            user_data_same_as_in_db += ",";
            user_data_same_as_in_db += "\"email\": \""+email+"\" ";
            user_data_same_as_in_db += ",";
            user_data_same_as_in_db += "\"password\": \""+"*******"+"\" ";
            user_data_same_as_in_db += ",";
            user_data_same_as_in_db += "\"first_name\": \""+first_name+"\" ";
            user_data_same_as_in_db += ",";
            user_data_same_as_in_db += "\"last_name\": \""+last_name+"\" ";
            user_data_same_as_in_db += ",";
            user_data_same_as_in_db += "\"bday\": \""+bday_correct_format+"\" ";
            user_data_same_as_in_db += ",";
            user_data_same_as_in_db += "\"gender\": \""+gender+"\" ";
            user_data_same_as_in_db += ",";
            user_data_same_as_in_db += "\"country\": \""+country+"\" ";
            user_data_same_as_in_db += ",";
            user_data_same_as_in_db += "\"city\": \""+city+"\" ";
            if(address != ""){
                user_data_same_as_in_db += ",";
                user_data_same_as_in_db += "\"address\": \""+address+"\" ";
            }
            user_data_same_as_in_db += ",";
            user_data_same_as_in_db += "\"profession\": \""+profession+"\" ";
            if(hobbies != ""){
               user_data_same_as_in_db += ",";
               user_data_same_as_in_db += "\"hobbies\": \""+hobbies+"\" ";             
            }
            if(more_infos != ""){
                user_data_same_as_in_db += ",";
                user_data_same_as_in_db += "\"more_infos\": \""+more_infos+"\" ";
            }
            user_data_same_as_in_db += ",";
            user_data_same_as_in_db += "\"registered_since\": \""+current_date+"\" ";
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
    
        public String change_date_format(String bday){
            
            String[] arrOfStr = bday.split("-"); 
            String year = "";
            String month = "";
            String day = "";
            int y = 1;
            for (String a : arrOfStr){
                    if (y ==1)
                        year = a;
                    if (y ==2)
                        month = a;
                    if (y == 3)
                        day = a;
                y++;
            } 
            return day +"/"+month+"/"+year;

        }
        
        // Get todays date in proper format
        public String get_current_date(){
            LocalDate date = LocalDate.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            return date.format(formatter);
        }
}