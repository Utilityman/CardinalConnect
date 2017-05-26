'use strict';
var account = null;

function getAccount () {
	$.ajax({
		type: 'POST',
		url: '/GetUser',
		contentType: 'application/json',
		data: JSON.stringify({
			'action': 'getUserAccount',
		}), complete: function (data) {
			console.log(data.responseJSON);
			if(data.responseText == '') {returnToLogin(); return;}
			account = data.responseJSON;
			fillInformation(data.responseJSON);
			getMentorships();
		},
	});
}

function getMentorships () {
	$.ajax({
		type: 'POST',
		url: '/GetSubscribedMentorships',
		contentType: 'application/json',
		data: JSON.stringify({
			'action': 'getSubscribedMentorships',
		}), complete: function (data) {
			console.log(data.responseJSON);
			if(data.responseJSON) {
				fillMentorshipTable(data.responseJSON.mentorships);
			}
		},
	});
}

function fillMentorshipTable (mentorships) {
	for (let i = 0; i < mentorships.length; i++) {
		$('#mentorshipTable').append('<tr><td>' + mentorships[i].title + '</td>' +
															'<td>' + mentorships[i].company + '</td>' +
															'<td>' + mentorships[i].location + '</td>' +
															'<td>' + mentorships[i].focus + '</td>' +
															'<td>' + mentorships[i].description +
															'</tr>');
	}
}

function fillInformation (json) {
	$('#name').html(json.firstName + ' ' + json.lastName);
	$('#email').html(json.email);
	$('#status').html(toTitleCase(json.role));
}

function toggleStudentSelector () {
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
