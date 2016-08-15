package com.connect.cardinal.objects;

import java.util.Map;

import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.connect.cardinal.hibernate.HibernateUtil;

/**
 * @author jmackin
 *
 */
@Entity
@Table(name = "feedback")
public class Feedback extends DBObject
{
	private String description;
	private String page;
	private String suggestion;
	
	/**
	 * @param parameters
	 * @return
	 */
	public static String createAndCommitFeedbackFromForm(Map<String, String> parameters) 
	{
		Transaction tx = null;
		Feedback feedback = new Feedback();
		feedback.setDescription(parameters.get("description"));
		feedback.setPage(parameters.get("page"));
		feedback.setSuggestion(parameters.get("suggestion"));
		
		Session session = HibernateUtil.getSession();
		tx = session.beginTransaction();
		
		System.out.println("Internship:" + session.save(feedback) + " saved to the database");

		tx.commit();
		session.flush();
		
		return "feedback creation success";
	}
	
	public Feedback(String description, String title, String page, String suggestion)
	{
		this.description = description;
		this.page = page;
		this.suggestion = suggestion;
	}
	public Feedback()
	{
		this.description = null;
		this.page = null;
		this.suggestion = null;
	}
	
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getPage() {
		return page;
	}
	public void setPage(String page) {
		this.page = page;
	}

	public String getSuggestion() {
		return suggestion;
	}

	public void setSuggestion(String suggestion) {
		this.suggestion = suggestion;
	}

}
