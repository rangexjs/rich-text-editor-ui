import type { AppProps } from "@components";
import type {
	FormattableButtonsState,
	LineTagNameButtonsState,
} from "@externalStores";
import type {
	OnFormatStylesChangeFn,
	OnLineTagNameChangeFn,
	OnNavigationChangeFn,
} from "@toolbarButtonsActionManager";

export interface RichTextEditorUIConstructorProps
	extends Pick<AppProps, "toolbarButtons" | "richTextArea"> {
	domNode: Element;
}

export type OnFormatStylesChangeProps = OnFormatStylesChangeFn;

export type OnLineTagNameChangeProps = OnLineTagNameChangeFn;

export type OnNavigationChangeProps = OnNavigationChangeFn;

export interface UpdateFormattableStylesProps
	extends Partial<FormattableButtonsState> {}

export interface UpdateLineTagNameProps
	extends Partial<LineTagNameButtonsState> {}
