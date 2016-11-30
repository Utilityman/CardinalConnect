

function loadInternships()
{
	var filter = getParameterByName("id");

	$.ajax({
		type: 'POST',
		url: 'Data', 
		data: 
		{
			'action': 'getActiveInternships',
			'filter': filter,
		},
		complete: function(data)
		{
			console.log(data);
			if(data.responseText == '') {returnToLogin(); return;} 
			if(data.responseJSON.length > 0)
				fillField(data.responseJSON);
			else
				$("#internshipList").append("<li id='contentless'><p class='title'>No Internships to Display!</p></li>");
			fillFocusDropdown();
		},
	});
}

function postInternship()
{
	var firstName = $("#firstName").val();
	var lastName = $("#lastName").val();
	var internshipTitle = $("#internshipTitle").val();
	var location = $("#location").val();
	var paid = $('input[name=salary]:checked', '#internDetails').val();
	var description = $("#description").val();
	var contact = $("#contact").val();
	var interests = $("#interests").val();
	var company = $("#company").val();
	var availability = $("#availability").val();
	var focus = $("#focus").val();
	
	console.log(availability);
	
	// Data Verification
	if(firstName != "" && lastName != "" && internshipTitle != "" && location != "" &&
			paid != 'undefined' && description != "" && contact != ""  && company != "" &&
			availability != "")
		$.ajax({
			type: "POST",
			url: 'Data',
			data:
			{
				'action': 'postInternship',
				
				'firstName': firstName,
				'lastName': lastName,
				'internshipTitle': internshipTitle,
				'location': location,
				'paid': paid,
				'description': description,
				'contact': contact,
				'interests': interests,
				'company': company,
				'availability': availability,
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
		if(json[i].active)
		{
			var node = document.createElement("li");
			node.onclick = function(){expand(this)};
	
			$(node).append("<p class='title'>" + json[i].internshipTitle + "</p>");
			$(node).append("<p class='name hidden'>" + json[i].description + "</p>");
			$(node).append("<p class='name hidden'>Poster: " + json[i].firstName + " " + 
										json[i].lastName + " - " + json[i].contact + "</p>");
			$(node).append("<p class='name hidden'>Location: " + json[i].location + " at " +  json[i].company + "</p>");
			$(node).append("<p class='name hidden'>Availability: " + json[i].availability + "</p>");
			
			$("#internshipList").append(node);
		}
	}
}

