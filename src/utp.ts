import decodeJWT from "./jwt";

export interface UTPData {
	aud: string,
	login_timestamp: number,
	given_name: string,
	family_name: string,
	email: string,
	sub: string
}

export function processUTP(utpCookie: chrome.cookies.Cookie) : UTPData {
	const utpData = decodeJWT(utpCookie.value);
	return utpData;
}