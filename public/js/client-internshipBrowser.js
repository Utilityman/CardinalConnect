

function loadInternships()
{
	var filter = getParameterByName("id");

	$.ajax({
		type: 'POST',
		url: '/GetInternships',
		contentType: 'application/json',
		data: JSON.stringify({
			'action': 'getInternships',
		}), complete: function(data) {
			console.log(data);
			if (data.responseJSON) {
				fillField(data.responseJSON);
			}
		}
	});
}

function fillField(json)
{
	var count = 0;
	for(var i = 0; i < json.length; i++)
	{
		if(json[i].active)
		{
			count++;
			$('#internships').append('<tr><td>' + json[i].title + '</td>' +
																'<td>Owner Name from ' + json[i].company + '</td>' +
																'<td>' + json[i].contact + '</td>' +
																'<td>' + toTitleCase(json[i].focus) + '</td>' +
																'</tr>');

		}
	}

	if (!count) {
		$('#internships').append('<tr><td>No Internships to Display</td></tr>');
	}
}

function subscribe(internshipID)
{
	/*$.ajax({
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
	});*/
}
