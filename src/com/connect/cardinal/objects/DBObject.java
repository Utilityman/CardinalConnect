package com.connect.cardinal.objects;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import org.hibernate.NonUniqueObjectException;

import com.google.gson.annotations.Expose;


/**
 * @author jmackin
 *
 */
@MappedSuperclass
public class DBObject 
{
	/**
	 * The database id of this object
	 */
	@Expose
	Long id;
	
	/**
	 * This method returns the id of this object. The annotation of the method
	 * tells the database to autogenerate the id when it is added to the database
	 * so that the id is unique.
	 * @return
	 */
	@GeneratedValue(strategy = GenerationType.AUTO)
	//@GeneratedValue(strategy=GenerationType.AUTO, generator="my_entity_seq_gen")
	//@SequenceGenerator(name="my_entity_seq_gen", sequenceName="MY_ENTITY_SEQ")
	@Id
	public Long getId()throws NonUniqueObjectException {
		return id;
	}
	
	/**
	 * This method sets the id of the object.
	 * @param id
	 */
	public void setId(Long id)
	{
		this.id = id;
	}
}
