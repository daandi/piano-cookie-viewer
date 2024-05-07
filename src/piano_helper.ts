// The async IIFE is necessary because Chrome <89 does not support top level await.
(async function initPopupWindow() {
	const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

	if (tab?.url) {
		try {
			const url = tab.url;
			
            const tacCookie = await chrome.cookies.get({ name: "__tac", url });
            if(tacCookie) {
                displayTAC(processTAC(tacCookie));
                displayAID(processTAC(tacCookie).aud);
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

function displayAID(aid: string) {
	const aidDiv = document.getElementById("aid");

	if (aidDiv) {
		aidDiv.textContent = aid;
	}
}

function displayTAC(tacData: {}) {
	const tacDiv = document.getElementById("tac");
	const pre = document.createElement("pre");
	
	pre.textContent = JSON.stringify(tacData, null, 2);

	if (tacDiv) {
		tacDiv.appendChild(pre);
	}
}

function displayUTP(utpData: {}) {
	const utpDiv = document.getElementById("utp");
	const pre = document.createElement("pre");
	pre.textContent = JSON.stringify(utpData, null, 2);

	if(utpDiv) {
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
