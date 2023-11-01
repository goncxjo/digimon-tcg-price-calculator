export function createTcgPlayerQuery(productId: number = 0): any {
	const query: any = {
		algorithm: "sales_exp_fields",
		from: 0,
		size: 20,
		filters: {
		  term: {
			productLineName: ["Digimon Card Game"],
			rarityName: ["Common", "Uncommon", "Rare", "Super Rare", "Secret Rare", "Promo"],
		  },
		  range: {},
		  match: {},
		},
		listingSearch: {
		  context: { cart: {} },
		  filters: {
			term: { sellerStatus: "Live", channelId: 0 },
			range: { quantity: { gte: 1 } },
			exclude: { channelExclusion: 0 },
		  },
		},
		context: { cart: {}, shippingCountry: "US" },
		settings: { useFuzzySearch: true, didYouMean: {} },
		sort: {},
	  };
	
	  if (productId !== 0) {
		query.filters.term.productId = `${productId}`;
	  }
	
	  return query;
  }
