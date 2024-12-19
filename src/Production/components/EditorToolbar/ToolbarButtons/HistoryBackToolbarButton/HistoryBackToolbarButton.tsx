import {
	PrimaryButton,
	type ToolbarButtonOnClickFn,
} from "../../../PrimaryButton";
import { HistoryBackIcon } from "../../../SVGs";

import type { HistoryBackToolbarButtonProps } from "./HistoryBackToolbarButton-types";

export const HistoryBackToolbarButton = ({
	toolbarButtonsActionManager,
	state,
}: HistoryBackToolbarButtonProps) => {
	const onClick: ToolbarButtonOnClickFn = () => {
		toolbarButtonsActionManager.onNavigationChange?.({ type: "history-back" });
	};

	return (
		<PrimaryButton
			checked={false}
			disabled={state.isDisabled}
			isChevron={false}
			onClick={onClick}
		>
			<HistoryBackIcon />
		</PrimaryButton>
	);
};
