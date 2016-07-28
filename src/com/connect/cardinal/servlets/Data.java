package com.connect.cardinal.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.connect.cardinal.objects.Internship;
import com.connect.cardinal.objects.Mentorship;
import com.connect.cardinal.util.ObjectRetriever;
import com.connect.cardinal.util.RequestParser;

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
		response.setContentType("application/json");
		out = response.getWriter();
		Map<String, String> parameters = RequestParser.getParameters(request.getParameterMap());
		System.out.println(parameters);
		String resp = "";
		
		if(parameters.get("action").equals("getInternships"))
		{
			resp = ObjectRetriever.getActiveInternships();
		}
		else if(parameters.get("action").equals("postInternship"))
		{
			resp = Internship.createAndCommitInternshipFromForm(parameters);
		}
		else if(parameters.get("action").equals("getMentorships"))
		{
			resp = ObjectRetriever.getActiveMentorships();
		}
		else if(parameters.get("action").equals("postMentorship"))
		{
			resp = Mentorship.createAndCommitMentorshipFromForm(parameters);
		}

		
		System.out.println();
		out.println(resp);
	}

}
