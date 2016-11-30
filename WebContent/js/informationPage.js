var SHIP;


function loadInternshipByParams()
{
	var internshipID = getParameterByName('id');
	console.log(internshipID);
	
	$.ajax({
		type: 'POST',
		url: 'Data', 
		data: 
		{
			'action': 'getInternshipByID',
			'internshipID': internshipID,
		},
		complete: function(data)
		{
			console.log(data.responseJSON);
			if(data.responseText == '') {returnToLogin(); return;} 
			SHIP = data.responseJSON;
			fillInternshipInformation(data.responseJSON);
		},
	});
}

function loadMentorshipByParams()
{
	var mentorshipID = getParameterByName('id');
	console.log(mentorshipID);
	
	$.ajax({
		type: 'POST',
		url: 'Data', 
		data: 
		{
			'action': 'getMentorshipByID',
			'mentorshipID': mentorshipID,
		},
		complete: function(data)
		{
			console.log(data.responseJSON);
			if(data.responseText == '') {returnToLogin(); return;} 
			SHIP = data.responseJSON;
			fillMentorshipInformation(data.responseJSON);
		},
	});
}

function fillInternshipInformation(json)
{
	$('#internshipTitle').html(json.internshipTitle);
	$('#name').html(json.firstName + " " + json.lastName);
	$('#company').html(json.company);
	$('#contact').html(json.contact);
	$('#location').html(json.location + '. ' + json.availability);
	$('#description').html(json.description);
	$('#focus').html(json.focus);
	$('#paid').html(json.paid);
}

function fillMentorshipInformation(json)
{
	$('#internshipTitle').html(json.mentorshipTitle);
	$('#name').html(json.firstName + " " + json.lastName);
	$('#company').html(json.company);
	$('#contact').html(json.contact);
	$('#location').html(json.location);
	$('#description').html(json.description);
	$('#focus').html(json.focus);
}


function showInternshipInformation(source)
{
	$('.accountDetails').addClass('hidden');
	$(source).siblings().removeClass('active');
	$(source).addClass('active');
	$('#information').removeClass('hidden');
}

function showApplicants(source)
{
	$('.accountDetails').addClass('hidden');
	$(source).siblings().removeClass('active');
	$(source).addClass('active');
	$('#applicants').removeClass('hidden');
}

function showAdmin(source)
{
	$('.accountDetails').addClass('hidden');
	$(source).siblings().removeClass('active');
	$(source).addClass('active');
	$('#admin').removeClass('hidden');
}