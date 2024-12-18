import {
	ToolbarButton,
	type ToolbarButtonOnClickFn,
} from "../../.././ToolbarButton";
import { BoldIcon } from "../../../SVGs";

import type { BoldToolbarButtonProps } from "./BoldToolbarButton-types";

export const BoldToolbarButton = ({
	toolbarButtonsActionManager,
	state,
}: BoldToolbarButtonProps) => {
	const onClick: ToolbarButtonOnClickFn = ({ isChecked }) => {
		const fontWeight = isChecked ? null : "bold";

		toolbarButtonsActionManager.onFormatStylesChange?.({ fontWeight });
	};

	return (
		<ToolbarButton
			checked={state.isChecked}
			disabled={state.isDisabled}
			isChevron={false}
			onClick={onClick}
		>
			<BoldIcon />
		</ToolbarButton>
	);
};
