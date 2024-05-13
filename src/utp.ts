import decodeJWT from "./jwt";

export type UTPData = {
	aud: string,
	login_timestamp: number,
	given_name: string,
	family_name: string,
	email: string,
	sub: string
}

type RawUTPData = Omit<UTPData, 'login_timestamp'> & {login_timestamp: string}

export function processUTP(utpCookie: chrome.cookies.Cookie) : UTPData {
	const rawUTPData: RawUTPData = decodeJWT(utpCookie.value);
	const utpData = {
		...rawUTPData,
		login_timestamp: Number(rawUTPData.login_timestamp)
	}
	return utpData;
}