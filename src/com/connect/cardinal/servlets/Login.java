package com.connect.cardinal.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;

import com.connect.cardinal.hibernate.HibernateUtil;
import com.connect.cardinal.objects.User;
import com.connect.cardinal.secure.HashGen;
import com.connect.cardinal.util.ObjectRetriever;
import com.connect.cardinal.util.RequestParser;
import com.google.gson.Gson;

/**
 * Servlet implementation class Login
 */
@WebServlet("/Login")
public class Login extends HttpServlet 
{
	private static final long serialVersionUID = 1L;
    private static PrintWriter out;

       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Login() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		response.setContentType("json/application");
		out = response.getWriter();
		String messageOut = "hello";
		Map<String, String> parameters = RequestParser.getParameters(request.getParameterMap());
		System.out.println(parameters);
	
		if(parameters.get("action").equals("login"))
		{
			messageOut = login(parameters.get("username"), parameters.get("password"));
			if(messageOut.equals("LOGIN_SUCCESS"))
			{
				Gson gson = new Gson();
				messageOut = gson.toJson(messageOut);
				request.getSession().setAttribute("verified", "true");
				request.getSession().setAttribute("userName", parameters.get("username"));
				request.getSession().setMaxInactiveInterval(20 * 60);
			}
		}
		else if(parameters.get("action").equals("register"))
		{
			messageOut = register(parameters.get("username"), parameters.get("password"), 
								parameters.get("firstName"), parameters.get("middleName"), parameters.get("lastName"));
			Gson gson = new Gson();
			messageOut = gson.toJson(messageOut);
		}
		
		System.out.println();
		out.println(messageOut);
	}
	
	/**
	 * 
	 * @param username
	 * @param password
	 * @param firstName
	 * @param middleName
	 * @param lastName
	 * @return
	 */
	private String register(String username, String password, String firstName, String middleName, String lastName) {
		
		Criteria criteria = HibernateUtil.getSession().createCriteria(User.class);
		criteria.add(Restrictions.eqOrIsNull("email", username));
		@SuppressWarnings("unchecked")
		List<User> matchingUser = criteria.list();
		if(matchingUser == null || matchingUser.size() == 0)
		{
			HashGen passGen = new HashGen();
			String hashPass = null;
			
			try {
				hashPass = passGen.getHash(password);
			} catch (NoSuchAlgorithmException e) {
				e.printStackTrace();
				return "INTERNAL_ERROR";
			}
			finally
			{
				if(hashPass == null)
					return "INTERNAL_ERROR";
			}
			User user = new User(firstName, middleName, lastName, username, hashPass);
			Session session = HibernateUtil.getSession();
			Transaction tx = session.beginTransaction();
			
			System.out.println("User:" + session.save(user) + " saved to the database");

			tx.commit();
			session.flush();
			
			return "ACCOUNT_CREATED";
		}
		else
			return "ACCOUNT_EXISTS";		
	}

	private static String login(String username, String password)
	{
		HashGen hashGen = new HashGen();
		String hashPass = null;
		try {
			hashPass = hashGen.getHash(password);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
			return "INTERNAL_ERROR";
		}
		finally { if(hashPass == null) return "INTERNAL_ERROR"; }
		
		@SuppressWarnings("unchecked")
		List<User> users = ObjectRetriever.getUsernamesMatching(username);
		System.out.println(users);
		for(int i = 0; i < users.size(); i++)
		{
			if(users.get(i).getEmail().equals(username) && users.get(i).getPassword().equals(hashPass))
			{
				
				return "LOGIN_SUCCESS";
			}
		}
		
		return "INVALID_CREDENTIALS";
	}
}
