package com.connect.cardinal.util;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.connect.cardinal.hibernate.HibernateUtil;
import com.google.gson.Gson;

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
}
