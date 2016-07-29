
function loadMentorships()
{
	var filter = getParameterByName("id");
	console.log(filter);
	$.ajax({
		type: 'POST',
		url: 'Data', 
		data: 
		{
			'action': 'getMentorships',
			'filter': filter,
		},
		complete: function(data)
		{
			//console.log(data);
			if(data.responseJSON.length > 0)
				fillField(data.responseJSON);
			else
				$("#mentorshipList").append("<li id='contentless'><p class='title'>No Mentorships to Display!</p></li>");
			fillFocusDropdown();
		},
	});
}

function postMentorship()
{
	var firstName = $("#firstName").val();
	var lastName = $("#lastName").val();
	var mentorshipTitle = $("#mentorshipTitle").val();
	var location = $("#location").val();
	var company = $('#company').val();
	var description = $("#description").val();
	var contact = $("#contact").val();
	var interests = $("#interests").val();
	var company = $("#company").val();
	var focus = $("#focus").val();

	
	// Data Verification
	if(firstName != "" && lastName != "" && mentorshipTitle != "" && location != "" &&
			description != "" && contact != ""  && company != "")
		$.ajax({
			type: "POST",
			url: 'Data',
			data:
			{
				'action': 'postMentorship',
				
				'firstName': firstName,
				'lastName': lastName,
				'mentorshipTitle': mentorshipTitle,
				'location': location,
				'description': description,
				'contact': contact,
				'interests': interests,
				'company': company,
				'focus': focus,
			},
			complete: function(data)
			{
				$("#formDiv").addClass("hidden");
				$("#successDiv").removeClass("hidden");
			},
		});
	else
	{
		alert("Invalid Data");
		return;
	}	
}

function fillField(json)
{
	for(var i = 0; i < json.length; i++)
	{
		var node = document.createElement("li");
		node.onclick = function(){expand(this)};

		$(node).append("<p class='title'>" + json[i].mentorshipTitle + "</p>");
		$(node).append("<p class='name hidden'>" + json[i].description + "</p>");
		$(node).append("<p class='name hidden'>Poster: " + json[i].firstName + " " + 
									json[i].lastName + " - " + json[i].contact + "</p>");
		$(node).append("<p class='name hidden'>Location: " + json[i].location + " at " +  json[i].company + "</p>");
		
		$("#mentorshipList").append(node);
	}
}


