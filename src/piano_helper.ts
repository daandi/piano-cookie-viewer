// The async IIFE is necessary because Chrome <89 does not support top level await.
(async function initPopupWindow() {
	const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

	if (tab?.url) {
		try {
			const url = tab.url;

			const tacCookie = await chrome.cookies.get({ name: "__tac", url });
			if (tacCookie) {
				displayTAC(processTAC(tacCookie));
			}

			const utpCookie = await chrome.cookies.get({ name: "__utp", url });
			if (utpCookie) {
				displayUTP(processUTP(utpCookie));
			}
		} catch (err) {
			console.warn(err);
		}
	}
})();

function renderDataOnElement(data: string, idSelector: string) {
	const elementMarkedById = document.getElementById(idSelector);

	if (elementMarkedById) {
		elementMarkedById.textContent = data;
	} else {
		console.warn(`Can not add data: ${data} to element: ${idSelector}`);
	}
}

interface TACData {
	aud: string;
	sub: {
		u: string;
		al: {
			[key: string]: TACSubscription[]
		}
	}
};

interface TACSubscription { r: string; e: number; ia: boolean };

function displayTAC(tacData: TACData) {
	renderDataOnElement(tacData.aud, "tac-aid");
	renderDataOnElement(tacData.sub.u, "tac-user-id");

	const subscriptions = tacData.sub.al[tacData.aud];
	const validSubscriptions = subscriptions.filter(s => s.ia);
	const invalidSubscriptions = subscriptions.filter(s => !s.ia);
	renderSubscriptions(validSubscriptions, 'tac-valid-subscriptions');
	renderSubscriptions(invalidSubscriptions, 'tac-invalid-subscriptions');

	const tacDiv = document.getElementById("tac");
	const pre = document.createElement("pre");
	pre.textContent = JSON.stringify(tacData, null, 2);

	if (tacDiv) {
		tacDiv.appendChild(pre);
	}
}

function renderSubscriptions(subscriptions: TACSubscription[], idSelector: string) {
	const subscriptionsString = subscriptions.map(s => s.r).sort().join(', ');
	renderDataOnElement(subscriptionsString, idSelector);
};

function displayUTP(utpData: {}) {
	const utpDiv = document.getElementById("utp");
	const pre = document.createElement("pre");
	pre.textContent = JSON.stringify(utpData, null, 2);

	if (utpDiv) {
		utpDiv.appendChild(pre);
	}
}

function processUTP(utpCookie: chrome.cookies.Cookie) {
	const utpData = decodeJWT(utpCookie.value);
	return utpData;
}

function processTAC(tacCookie: chrome.cookies.Cookie) {
	const tacCookieData = decodeJWT(tacCookie.value);
	const tacWithJSONSub = {
		...tacCookieData,
		sub: JSON.parse(tacCookieData.sub),
	};
	return tacWithJSONSub;
}

function decodeJWT(token: string) {
	const data = token.split(".")[1];
	const payload = JSON.parse(atob(data)); // semi correct as it is not exactly atob but well enough in our context
	return payload;
}
