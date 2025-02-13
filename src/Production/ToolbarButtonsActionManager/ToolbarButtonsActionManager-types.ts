import type { CodeBlockLanguage } from "@components";
import type { buttonsName } from "@constants";

// FormatStyles
export interface FormatStylesActionState {
	backgroundColor?: string | null;
	color?: string | null;
	fontFamily?: string | null;
	fontSize?: string | null;
	fontStyle?: "italic" | null;
	fontWeight?: "bold" | null;
	letterSpacing?: string | null;
	lineHeight?: `${number}` | `${number}.${number}` | null;
	paddingInlineStart?: `${number}px` | null;
	textAlign?: "center" | "justify" | "left" | "right" | null;
	textDecoration?: Set<"line-through" | "underline">;
}

type ButtonsNameKey = keyof typeof buttonsName;

interface GetButtonType<Type extends ButtonsNameKey> {
	type: Type;
}

// FormatLineTagName
export interface LineTagNameActionState {
	tagName: "p" | `h${1 | 2 | 3 | 4 | 5 | 6}`;
}

interface OnFormatLineTagNameFnProps extends LineTagNameActionState {}

export type OnFormatLineTagNameFn = (props: OnFormatLineTagNameFnProps) => void;

// FormatStyles

interface OnFormatStylesFnProps extends FormatStylesActionState {}

export type OnFormatStylesChangeFn = (props: OnFormatStylesFnProps) => void;

// HistoryNavigation
export interface HistoryNavigationActionState {
	type: "history-back" | "history-forward";
}

interface OnHistoryNavigationFnProps extends HistoryNavigationActionState {}

export type OnHistoryNavigationFn = (props: OnHistoryNavigationFnProps) => void;

// NodeInsertion

interface AnchorActionState extends GetButtonType<"anchor"> {}

interface BlockQuoteActionState extends GetButtonType<"blockQuote"> {}

interface CodeBlockActionState extends GetButtonType<"codeBlock"> {
	language: CodeBlockLanguage;
}

interface ImageFileUpload {
	insertionType: "file-upload";
	files: FileList;
}

interface ImageURL {
	insertionType: "url";
	url: string;
}

type ImageActionState = GetButtonType<"image"> & (ImageFileUpload | ImageURL);

export type ListActionStateListType = "disc" | "circle" | "square" | "decimal";
interface ListActionState extends GetButtonType<"list"> {
	listType: ListActionStateListType;
}

interface TableActionState extends GetButtonType<"table"> {
	column: number;
	row: number;
}

interface TodoListActionState extends GetButtonType<"todoList"> {}

export type NodeInsertionActionState =
	| AnchorActionState
	| BlockQuoteActionState
	| CodeBlockActionState
	| ImageActionState
	| ListActionState
	| TableActionState
	| TodoListActionState;

type OnNodeInsertionFnProps = NodeInsertionActionState;

export type OnNodeInsertionFn = (props: OnNodeInsertionFnProps) => void;
