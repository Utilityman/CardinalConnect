package com.connect.cardinal.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.connect.cardinal.secure.SessionTracker;
import com.connect.cardinal.util.RequestParser;

/**
 * Servlet implementation class Home
 * @author jmackin
 */
@WebServlet("/Home")
public class Home extends HttpServlet {
	private static final long serialVersionUID = 1L;
    private static PrintWriter out;
    
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Home() {
        super();
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		if(!SessionTracker.verify(request)) return;
		
		response.setContentType("application/json");
		out = response.getWriter();
		String messageOut = "hello: javascript";
		Map<String, String> parameters = RequestParser.getParameters(request.getParameterMap());
		System.out.println(parameters);
		
		if(parameters.get("action").equals("getHomeData"))
		{
			
		}
		if(parameters.get("action").equals("logout"))
		{
			request.getSession().invalidate();
		}
		
		out.println(messageOut);
	}

}
