import { useEffect, useState } from "react";

import { PrimaryButton } from "../../../PrimaryButton";
import { BlockQuoteIcon } from "../../../SVGs";

import { toolbarButtonClassName } from "../Utilities";

import type { BlockQuoteToolbarButtonProps } from "./BlockQuoteToolbarButton-types";

export const BlockQuoteToolbarButton = ({
	toolbarButtonsActionManager,
	nodeInsertionButtonsStateManager,
}: BlockQuoteToolbarButtonProps) => {
	const { blockQuote } = nodeInsertionButtonsStateManager;

	const [isDisabled, setIsDisabled] = useState(blockQuote.isDisabled);

	useEffect(() => {
		nodeInsertionButtonsStateManager.updateBlockQuoteState = ({
			isDisabled,
		}) => {
			setIsDisabled(isDisabled);
		};
	}, [nodeInsertionButtonsStateManager]);

	const onClick = () => {
		toolbarButtonsActionManager.onNodeInsertion?.({ type: "blockQuote" });
	};

	return (
		<PrimaryButton
			disabled={isDisabled}
			onClick={onClick}
			className={toolbarButtonClassName}
		>
			<BlockQuoteIcon />
		</PrimaryButton>
	);
};
