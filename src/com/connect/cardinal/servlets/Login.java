package com.connect.cardinal.servlets;

import java.io.IOException;
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
import com.connect.cardinal.objects.UserStatus;
import com.connect.cardinal.secure.HashGen;
import com.connect.cardinal.util.ObjectRetriever;

/**
 * Servlet implementation class Login
 */
@WebServlet("/Login")
public class Login extends BaseServlet 
{
	private static final long serialVersionUID = 1L;

       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Login() {
        super();
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{

		Map<String, String> parameters = shouldContinue(request, response);

		if(parameters == null)
		{
			returnNothing(out);
			return;
		}
	
		if(parameters.get("action").equals("login"))
		{
			System.out.println("trying to login");
			resp = login(parameters.get("username"), parameters.get("password"));

			if(resp.equals("LOGIN_SUCCESS") || resp.equals("LOGIN_ADMIN"))
			{
				request.getSession().setAttribute("verified", "true");
				request.getSession().setAttribute("userName", parameters.get("username"));
				if(resp.equals("LOGIN_ADMIN"))
					request.getSession().setAttribute("status", "admin");
				else
					request.getSession().setAttribute("status", "user");
				request.getSession().setMaxInactiveInterval(60 * 60);
			}
		}
		else if(parameters.get("action").equals("register"))
		{
			resp = register(parameters.get("username"), parameters.get("password"), 
								parameters.get("firstName"), parameters.get("middleName"), 
								parameters.get("lastName"), ObjectRetriever.getUserStatus(parameters.get("status")));
		}
		
		respondToRequest();
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
	private String register(String username, String password, String firstName, String middleName, String lastName, UserStatus status) {
		
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
			User user = new User(firstName, middleName, lastName, username, hashPass, status);
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
		
		User user = ObjectRetriever.getUsernamesMatching(username);

		if(user == null) return "INVALID_CREDENTIALS";
		
		if(user.getEmail().equals(username) && 
				user.getPassword().equals(hashPass))
		{	
			if(user.getStatus() != null && user.getStatus().getUserStatus().equals("Admin"))
				return "LOGIN_ADMIN";
			if(user.getActive() == 0)
				return "ACCOUNT_INACTIVE";
			return "LOGIN_SUCCESS";
		}
		
		return "INVALID_CREDENTIALS";
	}
}
