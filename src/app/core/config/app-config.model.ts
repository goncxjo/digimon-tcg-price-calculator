export interface AppConfig {
	ENVIRONMENT_NAME: string;
	BASE_URL: string;
	CARD_TRADER_API: CardTraderConfig;
};

export interface CardTraderConfig {
	BASE_URL: string;
	JWT_TOKEN: string;
	GAME_ID: number;
	CATEGORY_ID: number;
}
