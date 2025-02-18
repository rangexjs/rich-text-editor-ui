import {
	PrimaryButton,
	type PrimaryButtonOnClickFn,
} from "../../../PrimaryButton";
import { StrikethroughIcon } from "../../../SVGs";

import type { StrikethroughToolbarButtonProps } from "./StrikethroughToolbarButton-types";

export const StrikethroughToolbarButton = ({
	toolbarButtonsActionManager,
	states,
}: StrikethroughToolbarButtonProps) => {
	const { strikethrough, underline } = states;

	const onClick: PrimaryButtonOnClickFn = () => {
		const textDecorationList: string[] = [];

		strikethrough.isChecked || textDecorationList.push("line-through");
		underline.isChecked && textDecorationList.push("underline");

		const textDecoration =
			textDecorationList.length === 0 ? null : textDecorationList.join(" ");

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
