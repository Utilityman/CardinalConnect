package com.connect.cardinal.objects;

import java.util.Map;

import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.connect.cardinal.hibernate.HibernateUtil;
import com.google.gson.annotations.Expose;

/**
 * @author jmackin
 *
 */
@Entity
@Table(name = "user")
public class User extends DBObject
{
	@Expose
	private String firstName;
	@Expose
	private String middleName;
	@Expose
	private String lastName;
	@Expose
	private String email;
	private String password;
	@Expose
	private String focus;
	@Expose
	private String company;
	@Expose
	private String status;
	
	/**
	 * @param firstName
	 * @param middleName
	 * @param lastName
	 * @param email
	 * @param password
	 */
	public User(String firstName, String middleName, String lastName, String email, String password) {
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.status = "";
		this.focus = "";
		this.company = "";
	}
	
	public User()
	{
		this.firstName = null;
		this.middleName = null;
		this.lastName = null;
		this.email = null;
		this.password = null;
		this.status = null;
		this.focus = null;
		this.company = null;
	}
	
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getMiddleName() {
		return middleName;
	}
	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	public String getFocus() {
		return focus;
	}

	public void setFocus(String focus) {
		this.focus = focus;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	/**
	 * @param parameters
	 * @return
	 */
	public static String editStudentOrAlum(Map<String, String> parameters) 
	{
		String idString = parameters.get("ACCOUNT_ID");
		String studentOrAlum = parameters.get("studentOrAlum");
		
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();


		User user = session.load(User.class, Long.parseLong(idString));
		user.setStatus(studentOrAlum);
		
		session.merge(user);
		tx.commit();
		session.flush();
		
		return "UPDATED STATUS";
	}

	/**
	 * @param parameters
	 * @return
	 */
	public static String editFocus(Map<String, String> parameters) 
	{
		String idString = parameters.get("ACCOUNT_ID");
		String studentOrAlum = parameters.get("focus");
		
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();


		User user = session.load(User.class, Long.parseLong(idString));
		user.setFocus(studentOrAlum);
		
		session.merge(user);
		tx.commit();
		session.flush();
		
		return "UPDATED FOCUS";
	}

	/**
	 * @param parameters
	 * @return
	 */
	public static String editCompany(Map<String, String> parameters) 
	{
		String idString = parameters.get("ACCOUNT_ID");
		String studentOrAlum = parameters.get("company");
		
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();


		User user = session.load(User.class, Long.parseLong(idString));
		user.setCompany(studentOrAlum);
		
		session.merge(user);
		tx.commit();
		session.flush();
		
		return "UPDATED COMPANY";
	}
}
