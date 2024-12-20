import type { AppProps } from "@components";
import type {
	ForamtLineTagNameButtonsState,
	FormatStylesButtonsState,
	HistoryNavigationButtonsState,
	NodeInsertionButtonsState,
} from "@externalStores";
import type {
	OnFormatLineTagNameFn,
	OnFormatStylesChangeFn,
	OnHistoryNavigationFn,
	OnNodeInsertionFn,
} from "@toolbarButtonsActionManager";

export interface RichTextEditorUIConstructorProps
	extends Pick<AppProps, "toolbarButtons" | "richTextArea"> {
	domNode: Element;
}

export type OnFormatLineTagNameProps = OnFormatLineTagNameFn;

export type OnFormatStylesProps = OnFormatStylesChangeFn;

export type OnHistoryNavigationProps = OnHistoryNavigationFn;

export type OnNodeInsertionProps = OnNodeInsertionFn;

export interface UpdateFormatStylesStylesButtonsProps
	extends Partial<FormatStylesButtonsState> {}

export interface UpdateNodeInsertionButtonsProps
	extends Partial<NodeInsertionButtonsState> {}

export interface UpdateFormatLineTagNameButtonsProps
	extends Partial<ForamtLineTagNameButtonsState> {}

export interface UpdateHistoryNavigationButtonsProps
	extends Partial<HistoryNavigationButtonsState> {}
