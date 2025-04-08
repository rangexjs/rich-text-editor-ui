import type { AppProps } from "@components";
import type {
	AnchorOverlayState,
	CaretListboxOverlayState,
	TableSettingsOverlayState,
} from "@externalStores";
import type {
	OnFormatLineTagNameFn,
	OnFormatStylesChangeFn,
	OnHistoryNavigationFn,
	OnNodeInsertionFn,
	OnNonCategorizedOperationFn,
} from "@toolbarButtonsActionManager";
import type {
	UpdateFormatLineTagNameButtonsStateProps,
	UpdateFormatStylesButtonsStateProps,
	UpdateHistoryNavigationButtonsStateProps,
	UpdateNodeInsertionButtonsStateProps,
	UpdateNonCategorizedOperationButtonsStateProps,
} from "@toolbarButtonsStateManager";

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

export interface UpdateFormatLineTagNameButtonsProps
	extends UpdateFormatLineTagNameButtonsStateProps {}

export interface UpdateFormatStylesButtonsProps
	extends UpdateFormatStylesButtonsStateProps {}

export interface UpdateNodeInsertionButtonsProps
	extends UpdateNodeInsertionButtonsStateProps {}

export interface UpdateNonCategorizedOperationButtonsProps
	extends UpdateNonCategorizedOperationButtonsStateProps {}

export interface UpdateHistoryNavigationButtonsProps
	extends UpdateHistoryNavigationButtonsStateProps {}

export interface UpdateAnchorOverlayStateProps
	extends Partial<AnchorOverlayState> {}

export interface UpdateCaretListboxOverlayStateProps
	extends Partial<CaretListboxOverlayState> {}

export interface UpdateTableSettingsOverlayStateProps
	extends Partial<TableSettingsOverlayState> {}
