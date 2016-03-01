
// this var will be accessed by popup.js to generate the data-listing
noboUrlPerTabIdAndTabUrl = [];

// catch network-requests
chrome.webRequest.onBeforeRequest.addListener(
	// define what to do as soon as a request is encountered that matches the filter
	function(requestInfo) {
		// make icon appear in address-bar
		chrome.pageAction.show(requestInfo.tabId);

		// use async tabs.query+callback to grab current tab-url
		chrome.tabs.query({}, function(tabs) {
			var currentTab;
			for (var i in tabs) {
				if (tabs[i].id == requestInfo.tabId) {
					currentTab = tabs[i];
					break;
				}
			}

			// combining tab-id AND tab-url into one key seems to be the only way
			// to prevent the wrong data showing up in the wrong tabs
			var key = requestInfo.tabId + ':' + currentTab.url;
			noboUrlPerTabIdAndTabUrl[key] = requestInfo.url;
		});
	},

	// filters are defined here; trigger only on nobo-requests
	{
		urls: [
			"http://b.scorecardresearch.com/*nb_*",
			"https://sb.scorecardresearch.com/*nb_*"
		],
		types: ["image"]
	}
);
