package com.connect.cardinal.security;

/**
 * @author jmackin
 *
 */
public class WebSession 
{
	private String id;
	private boolean active;
	
	public WebSession(String id)
	{
		this.id = id;
	}
	
	public String getID()
	{
		return id;
	}
	
	
	public void setActive(boolean active)
	{
		this.active = active;
	}
	
	public boolean isActive()
	{
		return active;
	}
}
