import type {
	FormatLineTagNameButtonsStateManagerObj,
	ToolbarButtonsActionManagerObj,
} from "../Utilities";

export type LineTagNameValue = "p" | `h${1 | 2 | 3 | 4 | 5 | 6}`;

export type LineTagNameIsDisabled = boolean;

export type LineTagNameValues = Set<LineTagNameValue>;

export interface LineTagNameToolbarButtonState {
	isDisabled: LineTagNameIsDisabled;
	values: LineTagNameValues;
}

interface DropDownButton {
	tagName: LineTagNameValue;
	name: string;
	isActive: boolean;
}

export type DropDownButtonList = DropDownButton[];

export interface LineTagNameToolbarButtonProps
	extends ToolbarButtonsActionManagerObj,
		FormatLineTagNameButtonsStateManagerObj {}
