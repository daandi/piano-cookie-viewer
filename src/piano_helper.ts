// The async IIFE is necessary because Chrome <89 does not support top level await.
(async function initPopupWindow() {
	const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

	const cookieList = document.getElementById("cookie-list");

	if (tab?.url) {
		try {
			const domain = new URL(tab.url).host.replace("www", "");
			//const cookieListData = await chrome.cookies.getAll({ domain });
			//fillCookieList(cookieListData, cookieList);
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
	console.log(aid);
	aidDiv!.textContent = aid;
}

function displayTAC(tacData: {}) {
	const tacDiv = document.getElementById("tac");
	const pre = document.createElement("pre");
	
	pre.textContent = JSON.stringify(tacData, null, 2);

	tacDiv!.appendChild(pre);
}

function displayUTP(utpData: {}) {
	const utpDiv = document.getElementById("utp");
	const pre = document.createElement("pre");
	pre.textContent = JSON.stringify(utpData, null, 2);

	utpDiv!.appendChild(pre);
}

/*function fillCookieList(cookies, ulElement) {
	if (cookies && cookies.length > 0) {
		cookies.map((c) => {
			const li = document.createElement("li");
			li.appendChild(document.createTextNode(JSON.stringify(c)));
			ulElement.appendChild(li);
		});
	} else {
		const li = document.createElement("li");
		li.appendChild(document.createTextNode("No usable cookies."));
		ulElement.appendChild(li);
	}
}*/

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
