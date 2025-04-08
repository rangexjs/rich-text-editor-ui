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

// Anchor
export interface UpdateAnchorStateProps extends AnchorToolbarButtonState {}

export type UpdateAnchorStateFn = (props: UpdateAnchorStateProps) => void;

// BlockQuote
export interface UpdateBlockQuoteStateProps
	extends BlockQuoteToolbarButtonState {}

export type UpdateBlockQuoteStateFn = (
	props: UpdateBlockQuoteStateProps,
) => void;

// CodeBlock
export interface UpdateCodeBlockStateProps
	extends CodeBlockToolbarButtonState {}
export type UpdateCodeBlockStateFn = (props: UpdateCodeBlockStateProps) => void;

// Image
export interface UpdateImageStateProps extends ImageToolbarButtonState {}

export type UpdateImageStateFn = (props: UpdateImageStateProps) => void;

// List
export interface UpdateListStateProps extends ListToolbarButtonState {}

export type UpdateListStateFn = (props: UpdateListStateProps) => void;

// Symbols
export interface UpdateSymbolsStateProps extends SymbolsToolbarButtonState {}

export type UpdateSymbolsStateFn = (props: UpdateSymbolsStateProps) => void;

// Table
export interface UpdateTableStateProps extends TableToolbarButtonState {}

export type UpdateTableStateFn = (props: UpdateTableStateProps) => void;

// TodoList
export interface UpdateTodoListStateProps extends TodoListToolbarButtonState {}

export type UpdateTodoListStateFn = (props: UpdateTodoListStateProps) => void;

export interface NodeInsertionButtonsState {
	anchor: AnchorToolbarButtonState;
	blockQuote: BlockQuoteToolbarButtonState;
	codeBlock: CodeBlockToolbarButtonState;
	image: ImageToolbarButtonState;
	list: ListToolbarButtonState;
	symbols: SymbolsToolbarButtonState;
	table: TableToolbarButtonState;
	todoList: TodoListToolbarButtonState;
}

export interface UpdateNodeInsertionButtonsStateProps
	extends Partial<NodeInsertionButtonsState> {}
