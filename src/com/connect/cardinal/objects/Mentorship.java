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
@Table(name = "mentorship")
public class Mentorship extends DBObject
{
	private String firstName;
	private String lastName;
	private String contact;
	private String mentorshipTitle;
	private String location;
	private String description;
	private String company;
	private int active;
	
	/**
	 * @param parameters
	 * @return
	 */
	public static String createAndCommitMentorshipFromForm(Map<String, String> parameters) 
	{
		Transaction tx = null;
		Mentorship mentorship = new Mentorship();
		mentorship.setActive(0);
		mentorship.setContact(parameters.get("contact"));
		mentorship.setDescription(parameters.get("description"));
		mentorship.setLocation(parameters.get("location"));
		mentorship.setMentorshipTitle(parameters.get("mentorshipTitle"));
		mentorship.setLastName(parameters.get("lastName"));
		mentorship.setFirstName(parameters.get("firstName"));
		mentorship.setCompany(parameters.get("company"));
		System.out.println(mentorship);
		
		Session session = HibernateUtil.getSession();
		tx = session.beginTransaction();
		
		System.out.println("Internship:" + session.save(mentorship) + " saved to the database");

		tx.commit();
		session.flush();
		
		return "mentorship creation success";
	}
	
	/**
	 * @param name
	 * @param title
	 * @param location
	 * @param description
	 * @param company
	 */
	public Mentorship(String firstName, String lastName, String title, String location, String description, 
			String company, int active, String contact) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.mentorshipTitle = title;
		this.location = location;
		this.description = description;
		this.company = company;
		this.setActive(active);
		this.contact = contact;
	}
	
	public Mentorship()
	{
		this.firstName = null;
		this.lastName = null;
		this.contact = null;
		this.mentorshipTitle = null;
		this.location = null;
		this.description = null;
		this.company = null;
		this.setActive(0);
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public int getActive() {
		return active;
	}

	public void setActive(int active) {
		this.active = active;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getMentorshipTitle() {
		return mentorshipTitle;
	}

	public void setMentorshipTitle(String mentorshipTitle) {
		this.mentorshipTitle = mentorshipTitle;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}	
}
