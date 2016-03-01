document.getElementById('debug').innerHTML = 'waiting for noboUrls<br>';

var noboLabels = {
	nb_01: { description: 'Media Publisher', comments: 'Holding company name - as in the VINEX contract', definition: 'The name of the contracing publisher at contract/holding group level. This is also the highest level and the level where the privacy compliance is executed' }, 
	nb_02: { description: "Sales Media Brand", comments: "Business unit - highest level - where media can be bought", definition: 'This is the media brand as known by clients (advertisers) and enables in later stage the settings in the buy-side tools for agencies' },
	nb_11: { description: "web or app platform", comments: "" },
	nb_12: { description: "website name or app name (technical)", comments: "technical domain name or technical app name" },
	nb_21: { description: "first publication date", comments: "first time content is produced" },
	nb_22: { description: "paid content flag", comments: "content is paid", definition: "The content is paid. This is also applicable if people access paid content in a 'free' or 'test' or 'demo' account." },
	nb_23: { description: "paid user flag", comments: "user is paying for this event" },
	nb_24: { description: "user login flag", comments: "user is logged in" },
	nb_25: { description: "media brand", comments: "media brand as perceived by user", definition: "The brand as perceived by the consumer/user. Normally defined by the logo on the page. There can only be one main media brand" },
	nb_26: { description: "secundair media brand", comments: "sub media brand as perceived by user", definition: "The sub-brand as perceived by the consumer/user. For example 'vrouw' at Telegraaf, 'zakelijk' at Nu.nl." },
	nb_27: { description: "genre", comments: "content description", definition: "The description of the content: news, culture, entertainment, football, travel, flights etc." },
	nb_28: { description: "event type (article or index)", comments: "article or index page", definition: "The flag if this is an article page or index page. An article page is defined as a page/view where the user can access all the content without an additional click. For example page on news sites, a post-on a facebook page etc. The differentiation is that this has also '1 genre' associated to it, where 'index' pages have multiple articles on the same view (home, category home etc)" },
	nb_29: { description: "media type", comments: "Type of media", definition: "This is the media type brand focus and mainly used to identify clearly replica, non-replica, general or e-mail newsletter" },
	nb_30: { description: "first edition date", comments: "first time the edition is produced", definition: "The first date the edition (replica) has been published)" },
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

		// show visible url
		html += '<p class="url-holder"><a target="_blank" href="' + url + '" title="' + url + '">' + url.substring(0, 150) + '&hellip;</a></p>';

		html += '<table>';

		if (!url) {
			continue;
		}

		var paramstring = url.split('?');
		if (!paramstring[1]) {
			continue;
		}
		var params = paramstring[1].split('&');
		var paramValuesByLabelKey = {};
		var lines = [];

		for (var j = 0; j < params.length; j++) {
			var ex = params[j].split('=');
			if (!ex[0].match(/^nb/)) {
				continue;
			}
			var labelKey = ex[0];
			var labelValue = unescape(ex[1]);
			paramValuesByLabelKey[labelKey] = labelValue;
		}

		for (var labelKey in noboLabels) {
			if (!noboLabels.hasOwnProperty(labelKey)) {
				continue;
			}
			var labelValue = paramValuesByLabelKey[labelKey] || 'missing';
			var title = noboLabels[labelKey].definition || noboLabels[labelKey].comments || '';
			var line = '<tr title="'+title+'">';
			line += '<th class="key">' + labelKey + '</th><th>';
			line += noboLabels[labelKey].description + '&nbsp;';
			line += '</th><td class="' + (labelValue === 'missing' ? 'missing' : '') + '">' + labelValue.replace(/^missing$/, 'not filled') + '</td>';
			line += '</tr>';
			lines.push(line);
			
		}

		html += lines.join('\n');
		html += '</table>';
	}

	document.getElementById('debug').innerHTML = html;

	document.querySelector('[data-version]').innerHTML = 'v' + chrome.app.getDetails().version;
});

