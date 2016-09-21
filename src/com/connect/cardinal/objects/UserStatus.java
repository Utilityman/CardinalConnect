package com.connect.cardinal.objects;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.google.gson.annotations.Expose;

/**
 * @author jmackin
 *
 */
@Entity
@Table(name = "userStatus")
public class UserStatus extends DBObject
{
	@Expose
	private String userStatus;
	
	public UserStatus(String userStatus)
	{
		this.setUserStatus(userStatus);
	}
	
	public UserStatus()
	{
		this.userStatus = "";
	}

	public String getUserStatus() {
		return userStatus;
	}

	public void setUserStatus(String userStatus) {
		this.userStatus = userStatus;
	}
	
	public String toString()
	{
		return userStatus;
	}
}
