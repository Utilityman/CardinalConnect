

function loadHome()
{
	console.log($(document));
}

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

function findMentorships(param)
{
	console.log("navigating with parameter " + param);
	window.location.href = "mentorships.html";
}

function findInternships(param)
{
	console.log("navigating with parameter " + param);
	window.location.href = "internships.html";
}

