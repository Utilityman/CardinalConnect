package com.connect.cardinal.hibernate;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;

import com.connect.cardinal.objects.Feedback;
import com.connect.cardinal.objects.Internship;
import com.connect.cardinal.objects.Mentorship;
import com.connect.cardinal.objects.User;

import antlr.debug.Event;

/**
 * @author jmackin
 *
 */
public class HibernateUtil 
{
	private static SessionFactory sessionFactory = null;
	private static Session session = null;
	
	public static SessionFactory getSessionFactory() throws HibernateException 
	{
		if (sessionFactory == null || sessionFactory.isClosed())
		{
			// configures settings from hibernate.cfg.xml
			Configuration configuration=new Configuration().configure("hibernate.cfg.xml"); 
			
			addAnnotatedClasses(configuration);			
			
			StandardServiceRegistryBuilder serviceRegistryBuilder = new StandardServiceRegistryBuilder();
			
			// If you miss the below line then it will complaing about a missing dialect setting
			serviceRegistryBuilder.applySettings(configuration.getProperties());
			
			ServiceRegistry serviceRegistry = serviceRegistryBuilder.build();
			sessionFactory = configuration.buildSessionFactory(serviceRegistry);

		}
		return sessionFactory;
	}
	
	public static Session getSession()
	{
		if (session == null)
		{
			session = getSessionFactory().openSession(); 
		}
		return session;
	}
	
	private static void addAnnotatedClasses(Configuration configuration)
	{
		configuration.addAnnotatedClass(Internship.class);
		configuration.addAnnotatedClass(Mentorship.class);
		configuration.addAnnotatedClass(Event.class);
		configuration.addAnnotatedClass(User.class);
		configuration.addAnnotatedClass(Feedback.class);
	}
}
