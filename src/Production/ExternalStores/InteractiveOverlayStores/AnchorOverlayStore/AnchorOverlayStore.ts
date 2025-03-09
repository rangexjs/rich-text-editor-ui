import { ExternalStore } from "../../ExternalStore";

import type { AnchorOverlayState } from "./AnchorOverlayStore-types";

const initialState: AnchorOverlayState = Object.seal({
	layout: "default",
	url: "",
	isOpenNewTab: true,
	isDownloadable: false,
	// biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
	onAction: () => {},
});

export class AnchorOverlayStore extends ExternalStore<AnchorOverlayState> {
	constructor() {
		super({ state: { ...initialState } });
	}
}
