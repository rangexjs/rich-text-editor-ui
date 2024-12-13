import type { AppProps } from "@components";
import type { FormattableButtonsState } from "@externalStores";
import type {
	OnFormatStylesChangeFn,
	OnNavigationChangeFn,
} from "@toolbarButtonsStateManager";

export interface RichTextEditorConstructorProps
	extends Pick<AppProps, "editorToolbar" | "richTextArea"> {
	domNode: Element;
}

export type OnFormatStylesChangeProps = OnFormatStylesChangeFn;

export type OnNavigationChangeProps = OnNavigationChangeFn;

export interface UpdateFormattableStylesProps
	extends Partial<FormattableButtonsState> {}
