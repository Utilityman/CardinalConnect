package com.connect.cardinal.servlets;

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Home
 * @author jmackin
 */
@WebServlet("/Home")
public class Home extends BaseServlet {
	private static final long serialVersionUID = 1L;
    
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
		Map<String, String> parameters = shouldContinue(request, response);
		if(parameters == null)
		{
			returnNothing(out);
			return;
		}

		if(parameters.get("action").equals("logout"))
		{
			request.getSession().invalidate();
			resp ="OK";
		}
		
		respondToRequest();
	}

}
