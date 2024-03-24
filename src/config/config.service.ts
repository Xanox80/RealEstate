import { get } from 'env-var';

export const getPort = () => get('PORT').asPortNumber();

export const getDbURL = () => get('DB_URL').asString();

export const getAuthSecret = () => ({
	atSecret: get('AT_SECRET').asString(),
	atSecretExpires: get('AT_SECRET_EXPIRES').asString(),
	rtSecret: get('RT_SECRET').asString(),
	rtSecretExpires: get('RT_SECRET_EXPIRES').asString(),
});

export const getGoogleAuthSecret = () => ({
	googleClientId: get('GOOGLE_CLIENT_ID').asString(),
	googleSecret: get('GOOGLE_SECRET').asString(),
});
