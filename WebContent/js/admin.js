var accounts = null;
var internships = null;
var mentorships = null;

function showTab(source, param)
{
	$(source).siblings().removeClass('active');
	$(source).addClass('active');
	$('.tab-content').removeClass('active');
	$('#' + param).addClass('active');
}


function loadDashboard()
{
	$.ajax({
		type: 'POST',
		url: 'Data', 
		data: 
		{
			'action': 'getAccounts',
			'filter': "",
		},
		complete: function(data)
		{
			if(data.responseText == '' || data.responseText == 'NOT_ADMIN_USER') {returnToLogin(); return;} 
			accounts = data.responseJSON;
			getInternships();
		},
	});
}

function getInternships()
{
	$.ajax({
		type: 'POST',
		url: 'Data', 
		data: 
		{
			'action': 'getInternships',
			'filter': "",
		},
		complete: function(data)
		{
			if(data.responseText == '') {returnToLogin(); return;} 
			internships = data.responseJSON;
			getMentorships();
		},
	});
}

function getMentorships()
{
	$.ajax({
		type: 'POST',
		url: 'Data', 
		data: 
		{
			'action': 'getMentorships',
			'filter': "",
		},
		complete: function(data)
		{
			if(data.responseText == '') {returnToLogin(); return;} 
			mentorships = data.responseJSON;
			fillTabs();
		},
	});
}

function fillTabs()
{
	console.log(accounts);
	console.log(internships);
	console.log(mentorships);
	
	var studentAccounts = 0;
	var advisorAccounts = 0;
	var pendingAccounts = 0;
	var changeRequests = 0;
	for(var i = 0; i < accounts.length; i++)
	{
		if(accounts[i].status.userStatus == 'Student')
			studentAccounts++;
		else if(accounts[i].status.userStatus == 'Advisor')
			advisorAccounts++;
	}
	$('#studentAccounts').html(studentAccounts);
	$('#advisorAccounts').html(advisorAccounts);
	$('#pendingAccounts').html(pendingAccounts);
	$('#changeOfInformationRequests').html(changeRequests);
	
	var pendingInternships = 0;
	var activeInternships = 0;
	for(var i = 0; i < internships.length; i++)
	{
		if(internships[i].active == 0)
			pendingInternships++;
		else if(internships[i].active == 1)
			activeInternships++;
	}
	$('#pendingInternships').html(pendingInternships);
	$('#listedInternships').html(activeInternships);
	
	var pendingMentorships = 0;
	var activeMentorships = 0;
	for(var i = 0; i < mentorships.length; i++)
	{
		if(mentorships[i].active == 0)
			pendingMentorships++;
		else if(mentorships[i].active == 1)
			activeMentorships++;
	}
	$('#pendingMentorships').html(pendingMentorships);
	$('#listedMentorships').html(activeMentorships);	
}

function showAccounts(source)
{
	$('.expanded').html('+');
	$('#' + source + " > span").html("-");
}


