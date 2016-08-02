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

import com.connect.cardinal.objects.Internship;
import com.connect.cardinal.objects.Mentorship;
import com.connect.cardinal.objects.User;
import com.connect.cardinal.secure.SessionTracker;
import com.connect.cardinal.util.ObjectRetriever;
import com.connect.cardinal.util.RequestParser;
import com.google.gson.Gson;

/**
 * Servlet implementation class Data
 * @author jmackin
 */
@WebServlet("/Data")
public class Data extends HttpServlet {
	private static final long serialVersionUID = 1L;
    private static PrintWriter out;

       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Data() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		if(!SessionTracker.verify(request)) return;
		
		response.setContentType("application/json");
		out = response.getWriter();
		Map<String, String> parameters = RequestParser.getParameters(request.getParameterMap());
		
		System.out.println("Params: " + parameters);
		String resp = "";
		
		System.out.println("Session ID: " + request.getSession().getId());
		
		
		if(parameters.get("action").equals("getInternships"))
		{
			if(parameters.get("filter").equals(""))
				resp = ObjectRetriever.getActiveInternships();
			else
				resp = ObjectRetriever.getInternshipsWithFilter(parameters.get("filter"));
		}
		else if(parameters.get("action").equals("postInternship"))
		{
			resp = Internship.createAndCommitInternshipFromForm(parameters);
		}
		else if(parameters.get("action").equals("getMentorships"))
		{
			if(parameters.get("filter").equals(""))
				resp = ObjectRetriever.getActiveMentorships();
			else
				resp = ObjectRetriever.getMentorshipssWithFilter(parameters.get("filter"));
		}
		else if(parameters.get("action").equals("postMentorship"))
		{
			resp = Mentorship.createAndCommitMentorshipFromForm(parameters);
		}
		else if(parameters.get("action").equals("getUserAccount"))
		{
			Gson gson = new Gson();
			List user = ObjectRetriever.getUsernamesMatching((String)request.getSession().getAttribute("userName"));
			if(user != null && user.size() != 0)
				resp = gson.toJson((User)user.get(0));
		}

		
		System.out.println("Response: " + resp);
		System.out.println();

		out.println(resp);
	}

}
