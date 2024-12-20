interface AnchorState {
	isDisabled: boolean;
}

interface BlockQuoteState {
	isDisabled: boolean;
}

interface CodeBlockState {
	isDisabled: boolean;
}

interface CustomComponentState {
	isDisabled: boolean;
}

interface ListState {
	isDisabled: boolean;
}

interface TableState {
	isDisabled: boolean;
}

export interface InsertionButtonsState {
	anchor: AnchorState;
	blockQuote: BlockQuoteState;
	codeBlock: CodeBlockState;
	customComponent: CustomComponentState;
	list: ListState;
	table: TableState;
}
