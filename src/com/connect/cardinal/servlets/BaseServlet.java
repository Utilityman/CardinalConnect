package com.connect.cardinal.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.connect.cardinal.secure.SessionTracker;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * @author jmackin
 *
 */
@SuppressWarnings("serial")
public abstract class BaseServlet extends HttpServlet
{
    protected PrintWriter out;
	protected Object resp;
	protected Gson gson;
    
    public BaseServlet()
    {
    	super();
    }
    
    // TODO: have doPost call this to check if the post is valid and then to initialize basic stuffs
    /**
     * This method checks whether or not to continue with a given request. 
     * Servlets should first call this method to see whether they should continue or not.
     * If this method returns with a non-null response, then the Servlet should continue.
     * <br><br>
     * This method checks to see if a request should be followed up upon based on a few tests...
     * First it verifies the session to ensure that a person did not just jump pass the login screen.
     * Then it checks that the parameter map contains an action... If a request does not have an action
     * then it should be ignored. 
     * <br><br>
     * Finally this method sets up a few variables used in each request. 
     * @param request
     * @param response
     * @return
     * @throws IOException
     */
    protected Map<String, String> shouldContinue(HttpServletRequest request, HttpServletResponse response) throws IOException
    {
		Map<String, String> parameters = getParameters(request.getParameterMap());
		
		gson = new Gson();
		resp = "";

		response.setContentType("application/json");
		out = response.getWriter();
		System.out.println("Params: " + parameters);
		System.out.println("Session ID: " + request.getSession().getId());
		
		if(parameters.get("action") == null)
			return null;
	
		if(!SessionTracker.verify(request) && !parameters.get("action").equals("login")) return null;

    	return parameters;
    }
  
    protected abstract void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException;
    
	protected static void returnNothing(PrintWriter out)
	{
		Gson gson = new Gson();
		out.println(gson.toJson(""));
	}
	
	protected static Map<String, String> getParameters(Map<String, String[]> parameters)
	{
		Map<String, String> parameterMap = new HashMap<String, String>();
		Set<String> keySet = parameters.keySet();
		
		Iterator<String> iter = keySet.iterator();
		while (iter.hasNext())
		{
			String key = (String)iter.next();
			String value = parameters.get(key)[0];
			parameterMap.put(key, value);			
		}
		
		return parameterMap;
	}
	
	protected void createSecureGsonObject()
	{
		GsonBuilder builder = new GsonBuilder();
		builder.excludeFieldsWithoutExposeAnnotation();
		gson = builder.create();
	}
	
	protected void respondToRequest()
	{
		if(resp == null)
			resp = "NULL_RESPONSE";
		System.out.println("Response: " + resp);
		System.out.println();
		
		resp = gson.toJson(resp);
		out.println(resp);
	}
}

