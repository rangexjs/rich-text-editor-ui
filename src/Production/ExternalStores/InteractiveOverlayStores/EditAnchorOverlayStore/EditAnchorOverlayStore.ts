import { ButtonsStore } from "../../ButtonsStore";

import type { EditAnchorOverlayState } from "./EditAnchorOverlayStore-types";

const initialState: EditAnchorOverlayState = Object.seal({
	url: "",
	isOpenNewTab: true,
	isDownloadable: false,
	// biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
	onAction: () => {},
});

export class EditAnchorOverlayStore extends ButtonsStore<EditAnchorOverlayState> {
	constructor() {
		super({ state: { ...initialState } });
	}
}
