import { ButtonsStore } from "../ButtonsStore";

import type { NodeInsertionButtonsState } from "./NodeInsertionButtonsStore-types";

const initialState: NodeInsertionButtonsState = Object.seal({
	anchor: { isDisabled: true },
	blockQuote: { isDisabled: true },
	codeBlock: { isDisabled: true },
	customComponent: { isDisabled: true },
	image: { isDisabled: true },
	list: { isDisabled: true },
	table: { isDisabled: true },
	todoList: { isDisabled: true },
});

export class NodeInsertionButtonsStore extends ButtonsStore<NodeInsertionButtonsState> {
	constructor() {
		super({ state: { ...initialState } });
	}
}
