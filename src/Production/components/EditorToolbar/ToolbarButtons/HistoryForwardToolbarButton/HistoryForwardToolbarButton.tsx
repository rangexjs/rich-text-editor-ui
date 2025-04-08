import { useEffect, useState } from "react";

import {
	PrimaryButton,
	type PrimaryButtonOnClickFn,
} from "../../../PrimaryButton";
import { HistoryForwardIcon } from "../../../SVGs";

import { toolbarButtonClassName } from "../Utilities";

import type { HistoryForwardToolbarButtonProps } from "./HistoryForwardToolbarButton-types";

export const HistoryForwardToolbarButton = ({
	toolbarButtonsActionManager,
	historyNavigationStateManager,
}: HistoryForwardToolbarButtonProps) => {
	const { historyForward } = historyNavigationStateManager;

	const [isDisabled, setIsDisabled] = useState(historyForward.isDisabled);

	useEffect(() => {
		historyNavigationStateManager.updateHistoryForwardState = ({
			isDisabled,
		}) => {
			setIsDisabled(isDisabled);
		};
	}, [historyNavigationStateManager]);

	const onClick: PrimaryButtonOnClickFn = () => {
		toolbarButtonsActionManager.onHistoryNavigation?.({
			type: "history-forward",
		});
	};

	return (
		<PrimaryButton
			checked={false}
			disabled={isDisabled}
			isChevron={false}
			onClick={onClick}
			className={toolbarButtonClassName}
		>
			<HistoryForwardIcon />
		</PrimaryButton>
	);
};
