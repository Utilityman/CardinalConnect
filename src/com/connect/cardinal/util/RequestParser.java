package com.connect.cardinal.util;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

/**
 * @author jmackin
 *
 */
public class RequestParser 
{
	public static Map<String, String> getParameters(Map<String, String[]> parameters)
	{
		Map<String, String> parameterMap = new HashMap<String, String>();
		Set<String> keySet = parameters.keySet();
		
		Iterator<String> iter = keySet.iterator();
		while (iter.hasNext())
		{
			String key = (String)iter.next();
			String value = parameters.get(key)[0];
			parameterMap.put(key, value);			
		}
		
		return parameterMap;
	}}
