package com.connect.cardinal.objects;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * @author jmackin
 *
 */
@Entity
@Table(name = "event")
public class Event extends DBObject
{
	private String title;
	private String description;
	private String location;
	private String contact;
	private int eventAudience;
	private Date eventDate;
	
	/**
	 * @param title
	 * @param description
	 * @param location
	 * @param contact
	 * @param eventAudience
	 * @param eventDate
	 */
	public Event(String title, String description, String location, String contact, int eventAudience, Date eventDate) 
	{
		this.title = title;
		this.description = description;
		this.location = location;
		this.contact = contact;
		this.eventAudience = eventAudience;
		this.eventDate = eventDate;
	}
	
	public Event()
	{
		this.title = null;
		this.description = null;
		this.contact = null;
		this.eventAudience = -1;
		this.eventDate = null;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public int getEventAudience() {
		return eventAudience;
	}

	public void setEventAudience(int eventAudience) {
		this.eventAudience = eventAudience;
	}

	public Date getEventDate() {
		return eventDate;
	}

	public void setEventDate(Date eventDate) {
		this.eventDate = eventDate;
	}
}
