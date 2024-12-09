import { simulateProductEnvironment } from "src/Development";

const domNode = document.getElementById("root");

if (!domNode) {
	throw new Error("DomNode can't be null.");
}

const _cleanup = simulateProductEnvironment({ domNode });
