import { HistoryBackIcon } from "../../../SVGs";
import {
	ToolbarButton,
	type ToolbarButtonOnClickFn,
} from "../../../ToolbarButton";

import type { HistoryBackToolbarButtonProps } from "./HistoryBackToolbarButton-types";

export const HistoryBackToolbarButton = ({
	toolbarButtonsActionManager,
	state,
}: HistoryBackToolbarButtonProps) => {
	const onClick: ToolbarButtonOnClickFn = () => {
		toolbarButtonsActionManager.onNavigationChange?.({ type: "history-back" });
	};

	return (
		<ToolbarButton
			checked={false}
			disabled={state.isDisabled}
			isChevron={false}
			onClick={onClick}
		>
			<HistoryBackIcon />
		</ToolbarButton>
	);
};
