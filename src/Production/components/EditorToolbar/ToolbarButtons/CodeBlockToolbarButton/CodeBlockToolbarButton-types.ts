import type { NodeInsertionButtonsState } from "@externalStores";
import type { PickType } from "@utilities";

import type { ToolbarButtonsActionManagerObj } from "../Utilities";

import type { codeBlockLanguages } from "./CodeBlockToolbarButton";

type CodeBlockLanguages = typeof codeBlockLanguages;

export type CodeBlockLanguage = CodeBlockLanguages[number];

export type OnLanguageClickProps = CodeBlockLanguage;

export interface CodeBlockToolbarButtonProps
	extends ToolbarButtonsActionManagerObj {
	state: PickType<NodeInsertionButtonsState, "codeBlock">;
}
