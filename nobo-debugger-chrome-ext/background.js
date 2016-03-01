noboUrlPerTabIdAndTabUrl = [];

chrome.webRequest.onBeforeRequest.addListener(
	function(info) {
		chrome.pageAction.show(info.tabId);

		chrome.tabs.query({}, function(tabs) {
			for (var i in tabs) {
				if (tabs[i].id == info.tabId) {
					var key = info.tabId+':'+tabs[i].url;
					noboUrlPerTabIdAndTabUrl[key] = info.url;
				}
			}
		});
	},
	// filters
	{
		urls: [
			"http://b.scorecardresearch.com/*nb_*",
			"https://sb.scorecardresearch.com/*nb_*"
		],
		types: ["image"]
	}
);