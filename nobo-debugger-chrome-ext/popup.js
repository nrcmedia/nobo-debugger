document.getElementById('debug').innerHTML = 'waiting for noboUrls<br>';

var noboLabels = {
	nb_01: { description: 'Media Publisher', comments: 'Holding company name - as in the VINEX contract'}, 
	nb_02: { description: "Sales Media Brand", comments: "Business unit - highest level - where media can be bought" },
	nb_11: { description: "web or app platform", comments: "" },
	nb_12: { description: "website name or app name (technical)", comments: "technical domain name or technical app name" },
	nb_21: { description: "first publication date", comments: "first time content is produced" },
	nb_22: { description: "paid content flag", comments: "content is paid" },
	nb_23: { description: "paid user flag", comments: "user is paying fpr this event" },
	nb_24: { description: "user login flag", comments: "user is logged in" },
	nb_25: { description: "media brand", comments: "media brand as perceived by user" },
	nb_26: { description: "secundair media brand", comments: "sub media brand as perceived by user" },
	nb_27: { description: "genre", comments: "content description" },
	nb_28: { description: "event type (article or index)", comments: "article or index page" },
	nb_29: { description: "media type", comments: "Type of media" },
	nb_30: { description: "first edition date", comments: "Tfirst time the edition is produced" },
}

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

	var currentTab = tabs[0];

	
	var BGPage = chrome.extension.getBackgroundPage();
	
	var key = currentTab.id+':'+currentTab.url;
	var urls = BGPage.noboUrlsPerTabIdAndUrl[key];

	if (!urls) {
		return;
	}

	document.getElementById('debug').innerHTML = 'NOBO-data for <code>' + currentTab.url + '</code><br><br>';

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
			var label_key = ex[0];
			var label_value = unescape(ex[1]);
			var line = '';
			if (noboLabels[label_key]) {
				line += '<b>' + noboLabels[label_key].description + '</b>';
			}
			else {
				line += '<b>'+label_key + '</b>';
			}
			line += ': ' + label_value + '<br>';
			document.getElementById('debug').innerHTML += line;
		}
	}

});

