import type { IsTextAreaReadOnlyToolbarButtonState } from "@components";

import type {
	UpdateIsTextAreaReadOnlyStateFn,
	UpdateNonCategorizedOperationButtonsStateProps,
} from "./NonCategorizedOperationButtonsStateManager-types";

export class NonCategorizedOperationButtonsStateManager {
	#isTextAreaReadOnly: IsTextAreaReadOnlyToolbarButtonState = {
		isChecked: false,
	};

	get isTextAreaReadOnly() {
		return this.#isTextAreaReadOnly;
	}

	updateIsTextAreaReadOnlyState: UpdateIsTextAreaReadOnlyStateFn | null = null;

	updateState({
		isTextAreaReadOnly,
	}: UpdateNonCategorizedOperationButtonsStateProps) {
		if (isTextAreaReadOnly) {
			this.#isTextAreaReadOnly = isTextAreaReadOnly;
			this.updateIsTextAreaReadOnlyState?.(isTextAreaReadOnly);
		}
	}
}
