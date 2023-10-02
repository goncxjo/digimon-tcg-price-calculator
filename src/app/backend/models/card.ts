import * as uuid from 'uuid';
import { CardPriceTcgPlayer } from './tcg-player';

export class Card {
	id: string = uuid.v4();		
	name: string = '';
	fullName: string = '';
	expansion_id: number = 0;		
	image_small_url: string = '';
	image_url: string = '';
	card_trader_id: number | null = null;
	card_market_id: number | null = null;
	tcg_player_id: number | null = null;
	rarity_code: string = '';
	rarity_name: string = '';
	collector_number: string = '';
	expansion_name: string = '';
	tcg_player_url: string = '';
	price: CardPrice = new CardPrice();
	prices: Map<string, CardPrice | null> = new Map<string, CardPrice | null>();
	multiplier: number = 1;

	constructor() {
		this.prices.set("custom", new CardPrice());
	}

	setFromTcgPlayer(res: any, imageEndpoint: string, productUrl: string) {
		const cardId = `${res.productId}`.replace('.0', '');
		const number_split = (res.customAttributes.number || '- -').split(" ");
		const collector_number = number_split[0];
		const rarity_code = number_split[1];
		const fullName = res.productName.replace(collector_number, '').replace(' - ', '').replace('[-]', '')

		this.name = res.productName;
		this.fullName = `[${collector_number}] ${fullName}`;
		this.expansion_id = res.setId;
		this.tcg_player_id = parseInt(cardId);
		this.rarity_code = rarity_code;
		this.rarity_name = res.rarityName;
		this.collector_number = collector_number;
		this.expansion_name = res.setName;
		this.image_small_url = imageEndpoint.replace('{quality}', '1').replace('{id}', cardId);
		this.image_url = imageEndpoint.replace('{quality}', '100').replace('{id}', cardId);
		this.tcg_player_url = `${productUrl}`.replace('{id}', cardId);
	}	
}

export class CardPrices {
	tcg_player: CardPriceTcgPlayer = {} as CardPriceTcgPlayer;
	custom: CardPrice = new CardPrice();
}

export class CardPrice {
	currency_value: number = 0;
	currency_symbol: string = 'ARS';
}