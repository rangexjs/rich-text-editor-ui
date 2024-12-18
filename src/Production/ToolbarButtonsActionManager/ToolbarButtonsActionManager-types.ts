import type { buttonsName } from "@constants";

// FormatStyles
export interface FormatStylesState {
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

interface OnFormatStylesChangeFnProps extends FormatStylesState {}

export type OnFormatStylesChangeFn = (
	props: OnFormatStylesChangeFnProps,
) => void;

// Insertion

type ButtonsNameKey = keyof typeof buttonsName;

interface GetButtonType<Type extends ButtonsNameKey> {
	type: Type;
}

interface AnchorState extends GetButtonType<"anchor"> {
	text: string;
	href: string;
	download: boolean;
	target: "_blank";
}

interface BlockQuoteState extends GetButtonType<"blockQuote"> {}

interface CodeBlockState extends GetButtonType<"blockQuote"> {
	blockType: "plain-text" | "typescript" | "javascript";
}

export type InsertionState = AnchorState | BlockQuoteState | CodeBlockState;

type OnInsertionChangeFnProps = InsertionState;

export type OnInsertionChangeFn = (props: OnInsertionChangeFnProps) => void;

// LineTagName
export interface LineTagNameState {
	tagName: "p" | `h${1 | 2 | 3 | 4 | 5 | 6}`;
}

interface OnLineTagnameChangeFnProps extends LineTagNameState {}

export type OnLineTagNameChangeFn = (props: OnLineTagnameChangeFnProps) => void;

// Navigation
export interface NavigationState {
	type: "history-back" | "history-forward";
}

interface OnNavigationChangeFnProps extends NavigationState {}

export type OnNavigationChangeFn = (props: OnNavigationChangeFnProps) => void;
