export function renderDataOnElement(data: string, idSelector: string) {
	const elementMarkedById = document.getElementById(idSelector);

	if (elementMarkedById) {
		elementMarkedById.textContent = data;
	} else {
		console.warn(`Can not add data: ${data} to element: ${idSelector}`);
	}
}
