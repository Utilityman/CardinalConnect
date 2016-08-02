
function requestLogin()
{
	var username = $("#username").val();
	var password = $("#password").val();
	
	if(username != "" && password != "")
	{
		$.ajax({
			type: 'POST',
			url: 'Login', 
			data: 
			{
				'action': 'login',
				'username': username,
				'password': password,
			},
			complete: function(data)
			{
				console.log(data);
				var responseText = data.responseText.slice(0, -1);
				console.log(escape(responseText));
				if('LOGIN_SUCCESS' == responseText)
					window.location.href = "home.html";//
				else
					$("#failedLogin").text("Invalid Credentials!");
			},
		});
	}
}

function requestAccount()
{
	$("#loginWindow").addClass('hidden');
	$("#accountCreation").removeClass('hidden');
}

function register()
{
	var success = false;
	var firstName = $("#firstName").val();
	var middleName = $("#middleName").val();
	var lastName = $("#lastName").val();
	
	var email = $("#emailAddress").val();
	
	var password = $("#password1").val();
	var password2 = $("#password2").val();
	
	console.log(password +  " " +  password2);
	if(firstName == "" || middleName == "" || lastName == "" || email == "" || password == "" || password2 == "")
	{
		$("#errorString").text("All fields required!");
		return;
	}
	if(password != password2)
	{
		$("#errorString").text("Passwords did not match!");
		$("#password1").val("");
		$("#password2").val("");
		return;
	}
	
	$.ajax({
		type: 'POST',
		url: 'Login', 
		data: 
		{
			'action': 'register',
			'username': email,
			'password': password,
			'firstName': firstName,
			'middleName': middleName,
			'lastName': lastName,
		},
		complete: function(data)
		{
			console.log(data);
			$("#password1").val("");
			$("#password2").val("");
			var responseText = data.responseText.slice(0, -1);
			if(responseText == 'ACCOUNT_CREATED')
			{
				success = true;
				$("#accountCreation").addClass('hidden');
				$("#success").removeClass('hidden');
			}
			else if(responseText == 'ACCOUNT_EXISTS')
			{
				$("#emailAddress").val("");
				$("#errorString").text("Account with email address already exists!");
			}
			else if(responseText == 'INTERNAL_ERROR')
			{
				$("#errorString").text("Server Busy! Contact us if problem persists!");
			}
			else
				success = false;
		},
	});
	
	if(success)
	{

	}
}

function reload()
{
	window.location.href = "index.html";
}
