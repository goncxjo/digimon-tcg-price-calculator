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
	rarity: string;
	collector_number: string;
	price: string = "0";
	format: string = "USD";

	constructor(blueprint: BlueprintCardTrader) {
		this.id = uuid.v4();
		this.name = blueprint.name;
		this.expansion_id = blueprint.expansion_id;
		this.rarity = blueprint.fixed_properties.digimon_rarity;
		this.collector_number = blueprint.fixed_properties.collector_number;
		this.image_url = blueprint.image_url;
		this.card_trader_id = blueprint.id;
		this.card_market_id = (blueprint.card_market_id || null) as number | null;
		this.tcg_player_id = (blueprint.tcg_player_id || null) as number | null;
		this.fullName = `${this.name} (${this.collector_number})`;
	}
}