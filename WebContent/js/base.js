/**	
 * 	Base functions that are applicable for more than one page
 */

function loadHome()
{
	console.log($(document));
	$.ajax({
		type: 'POST',
		url: 'Home', 
		data: 
		{
			'action': 'getHomeData',
		},
		success: function(data)
		{
			console.log(data);
		},
		error: function(xhr)
		{
			console.log(xhr.responseText);
		}
	});
}

/**
 * The title bar calls navigate in order to navigate to the base page of each one
 * @param location - the name of the destination page
 */
function navigate(location)
{
	switch(location.getAttribute('id'))
	{
		case "home":
			window.location.href = "home.html";
			break;
		case "mentorships":
			window.location.href = "mentorships.html";
			break;
		case "internships":
			window.location.href = "internships.html";
			break;
		case "events":
			window.location.href = "events.html";
			break;
		case "logout":
			break;
	}
}

/**
 * The mentorship's submenu uses this to navigate with filters already in place
 * @param param - the major that the page will filter for 
 */
function findMentorships(param)
{
	console.log("navigating with parameter " + param);
	window.location.href = "mentorships.html";
}

/**
 * The internship's submenu uses this to navigate with filters already in place
 * @param param - the major that the page will filter for
 */
function findInternships(param)
{
	console.log("navigating with parameter " + param);
	window.location.href = "internships.html";
}

/**
 * 	Expands tabs on the mentorship, internships, and events pages
 * 	TODO: use html classes to generalize this ie. find all children with class (.hideme) and toggle hidden 
 */
function expand(tab)
{
	$(tab).siblings().children(".name").addClass("hidden");
	$(tab).siblings().removeClass('active');
		
	$(tab).children().removeClass("hidden");
	$(tab).addClass('active');
}




