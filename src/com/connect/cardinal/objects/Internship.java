package com.connect.cardinal.objects;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.servlet.http.HttpServletRequest;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.connect.cardinal.hibernate.HibernateUtil;

/**
 * @author jmackin
 *
 */
@Entity
@Table(name = "internship")
public class Internship extends DatabaseObject
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
	private String focus;
	private User owner;
	private Set<User> subscribers;
	
	/**
	 * @param string
	 * @return generic object so that the same caller can make generic object returns 
	 */
	public static Object getInternshipsByID(String string) 
	{
		Session session = HibernateUtil.getSession();

		Internship internship = (Internship) session.get(Internship.class, Long.parseLong(string));
		return internship;
	}
	
	public static boolean saveInternshipObject(Internship internship)
	{
		Transaction tx = null;
		Session session = HibernateUtil.getSession();
		tx = session.beginTransaction();
		
		session.saveOrUpdate(internship);
		System.out.println("Internship: "  + internship.id + " saved or updated");
		tx.commit();
		session.flush();
		return true;
	}
	
	/**
	 * @param parameters
	 * @return
	 */
	public static String createAndCommitInternshipFromForm(Map<String, String> parameters, HttpServletRequest request)
	{
		Transaction tx = null;
		Internship internship = new Internship();
		
		internship.setActive(0);
		internship.setContact(parameters.get("contact"));
		internship.setDescription(parameters.get("description"));
		internship.setLocation(parameters.get("location"));
		internship.setPaid(parameters.get("paid"));
		internship.setInternshipTitle(parameters.get("internshipTitle"));
		
		if(parameters.get("firstName").equals("") || parameters.get("lastName").equals(""))
		{
			///User.getUserByUsername((String) request.getSession().getAttribute("userName"));
		}
		internship.setLastName(parameters.get("lastName"));
		internship.setFirstName(parameters.get("firstName"));
		internship.setCompany(parameters.get("company"));
		internship.setAvailability(parameters.get("availability"));
		internship.setFocus(parameters.get("focus"));

		
		/*Session session = HibernateUtil.getSession();
		tx = session.beginTransaction();
		
		System.out.println("Internship:" + session.save(internship) + " saved to the database");

		tx.commit();
		session.flush();*/
		
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
			String description, String contact, int active, String company, String availability, String focus,
			User owner, Set<User> subs) {
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
		this.focus = focus;
		this.setOwner(owner);
		this.setSubscribers(subs);
		System.out.println("here?");
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
		this.focus = null;
		this.setOwner(null);
		this.setSubscribers(new HashSet<User>());
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
		return "Internship " + id + ": " + company + " " + description + "\n";
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


	public String getFocus() {
		return focus;
	}


	public void setFocus(String focus) {
		this.focus = focus;
	}


	/**
	 * @param parameters
	 * @return
	 */
	public static Object AcceptOrDeny(Map<String, String> parameters) 
	{
		String intnershipId = parameters.get("internshipId");
		String accepted = parameters.get("accepted");
		
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();

		Internship internship = session.load(Internship.class, Long.parseLong(intnershipId));
		
		if(accepted.equals("true"))
		{
			internship.setActive(1);
		}
		else if(accepted.equals("false"))
		{
			internship.setActive(0);
		}
		else
		{
			System.out.println("unhandled case: " + accepted);
			tx.commit();
			session.flush();
			return "INTERNAL_ERROR";
		}
		
		session.merge(internship);
		tx.commit();
		session.flush();
		
		return "UPDATED_INTNERNSHIP";
	}

	@OneToOne(cascade=CascadeType.ALL, fetch=FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public User getOwner() {
		return owner;
	}


	public void setOwner(User owner) {
		this.owner = owner;
	}


	@ManyToMany(cascade=CascadeType.ALL, fetch=FetchType.EAGER)
	@Fetch(FetchMode.SELECT)
	@JoinColumn
	public Set<User> getSubscribers() {
		return subscribers;
	}


	public void setSubscribers(Set<User> subscribers) {
		this.subscribers = subscribers;
	}
}
