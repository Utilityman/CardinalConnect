package com.connect.cardinal.servlets;

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.connect.cardinal.objects.Internship;

/**
 * @author jmackin
 * CardinalConnect/Internships
 */
@WebServlet("/Internships")
public class Internships extends BaseServlet {

	private static final int ACTIVE = 1;
	private static final int CLOSED = 0;
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;


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
		
		if(parameters.get("action").equals("listInternship"))
		{
			Internship ship = (Internship) Internship.getInternshipsByID(parameters.get("internshipID"));
			ship.setActive(ACTIVE);
			resp = Internship.updateInternshipObject(ship);
		}
		else if(parameters.get("action").equals("unlistInternship"))
		{
			Internship ship = (Internship) Internship.getInternshipsByID(parameters.get("internshipID"));
			ship.setActive(CLOSED);
			resp = Internship.updateInternshipObject(ship);
		}
		else if(parameters.get("action").equals("postNewInternship"))
		{
			System.out.println(request);
			resp = Internship.createAndCommitInternshipFromForm(parameters, (HttpServletRequest) request);
		}
		else if(parameters.get("action").equals("subscribeToInternship"))
		{
			resp = Internship.subscribeUser(parameters, request);
		}
		
		respondToRequest();

	}

}
