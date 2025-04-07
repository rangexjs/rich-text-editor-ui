import { ExternalStore } from "../../ExternalStore";

import type { CaretListboxOverlayState } from "./CaretListboxOverlayStore-types";

const initialState: CaretListboxOverlayState = Object.seal({
	mentionSearch: "",
	mentionList: [],
	// biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
	onMatchedMentionListChange: () => {},
	// biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
	onSelectedMention: () => {},
	// biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
	onCaretListboxClose: () => {},
});

export class CaretListboxOverlayStore extends ExternalStore<CaretListboxOverlayState> {
	constructor() {
		super({ state: { ...initialState } });
	}
}
