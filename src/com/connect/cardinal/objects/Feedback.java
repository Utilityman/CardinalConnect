package com.connect.cardinal.objects;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
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
public class Feedback extends DatabaseObject
{
	private String title;
	private String author;
	private Date date;
	private String description;
	private String page;
	private String suggestion;
	
	/**
	 * @param parameters
	 * @return
	 * @throws ParseException 
	 */
	public static String createAndCommitFeedbackFromForm(String author, Map<String, String> parameters)
	{
		Transaction tx = null;
		Feedback feedback = new Feedback();
		feedback.setDescription(parameters.get("description"));
		feedback.setPage(parameters.get("page"));
		feedback.setTitle(parameters.get("title"));
		feedback.setSuggestion(parameters.get("suggestion"));
		feedback.setAuthor(author);
		try {
			feedback.setDate(new SimpleDateFormat("dd/MM/yy").parse(new Date().toString()));
		} catch (ParseException e) {
			e.printStackTrace();
			feedback.setDate(new Date());
		}
		Session session = HibernateUtil.getSession();
		tx = session.beginTransaction();
		
		System.out.println("Feedback:" + session.save(feedback) + " saved to the database");

		tx.commit();
		session.flush();
		
		return "feedback creation success";
	}
	
	public Feedback(String description, String title, String page, String suggestion, String author, Date date)
	{
		this.description = description;
		this.page = page;
		this.title = title;
		this.author = author;
		this.date = date;
		this.suggestion = suggestion;
	}
	public Feedback()
	{
		this.description = null;
		this.page = null;
		this.suggestion = null;
		this.title = null;
		this.author = null;
		this.date = null;
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

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date string) {
		this.date = string;
	}

}
