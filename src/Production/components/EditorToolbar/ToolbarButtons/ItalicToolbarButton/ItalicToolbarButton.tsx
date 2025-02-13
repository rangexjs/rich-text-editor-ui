import {
	PrimaryButton,
	type PrimaryButtonOnClickFn,
} from "../../../PrimaryButton";
import { ItalicIcon } from "../../../SVGs";

import type { ItalicToolbarButtonProps } from "./ItalicToolbarButton-types";

export const ItalicToolbarButton = ({
	toolbarButtonsActionManager,
	state,
}: ItalicToolbarButtonProps) => {
	const onClick: PrimaryButtonOnClickFn = ({ isChecked }) => {
		const fontStyle = isChecked ? null : "italic";

		toolbarButtonsActionManager.onFormatStyles?.({ fontStyle });
	};

	return (
		<PrimaryButton
			checked={state.isChecked}
			disabled={state.isDisabled}
			isChevron={false}
			onClick={onClick}
		>
			<ItalicIcon />
		</PrimaryButton>
	);
};
