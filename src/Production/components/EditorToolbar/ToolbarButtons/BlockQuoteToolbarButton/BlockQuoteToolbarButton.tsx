import { PrimaryButton } from "../../../PrimaryButton";
import { BlockQuoteIcon } from "../../../SVGs";

import { toolbarButtonClassName } from "../Utilities";

import type { BlockQuoteToolbarButtonProps } from "./BlockQuoteToolbarButton-types";

export const BlockQuoteToolbarButton = ({
	toolbarButtonsActionManager,
	state,
}: BlockQuoteToolbarButtonProps) => {
	const onClick = () => {
		toolbarButtonsActionManager.onNodeInsertion?.({ type: "blockQuote" });
	};

	return (
		<PrimaryButton
			disabled={state.isDisabled}
			onClick={onClick}
			className={toolbarButtonClassName}
		>
			<BlockQuoteIcon />
		</PrimaryButton>
	);
};
