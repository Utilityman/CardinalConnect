package com.connect.cardinal.util;

import java.util.List;
import java.util.Map;

import org.hibernate.Query;
import org.hibernate.Session;

import com.connect.cardinal.hibernate.HibernateUtil;
import com.connect.cardinal.objects.UserStatus;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * @author jmackin
 *
 */
@SuppressWarnings("rawtypes")
public class ObjectRetriever 
{
	private static final String FROM = "FROM com.connect.cardinal.objects.";
	private static final int INACTIVE = 0;
	private static final int ACTIVE = 1;
	private static final int RETRIEVAL_METHOD = ACTIVE;
	
	public static String getActiveInternships()
	{
		Session session = HibernateUtil.getSession();
		Gson gson = new Gson();
		String activeInternships = FROM + "Internship E WHERE E.active = " + ACTIVE;
		Query query = session.createQuery(activeInternships);
		List results = query.list();
		return gson.toJson(results);
	}
	
	public static String getInactiveInternships()
	{
		Session session = HibernateUtil.getSession();
		Gson gson = new Gson();
		String inactiveInternships = FROM + "Internship E where e.active = " + INACTIVE;
		Query query = session.createQuery(inactiveInternships);
		List results = query.list();
		return gson.toJson(results);
	}

	/**
	 * @return
	 */
	public static String getActiveMentorships() 
	{
		Session session = HibernateUtil.getSession();
		Gson gson = new Gson();
		String activeInternships = FROM + "Mentorship E WHERE E.active = "+ ACTIVE;
		Query query = session.createQuery(activeInternships);
		List results = query.list();
		return gson.toJson(results);
	}

	/**
	 * @param string
	 * @return
	 */
	public static String getInternshipsWithFilter(String string) 
	{
		Session session = HibernateUtil.getSession();
		Gson gson = new Gson();
		String filteredInternships = FROM + "Internship E where E.focus = '" + string + 
									"' and E.active = " + RETRIEVAL_METHOD;
		Query query = session.createQuery(filteredInternships);
		List results = query.list();
		return gson.toJson(results);		
	}
	
	/**
	 * @param string
	 * @return
	 */
	public static String getMentorshipssWithFilter(String string) 
	{
		Session session = HibernateUtil.getSession();
		Gson gson = new Gson();
		String filteredInternships = FROM + "Mentorship E where E.focus = '" + string + 
									"' and E.active = " + RETRIEVAL_METHOD;
		Query query = session.createQuery(filteredInternships);
		List results = query.list();
		return gson.toJson(results);		
	}
	
	/**
	 * Used by the login function (thereby doesn't need to be built with excludeFieldsWithoutExposeAnnotation())
	 * Doesn't actually return anything to the browser besides LOGIN_SUCCESS and such
	 * @param string
	 * @return
	 */
	public static List getUsernamesMatching(String string)
	{
		Session session = HibernateUtil.getSession();
		String usernames = FROM + "User E where E.email = '" + string + "'";
		Query query = session.createQuery(usernames);
		return query.list();
	}

	/**
	 * @param string
	 * @return
	 */
	public static String getEventsWithFilter(String string) 
	{
		Session session = HibernateUtil.getSession();
		Gson gson = new Gson();
		String filteredInternships = FROM + "Event E";
		Query query = session.createQuery(filteredInternships);
		List results = query.list();
		return gson.toJson(results);	
	}

	/**
	 * @return
	 */
	public static String getEvents()
	{
		Session session = HibernateUtil.getSession();
		Gson gson = new Gson();
		String filteredInternships = FROM + "Event E";
		Query query = session.createQuery(filteredInternships);
		List results = query.list();
		return gson.toJson(results);
	}

	/**
	 * @param parameters
	 * @return
	 */
	public static String getAccounts(Map<String, String> parameters) 
	{
		Session session = HibernateUtil.getSession();
		GsonBuilder builder = new GsonBuilder();
		builder.excludeFieldsWithoutExposeAnnotation();
		Gson gson = builder.create();
		String accounts = FROM + "User";
		Query query = session.createQuery(accounts);
		
		List results = query.list();
		return gson.toJson(results);
	}

	/**
	 * @param string
	 * @return
	 */
	public static UserStatus getUserStatus(String string) 
	{
		if(string == null || string.equals("") || string.equals("Admin"))
			return null;
		
		Session session = HibernateUtil.getSession();
		String userStatuses = FROM + "UserStatus";
		Query query = session.createQuery(userStatuses);
		List results = query.list();
		
		for(int i = 0; i < results.size(); i++)
		{
			if(((UserStatus)results.get(i)).getUserStatus().equals(string))
				return (UserStatus)results.get(i);
				
		}
		
		return null;
	}
}
