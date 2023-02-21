
export const _channelGroupings = {
	fb_ads: {
		name: "Facebook Ads",
		id: 'fb_ads',
		definition: [{key:'vxl_channel',val:'fb_ads'}],
		subgrouping: [
			{ id: 'campaign', name: 'Campaign', defintion: 'vxl_campaign' },
			{ id: 'set', name: 'Ad Set', defintion: 'vxl_set' },
			{ id: 'ad', name: 'Ad', defintion: 'vxl_ad' }
		]
	},
	google_ads: {
		name: "Google Ads",
		id: 'google_ads',
		definition: [{key:'vxl_channel',val:'google_ads'}],
		subgrouping: [
			{ id: 'campaign', name: 'Campaign', defintion: 'vxl_campaign' },
			{ id: 'set', name: 'Ad Group', defintion: 'vxl_set' },
			{ id: 'ad', name: 'Ad', defintion: 'vxl_ad' }
		]
	},
	email: {
		name: "Email",
		id: 'email',
		definition: [{key:'utm_medium',val:'email'}],
		subgrouping: [
			{ id: 'campaign', name: 'Campaign', defintion: 'utm_campaign' }
		]
	},
	fallback: {
		name: "Other",
		id: 'other',
		definition: [],
		subgrouping: [
			{ id: 'source', name: 'Source', defintion: 'utm_source' },
			{ id: 'medium', name: 'Medium', defintion: 'utm_medium' },
			{ id: 'campaign', name: 'Campaign', defintion: 'utm_campaign' },
		]
	}
}

export var _integrations = {
	"fb_ads" : {
		"display": "Facebook Ads",
		"icon": "akar-icons:facebook-fill",
		"color": "#3578e5",
		"enabled": false,
		"key": "fb_ads",
		"channel": {
			"display": "Facebook Ads",
			"key": "vxl_fb",
			"definition": [
				{
					"key": "vxl_channel",
					"value": "fb_ads"
				}
			],
			"subgroupings": [
				{
					"key": "campaign",
					"display": "Campaign",
					"definition": "vxl_campaign"
				},
				{
					"key": "ad_set",
					"display": "Ad Set",
					"definition": "vxl_set"
				},
				{
					"key": "ad",
					"display": "Ad",
					"definition": "vxl_ad"
				}
			]
		},
	}
};