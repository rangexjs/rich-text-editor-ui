import {
	PrimaryButton,
	type PrimaryButtonOnClickFn,
} from "../../../PrimaryButton";
import { UnderlineIcon } from "../../../SVGs";

import type { UnderlineToolbarButtonProps } from "./UnderlineToolbarButton-types";

export const UnderlineToolbarButton = ({
	toolbarButtonsActionManager,
	states,
}: UnderlineToolbarButtonProps) => {
	const { strikethrough, underline } = states;

	const onClick: PrimaryButtonOnClickFn = () => {
		const textDecorationList: string[] = [];

		strikethrough.isChecked && textDecorationList.push("line-through");
		underline.isChecked || textDecorationList.push("underline");

		const textDecoration =
			textDecorationList.length === 0 ? null : textDecorationList.join(" ");

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
