import type { LineTagNameToolbarButtonState } from "@components";

export interface UpdateLineTagNameUpdateProps
	extends LineTagNameToolbarButtonState {}

export type UpdateLineTagNameUpdateFn = (
	props: UpdateLineTagNameUpdateProps,
) => void;

export interface FormatLineTagNameButtonsState {
	lineTagName: LineTagNameToolbarButtonState;
}

export interface UpdateFormatLineTagNameButtonsStateProps
	extends Partial<FormatLineTagNameButtonsState> {}
