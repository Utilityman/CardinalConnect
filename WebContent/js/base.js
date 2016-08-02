/**	
 * 	Base functions that are applicable for more than one page
 */

var focuses = ['Biology', 'Business', 'Chemistry', 'English', 'General', 'Social Sciences', 'Technology'];
var navigateParam = ""

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
			window.location.href = "mentorships.html" + navigateParam;
			break;
		case "internships":
			window.location.href = "internships.html" + navigateParam;
			break;
		case "events":
			window.location.href = "events.html" + navigateParam;
			break;
		case "logout":
			logout();
			break;
		case "account":
			window.location.href = "account.html";
			break;
	}
}

function getParameterByName(name) 
{
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/**
 * The mentorship's submenu uses this to navigate with filters already in place
 * @param param - the major that the page will filter for 
 */
function findMentorships(param)
{
	navigateParam = "?&id=" + param;
}

/**
 * The internship's submenu uses this to navigate with filters already in place
 * @param param - the major that the page will filter for
 */
function findInternships(param)
{
	navigateParam = "?&id=" + param;
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


function fillFocusDropdown()
{
	for(var i = 0; i < focuses.length; i++)
	{
		$("#focus").append($("<option></option>")
				.attr("value", focuses[i])
				.text(focuses[i]));	
	}
}

function getEvents(param)
{
	navigateParam = "?&id=" + param;
}

function logout()
{
	if(confirm("Are you sure you want to logout?"))
	{
		console.log("logging out!");
		$.ajax({
			type: 'POST',
			url: 'Home', 
			data: 
			{
				'action': 'logout',
			},
			complete: function(data)
			{
				window.location.href = "index.html";
			},
		});
	}
	else
	{
		console.log("loljk");
	}
}




