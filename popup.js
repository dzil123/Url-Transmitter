SIZE = 400;

function update_qr_code() {
	chrome.runtime.sendMessage({"name": "get_content"}, function(response) {
		if (response.content) {
			set_qr_code(response.content);
		}
	});
}

// function onload() {
// 	chrome.tabs.query({"active": true, "currentWindow": true}, function(tabs) {
// 		tab = tabs[0];
// 		url = tab.url;
		
// 		body_string = encodeURIComponent(url);
// 		request_url = "https://api.qrserver.com/v1/create-qr-code/?data=" + body_string + "&size=" + SIZE + "x" + SIZE + "&format=svg&margin=0&ecc=M&qzone=2";
		
// 		img = window.document.getElementById("qr");
// 		img.src = request_url;
// 		img.width = SIZE;
// 		img.height = SIZE;
// 	});
	
// 	// chrome.runtime.sendMessage({"name": "get_url"}, function(response) {
// 	// 	img = window.document.getElementById("qr");
// 	// 	img.src = response["url"];
// 	// });
// };


function set_qr_code(content) {
	body_string = encodeURIComponent(content); // Does not care about protocol or URI type
    root = document.getElementById("root");
    
    var qrcode = new QRCode(root, {
        text: body_string,
        width: SIZE,
        height: SIZE,
        correctLevel: QRCode.CorrectLevel.M
    });
	
    img = document.getElementById("qr");
    img.remove();
    
    root.width = SIZE;
    root.height = SIZE;
    root.title = content;
}

function onload() {
	update_qr_code();
}

//window.addEventListener("load", go);
document.addEventListener("DOMContentLoaded", onload);

//setTimeout(onload, 1000);
