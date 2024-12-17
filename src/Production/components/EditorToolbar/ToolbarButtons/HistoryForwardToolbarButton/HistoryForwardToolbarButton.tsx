import { HistoryForwardIcon } from "../../../SVGs";
import {
	ToolbarButton,
	type ToolbarButtonOnClickFn,
} from "../../../ToolbarButton";

import type { HistoryForwardToolbarButtonProps } from "./HistoryForwardToolbarButton-types";

export const HistoryForwardToolbarButton = ({
	toolbarButtonsActionManager,
	state,
}: HistoryForwardToolbarButtonProps) => {
	const onClick: ToolbarButtonOnClickFn = () => {
		toolbarButtonsActionManager.onNavigationChange?.({
			type: "history-forward",
		});
	};

	return (
		<ToolbarButton
			checked={false}
			disabled={state.isDisabled}
			isChevron={false}
			onClick={onClick}
		>
			<HistoryForwardIcon />
		</ToolbarButton>
	);
};
