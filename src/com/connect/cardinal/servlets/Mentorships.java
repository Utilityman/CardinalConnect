package com.connect.cardinal.servlets;

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.connect.cardinal.objects.Mentorship;

/**
 * @author jmackin
 *
 */
@WebServlet("/Mentorships")
public class Mentorships extends BaseServlet
{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/* (non-Javadoc)
	 * @see com.connect.cardinal.servlets.BaseServlet#doPost(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException 
	{
		Map<String, String> parameters = shouldContinue(request, response);
		if(parameters == null)
		{
			returnNothing(out);
			return;
		}
		
		if(parameters.get("action").equals("listMentorship"))
		{
			Mentorship ship = (Mentorship) Mentorship.getMentorshipsByID(parameters.get("mentorshipID"));
			ship.setActive(1);
			resp = Mentorship.saveMentorshipObject(ship);
		}
		else if(parameters.get("action").equals("unlistMentorship"))
		{
			Mentorship ship = (Mentorship) Mentorship.getMentorshipsByID(parameters.get("mentorshipID"));
			ship.setActive(0);
			resp = Mentorship.saveMentorshipObject(ship);
		}
		//!!
		else if(parameters.get("action").equals("postNewMentorship"))
		{
			System.out.println(request);
			resp = Mentorship.createAndCommitMentorshipFromForm(parameters, (HttpServletRequest) request);
		}
		else if(parameters.get("action").equals("subscribeToMentorship"))
		{
			resp = Mentorship.subscribeUser(parameters, request);
			
		}
		
		respondToRequest();
	}

}
