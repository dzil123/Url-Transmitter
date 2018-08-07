go = function() {
	chrome.runtime.sendMessage({"name": "get_url"}, function(response) {
		img = window.document.getElementById("qr");
		img.src = response["url"];
	});
};

//window.addEventListener("load", go);
document.addEventListener("DOMContentLoaded", go);
