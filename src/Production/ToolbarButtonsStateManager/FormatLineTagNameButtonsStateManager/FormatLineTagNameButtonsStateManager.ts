import type { LineTagNameToolbarButtonState } from "@components";
import type {
	UpdateFormatLineTagNameButtonsStateProps,
	UpdateLineTagNameUpdateFn,
} from "./FormatLineTagNameButtonsStateManager-types";

export class FormatLineTagNameButtonsStateManager {
	#lineTagName: LineTagNameToolbarButtonState = {
		isDisabled: false,
		values: new Set(["p"]),
	};

	get lineTagName() {
		return this.#lineTagName;
	}

	updateLineTagNameUpdate: UpdateLineTagNameUpdateFn | null = null;

	updateState({ lineTagName }: UpdateFormatLineTagNameButtonsStateProps) {
		if (lineTagName) {
			this.#lineTagName = lineTagName;
			this.updateLineTagNameUpdate?.(lineTagName);
		}
	}
}
