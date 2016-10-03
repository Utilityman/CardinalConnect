package com.connect.cardinal.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.connect.cardinal.objects.Event;
import com.connect.cardinal.objects.Feedback;
import com.connect.cardinal.objects.Internship;
import com.connect.cardinal.objects.Mentorship;
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
		Gson gson = new Gson();	
		response.setContentType("application/json");
		out = response.getWriter();
		String resp = "";
		
		if(!SessionTracker.verify(request)) {returnNothing(gson, out);return;}

		Map<String, String> parameters = RequestParser.getParameters(request.getParameterMap());
		
		System.out.println("Params: " + parameters);
		System.out.println("Session ID: " + request.getSession().getId());
		
		if(parameters.get("action") == null){returnNothing(gson, out);return;}
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
		else if(parameters.get("action").equals("submitEvent"))
		{
			resp = Event.createAndCommitEventFromForm(parameters);
		}
		else if(parameters.get("action").equals("getEvents"))
		{
			if(parameters.get("filter") == null || parameters.get("filter").equals(""))
				resp = ObjectRetriever.getEvents();
			else
				resp = ObjectRetriever.getEventsWithFilter(parameters.get("filter"));
		}
		else if(parameters.get("action").equals("postFeedback"))
		{
			resp = gson.toJson(Feedback.createAndCommitFeedbackFromForm((String)request.getSession().getAttribute("userName"), parameters));
		}
		else if(parameters.get("action").equals("getAccounts"))
		{
			if(!SessionTracker.verifyAdmin(request)) {resp = gson.toJson("NOT_ADMIN_USER");out.println(resp);return;}
			
			resp = ObjectRetriever.getAccounts(parameters);
		}
		else
		{
			resp = gson.toJson(resp);
		}
		
		
		System.out.println("Response: " + resp);
		System.out.println();
		out.println(resp);
	}
	
	private static void returnNothing(Gson gson, PrintWriter out)
	{
		out.println(gson.toJson(""));
	}

}
