
function notifyUser()
{
	$.ajax({
		type: 'POST',
		url: 'Account', 
		data: 
		{
			'action': 'getUserAccount',
		},
		complete: function(data)
		{
			console.log(data.responseJSON);
			$('#user').text(data.responseJSON.lastName + ", " + data.responseJSON.firstName);
		},
	});
}


function saveInternship()
{
	$.ajax({
		type: 'POST',
		url: 'Internships',
		data:
		{
			'action': 'postNewInternship',
			'availability': $('#available').val(),
			'company': $('#company').val(),
			'contact': $('#contact').val(),
			'description': $('#description').val(),
			'focus': $('#focus').val(),
			'internshipTitle': $('#title').val(),
			'location': $('#location').val(),
			'paid': $('#paid').val(),
			'firstName': '',
			'lastName': '',
		},
	});
}
