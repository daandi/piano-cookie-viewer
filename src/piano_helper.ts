import { processTAC } from "./tac";
import { processUTP } from "./utp";
import { displayTAC } from "./render_tac";
import { displayUTP } from "./render_utp";

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
