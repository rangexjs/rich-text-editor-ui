import { PrimaryButton } from "../../../PrimaryButton";
import { BlockQuoteIcon } from "../../../SVGs";

import type { BlockQuoteToolbarButtonProps } from "./BlockQuoteToolbarButton-types";

export const BlockQuoteToolbarButton = ({
	toolbarButtonsActionManager,
	state,
}: BlockQuoteToolbarButtonProps) => {
	const onClick = () => {
		toolbarButtonsActionManager.onNodeInsertion?.({ type: "blockQuote" });
	};

	return (
		<PrimaryButton disabled={state.isDisabled} onClick={onClick}>
			<BlockQuoteIcon />
		</PrimaryButton>
	);
};
