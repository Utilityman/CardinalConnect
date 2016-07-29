
function requestLogin()
{
	
}

function requestAccount()
{
	console.log("hey");
	$("#loginWindow").addClass('hidden');
	$("#accountCreation").removeClass('hidden');
}

function register()
{
	$("#accountCreation").addClass('hidden');
	$("#success").removeClass('hidden');
}

function reload()
{
	window.location.href = "index.html";
}
