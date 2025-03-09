import { ExternalStore } from "../../ExternalStore";

import type { AnchorOverlayState } from "./AnchorOverlayStore-types";

export const anchorLayoutViewOptions = {
	main: "main",
	edit: "edit",
} as const;

const initialState: AnchorOverlayState = Object.seal({
	layoutView: anchorLayoutViewOptions.main,
	// biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
	onActiveViewChange: () => {},
	// biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
	onAction: () => {},
	anchorProps: {
		url: "https://example.com",
		isOpenNewTab: true,
		isDownloadable: false,
	},
});

export class AnchorOverlayStore extends ExternalStore<AnchorOverlayState> {
	constructor() {
		super({ state: { ...initialState } });
	}
}
