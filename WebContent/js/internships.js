

function loadInternships()
{
	$.ajax({
		type: 'POST',
		url: 'Data', 
		data: 
		{
			'action': 'getInternships',
		},
		success: function(data)
		{
			//console.log(data);
			if(data.length > 0)
				$("#contentless").remove();
			else
				$("#contentless").val("No Content to Display!");
			fillField(data);
		},
		error: function(xhr)
		{
			console.log(xhr.responseText);
		}
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
				'avilability': availability,
			},
			complete: function(data)
			{
				$("#formDiv").addClass("hidden");
				$("#successDiv").removeClass("hidden");
				//console.log(data.responseText);
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

		$(node).append("<p class='title'>" + json[i].internshipTitle + "</p>");
		$(node).append("<p class='description hidden'>" + json[i].description + "</p>");
		$(node).append("<p class='name hidden'>Poster: " + json[i].firstName + " " + 
									json[i].lastName + " - " + json[i].contact + "</p>");
		$(node).append("<p class='name hidden'>Location: " + json[i].location + " at " +  json[i].company + "</p>");
		$(node).append("<p class='name hidden'>Availability: " + json[i].avilability + "</p>");
		
		$("#internshipList").append(node);
	}
}

