package com.connect.cardinal.servlets;

import java.io.IOException;
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

/**
 * Servlet implementation class Data
 *  
 * @author jmackin
 */
@WebServlet("/Data")
public class Data extends BaseServlet 
{
	private static final long serialVersionUID = 1L;
       
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
		Map<String, String> parameters = shouldContinue(request, response);
		if(parameters == null)
		{
			returnNothing(out);
			return;
		}
				
		if(parameters.get("action").equals("getInternships"))
		{
			if(parameters.get("filter").equals(""))
				resp = ObjectRetriever.getInternships();
			else
				resp = ObjectRetriever.getInternshipsWithFilter(parameters.get("filter"));
		}
		else if(parameters.get("action").equals("getInternshipByID"))
		{
			resp = Internship.getInternshipsByID(parameters.get("internshipID"));
		}
		else if(parameters.get("action").equals("getActiveInternships"))
		{
			resp = ObjectRetriever.getActiveInternships();
		}
		else if(parameters.get("action").equals("postInternship"))
		{
			//TODO: WOAH THIS IS GONE - AND BROKEN
			//resp = Internship.createAndCommitInternshipFromForm(parameters);
		}
		else if(parameters.get("action").equals("getMentorships"))
		{
			if(parameters.get("filter").equals(""))
				resp = ObjectRetriever.getMentorships();
			else
				resp = ObjectRetriever.getMentorshipssWithFilter(parameters.get("filter"));
		}
		else if(parameters.get("action").equals("getActiveMentorships"))
		{
			resp = ObjectRetriever.getActiveMentorships();
		}
		else if(parameters.get("action").equals("getMentorshipByID"))
		{
			resp = Mentorship.getMentorshipsByID(parameters.get("mentorshipID"));
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
			if(!SessionTracker.verifyAdmin(request)) {resp = "NOT_ADMIN_USER";out.println(resp);return;}
			
			createSecureGsonObject();
			resp = ObjectRetriever.getAccounts(parameters);
		}
		else if(parameters.get("action").equals("acceptOrDenyMentorship"))
		{
			resp = Mentorship.AcceptOrDeny(parameters);
		}
		else if(parameters.get("action").equals("acceptOrDenyInternship"))
		{
			resp = Internship.AcceptOrDeny(parameters);
		}

		
		respondToRequest();
	}
}
