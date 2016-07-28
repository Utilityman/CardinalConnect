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
@Table(name = "internship")
public class Internship extends DBObject
{
	private String firstName;
	private String lastName;
	private String internshipTitle;
	private String location;
	private String paid;
	private String description;
	private String contact;
	private int active;
	private String company;
	private String availability;
	
	/**
	 * @param parameters
	 * @return
	 */
	public static String createAndCommitInternshipFromForm(Map<String, String> parameters)
	{
		Transaction tx = null;
		Internship internship = new Internship();
		internship.setActive(0);
		internship.setContact(parameters.get("contact"));
		internship.setDescription(parameters.get("description"));
		internship.setLocation(parameters.get("location"));
		internship.setPaid(parameters.get("paid"));
		internship.setInternshipTitle(parameters.get("internshipTitle"));
		internship.setLastName(parameters.get("lastName"));
		internship.setFirstName(parameters.get("firstName"));
		internship.setCompany(parameters.get("company"));
		internship.setAvailability(parameters.get("availability"));
		System.out.println(internship);
		
		
		Session session = HibernateUtil.getSession();
		tx = session.beginTransaction();
		
		System.out.println("Internship:" + session.save(internship) + " saved to the database");

		tx.commit();
		session.flush();
		
		return "internship creation success";
	}
	
	
	/**
	 * @param firstName
	 * @param lastName
	 * @param internshipTitle
	 * @param location
	 * @param paid
	 * @param description
	 */
	public Internship(String firstName, String lastName, String internshipTitle, String location, String paid,
			String description, String contact, int active, String company, String availability) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.internshipTitle = internshipTitle;
		this.location = location;
		this.paid = paid;
		this.description = description;
		this.contact = contact;
		this.active = active;
		this.company = company;
		this.availability = availability;
	}
	
	/**
	 * 
	 */
	public Internship() 
	{
		super();
		this.firstName = null;
		this.lastName = null;
		this.internshipTitle = null;
		this.location = null;
		this.paid = null;
		this.description = null;
		this.contact = null;
		this.active = 0;
		this.company = null;
		this.availability = null;
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
	public String getInternshipTitle() {
		return internshipTitle;
	}
	public void setInternshipTitle(String internshipTitle) {
		this.internshipTitle = internshipTitle;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String isPaid() {
		return paid;
	}
	public void setPaid(String paid) {
		this.paid = paid;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public int isActive() {
		return active;
	}

	public void setActive(int active) {
		this.active = active;
	}
	
	public String toString()
	{
		return firstName + " " + lastName + " " + description;
	}


	public String getAvailability() {
		return availability;
	}


	public void setAvailability(String availability) {
		this.availability = availability;
	}


	public String getCompany() {
		return company;
	}


	public void setCompany(String company) {
		this.company = company;
	}
}
