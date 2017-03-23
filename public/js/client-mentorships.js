
function loadMentorships()
{
	var filter = getParameterByName("id");
	console.log(filter);
	$.ajax({
		type: 'POST',
		url: '/GetMentorships',
		contentType: 'application/json',
		data: JSON.stringify({
			'action': 'getMentorships',
		}),
		complete: function(data)
		{
			console.log(data);
			if (data.responseJSON) {
				fillField(data.responseJSON);
			}
		},
	});
}

function fillField(json)
{
	var count = 0;
	for(var i = 0; i < json.length; i++)
	{
		if(!json[i].active)
		{
			count++;
			$('#mentorships').append('<tr><td>' + json[i].title + '</td>' +
																'<td>Owner Name from ' + json[i].company + '</td>' +
																'<td>' + json[i].contact + '</td>' +
																'<td>' + toTitleCase(json[i].focus) + '</td>' + 
																'</tr>');

		}
	}

	if (!count) {
		$('#mentorships').append('<tr><td>No Mentorships to Display</td></tr>');
	}
}

function subscribe(mentorshipID)
{
	/*$.ajax({
		type: 'POST',
		url: 'Mentorships',
		data:
		{
			'action': 'subscribeToMentorship',
			'mentorshipID': mentorshipID
		},
		complete: function(data)
		{

		},
	});*/
}
