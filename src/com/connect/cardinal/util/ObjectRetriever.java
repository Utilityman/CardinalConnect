package com.connect.cardinal.util;

import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;

import com.connect.cardinal.hibernate.HibernateUtil;
import com.connect.cardinal.objects.User;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * @author jmackin
 *
 */
public class ObjectRetriever 
{
	public static String getActiveInternships()
	{
		Session session = HibernateUtil.getSession();
		Gson gson = new Gson();
		String activeInternships = "FROM com.connect.cardinal.objects.Internship E WHERE E.active = 0";
		Query query = session.createQuery(activeInternships);
		@SuppressWarnings("rawtypes")
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
		String activeInternships = "FROM com.connect.cardinal.objects.Mentorship E WHERE E.active = 0";
		Query query = session.createQuery(activeInternships);
		@SuppressWarnings("rawtypes")
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
		String filteredInternships = "FROM com.connect.cardinal.objects.Internship E where E.focus = '" + string + "' and E.active = 0";
		Query query = session.createQuery(filteredInternships);
		@SuppressWarnings("rawtypes")
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
		String filteredInternships = "FROM com.connect.cardinal.objects.Mentorship E where E.active = 0 and E.focus = '" + string + "'";
		Query query = session.createQuery(filteredInternships);
		@SuppressWarnings("rawtypes")
		List results = query.list();
		return gson.toJson(results);		
	}
	
	@SuppressWarnings("rawtypes")
	public static List getUsers()
	{
		Session session = HibernateUtil.getSession();
		Criteria criteria = session.createCriteria(User.class);
		return criteria.list();
	}
	
	@SuppressWarnings("rawtypes")
	public static List getUsernamesMatching(String string)
	{
		Session session = HibernateUtil.getSession();
		String usernames = "FROM com.connect.cardinal.objects.User E where E.email = '" + string + "'";
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
		String filteredInternships = "FROM com.connect.cardinal.objects.Event E";
		Query query = session.createQuery(filteredInternships);
		@SuppressWarnings("rawtypes")
		List results = query.list();
		return gson.toJson(results);	}

	/**
	 * @return
	 */
	public static String getEvents()
	{
		Session session = HibernateUtil.getSession();
		Gson gson = new Gson();
		String filteredInternships = "FROM com.connect.cardinal.objects.Event E";
		Query query = session.createQuery(filteredInternships);
		@SuppressWarnings("rawtypes")
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
		String accounts = "FROM com.connect.cardinal.objects.User";
		Query query = session.createQuery(accounts);
		
		@SuppressWarnings("rawtypes")
		List results = query.list();
		return gson.toJson(results);
	}
}
