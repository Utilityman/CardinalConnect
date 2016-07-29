package com.connect.cardinal.security;

import java.util.ArrayList;

/**
 * Session tracker keeps track of the tomcat users by id and stores
 * them in an object called WebSession. 
 * @author jmackin
 *
 */
public class SessionTracker 
{
	private ArrayList<WebSession> session = new ArrayList<WebSession>();
	
	public boolean verifySession(String id)
	{
		for(int i = 0; i < session.size(); i++)
		{
			if(session.get(i).getID().equals(id) && session.get(i).isActive())
				return true;
		}
		return false;
	}
	
	public void addSession(String id)
	{
		session.add(new WebSession(id));
	}
	
	public boolean authenticateSession(String seshID, boolean status)
	{
		for(int i = 0; i < session.size(); i++)
		{
			if(session.get(i).getID().equals(seshID))
			{
				session.get(i).setActive(status);
				return true;
			}
		}
		return false;
	}
}
