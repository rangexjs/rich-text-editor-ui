export type LineTagNameValue = "p" | `h${1 | 2 | 3 | 4 | 5 | 6}`;

interface TagNameState {
	isDisabled: boolean;
	values: Set<LineTagNameValue>;
}

export interface LineTagNameButtonsState {
	tagName: TagNameState;
}
