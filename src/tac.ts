import decodeJWT from "./jwt";

export interface TACData {
	aud: string;
	sub: {
		u: string;
		al?: {
			[key: string]: TACSubscription[]
		}
	}
};

export interface TACSubscription { r: string; e: number; ia: boolean };

export function processTAC(tacCookie: chrome.cookies.Cookie): TACData {
	const tacCookieData = decodeJWT(tacCookie.value);
	const tacWithJSONSub = {
		...tacCookieData,
		sub: JSON.parse(tacCookieData.sub),
	};
	return tacWithJSONSub;
}