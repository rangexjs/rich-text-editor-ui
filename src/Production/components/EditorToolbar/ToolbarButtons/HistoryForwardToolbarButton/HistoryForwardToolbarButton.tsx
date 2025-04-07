import {
	PrimaryButton,
	type PrimaryButtonOnClickFn,
} from "../../../PrimaryButton";
import { HistoryForwardIcon } from "../../../SVGs";

import { toolbarButtonClassName } from "../Utilities";

import type { HistoryForwardToolbarButtonProps } from "./HistoryForwardToolbarButton-types";

export const HistoryForwardToolbarButton = ({
	toolbarButtonsActionManager,
	state,
}: HistoryForwardToolbarButtonProps) => {
	const onClick: PrimaryButtonOnClickFn = () => {
		toolbarButtonsActionManager.onHistoryNavigation?.({
			type: "history-forward",
		});
	};

	return (
		<PrimaryButton
			checked={false}
			disabled={state.isDisabled}
			isChevron={false}
			onClick={onClick}
			className={toolbarButtonClassName}
		>
			<HistoryForwardIcon />
		</PrimaryButton>
	);
};
