

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
	if(internshipTitle != "" && location != "" &&
			paid != 'undefined' && description != "" && contact != ""  && company != "" &&
			availability != "")

		$.ajax({
			type: "POST",
			url: 'Data',
			data:
			{
				'action': 'postInternship',

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
				if(data.responseJSON == "username retrieval failed")
					alert("Post Failed!");
				else 
					alert("Post Submitted!");
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
			console.log(json[i]);
			var node = document.createElement("li");
			node.onclick = function(){expand(this)};
	
			$(node).append("<p class='title'>" + json[i].internshipTitle + "</p>");
			$(node).append("<p class='name hidden'>" + json[i].description + "</p>");
			$(node).append("<p class='name hidden'>Poster: " + json[i].owner.firstName + " " + 
										json[i].owner.lastName + " - " + json[i].contact + "</p>");
			$(node).append("<p class='name hidden'>Location: " + json[i].location + " at " +  json[i].company + "</p>");
			$(node).append("<p class='name hidden'>Availability: " + json[i].availability + "</p>");
			
			$(node).append("<button onclick='subscribe(" + json[i].id + ")' class='hidden'>Subscribe</button>");
			
			//$(node).append("<span style='float:right;margin-top: -100px'>Hello</span>");
			
			$("#internshipList").append(node);
		}
	}
}

function subscribe(internshipID)
{
	$.ajax({
		type: 'POST',
		url: 'Internships', 
		data: 
		{
			'action': 'subscribeToInternship',
			'internshipID': internshipID
		},
		complete: function(data)
		{

		},
	});	
}


