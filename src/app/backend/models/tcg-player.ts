export interface SearchTcgPlayer {
    errors: any[];
    results: SearchResultTcgPlayer[];
}

export interface SearchResultTcgPlayer {
	aggregations: any;
	algorithm: string;
	searchType: string;
	didYouMean: any;
	totalResults: number;
	resultId: string;
	results: SearchProductResultTcgPlayer[];
}

export interface SearchProductResultTcgPlayer {
	shippingCategoryId: number;
	duplicate: boolean;
	productLineUrlName: string;
	productUrlName: string;
	productTypeId: number;
	rarityName: string;
	sealed: boolean;
	marketPrice: number;
	customAttributes: any;
	lowestPriceWithShipping: number;
	productName: string;
	setId: number;
	productId: number;
	score: number;
	setName: string;
	foilOnly: boolean;
	setUrlName: string;
	sellerListable: boolean;
	totalListings: number;
	productLineId: number;
	productStatusId: number;
	productLineName: string;
	maxFulfillableQuantity: number;
	listings: any;
	lowestPrice: number;
}

export interface ProductPriceTcgPlayer {
	printingType: string;
	marketPrice: number;
	buylistMarketPrice: number;
	listedMedianPrice: number;
}
