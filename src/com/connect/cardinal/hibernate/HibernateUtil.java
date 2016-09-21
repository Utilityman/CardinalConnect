package com.connect.cardinal.hibernate;

import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;

import com.connect.cardinal.objects.Feedback;
import com.connect.cardinal.objects.Internship;
import com.connect.cardinal.objects.Mentorship;
import com.connect.cardinal.objects.User;
import com.connect.cardinal.objects.UserStatus;

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
			
			testSessionFactory(sessionFactory);
		}
		return sessionFactory;
	}
	
	/**
	 * This method will check the session factory for default values that should be in the database. 
	 * @param testFactory
	 */
	private static void testSessionFactory(SessionFactory testFactory) 
	{
		Transaction tx = null;
		Session session = testFactory.openSession();
		tx = session.beginTransaction();
		String userStatuses = "FROM com.connect.cardinal.objects.UserStatus";
		Query query = session.createQuery(userStatuses);
		
		@SuppressWarnings("rawtypes")
		List results = query.list();
		
		// Testing existence of UserStatus fields
		if(!checkUserStatus(results, "Student"))
		{
			System.out.println("Could not find UserStatus: Student... adding to db");
			session.save(new UserStatus("Student"));
		}
		if(!checkUserStatus(results, "Advisor"))
		{
			System.out.println("Could not find UserStatus: Advisor... adding to db");
			session.save(new UserStatus("Advisor"));
		}
		if(!checkUserStatus(results, "Admin"))
		{
			System.out.println("Could not find UserStatus: Admin... adding to db");
			session.save(new UserStatus("Admin"));
		}
		
		tx.commit();
		session.flush();
	}
	
	private static boolean checkUserStatus(@SuppressWarnings("rawtypes") List fields, String field)
	{
		for(int i = 0; i < fields.size(); i++)
		{
			if(((UserStatus)fields.get(i)).getUserStatus().equals(field))
				return true;
		}
		return false;
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
		configuration.addAnnotatedClass(UserStatus.class);
	}
}
