package com.connect.cardinal.servlets;

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.connect.cardinal.objects.User;
import com.connect.cardinal.util.ObjectRetriever;

/**
 * Servlet implementation class Account
 */
@WebServlet("/Account")
public class Account extends BaseServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Account() {
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
		
		if(parameters.get("action").equals("getUserAccount"))
		{
			createSecureGsonObject();
			resp = ObjectRetriever.getUsernamesMatching((String)request.getSession().getAttribute("userName"));
		}
		// TODO: Make sure these work! (cause they don't probably!)
		else if(parameters.get("action").equals("editStudentOrAlum"))
		{
			resp = User.editStudentOrAlum(parameters);
		}
		else if(parameters.get("action").equals("editFocus"))
		{
			resp = User.editFocus(parameters);
		}
		else if(parameters.get("action").equals("editCompany"))
		{
			resp = User.editCompany(parameters);
		}
		else if(parameters.get("action").equals("acceptOrDenyAccount"))
		{
			resp = User.AcceptOrDeny(parameters);
		}
		
		
		respondToRequest();
	}
}
