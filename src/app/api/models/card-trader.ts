export interface ExpansionCardTrader {
	id: number;
	game_id: number;
	code: string;
	name: string;
}
 
export interface BlueprintCardTrader {
	id: number;		
	name: string;
	version: string;
	game_id: number;		
	category_id: number;		
	expansion_id: number;		
	image_url: string;
	editable_properties: any;
	scryfall_id: string;
	card_market_id: string;
	tcg_player_id: string;
}
 