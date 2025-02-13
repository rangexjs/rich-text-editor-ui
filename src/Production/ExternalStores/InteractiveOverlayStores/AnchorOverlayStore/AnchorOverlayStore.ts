import { ButtonsStore } from "../../ButtonsStore";

import type { AnchorOverlayState } from "./AnchorOverlayStore-types";

const initialState: AnchorOverlayState = Object.seal({
	layout: "default",
	url: "",
	isOpenNewTab: true,
	isDownloadable: false,
	// biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
	onAction: () => {},
});

export class AnchorOverlayStore extends ButtonsStore<AnchorOverlayState> {
	constructor() {
		super({ state: { ...initialState } });
	}
}
