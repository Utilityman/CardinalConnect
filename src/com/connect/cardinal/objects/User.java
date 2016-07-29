package com.connect.cardinal.objects;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * @author jmackin
 *
 */
@Entity
@Table(name = "user")
public class User extends DBObject
{
	private String firstName;
	private String middleName;
	private String lastName;
	private String email;
	private String password;
	
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
	}
	
	public User()
	{
		this.firstName = null;
		this.middleName = null;
		this.lastName = null;
		this.email = null;
		this.password = null;
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
}
