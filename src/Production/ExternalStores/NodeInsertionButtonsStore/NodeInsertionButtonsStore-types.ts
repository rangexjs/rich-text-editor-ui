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

interface ImageState {
	isDisabled: boolean;
}

interface ListState {
	isDisabled: boolean;
}

interface TableState {
	isDisabled: boolean;
}

interface TodoListState {
	isDisabled: boolean;
}

export interface NodeInsertionButtonsState {
	anchor: AnchorState;
	blockQuote: BlockQuoteState;
	codeBlock: CodeBlockState;
	customComponent: CustomComponentState;
	image: ImageState;
	list: ListState;
	table: TableState;
	todoList: TodoListState;
}
