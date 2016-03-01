document.getElementById('debug').innerHTML = 'waiting for noboUrls<br>';

var noboLabels = {
	nb_01: { description: 'Media Publisher', comments: 'Holding company name - as in the VINEX contract'}, 
	nb_02: { description: "Sales Media Brand", comments: "Business unit - highest level - where media can be bought" },
	nb_11: { description: "web or app platform", comments: "" },
	nb_12: { description: "website name or app name (technical)", comments: "technical domain name or technical app name" },
	nb_21: { description: "first publication date", comments: "first time content is produced" },
	nb_22: { description: "paid content flag", comments: "content is paid" },
	nb_23: { description: "paid user flag", comments: "user is paying for this event" },
	nb_24: { description: "user login flag", comments: "user is logged in" },
	nb_25: { description: "media brand", comments: "media brand as perceived by user" },
	nb_26: { description: "secundair media brand", comments: "sub media brand as perceived by user" },
	nb_27: { description: "genre", comments: "content description" },
	nb_28: { description: "event type (article or index)", comments: "article or index page" },
	nb_29: { description: "media type", comments: "Type of media" },
	nb_30: { description: "first edition date", comments: "first time the edition is produced" },
}

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

	var currentTab = tabs[0];

	
	var BGPage = chrome.extension.getBackgroundPage();
	
	var key = currentTab.id+':'+currentTab.url;
	var urls = [BGPage.noboUrlPerTabIdAndTabUrl[key]];

	if (!urls) {
		return;
	}

	var html = '';
	html += '<header>NOBO-tracker detected on <code>' + currentTab.url + '</code></header>';

	for (var i = 0; i < urls.length; i++) {
		var url = urls[i];
		html += '<table>';

		if (!url) {
			continue;
		}

		var paramstring = url.split('?');
		if (!paramstring[1]) {
			continue;
		}
		var params = paramstring[1].split('&');
		var lines = [];
		for (var j = 0; j < params.length; j++) {
			var ex = params[j].split('=');
			if (!ex[0].match(/^nb/)) {
				continue;
			}
			var label_key = ex[0];
			var label_value = unescape(ex[1]);
			var title = noboLabels[label_key].comments || '';
			var line = '<tr title="'+title+'">';
			line += '<th class="key">' + label_key + '</th><th>';
			if (noboLabels[label_key]) {
				line += noboLabels[label_key].description + '&nbsp;';
			}
			else {
				line += label_key;
			}
			line += '</th><td>' + label_value + '</td>';
			line += '</tr>';
			lines.push(line);
		}
		html += lines.join('\n');
		html += '</table>';
	}

	document.getElementById('debug').innerHTML = html;

	document.querySelector('[data-version]').innerHTML = 'v' + chrome.app.getDetails().version;
});

