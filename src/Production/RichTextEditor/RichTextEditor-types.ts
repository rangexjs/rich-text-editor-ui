import type { AppProps } from "@components";
import type { FormattableButtonsState } from "@externalStores";
import type {
	OnFormatStylesChangeFn,
	OnNavigationChangeFn,
} from "@toolbarButtonsActionManager";

export interface RichTextEditorConstructorProps
	extends Pick<AppProps, "toolbarButtons" | "richTextArea"> {
	domNode: Element;
}

export type OnFormatStylesChangeProps = OnFormatStylesChangeFn;

export type OnNavigationChangeProps = OnNavigationChangeFn;

export interface UpdateFormattableStylesProps
	extends Partial<FormattableButtonsState> {}
