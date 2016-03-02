
function readableDateFromYYYYMMDD(dateString, prefix) {
	if (!prefix) {
		prefix = '';
	}

	if (!dateString.match(/^\d{8}$/)) {
		return '';
	}

	var dateInput = dateString.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3');
	var readableDate = ('' + new Date(dateInput)).split(/ \d{2}\:/)[0];
	return prefix + readableDate;
}

function readableDateFromTimestamp(ts, prefix) {
	if (!prefix) {
		prefix = '';
	}

	// strip timezone etc. after seconds
	var readableDate = ('' + new Date(1*ts))
		.replace(/(\:\d\d) .*$/, '$1')
		.replace(' 00:00:00', '');

	if (readableDate && readableDate !== 'Invalid Date') {
		return prefix + readableDate;
	}

	return '';
}

function extractParamValuesFromUrl(noboUrl) {
	var paramstring = noboUrl.split('?');
	if (!paramstring[1]) {
		return;
	}
	var params = paramstring[1].split('&');
	var paramValuesByLabelKey = {};

	for (var j = 0; j < params.length; j++) {
		var ex = params[j].split('=');
		if (!ex[0].match(/^nb/)) {
			continue;
		}
		var labelKey = ex[0];
		var labelValue = unescape(ex[1]);
		paramValuesByLabelKey[labelKey] = labelValue;
	}
	return paramValuesByLabelKey;
}

function genOutputLines(noboLabels, paramValuesByLabelKey) {
	var lines = [];
	for (var labelKey in noboLabels) {
		if (!noboLabels.hasOwnProperty(labelKey)) {
			continue;
		}
		var labelValue = paramValuesByLabelKey[labelKey] || 'missing';
		var title = noboLabels[labelKey].definition || noboLabels[labelKey].comments || '';
		var line = '<tr title="'+title+'">';
		line += '<th class="key">' + labelKey + '</th>';
		line += '<th class="' + (noboLabels[labelKey].description === 'unknown' ? 'unknown' : '') + '">';
		line += noboLabels[labelKey].description.replace(/^unknown$/, 'unknown label') + '&nbsp;';
		line += '</th><td class="'
			+ (labelValue === 'missing' ? 'missing' : '')
			+ (noboLabels[labelKey].mandatory ? ' mandatory' : '')
			+ '">' + labelValue.replace(/^missing$/, 'not filled')
			+ (labelKey === 'nb_21' ? ' <span class="readable-date">' + readableDateFromYYYYMMDD(labelValue, '=&nbsp;') + '</span>' : '')
			+ (labelKey === 'nb_30' ? ' <span class="readable-date">' + readableDateFromTimestamp(labelValue, '=&nbsp;') + '</span>' : '')
			+ '</td>';
		line += '</tr>';
		lines.push(line);
	}
	return lines;
}

function genOutput(tabUrl, noboUrl) {
	var html = '';
	html += '<header>NOBO-tracker detected on <code>' + tabUrl + '</code></header>';
	html += '<p class="url-holder"><a target="_blank" href="' + noboUrl + '" title="' + noboUrl + '">' + noboUrl.substring(0, 150) + '&hellip;</a></p>';
	html += '<table>';

	var paramValuesByLabelKey = extractParamValuesFromUrl(noboUrl);

	// also show labels that appear in url but are unknown
	for (var labelKey in paramValuesByLabelKey) {
		if (!noboLabels[labelKey]) {
			noboLabels[labelKey] = {
				description: 'unknown'
			}
		}
	}

	var lines = genOutputLines(noboLabels, paramValuesByLabelKey);
	html += lines.join('\n');
	html += '</table>';

	return html;
}

// run on current active tab in current window
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

	// grab correct nobo-url from array filled by background.js
	var currentTab = tabs[0];
	var key = currentTab.id + ':' + currentTab.url;
	var noboUrl = chrome.extension.getBackgroundPage().noboUrlPerTabIdAndTabUrl[key];

	if (!noboUrl) {
		return;
	}

	// fill main popup debug-output
	document.getElementById('debug').innerHTML = genOutput(currentTab.url, noboUrl);

	// update extension version indicator ("v0.1") in popup-footer based on version in manifest
	document.querySelector('[data-version]').innerHTML = 'v' + chrome.app.getDetails().version;
});

