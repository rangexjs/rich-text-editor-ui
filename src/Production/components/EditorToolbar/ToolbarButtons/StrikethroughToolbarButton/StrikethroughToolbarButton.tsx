import {
	ToolbarButton,
	type ToolbarButtonOnClickFn,
} from "../../.././ToolbarButton";
import { StrikethroughIcon } from "../../../SVGs";

import type { TextDecorationState } from "../Utilities";

import type { StrikethroughToolbarButtonProps } from "./StrikethroughToolbarButton-types";

export const StrikethroughToolbarButton = ({
	toolbarButtonsActionManager,
	states,
}: StrikethroughToolbarButtonProps) => {
	const { strikethrough, underline } = states;

	const onClick: ToolbarButtonOnClickFn = () => {
		const textDecoration: TextDecorationState = new Set();

		strikethrough.isChecked || textDecoration.add("line-through");
		underline.isChecked && textDecoration.add("underline");

		toolbarButtonsActionManager.onFormatStylesChange?.({ textDecoration });
	};

	return (
		<ToolbarButton
			checked={strikethrough.isChecked}
			disabled={strikethrough.isDisabled}
			isChevron={false}
			onClick={onClick}
		>
			<StrikethroughIcon />
		</ToolbarButton>
	);
};
