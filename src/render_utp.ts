import { renderDataOnElement } from "./render";
import { UTPData } from "./utp";

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
	renderDataOnElement(utpData.login_timestamp.toString(), 'utp-last-login');
}
