function showFilterPopup()
{
	$("#filterPopup").css("display", "block");
}

function closeFilterPopup()
{
	$("#filterPopup").css("display", "none");
}

function showPostPopup()
{
	$("#postPopup").css("display", "block");
}

function closePostPopup()
{
	$("#postPopup").css("display", "none");
	$("#formDiv").removeClass("hidden");
	$("#successDiv").addClass("hidden");
}


$(function()
{
	$(document).on('click', function(e)
	{
		if(e.target.id =='filterPopup')
			$("#filterPopup").css("display", "none");
		if(e.target.id =='postPopup')
		{
			$("#postPopup").css("display", "none");
			$("#formDiv").removeClass("hidden");
			$("#successDiv").addClass("hidden");
		}
	});
});

