import { renderDataOnElement } from "./render";
import type { UTPData } from "./utp";
import { humanReadableTimestamp } from "./timestamp";

export function displayUTP(utpData: UTPData) {
	const utpDiv = document.getElementById("utp");
	const pre = document.createElement("pre");
	pre.textContent = JSON.stringify(utpData, null, 2);

	if (utpDiv) {
		utpDiv.appendChild(pre);
	}

	renderDataOnElement(utpData.aud, 'utp-aid');
	renderDataOnElement(utpData.sub, 'utp-user-id');
	renderDataOnElement(`${utpData.given_name} ${utpData.family_name}`, 'utp-name');
	renderDataOnElement(utpData.email, 'utp-email');
	renderDataOnElement(humanReadableTimestamp(utpData.login_timestamp, 'en-UK'), 'utp-last-login');
}
