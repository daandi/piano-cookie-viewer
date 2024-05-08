function decodeJWT(token: string) {
	const data = token.split(".")[1];
	const payload = JSON.parse(atob(data)); // semi correct as it is not exactly atob but well enough in our context
	return payload;
}

export default decodeJWT;