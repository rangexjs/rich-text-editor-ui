import {
	ToolbarButton,
	type ToolbarButtonOnClickFn,
} from "../../.././ToolbarButton";
import { UnderlineIcon } from "../../../SVGs";

import type { TextDecorationState } from "../Utilities";

import type { UnderlineToolbarButtonProps } from "./UnderlineToolbarButton-types";

export const UnderlineToolbarButton = ({
	toolbarButtonsActionManager,
	states,
}: UnderlineToolbarButtonProps) => {
	const { strikethrough, underline } = states;

	const onClick: ToolbarButtonOnClickFn = () => {
		const textDecoration: TextDecorationState = new Set();

		strikethrough.isChecked && textDecoration.add("line-through");
		underline.isChecked || textDecoration.add("underline");

		toolbarButtonsActionManager.onFormatStylesChange?.({ textDecoration });
	};

	return (
		<ToolbarButton
			checked={underline.isChecked}
			disabled={underline.isDisabled}
			isChevron={false}
			onClick={onClick}
		>
			<UnderlineIcon />
		</ToolbarButton>
	);
};
