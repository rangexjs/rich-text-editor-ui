import type {
	AnchorToolbarButtonState,
	BlockQuoteToolbarButtonState,
	CodeBlockToolbarButtonState,
	ImageToolbarButtonState,
	ListToolbarButtonState,
	SymbolsToolbarButtonState,
	TableToolbarButtonState,
	TodoListToolbarButtonState,
} from "@components";

import type {
	UpdateAnchorStateFn,
	UpdateBlockQuoteStateFn,
	UpdateCodeBlockStateFn,
	UpdateImageStateFn,
	UpdateListStateFn,
	UpdateNodeInsertionButtonsStateProps,
	UpdateSymbolsStateFn,
	UpdateTableStateFn,
	UpdateTodoListStateFn,
} from "./NodeInsertionButtonsStateManager-types";

export class NodeInsertionButtonsStateManager {
	#anchor: AnchorToolbarButtonState = { isChecked: false, isDisabled: true };
	#blockQuote: BlockQuoteToolbarButtonState = { isDisabled: true };
	#codeBlock: CodeBlockToolbarButtonState = { isDisabled: true };
	#image: ImageToolbarButtonState = { isDisabled: true };
	#list: ListToolbarButtonState = { isDisabled: true };
	#symbols: SymbolsToolbarButtonState = { isDisabled: true };
	#table: TableToolbarButtonState = { isDisabled: true };
	#todoList: TodoListToolbarButtonState = { isDisabled: true };

	get anchor() {
		return this.#anchor;
	}

	get blockQuote() {
		return this.#blockQuote;
	}

	get codeBlock() {
		return this.#codeBlock;
	}

	get image() {
		return this.#image;
	}

	get list() {
		return this.#list;
	}

	get symbols() {
		return this.#symbols;
	}

	get table() {
		return this.#table;
	}

	get todoList() {
		return this.#todoList;
	}

	updateAnchorState: UpdateAnchorStateFn | null = null;
	updateBlockQuoteState: UpdateBlockQuoteStateFn | null = null;
	updateCodeBlockState: UpdateCodeBlockStateFn | null = null;
	updateImageState: UpdateImageStateFn | null = null;
	updateListState: UpdateListStateFn | null = null;
	updateSymbolsState: UpdateSymbolsStateFn | null = null;
	updateTableState: UpdateTableStateFn | null = null;
	updateTodoListState: UpdateTodoListStateFn | null = null;

	updateState({
		anchor,
		blockQuote,
		codeBlock,
		image,
		list,
		symbols,
		table,
		todoList,
	}: UpdateNodeInsertionButtonsStateProps) {
		if (anchor) {
			this.#anchor = anchor;
			this.updateAnchorState?.(anchor);
		}

		if (blockQuote) {
			this.#blockQuote = blockQuote;
			this.updateBlockQuoteState?.(blockQuote);
		}

		if (codeBlock) {
			this.#codeBlock = codeBlock;
			this.updateCodeBlockState?.(codeBlock);
		}

		if (image) {
			this.#image = image;
			this.updateImageState?.(image);
		}

		if (list) {
			this.#list = list;
			this.updateListState?.(list);
		}

		if (symbols) {
			this.#symbols = symbols;
			this.updateSymbolsState?.(symbols);
		}

		if (table) {
			this.#table = table;
			this.updateTableState?.(table);
		}

		if (todoList) {
			this.#todoList = todoList;
			this.updateTodoListState?.(todoList);
		}
	}
}
