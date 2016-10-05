package com.connect.cardinal.util;

import java.util.List;
import java.util.Map;

import org.hibernate.Query;
import org.hibernate.Session;

import com.connect.cardinal.hibernate.HibernateUtil;
import com.connect.cardinal.objects.User;
import com.connect.cardinal.objects.UserStatus;

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
	
	public static List getActiveInternships()
	{
		Session session = HibernateUtil.getSession();
		String activeInternships = FROM + "Internship E WHERE E.active = " + ACTIVE;
		Query query = session.createQuery(activeInternships);
		List results = query.list();
		return results;
	}
	
	public static List getInactiveInternships()
	{
		Session session = HibernateUtil.getSession();
		String inactiveInternships = FROM + "Internship E where e.active = " + INACTIVE;
		Query query = session.createQuery(inactiveInternships);
		List results = query.list();
		return results;
	}

	/**
	 * @return
	 */
	public static List getActiveMentorships() 
	{
		Session session = HibernateUtil.getSession();
		String activeInternships = FROM + "Mentorship E WHERE E.active = "+ ACTIVE;
		Query query = session.createQuery(activeInternships);
		List results = query.list();
		return results;
	}
	
	/**
	 * @return
	 */
	public static List getMentorships() 
	{
		Session session = HibernateUtil.getSession();
		String activeInternships = FROM + "Mentorship";
		Query query = session.createQuery(activeInternships);
		List results = query.list();
		return results;
	}

	/**
	 * @param string
	 * @return
	 */
	public static List getInternshipsWithFilter(String string) 
	{
		Session session = HibernateUtil.getSession();
		String filteredInternships = FROM + "Internship E where E.focus = '" + string + 
									"' and E.active = " + RETRIEVAL_METHOD;
		Query query = session.createQuery(filteredInternships);
		List results = query.list();
		return results;		
	}
	
	/**
	 * @param string
	 * @return
	 */
	public static List getMentorshipssWithFilter(String string) 
	{
		Session session = HibernateUtil.getSession();
		String filteredInternships = FROM + "Mentorship E where E.focus = '" + string + 
									"' and E.active = " + RETRIEVAL_METHOD;
		Query query = session.createQuery(filteredInternships);
		List results = query.list();
		return results;		
	}
	
	/**
	 * Used by the login function (thereby doesn't need to be built with excludeFieldsWithoutExposeAnnotation())
	 * Doesn't actually return anything to the browser besides LOGIN_SUCCESS and such
	 * @param string
	 * @return
	 */
	public static User getUsernamesMatching(String string)
	{
		Session session = HibernateUtil.getSession();
		String usernames = FROM + "User E where E.email = '" + string + "'";
		Query query = session.createQuery(usernames);
		List user = query.list();
		if(user != null && user.size() == 1)
			return (User) user.get(0);
		return null;
		
	}

	/**
	 * @param string
	 * @return
	 */
	public static List getEventsWithFilter(String string) 
	{
		Session session = HibernateUtil.getSession();
		String filteredInternships = FROM + "Event E";
		Query query = session.createQuery(filteredInternships);
		List results = query.list();
		return results;	
	}

	/**
	 * @return
	 */
	public static List getEvents()
	{
		Session session = HibernateUtil.getSession();
		String filteredInternships = FROM + "Event E";
		Query query = session.createQuery(filteredInternships);
		List results = query.list();
		return results;
	}

	/**
	 * @param parameters
	 * @return
	 */
	public static List getAccounts(Map<String, String> parameters) 
	{
		Session session = HibernateUtil.getSession();

		String accounts = FROM + "User";
		Query query = session.createQuery(accounts);
		
		List results = query.list();
		return results;
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
