'use strict';
var account = undefined;
let selected = undefined;

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
				getInternships();
			}
		},
	});
}

function getInternships() {
	$.ajax({
		type: 'POST',
		url: '/GetSubscribedInternships',
		contentType: 'application/json',
		data: JSON.stringify({
			'action': 'getSubscribedInternships',
		}), complete: function (data) {
			console.log(data.responseJSON);
			if(data.responseJSON) {
				fillInternshipTable(data.responseJSON.internships);
			}
		},
	});
}

function fillMentorshipTable (mentorships) {
	for (let i = 0; i < mentorships.length; i++) {
		$('#mentorshipTable').append('<tr id="mentorship-' + mentorships[i]._id + '" class="mentorship" onclick="expandRow(this)">' +
															'<td>' + mentorships[i].title + '</td>' +
															'<td>' + mentorships[i].company + '</td>' +
															'<td>' + mentorships[i].location + '</td>' +
															'<td>' + mentorships[i].focus + '</td>' +
															'<td>' + mentorships[i].description +
															'</tr>');
	}
}

function fillInternshipTable (internships) {
	for (let i = 0; i < internships.length; i++) {
		$('#internshipTable').append('<tr id="internship-' + internships[i]._id + '" class="internship" onclick="expandRow(this)">' +
															'<td>' + internships[i].title + '</td>' +
															'<td>' + internships[i].company + '</td>' +
															'<td>' + internships[i].location + '</td>' +
															'<td>' + internships[i].focus + '</td>' +
															'<td>' + internships[i].description +
															'</tr>');
	}
}

function expandRow(src) {
	console.log(src);
	selected = $(src).attr('id');
	$('.infoRow').remove();
	$('.internship').removeClass('highlighted');
	$('.mentorship').removeClass('highlighted');
	$(src).addClass('highlighted');
	if ($(src).hasClass('mentorship')) {
		$(src).after('<tr class="infoRow">' +
									'<td style="display:none"><button class="btn btn-default" onclick="goToMentorshipPage()">Mentorship Page</button></td>' +
									'<td style="display:none"></td>' +
									'<td style="display:none"></td>' +
									'<td style="display:none"></td>' +
									'<td style="display:none"><button class="btn btn-danger" onclick="unsubscribeMentorship()">Unsubscribe</button></td>' +
									'</tr>');
		$('.infoRow > td').slideDown();
	} else if ($(src).hasClass('internship')) {
		$(src).after('<tr class="infoRow">' +
									'<td style="display:none"><button class="btn btn-default" onclick="goToInternshipPage()">Internship Page</button></td>' +
									'<td style="display:none"></td>' +
									'<td style="display:none"></td>' +
									'<td style="display:none"></td>' +
									'<td style="display:none"><button class="btn btn-danger" onclick="unsubscibeInternship()">Unsubscribe</button></td>' +
									'</tr>');
		$('.infoRow > td').slideDown();
	}
}

function fillInformation (json) {
	$('#name').html(json.firstName + ' ' + json.lastName);
	$('#email').html(json.email);
	$('#status').html(toTitleCase(json.role));
}

function unsubscibeInternship () {
	console.log(selected);
	if (typeof selected === 'undefined') return alert('Error Getting Internship ID: Select Again');
	if (selected.includes('mentorship-')) return alert('Error Getting Internship ID: Select Again');

	$.ajax({
		type: 'POST',
		url: '/UnsubscribeFromInternship',
		contentType: 'application/json',
		data: JSON.stringify({
			'action': 'unsubscribeFromInternship',
			'internshipID': selected.replace('internship-','')
		}), complete: function (data) {
			console.log(data.responseJSON);
		},
	});

}

function unsubscribeMentorship () {
	console.log(selected);
	if (typeof selected === 'undefined') alert('Error Getting Mentorship ID: Select Again');

	/*
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
	*/
}
