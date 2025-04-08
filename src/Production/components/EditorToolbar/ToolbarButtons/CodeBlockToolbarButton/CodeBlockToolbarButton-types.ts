import type {
	NodeInsertionButtonsStateManagerObj,
	ToolbarButtonsActionManagerObj,
} from "../Utilities";

import type { codeBlockLanguages } from "./CodeBlockToolbarButton";

export type CodeBlockIsDisabled = boolean;

export interface CodeBlockToolbarButtonState {
	isDisabled: CodeBlockIsDisabled;
}

type CodeBlockLanguages = typeof codeBlockLanguages;

export type CodeBlockLanguage = CodeBlockLanguages[number];

export type OnLanguageClickProps = CodeBlockLanguage;

export interface CodeBlockToolbarButtonProps
	extends ToolbarButtonsActionManagerObj,
		NodeInsertionButtonsStateManagerObj {}
