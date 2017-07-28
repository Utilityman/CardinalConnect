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
			console.log(data.responseJSON);
			interests = data.responseJSON;
			fillTier1Interests();
			getMentorships();
		},
	});
}
function fillTier1Interests() {
			for(var i = 0; i < interests.length; i++) {
				interests[i].checked = false;
				interests[i].expanded = false;
				if(interests[i].tier === "1"){
					$('#interest_id_'+interests[i].interest_id).html(interests[i].name);
					$('#interest_id_'+interests[i].interest_id+'_check').click(function() {
						let tmp = this.id.replace("interest_id_", "");
						tmp = tmp.replace("_check","");
						for(var i = 0; i < interests.length; i++){
								if(interests[i].interest_id == tmp) {
									if(this.checked == true) interests[i].checked = true;
									else interests[i].checked = false;
							}
						}
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
	let row = document.createElement('row');
	let element_1 = document.createElement('td');
	let element_2 = document.createElement('td');
	let element_3 = document.createElement('td');
	let list = document.createElement('ul');
	list.className = 'list-group';
	let item_collapse = document.createElement('li');
	item_collapse.className = 'list-group-item';
	item_collapse.innerHTML = "-";
	item_collapse.id = "interest_id_" + parent_interest.interest_id;
	item_collapse.onclick = function (){
		displayTierAboveParent(parent);
	}
	let item_name = document.createElement('li');
	item_name.className = 'list-group-item';
	item_name.innerHTML = parent_interest.name;
	let item_check = document.createElement('li');
	item_check.className = 'list-group-item';
	let input = document.createElement('input');
	input.id = parent_interest.interest_id;
	input.checked = parent_interest.checked;
	input.type = "checkbox";
	input.onclick = function() {
		for(var i = 0; i < interests.length; i++){
				if(interests[i].interest_id == this.id) {
					if(this.checked == true) interests[i].checked = true;
					else interests[i].checked = false;
			}
		}
	};

	item_check.appendChild(input);

	element_1.appendChild(item_collapse);
	element_2.appendChild(item_name);
	element_3.appendChild(item_check);
	row.appendChild(element_1);
	row.appendChild(element_2);
	row.appendChild(element_3);
	table.appendChild(row);
	$('#interestDisplayHead').after(table);
}

function displayTierAboveParent(parent_interest){
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
			let element_3 = document.createElement('td');
			let interest_expand = document.createElement('li');
			let interest_name = document.createElement('li');
			let interest_input = document.createElement('li');
			let input = document.createElement('input');


			//let interest_id = interests[i].interest_id;
			interest_expand.onclick = function (){
				let interest_id = this.id.replace("interest_id_","");
				displaySubinterests(interest_id);
			}
			interest_expand.id = "interest_id_"+interests[i].interest_id;
			interest_expand.className = "list-group-item";
			if(checkChildInterests(interests[i].interest_id) == true){ interest_expand.innerHTML = "+"; }
			else {interest_expand.innerHTML = " ";}

			interest_name.id = "interest_id_"+interests[i].interest_id;
			interest_name.innerHTML = interests[i].name;
			interest_name.className ="list-group-item";
			interest_input.className = "list-group-item";
			input.id = "interest_id_"+interests[i].interest_id+"_check";
			input.type = "checkbox";
      input.value = interests[i].interest_id;
			input.className = "checkbox";
			input.checked = interests[i].checked;
			input.onclick = function() {
				for(var i = 0; i < interests.length; i++){
						if(interests[i].interest_id == this.value) {
							if(this.checked == true) interests[i].checked = true;
							else interests[i].checked = false;
					}
				}
			};
			interest_input.appendChild(input);
			element_1.appendChild(interest_expand);
			element_2.appendChild(interest_name);
			element_3.appendChild(interest_input)
			row.appendChild(element_1);
			row.appendChild(element_2);
			row.appendChild(element_3);
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
				let element_3 = document.createElement('td');
				let interest_expand = document.createElement('li');
				let interest_name = document.createElement('li');
				let interest_input = document.createElement('li');
				let input = document.createElement('input');

				//let interest_id = interests[i].interest_id;
				interest_expand.onclick = function (){
					let interest_id = this.id.replace("interest_id_","");
					displaySubinterests(interest_id);
				}
				interest_expand.id = "interest_id_"+interests[i].interest_id;
				interest_expand.className = "list-group-item";
				if(checkChildInterests(interests[i].interest_id) == true){ interest_expand.innerHTML = "+"; }
				else {interest_expand.innerHTML = " ";}

				interest_name.id = "interest_id_"+interests[i].interest_id;
				interest_name.innerHTML = interests[i].name;
				interest_name.className ="list-group-item";
				interest_input.className = "list-group-item";
				input.id = "interest_id_"+interests[i].interest_id+"_check";
				input.type = "checkbox";
				input.value = interests[i].interest_id;
				input.className = "checkbox";
				input.checked = interests[i].checked;
				input.onclick = function() {
					for(var i = 0; i < interests.length; i++){
							if(interests[i].interest_id == this.value) {
								if(this.checked == true) interests[i].checked = true;
								else interests[i].checked = false;
						}
					}
				};
				interest_input.appendChild(input);
				element_1.appendChild(interest_expand);
				element_2.appendChild(interest_name);
				element_3.appendChild(interest_input)
				row.appendChild(element_1);
				row.appendChild(element_2);
				row.appendChild(element_3);
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
				let element_3 = document.createElement('td');
				let interest_expand = document.createElement('li');
				let interest_name = document.createElement('li');
				let interest_input = document.createElement('li');
				let input = document.createElement('input');

				//let interest_id = interests[i].interest_id;
				interest_expand.onclick = function (){
					let interest_id = this.id.replace("interest_id_","");
					displaySubinterests(interest_id);
				}
				interest_expand.id = "interest_id_"+interests[i].interest_id;
				interest_expand.className = "list-group-item";
				if(checkChildInterests(interests[i].interest_id) == true){ interest_expand.innerHTML = "+"; }
				else {interest_expand.innerHTML = " ";}

				interest_name.id = "interest_id_"+interests[i].interest_id;
				interest_name.innerHTML = interests[i].name;
				interest_name.className ="list-group-item";
				interest_input.className = "list-group-item";
				input.id = "interest_id_"+interests[i].interest_id+"_check";
				input.type = "checkbox";
				input.value = interests[i].interest_id;
				input.className = "checkbox";
				input.checked = interests[i].checked;
				input.onclick = function() {
					for(var i = 0; i < interests.length; i++){
							if(interests[i].interest_id == this.value) {
								if(this.checked == true) interests[i].checked = true;
								else interests[i].checked = false;
						}
					}
				};
				interest_input.appendChild(input);
				element_1.appendChild(interest_expand);
				element_2.appendChild(interest_name);
				element_3.appendChild(interest_input)
				row.appendChild(element_1);
				row.appendChild(element_2);
				row.appendChild(element_3);
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

function expandSubinterests(parent_interest_id, parent_tier) {

		console.log("PARENT_INTEREST_ID = ", parent_interest_id);
		let tier = parent_tier + 1;
		let d = document.createDocumentFragment();
		let list = document.createElement('ul');
		list.id = "tier-"+tier+"-interests";
		list.className="list-group tier-"+tier+"-interests";
		let table = document.createElement('table');
		table.id = "subinterest_table_of_" + parent_interest_id;
		table.className = "subinterest_table_tier_"+parent_tier;
		var count = 0;
		var i = 0;
		for(; i < interests.length; i++) {
			if(!interests[i].parent_interest_id) continue;
			else if(interests[i].parent_interest_id != parent_interest_id) continue;
			else {
				count ++;
				let row = document.createElement('tr');
				let element_1 = document.createElement('td');
				let element_2 = document.createElement('td');
				let element_3 = document.createElement('td');
				let interest_expand = document.createElement('li');
				let interest_name = document.createElement('li');
				let interest_input = document.createElement('li');
				let input = document.createElement('input');


				row.id = "row_interest_id_"+interests[i].interest_id;


				interest_expand.onclick = function (){
					var classes = this.className;
					var id = this.id;
					var tier = "";
					var next_tier;
					var interest_id = "";
					for(var q=0;q<classes.length;q++){
						if(!isNaN(classes[q])) tier += classes[q];
					}
					for(var q=0;q<id.length;q++){
						if(!isNaN(id[q])) interest_id += id[q];
					}
					next_tier = parseInt(tier) + 1;
					toggleSubinterests(interest_id, tier, next_tier);
				}
				interest_expand.id = "interest_id_"+interests[i].interest_id+"_expander";
				interest_expand.className = "list-group-item tier_"+interests[i].tier;
				interest_expand.innerHTML = "+";
				interest_name.id = "interest_id_"+interests[i].interest_id;
				interest_name.innerHTML = interests[i].name;
				interest_name.className ="list-group-item";
				interest_input.className = "list-group-item";
				input.id = "interest_id_"+interests[i].interest_id+"_check";
				input.type = "checkbox";
				input.className = "checkbox";
				interest_input.appendChild(input);
				element_1.appendChild(interest_expand);
				element_2.appendChild(interest_name);
				element_3.appendChild(interest_input)
				row.appendChild(element_1);
				row.appendChild(element_2);
				row.appendChild(element_3);
				table.appendChild(row);
			}
		}
		list.appendChild(table);
		if(count != 0)$('#row_interest_id_'+parent_interest_id).after(list);

}
