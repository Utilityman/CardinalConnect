'use strict';
var account = undefined;
let selected = undefined;
let interests = undefined;







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
			if(account.role == "student") $(".advisorContent").hide();
			if(account.role == "advisor") $(".studentContent").hide();
			fillInformation(data.responseJSON);
			getInterests();
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
				getInterests();
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
	if(json.questionAndAnswer) {
			if(json.questionAndAnswer == "true") {
				$('#QuestionAndAnswerCheck').addClass("glyphicon-ok-sign");
				$('#QuestionAndAnswerCheck').click(function(){
					toggleCheck(this);
				});
				document.getElementById("QuestionAndAnswerCheck").checked = true;
			}
			else {
				$('#QuestionAndAnswerCheck').addClass("glyphicon-unchecked");
				$('#QuestionAndAnswerCheck').click(function(){
					toggleCheck(this);
				});
				document.getElementById("QuestionAndAnswerCheck").checked = false;
			}
	}
	else {
		$('#QuestionAndAnswerCheck').addClass("glyphicon-unchecked");
		$('#QuestionAndAnswerCheck').click(function(){
			toggleCheck(this);
		});
		document.getElementById("QuestionAndAnswerCheck").checked = false;
	}
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

function getInterests() {
	$.ajax({
		type: 'POST',
		url: '/GetInterests',
		contentType: 'application/json',
		data: JSON.stringify({
			'action': 'getInterests',
		}), complete: function (data) {
			if(data.responseJSON) {
			console.log("Interests have been retrieved");
			interests = data.responseJSON;
			initializeInterests();
			fillTier1Interests();
			getMentorships();
		}
		},
	});
}



