import * as uuid from 'uuid';
import { BlueprintCardTrader } from "./card-trader";
 
 export class Card {
	id: string;		
	name: string;
	fullName: string;
	expansion_id: number;		
	image_url: string;
	card_trader_id: number | null;
	card_market_id: number | null;
	tcg_player_id: number | null;
	rarity_code: string;
	rarity_name: string;
	collector_number: string;
	expansion_name: string;
	price: string = "0";
	format: string = "USD";

	constructor(blueprint: any) {
		this.id = uuid.v4();
		this.name = blueprint.name;
		this.expansion_id = blueprint.expansion_id;
		this.rarity_code = blueprint.fixed_properties.digimon_rarity;
		this.collector_number = blueprint.fixed_properties.collector_number;
		this.image_url = blueprint.image_url;
		this.card_trader_id = blueprint.id;
		this.card_market_id = (blueprint.card_market_id || null) as number | null;
		this.tcg_player_id = (blueprint.tcg_player_id || null) as number | null;
		this.expansion_name = blueprint.expansion_name;
		this.rarity_name = this.getRarity();
		this.fullName = `${this.name} (${this.collector_number})`;
	}

	getRarity(): string {
		switch (this.rarity_code) {
			case "C":
				return "Common";
			case "U":
				return "Uncommon";
			case "R":
				return "Rare";
			case "SR":
				return "Supe Rare";
			case "SEC":
				return "Secret";
			case "P":
				return "Promo";
			default:
				return this.rarity_code;
		}
	}
}