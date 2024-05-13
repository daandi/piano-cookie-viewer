import type { TACData, TACSubscription } from "./tac";
import { renderDataOnElement } from "./render";

export function displayTAC(tacData: TACData) {

	const tacDiv = document.getElementById("tac");
	const pre = document.createElement("pre");
	pre.textContent = JSON.stringify(tacData, null, 2);

	if (tacDiv) {
		tacDiv.appendChild(pre);
	}

	renderDataOnElement(tacData.aud, "tac-aid");
	renderDataOnElement(tacData.sub.u, "tac-user-id");

	// there may be no subscriptions
	if (tacData.sub.al) {
		const subscriptions = tacData.sub.al[tacData.aud];
		const activeSubs = subscriptions.filter(s => s.ia);
		const inactiveSubs = subscriptions.filter(s => !s.ia);
		renderSubscriptions(activeSubs, 'tac-active-subscriptions');
		renderSubscriptions(inactiveSubs, 'tac-inactive-subscriptions');
	}

}

function renderSubscriptions(subscriptions: TACSubscription[], idSelector: string) {
	const subscriptionsString = subscriptions.map(s => s.r).sort().join(', ');
	renderDataOnElement(subscriptionsString, idSelector);
}
