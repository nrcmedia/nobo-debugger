
// based on vinex_labels_tagging_nobo-20151005-v1-final.xlsx

var noboLabels = {
	nb_01: {
		mandatory: true,
		description: "Media Publisher",
		comments: "Holding company name - as in the VINEX contract",
		definition: "The name of the contracing publisher at contract/holding group level. This is also the highest level and the level where the privacy compliance is executed"
	},

	nb_02: {
		mandatory: true,
		description: "Sales Media Brand",
		comments: "Business unit - highest level - where media can be bought",
		definition: "This is the media brand as known by clients (advertisers) and enables in later stage the settings in the buy-side tools for agencies"
	},

	nb_11: {
		mandatory: true,
		description: "web or app platform",
		comments: ""
	},

	nb_12: {
		mandatory: true,
		description: "website name or app name (technical)",
		comments: "technical domain name or technical app name"
	},

	nb_21: {
		description: "first publication date",
		comments: "first time content is produced"
	},

	nb_22: {
		description: "paid content flag",
		comments: "content is paid",
		definition: "The content is paid. This is also applicable if people access paid content in a 'free' or 'test' or 'demo' account."
	},

	nb_23: {
		description: "paid user flag",
		comments: "user is paying for this event"
	},

	nb_24: {
		description: "user login flag",
		comments: "user is logged in"
	},

	nb_25: {
		mandatory: true,
		description: "media brand",
		comments: "media brand as perceived by user",
		definition: "The brand as perceived by the consumer/user. Normally defined by the logo on the page. There can only be one main media brand"
	},

	nb_26: {
		description: "secundair media brand",
		comments: "sub media brand as perceived by user",
		definition: "The sub-brand as perceived by the consumer/user. For example 'vrouw' at Telegraaf, 'zakelijk' at Nu.nl."
	},

	nb_27: {
		mandatory: true,
		description: "genre",
		comments: "content description",
		definition: "The description of the content: news, culture, entertainment, football, travel, flights etc."
	},

	nb_28: {
		mandatory: true,
		description: "event type (article or index)",
		comments: "article or index page",
		definition: "The flag if this is an article page or index page. An article page is defined as a page/view where the user can access all the content without an additional click. For example page on news sites, a post-on a facebook page etc. The differentiation is that this has also '1 genre' associated to it, where 'index' pages have multiple articles on the same view (home, category home etc)"
	},

	nb_29: {
		mandatory: true,
		description: "media type",
		comments: "Type of media",
		definition: "This is the media type brand focus and mainly used to identify clearly replica, non-replica, general or e-mail newsletter"
	},

	nb_30: {
		description: "first edition date",
		comments: "first time the edition is produced",
		definition: "The first date the edition (replica) has been published"
	},
};
