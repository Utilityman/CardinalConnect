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
@Table(name = "mentorship")
public class Mentorship extends DatabaseObject
{
	//private String firstName;
	//private String lastName;
	private String contact;
	private String mentorshipTitle;
	private String location;
	private String description;
	private String company;
	private int active;
	private String focus;
	private User owner;
	private Set<User> subscribers;

	
	/**
	 * @param string
	 * @return
	 */
	public static Object getMentorshipsByID(String string) 
	{
		Session session = HibernateUtil.getSession();
		
		Mentorship mentorship = (Mentorship) session.get(Mentorship.class, Long.parseLong(string));
		
		return mentorship;
	}
	
	/**
	 * @param ship
	 */
	public static boolean saveMentorshipObject(Mentorship ship) 
	{
		Transaction tx = null;
		Session session = HibernateUtil.getSession();
		tx = session.beginTransaction();
		
		session.saveOrUpdate(ship);
		System.out.println("Internship: "  + ship.id + " saved or updated");
		tx.commit();
		session.flush();
		return true;		
	}
	
	/**
	 * @param parameters
	 * @return
	 */
	public static String createAndCommitMentorshipFromForm(Map<String, String> parameters,HttpServletRequest request) 
	{
		Transaction tx = null;
		Mentorship mentorship = new Mentorship();
		
		//default field
		mentorship.setActive(0);

		// fields from form
		mentorship.setContact(parameters.get("contact"));
		mentorship.setDescription(parameters.get("description"));
		mentorship.setLocation(parameters.get("location"));
		mentorship.setMentorshipTitle(parameters.get("mentorshipTitle"));
		mentorship.setCompany(parameters.get("company"));
		mentorship.setFocus(parameters.get("focus"));
		//System.out.println(mentorship);
		
		
		
		User owner = User.getUserByUsername((String) request.getSession().getAttribute("userName"));
		if(owner == null) return "USERNAME RETRIEVAL FAILED";
		mentorship.setOwner(owner);
		
		
		
		Session session = HibernateUtil.getSession();
		tx = session.beginTransaction();
		
		System.out.println("Mentorship:" + session.save(mentorship) + " saved to the database");

		tx.commit();
		session.flush();
		
		return "mentorship creation success";
	}
	
	
	public static Object subscribeUser(Map<String, String> parameters, HttpServletRequest request) {
		User subscriber = User.getUserByUsername((String) request.getSession().getAttribute("userName"));
		if(subscriber == null) return "USERNAME RETRIEVAL FAILED";
		
		Mentorship mentorship = (Mentorship) Mentorship.getMentorshipsByID(parameters.get("mentorshipID"));
		
		Set<User> currentSubs = mentorship.getSubscribers();
		// TODO: Check that subscriber isnt owner 
		currentSubs.add(subscriber);
		mentorship.setSubscribers(currentSubs);
		
		Mentorship.saveMentorshipObject(mentorship);
		
		return "USER_SUBSCRIBED";
	}
	
	
	
	
	
	
	/**
	 * @param name
	 * @param title
	 * @param location
	 * @param description
	 * @param company
	 */
	public Mentorship(String firstName, String lastName, String title, String location, String description, 
			String company, int active, String contact, String focus, User owner, Set<User> subs) {
		//this.firstName = firstName;
		//this.lastName = lastName;
		this.mentorshipTitle = title;
		this.location = location;
		this.description = description;
		this.company = company;
		this.setActive(active);
		this.contact = contact;
		this.setOwner(owner);
		this.setSubscribers(subs);
		this.focus = focus;
	}
	
	public Mentorship()
	{
		//this.firstName = null;
		//this.lastName = null;
		this.setActive(0);

		this.contact = null;
		this.mentorshipTitle = null;
		this.location = null;
		this.description = null;
		this.company = null;
		this.focus = null;
		this.setOwner(null);
		this.setSubscribers(new HashSet<User>());
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
/*
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
	*/

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
		String mentorshipId = parameters.get("mentorshipId");
		String accepted = parameters.get("accepted");
		
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();

		Mentorship mentorship = session.load(Mentorship.class, Long.parseLong(mentorshipId));
		
		if(accepted.equals("true"))
		{
			mentorship.setActive(1);
		}
		else if(accepted.equals("false"))
		{
			mentorship.setActive(0);
		}
		else
		{
			System.out.println("unhandled case: " + accepted);
			tx.commit();
			session.flush();
			return "INTERNAL_ERROR";
		}
		
		session.merge(mentorship);
		tx.commit();
		session.flush();
		
		return "UPDATED_MENTORSHIP";
	}	
	
	public String toString()
	{
		return "Mentorship " + id + ": " + company + " " + description + "\n";

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
