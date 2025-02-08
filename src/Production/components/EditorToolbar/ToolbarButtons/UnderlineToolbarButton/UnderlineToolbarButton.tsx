import {
	PrimaryButton,
	type PrimaryButtonOnClickFn,
} from "../../../PrimaryButton";
import { UnderlineIcon } from "../../../SVGs";

import type { TextDecorationState } from "../Utilities";

import type { UnderlineToolbarButtonProps } from "./UnderlineToolbarButton-types";

export const UnderlineToolbarButton = ({
	toolbarButtonsActionManager,
	states,
}: UnderlineToolbarButtonProps) => {
	const { strikethrough, underline } = states;

	const onClick: PrimaryButtonOnClickFn = () => {
		const textDecoration: TextDecorationState = new Set();

		strikethrough.isChecked && textDecoration.add("line-through");
		underline.isChecked || textDecoration.add("underline");

		toolbarButtonsActionManager.onFormatStyles?.({ textDecoration });
	};

	return (
		<PrimaryButton
			checked={underline.isChecked}
			disabled={underline.isDisabled}
			isChevron={false}
			onClick={onClick}
		>
			<UnderlineIcon />
		</PrimaryButton>
	);
};
