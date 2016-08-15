function submitFeedback()
{
	var page = $('#page').val();
	var description = $("#description").val();
	var suggestion = $('#suggestion').val();
	console.log(page + " " + description);
	console.log('hey');
	
	if(page != '' && description != '' && suggestion != '')
	{
		console.log("sending feedback!");
		$.ajax({
			type: 'POST',
			url: 'Data', 
			data: 
			{
				'action': 'postFeedback',
				'page': page,
				'description': description,
				'suggestion': suggestion,
			},
			complete: function(data)
			{
				console.log(data);
				alert("Thank you for sending feedback!");
			},
		});
	}
}