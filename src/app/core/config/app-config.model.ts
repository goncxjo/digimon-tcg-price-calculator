export interface AppConfig {
	ENVIRONMENT_NAME: string;
	CARD_TRADER_API: CardTraderConfig;
	DOLAR_API: DolarApiConfig;
};

export interface CardTraderConfig {
	BASE_URL: string;
	JWT_TOKEN: string;
	GAME_ID: number;
	CATEGORY_ID: number;
}

export interface DolarApiConfig {
	BASE_URL: string;
}
