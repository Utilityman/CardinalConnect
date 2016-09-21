package com.connect.cardinal.secure;

import javax.servlet.http.HttpServletRequest;

/**
 * Session tracker keeps track of the tomcat users by id and stores
 * them in an object called WebSession. 
 * @author jmackin
 *
 */
public class SessionTracker 
{
	public static boolean verify(HttpServletRequest request)
	{
		if(request.getSession().getAttribute("verified") == null) return false;
		if(!request.getSession().getAttribute("verified").equals("true")) return false;
		if(request.getSession().getAttribute("userName") == null) return false;
		System.out.println(request.getSession().getAttribute("userName") + " session: " + request.getSession().getAttribute("verified"));
		return true;
	}
	
	public static boolean verifyAdmin(HttpServletRequest request)
	{

		if(request.getSession().getAttribute("status") == null) return false;
		if(!request.getSession().getAttribute("status").equals("admin")) return false;
		if(request.getSession().getAttribute("userName") == null) return false;
		System.out.println(request.getSession().getAttribute("userName") + " status: " + request.getSession().getAttribute("status"));

		return true;
	}
}