function fillTier1Interests() {
	   console.log("FILL TIER 1");
			for(var i = 0; i < interests.length; i++) {
				//interests[i].checked = false;
				interests[i].expanded = false;
				if(interests[i].tier === "1"){
					$('#interest_id_'+interests[i].interest_id).html("<span class='glyphicon glyphicon-plus'></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+ interests[i].name);
					if(interests[i].checked == true) document.getElementById('interest_id_'+interests[i].interest_id+'_check').checked = true;
					//console.log("WEIRD THING ", $('#interest_id_'+interests[i].interest_id+'_check'));
					if(interests[i].checked == true){
						//$('#interest_id_'+interests[i].interest_id+'_check').removeClass('glyphicon-unchecked');
						$('#interest_id_'+interests[i].interest_id+'_check').addClass('glyphicon-ok-sign');
					} else {
						//$('#interest_id_'+interests[i].interest_id+'_check').removeClass('glyphicon-ok-sign');
						$('#interest_id_'+interests[i].interest_id+'_check').addClass('glyphicon-unchecked');
					}
					$('#interest_id_'+interests[i].interest_id+'_check').click(function() {
						let tmp = this.id.replace("interest_id_", "");
						tmp = tmp.replace("_check","");
						for(var i = 0; i < interests.length; i++){
								if(interests[i].interest_id == tmp) {
									if(this.checked == true) interests[i].checked = false;
									else interests[i].checked = true;
							}
						}
						toggleCheck(this);
					});
				}
			}
}



function clearInterestDisplay(){

	$('#interestDisplayTable').find('tr').remove();
	$('#interestDisplay').find('li').remove();


}

function setGeneralInterestsHeader() {
	$('#userInterests').find('h2').remove();
	$('#interestDisplayHead').find('ul').remove();
	$('#interestDisplayHead').find('table').remove();

	let header_1 = document.createElement('h2');
	let header_2 = document.createElement('h2');
	header_1.class = "generalInterestHead";
	header_2.class = "generalInterestHead";
	header_1.innerHTML = "Pick what areas you're interested in!";
	header_2.innerHTML = "General Interests";

	$('#interestDisplayHead').after(header_2);
	$('#interestDisplayHead').after(header_1);

}

function setInterestDisplayHeader(parent_interest){
	$('#interestDisplayHead').find('h2').remove();
	$('#userInterests').find('h2').remove();
	$('#interestDisplayHead').find('ul').remove();
	$('#interestDisplayHead').find('table').remove();

  let parent;
  for(var i = 0; i < interests.length; i++){
		if(interests[i].parent_interest_id == parent_interest.parent_interest_id) parent = interests[i];
	}
  let table = document.createElement('table');
	table.id = "interestDisplayHead";
	let row = document.createElement('row');
	let element_1 = document.createElement('td');
	let element_2 = document.createElement('td');

	let list = document.createElement('ul');
	list.className = 'list-group';

	let item_name = document.createElement('li');
	item_name.onclick = function (){
		displayTierAboveParent(parent);
	}
	item_name.className = 'list-group-item';
	item_name.innerHTML = "<span class='glyphicon glyphicon-minus-sign'></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+ parent_interest.name;
	let item_check = document.createElement('li');
	item_check.className = 'list-group-item';
	let input = document.createElement('span');
	input.id = parent_interest.interest_id;
	input.checked = parent_interest.checked;
	if(input.checked == true){
		console.log("IN IT");
		input.className = 'glyphicon glyphicon-ok-sign';
	} else {
		console.log("IN IT");
		input.className = 'glyphicon glyphicon-unchecked';
	}
	input.onclick = function() {
		for(var i = 0; i < interests.length; i++){
				if(interests[i].interest_id == this.id) {
					if(this.checked == true) interests[i].checked = false;
					else interests[i].checked = true;
			}
		}
		toggleCheck(this);
	};

	item_check.appendChild(input);

	element_1.appendChild(item_name);
	element_2.appendChild(item_check);

	row.appendChild(element_1);
	row.appendChild(element_2);

	table.appendChild(row);
	$('#interestDisplayHead').after(table);
}

function displayTierAboveParent(parent_interest){
	console.log("DISPLAY TIER ABOVE PARENT");
	var count = 0;
  var i = 0;
  let new_parent;
	for(; i < interests.length; i++) {
    if(parent_interest.parent_interest_id){
			if(interests[i].interest_id == parent_interest.parent_interest_id) new_parent = interests[i];
		}
		if(!parent_interest.parent_interest_id && !interests[i].parent_interest_id){
			if(count == 0) {
				clearInterestDisplay();
				setGeneralInterestsHeader();
			}
			count ++;
			let row = document.createElement('tr');
			let element_1 = document.createElement('td');
			let element_2 = document.createElement('td');


			let interest_name = document.createElement('li');
			let interest_input = document.createElement('li');
			let input = document.createElement('span');


			//let interest_id = interests[i].interest_id;
			interest_name.onclick = function (){
				let interest_id = this.id.replace("interest_id_","");
				displaySubinterests(interest_id);
			}

			if(checkChildInterests(interests[i].interest_id) == true){
				interest_name.innerHTML = "<span class='glyphicon glyphicon-plus-sign'></span>" +
				"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+ interests[i].name; }
			else {interest_name.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + interests[i].name;}

			interest_name.id = "interest_id_"+interests[i].interest_id;

			interest_name.className ="list-group-item";
			interest_input.className = "list-group-item";
			input.id = "interest_id_"+interests[i].interest_id+"_check";
      input.value = interests[i].interest_id;
			input.checked = interests[i].checked;
			if(input.checked == true){
				input.className = 'glyphicon glyphicon-ok-sign';
			} else {
				input.className = 'glyphicon glyphicon-unchecked';
			}
			input.onclick = function() {
				for(var i = 0; i < interests.length; i++){
						if(interests[i].interest_id == this.value) {
							if(this.checked == true) interests[i].checked = false;
							else interests[i].checked = true;
					}
				}
				toggleCheck(this);
			};
			interest_input.appendChild(input);
			element_1.appendChild(interest_name);
			element_2.appendChild(interest_input);

			row.appendChild(element_1);
			row.appendChild(element_2);

			$('#interestDisplayTable').append(row);
		}
		else if(!parent_interest.parent_interest_id && interests[i].parent_interest_id) continue;
		else if(parent_interest.parent_interest_id && !interests[i].parent_interest_id) continue;
		else if(interests[i].parent_interest_id && parent_interest.parent_interest_id){
			if(interests[i].parent_interest_id != parent_interest.parent_interest_id) continue;
			else {
				if(count == 0) {
					clearInterestDisplay();
					setInterestDisplayHeader(new_parent)
				}
				count ++;
				let row = document.createElement('tr');
				let element_1 = document.createElement('td');
				let element_2 = document.createElement('td');

				let interest_name = document.createElement('li');
				let interest_input = document.createElement('li');
				let input = document.createElement('span');


				if(checkChildInterests(interests[i].interest_id) == true){
					interest_name.innerHTML = "<span class='glyphicon glyphicon-plus-sign'></span>" +
					"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+ interests[i].name; }
				else {interest_name.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + interests[i].name;}

				interest_name.onclick = function (){
					let interest_id = this.id.replace("interest_id_","");
					displaySubinterests(interest_id);
				}
				interest_name.id = "interest_id_"+interests[i].interest_id;
				interest_name.className ="list-group-item";
				interest_input.className = "list-group-item";
				input.id = "interest_id_"+interests[i].interest_id+"_check";
				input.value = interests[i].interest_id;
				input.checked = interests[i].checked;
				if(input.checked == true){
					input.className = 'glyphicon glyphicon-ok-sign';
				} else {
					input.className = 'glyphicon glyphicon-unchecked';
				}
				input.onclick = function() {
					for(var i = 0; i < interests.length; i++){
							if(interests[i].interest_id == this.value) {
								if(this.checked == true) interests[i].checked = false;
								else interests[i].checked = true;
						}
					}
					toggleCheck(this);
				};
				interest_input.appendChild(input);
				element_1.appendChild(interest_name);
				element_2.appendChild(interest_input);

				row.appendChild(element_1);
				row.appendChild(element_2);

				$('#interestDisplayTable').append(row);
			}

		}
	}
}


function displaySubinterests(parent_interest_id) {

		console.log("PARENT_INTEREST_ID = ", parent_interest_id);


		var count = 0;
		var i = 0;
		let parent_interest;
		for(; i < interests.length; i++) {
			if(interests[i].interest_id == parent_interest_id) parent_interest = interests[i];
			else if(!interests[i].parent_interest_id) continue;
			else if(interests[i].parent_interest_id != parent_interest_id) continue;
			else {
				if(count == 0) clearInterestDisplay();
				count ++;
				let row = document.createElement('tr');
				let element_1 = document.createElement('td');
				let element_2 = document.createElement('td');


				let interest_name = document.createElement('li');
				let interest_input = document.createElement('li');
				let input = document.createElement('span');

				//let interest_id = interests[i].interest_id;


				if(checkChildInterests(interests[i].interest_id) == true){
					interest_name.innerHTML = "<span class='glyphicon glyphicon-plus-sign'></span>" +
					"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+ interests[i].name; }
				else {interest_name.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + interests[i].name;}


				interest_name.onclick = function (){
					let interest_id = this.id.replace("interest_id_","");
					displaySubinterests(interest_id);
				}
				interest_name.id = "interest_id_"+interests[i].interest_id;

				interest_name.className ="list-group-item";
				interest_input.className = "list-group-item";
				input.id = "interest_id_"+interests[i].interest_id+"_check";
				input.value = interests[i].interest_id;
				input.checked = interests[i].checked;
				if(input.checked == true){
					input.className = 'glyphicon glyphicon-ok-sign';
				} else {
					input.className = 'glyphicon glyphicon-unchecked';
				}
				input.onclick = function() {
					for(var i = 0; i < interests.length; i++){
							if(interests[i].interest_id == this.value) {
								if(this.checked == true) interests[i].checked = false;
								else interests[i].checked = true;
						}
					}
					toggleCheck(this);
				};
				interest_input.appendChild(input);
				element_1.appendChild(interest_name);
				element_2.appendChild(interest_input);

				row.appendChild(element_1);
				row.appendChild(element_2);

				$('#interestDisplayTable').append(row);
			}
		}
		if(count != 0) setInterestDisplayHeader(parent_interest);


}

function checkChildInterests(interest_id){
			for(var i = 0; i < interests.length; i++) {
				if(interests[i].parent_interest_id == interest_id) return true;

			}
			return false;
}

function saveInterests(){
	account.interests = new Array();
	for(var i = 0; i < interests.length; i++) {
		if(interests[i].checked == true) {
			console.log("INTEREST ID : ", interests[i].interest_id);
			account.interests.push(interests[i].interest_id);
	}
}
	$.ajax({
		type: 'POST',
		url: '/SaveUser',
		contentType: 'application/json',
		data: JSON.stringify({
			'action': 'saveUserInterests',
			'email': account.email,
			'interests' : account.interests
		}), complete: function (data) {
			console.log(data);
		},
	});

}

function sendAlerts() {
console.log("IN SEND ALERTS");
	$.ajax({
		type: 'POST',
		url: '/SendAlerts',
		contentType: 'application/json',
		data: JSON.stringify({
			'action': 'updatedQuestionAndAnswer',
			'account': account,
		}), complete: function (data) {
			console.log(data);
		}
	});
}

function savePreferences(){
	account.questionAndAnswer = document.getElementById('QuestionAndAnswerCheck').checked;
	if(account.questionAndAnswer == true) account.questionAndAnswer = "true";
	else account.questionAndAnswer = "false";

	if(account.role == "advisor" && account.questionAndAnswer == "true")  sendAlerts();

	$.ajax({
		type: 'POST',
		url: '/SaveUser',
		contentType: 'application/json',
		data: JSON.stringify({
			'action': 'saveUserPreferences',
			'email': account.email,
			'questionAndAnswer' : account.questionAndAnswer
		}), complete: function (data) {
			console.log(data);
		}
	});

}

function initializeInterests() {
	for(var i = 0; i < interests.length; i++) {
		interests[i].checked = false;
		if(document.getElementById('interest_id_'+interests[i].interest_id+"_check")){
		document.getElementById('interest_id_'+interests[i].interest_id+"_check").checked = false;
	  }
		for(var q = 0; q < account.interests.length; q++) {
			if(account.interests[q] == interests[i].interest_id){
				if(document.getElementById('interest_id_'+interests[i].interest_id+"_check")){
				document.getElementById('interest_id_'+interests[i].interest_id+"_check").checked = false;
			  }
			 		interests[i].checked = true;
				}
		}
	}

}

function toggleCheck(elem) {
	console.log("THIS = ", elem);

	if(elem.checked == false){
		elem.className = "glyphicon glyphicon-ok-sign";
		elem.checked = true;
	} else {
    elem.className = "glyphicon glyphicon-unchecked";
		elem.checked = false;
	}
}
