//var url_dict = {};
// This is a test

var global_state = { "content": null };

function get_current_tab(callback) {
	chrome.tabs.query({"active": true, "currentWindow": true}, function(tabs) {
		tab = tabs[0];
		url = tab.url;
		
		callback(url);
	});
}

function encode_url(url) {
	return "URLTO:" + url;
}

chrome.runtime.onInstalled.addListener(function () { // Called once on install. Preferable to global code
	
	chrome.contextMenus.create({
		"title": "Make QR code of this link",
		"id": "menu_link",
		"contexts": ["link"]
	});
	
	chrome.contextMenus.create({
		"title": "Make QR code of this image",
		"id": "menu_image",
		"contexts": ["image"]
	});
	
	chrome.contextMenus.create({
		"title": "Make QR code of this text",
		"id": "menu_text",
		"contexts": ["selection"]
	});
	
});

chrome.contextMenus.onClicked.addListener(function(info, tab) { // Instead of addListener({"onclick": function(){}})
	// if (info.menuItemId === "menu_page") {
	// 	global_state.content = info
	// } else
	
	if (info.menuItemId === "menu_link") {
		global_state.content = encode_url(info.linkUrl);
	} else if (info.menuItemId === "menu_image") {
		global_state.content = encode_url(info.srcUrl);
	} else if (info.menuItemId === "menu_text") {
		global_state.content = info.selectionText;
	}
});

// chrome.browserAction.onClicked.addListener(function(tab) {
//     url = tab.url;
 //   body_string = encodeURIComponent(url);
 //   request_url = "https://api.qrserver.com/v1/create-qr-code/?data=" + body_string + "&size=600x600&format=svg&margin=0&ecc=M&qzone=2";
    
 //   local_url = chrome.runtime.getURL("popup_window.html");
    
 //   console.log(local_url);

 //   chrome.windows.create({
 //       url: local_url,
 //       type: "popup",
 //       width: 650,
 //       height: 650,
 //       focused: true
 //   }, function(win) {
	// 	url_dict[win.id] = request_url;
	// });
	
// });

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.name == "get_url") {
		// url = url_dict[sender.tab.windowId];
		// delete url_dict[sender.tab.windowId];
		// sendResponse({"url": url});
		console.log("Unimplemented");
	}
	if (request.name == "get_content") {
		if (global_state.content === null) {
			get_current_tab(function (url) {
				sendResponse({"content": encode_url(url), "type": "url"});
			});
			return true; // https://stackoverflow.com/q/22696142 like wtf isnt this default
		} else {
			sendResponse({"content": global_state.content, "type": "text"});
			global_state.content = null;
		}
	}
});
