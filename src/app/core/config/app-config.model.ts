export interface AppConfig {
	ENVIRONMENT_NAME: string;
	CARD_TRADER_API_BASE_URL: string;
	CARD_TRADER_API_JWT_TOKEN: string;
	CARD_TRADER_API_GAME_ID: number;
	CARD_TRADER_API_CATEGORY_ID: number;
	DOLAR_API_BASE_URL: string;
	appVersion: string;
	production: boolean;
}
