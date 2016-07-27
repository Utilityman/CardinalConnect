
function postMentorship()
{
	
}

function expand(mentorship)
{
	$(mentorship).siblings().children(".name").addClass("hidden");
	$(mentorship).siblings().children(".location").addClass("hidden");
	$(mentorship).siblings().children(".interests").addClass("hidden");
	$(mentorship).siblings().children(".signUpButton").addClass("hidden");
	$(mentorship).siblings().children(".description").addClass("hidden");
	$(mentorship).siblings().children().children().removeClass('hidden');
	$(mentorship).siblings().removeClass('active');
	
	
	$(mentorship).children().children().addClass('hidden');
	$(mentorship).children().removeClass("hidden");
}

function signUp(param)
{
	console.log("sign up for " + param);
}

function showFilterPopup()
{
	$("#filterPopup").css("display", "block");
}

function closeFilterPopup()
{
	$("#filterPopup").css("display", "none");
}

function showPostPopup()
{
	$("#postPopup").css("display", "block");
}

function closePostPopup()
{
	$("#postPopup").css("display", "none");
}


$(function()
{
	$(document).on('click', function(e)
	{
		if(e.target.id =='filterPopup')
			$("#filterPopup").css("display", "none");
		if(e.target.id =='postPopup')
			$("#postPopup").css("display", "none");
	});
});




