import { ProductPriceCardTrader } from "./card-trader";
import { CardPriceTcgPlayer } from "./tcg-player";

export interface Card {
	id: string;		
	name: string;
	fullName: string;
	expansion_id: number;		
	image_small_url: string;
	image_url: string;
	card_trader_id: number | null;
	card_market_id: number | null;
	tcg_player_id: number | null;
	rarity_code: string;
	rarity_name: string;
	collector_number: string;
	expansion_name: string;
	tcg_player_url: string;
	tcg_player_price: CardPriceTcgPlayer;
	card_trader_price: ProductPriceCardTrader[];
	custom_price: CardPrice;
	price: CardPrice;
	multiplier: number
}

export interface CardPrice {
	currency_value: number;
	currency_symbol: string;
}