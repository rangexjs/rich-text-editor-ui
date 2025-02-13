import {
	PrimaryButton,
	type PrimaryButtonOnClickFn,
} from "../../../PrimaryButton";
import { StrikethroughIcon } from "../../../SVGs";

import type { TextDecorationState } from "../Utilities";

import type { StrikethroughToolbarButtonProps } from "./StrikethroughToolbarButton-types";

export const StrikethroughToolbarButton = ({
	toolbarButtonsActionManager,
	states,
}: StrikethroughToolbarButtonProps) => {
	const { strikethrough, underline } = states;

	const onClick: PrimaryButtonOnClickFn = () => {
		const textDecoration: TextDecorationState = new Set();

		strikethrough.isChecked || textDecoration.add("line-through");
		underline.isChecked && textDecoration.add("underline");

		toolbarButtonsActionManager.onFormatStyles?.({ textDecoration });
	};

	return (
		<PrimaryButton
			checked={strikethrough.isChecked}
			disabled={strikethrough.isDisabled}
			isChevron={false}
			onClick={onClick}
		>
			<StrikethroughIcon />
		</PrimaryButton>
	);
};
