import type { IsTextAreaReadOnlyToolbarButtonState } from "@components";

export interface UpdateIsTextAreaReadOnlyStateProps
	extends IsTextAreaReadOnlyToolbarButtonState {}

export type UpdateIsTextAreaReadOnlyStateFn = (
	props: UpdateIsTextAreaReadOnlyStateProps,
) => void;

export interface NonCategorizedOperationButtonsState {
	isTextAreaReadOnly: IsTextAreaReadOnlyToolbarButtonState;
}

export interface UpdateNonCategorizedOperationButtonsStateProps
	extends Partial<NonCategorizedOperationButtonsState> {}
