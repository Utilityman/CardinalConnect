
function loadAccountDetails()
{
	$.ajax({
		type: 'POST',
		url: 'Data', 
		data: 
		{
			'action': 'getUserAccount',
		},
		complete: function(data)
		{
			console.log(data);
			if(data.responseText == '') return;
			fillInformation(data.responseJSON);
		},
	});
}

function fillInformation(json)
{
	$("#name").html(json.firstName + " " + json.middleName + " " + json.lastName);
	$("#email").html(json.email);
	if(escape(json.status) != 'undefined')
		$("#status").html(json.status);
	else
		$("#status").html("---");
	if(escape(json.focus) != 'undefined')
		$("#focus").html(json.focus);
	else
		$("#focus").html("---");
	if(escape(json.company) != 'undefined')
		$("#company").html(json.company);
	else
		$("#company").html("---");
}