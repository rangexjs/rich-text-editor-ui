import type { AppProps } from "@components";
import type {
	AnchorOverlayState,
	FormatLineTagNameButtonsState,
	FormatStylesButtonsState,
	HistoryNavigationButtonsState,
	NodeInsertionButtonsState,
	NonCategorizedOperationButtonsState,
	TableSettingsOverlayState,
} from "@externalStores";
import type {
	OnFormatLineTagNameFn,
	OnFormatStylesChangeFn,
	OnHistoryNavigationFn,
	OnNodeInsertionFn,
	OnNonCategorizedOperationFn,
} from "@toolbarButtonsActionManager";

export interface RichTextEditorUIConstructorProps
	extends Pick<
		AppProps,
		"toolbarButtons" | "interactiveOverlays" | "richTextArea"
	> {
	domNode: HTMLElement;
}

export type OnFormatLineTagNameProps = OnFormatLineTagNameFn;

export type OnFormatStylesProps = OnFormatStylesChangeFn;

export type OnHistoryNavigationProps = OnHistoryNavigationFn;

export type OnNodeInsertionProps = OnNodeInsertionFn;

export type OnNonCategorizedOperationProps = OnNonCategorizedOperationFn;

export interface UpdateFormatStylesButtonsProps
	extends Partial<FormatStylesButtonsState> {}

export interface UpdateNodeInsertionButtonsProps
	extends Partial<NodeInsertionButtonsState> {}

export interface UpdateNonCategorizedOperationButtonsProps
	extends Partial<NonCategorizedOperationButtonsState> {}

export interface UpdateFormatLineTagNameButtonsProps
	extends Partial<FormatLineTagNameButtonsState> {}

export interface UpdateHistoryNavigationButtonsProps
	extends Partial<HistoryNavigationButtonsState> {}

export interface UpdateAnchorOverlayStateProps
	extends Partial<AnchorOverlayState> {}

export interface UpdateTableSettingsOverlayStateProps
	extends Partial<TableSettingsOverlayState> {}
