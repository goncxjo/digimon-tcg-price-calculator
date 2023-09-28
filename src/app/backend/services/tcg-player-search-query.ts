export const TcgPlayerSearchQuery: any = {
	"algorithm": "sales_exp_fields",
	"from": 0,
	"size": 9999,
	"filters": {
		"term": { "productLineUrlName": ["digimon-card-game"], "rarityName": ["Common", "Uncommon", "Rare", "Super Rare", "Secret Rare", "Promo"] },
		"range": {},
	  "match": {}
	},
	"listingSearch": {
	  "context": { "cart": {} },
	  "filters": {
		"term": { "sellerStatus": "Live", "channelId": 0 },
		"range": { "quantity": { "gte": 1 } },
		"exclude": { "channelExclusion": 0 }
	  }
	},
	"context": { "cart": {}, "shippingCountry": "US" },
	"settings": { "useFuzzySearch": true, "didYouMean": {} },
	"sort": {}
}

export const TcgPlayerGetProduct: any = {
	"algorithm": "sales_exp_fields",
	"from": 0,
	"size": 1,
	"filters": {
		"term": { "productId": ["{0}"], "productLineUrlName": ["digimon-card-game"], "rarityName": ["Common", "Uncommon", "Rare", "Super Rare", "Secret Rare", "Promo"] },
		"range": {},
	  "match": {}
	},
	"listingSearch": {
	  "context": { "cart": {} },
	  "filters": {
		"term": { "sellerStatus": "Live", "channelId": 0 },
		"range": { "quantity": { "gte": 1 } },
		"exclude": { "channelExclusion": 0 }
	  }
	},
	"context": { "cart": {}, "shippingCountry": "US" },
	"settings": { "useFuzzySearch": true, "didYouMean": {} },
	"sort": {}
}
  