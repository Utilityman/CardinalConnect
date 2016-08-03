package com.connect.cardinal.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.connect.cardinal.objects.User;
import com.connect.cardinal.secure.SessionTracker;
import com.connect.cardinal.util.ObjectRetriever;
import com.connect.cardinal.util.RequestParser;
import com.google.gson.Gson;

/**
 * Servlet implementation class Account
 */
@WebServlet("/Account")
public class Account extends HttpServlet {
	private static final long serialVersionUID = 1L;
    private static PrintWriter out;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Account() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	@SuppressWarnings("rawtypes")
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		if(!SessionTracker.verify(request)) return;
		
		response.setContentType("application/json");
		out = response.getWriter();
		Map<String, String> parameters = RequestParser.getParameters(request.getParameterMap());
		
		System.out.println("Params: " + parameters);
		String resp = "";
		
		System.out.println("Session ID: " + request.getSession().getId());
		
		if(parameters.get("action").equals("getUserAccount"))
		{
			Gson gson = new Gson();
			List user = ObjectRetriever.getUsernamesMatching((String)request.getSession().getAttribute("userName"));
			if(user != null && user.size() != 0)
				resp = gson.toJson((User)user.get(0));
		}
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
		
		
		System.out.println("Response: " + resp);
		System.out.println();

		out.println(resp);
	}
}
