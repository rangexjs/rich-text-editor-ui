import {
	PrimaryButton,
	type PrimaryButtonOnClickFn,
} from "../../../PrimaryButton";
import { HistoryBackIcon } from "../../../SVGs";

import { toolbarButtonClassName } from "../Utilities";

import type { HistoryBackToolbarButtonProps } from "./HistoryBackToolbarButton-types";

export const HistoryBackToolbarButton = ({
	toolbarButtonsActionManager,
	state,
}: HistoryBackToolbarButtonProps) => {
	const onClick: PrimaryButtonOnClickFn = () => {
		toolbarButtonsActionManager.onHistoryNavigation?.({ type: "history-back" });
	};

	return (
		<PrimaryButton
			checked={false}
			disabled={state.isDisabled}
			isChevron={false}
			onClick={onClick}
			className={toolbarButtonClassName}
		>
			<HistoryBackIcon />
		</PrimaryButton>
	);
};
