import {
	PrimaryButton,
	type PrimaryButtonOnClickFn,
} from "../../../PrimaryButton";
import { BoldIcon } from "../../../SVGs";

import type { BoldToolbarButtonProps } from "./BoldToolbarButton-types";

export const BoldToolbarButton = ({
	toolbarButtonsActionManager,
	state,
}: BoldToolbarButtonProps) => {
	const onClick: PrimaryButtonOnClickFn = ({ isChecked }) => {
		const fontWeight = isChecked ? null : "bold";

		toolbarButtonsActionManager.onFormatStyles?.({ fontWeight });
	};

	return (
		<PrimaryButton
			checked={state.isChecked}
			disabled={state.isDisabled}
			isChevron={false}
			onClick={onClick}
		>
			<BoldIcon />
		</PrimaryButton>
	);
};
