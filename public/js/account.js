var ACCOUNT = null;


function loadAccountDetails()
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
			if(data.responseText == '') {returnToLogin(); return;} 
			ACCOUNT = data.responseJSON;
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

function toggleStudentSelector()
{
	if($("#status").hasClass('hidden'))
	{
		$("#status").removeClass('hidden');
		$("#studentAlumSelector").addClass('hidden');
	}
	else
	{
		$("#status").addClass('hidden');
		$("#studentAlumSelector").removeClass('hidden');
		$("#studentOrAlumChoice").val(ACCOUNT.status);

	}
}

function toggleFocusSelector()
{
	if($("#focus").hasClass('hidden'))
	{
		$("#focus").removeClass('hidden');
		$("#focusSelector").addClass('hidden');
	}
	else
	{
		$("#focus").addClass('hidden');
		$("#focusSelector").removeClass('hidden');
		$("#focusChoice").val(ACCOUNT.focus);
	}
}

function toggleCompanySelector()
{
	if($("#company").hasClass('hidden'))
	{
		$("#company").removeClass('hidden');
		$("#companySelector").addClass('hidden');
	}
	else
	{
		$("#company").addClass('hidden');
		$("#companySelector").removeClass('hidden');
		console.log(ACCOUNT);
		$("#companyName").val(ACCOUNT.company);
	}
}

function saveStudentOrAlum()
{
	console.log(ACCOUNT.id);
	var studentOrAlum = $("#studentOrAlumChoice").val();
	if(studentOrAlum != 'Choose One')
	{
		$.ajax({
			type: 'POST',
			url: 'Account', 
			data: 
			{
				'action': 'editStudentOrAlum',
				'ACCOUNT_ID': ACCOUNT.id,
				'studentOrAlum': studentOrAlum,
			},
			complete: function(data)
			{
				location.reload();
			},
		});
	}
}

function saveFocus()
{
	var focus = $("#focusChoice").val();
	if(focus != 'Choose One')
	{
		$.ajax({
			type: 'POST',
			url: 'Account', 
			data: 
			{
				'action': 'editFocus',
				'ACCOUNT_ID': ACCOUNT.id,
				'focus': focus,
			},
			complete: function(data)
			{
				location.reload();
			},
		});
	}
}

function saveCompany()
{
	var company = $("#companyName").val();
	
	if(company != '')
	{
		$.ajax({
			type: 'POST',
			url: 'Account', 
			data: 
			{
				'action': 'editCompany',
				'ACCOUNT_ID': ACCOUNT.id,
				'company': company,
			},
			complete: function(data)
			{
				location.reload();
			},
		});
	}	
}

