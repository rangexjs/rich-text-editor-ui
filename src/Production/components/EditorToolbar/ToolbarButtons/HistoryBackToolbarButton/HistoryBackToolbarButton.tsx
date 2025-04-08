import { useEffect, useState } from "react";

import {
	PrimaryButton,
	type PrimaryButtonOnClickFn,
} from "../../../PrimaryButton";
import { HistoryBackIcon } from "../../../SVGs";

import { toolbarButtonClassName } from "../Utilities";

import type { HistoryBackToolbarButtonProps } from "./HistoryBackToolbarButton-types";

export const HistoryBackToolbarButton = ({
	toolbarButtonsActionManager,
	historyNavigationStateManager,
}: HistoryBackToolbarButtonProps) => {
	const { historyBack } = historyNavigationStateManager;

	const [isDisabled, setIsDisabled] = useState(historyBack.isDisabled);

	useEffect(() => {
		historyNavigationStateManager.updateHistoryBackState = ({ isDisabled }) => {
			setIsDisabled(isDisabled);
		};
	}, [historyNavigationStateManager]);

	const onClick: PrimaryButtonOnClickFn = () => {
		toolbarButtonsActionManager.onHistoryNavigation?.({ type: "history-back" });
	};

	return (
		<PrimaryButton
			checked={false}
			disabled={isDisabled}
			isChevron={false}
			onClick={onClick}
			className={toolbarButtonClassName}
		>
			<HistoryBackIcon />
		</PrimaryButton>
	);
};
