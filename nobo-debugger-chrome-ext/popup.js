document.getElementById('debug').innerHTML = 'waiting for noboUrls<br>';

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

	var currentTab = tabs[0];

	
	var BGPage = chrome.extension.getBackgroundPage();
	
	var key = currentTab.id+':'+currentTab.url;
	var urls = BGPage.noboUrlsPerTabIdAndUrl[key];

	if (!urls) {
		return;
	}

	document.getElementById('debug').innerHTML = 'NOBO-data for ' + currentTab.url + '<br><br>';

	for (var i = 0; i < urls.length; i++) {
		var url = urls[i];

		if (!url) {
			continue;
		}

		var paramstring = url.split('?');
		if (!paramstring[1]) {
			continue;
		}
		var params = paramstring[1].split('&');
		for (var j = 0; j < params.length; i++) {
			var ex = params[i].split('=');
			if (!ex[0].match(/^nb/)) {
				continue;
			}
			document.getElementById('debug').innerHTML += '<b>'+ex[0] + '</b>: ' + unescape(ex[1]) + '<br>';
		}
	}
	

});

