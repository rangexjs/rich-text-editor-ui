import { useEffect, useState } from "react";

import {
	PrimaryButton,
	type PrimaryButtonOnClickFn,
} from "../../../PrimaryButton";
import { BoldIcon } from "../../../SVGs";
import { toolbarButtonClassName } from "../Utilities";

import type { BoldToolbarButtonProps } from "./BoldToolbarButton-types";

export const BoldToolbarButton = ({
	toolbarButtonsActionManager,
	formatStylesButtonsStateManager,
}: BoldToolbarButtonProps) => {
	const { bold } = formatStylesButtonsStateManager;

	const [isChecked, setIsChecked] = useState(bold.isChecked);
	const [isDisabled, setIsDisabled] = useState(bold.isDisabled);

	const onClick: PrimaryButtonOnClickFn = ({ isChecked }) => {
		const fontWeight = isChecked ? null : "bold";

		toolbarButtonsActionManager.onFormatStyles?.({ fontWeight });
	};

	useEffect(() => {
		formatStylesButtonsStateManager.updateBoldState = ({
			isChecked,
			isDisabled,
		}) => {
			setIsChecked(isChecked);
			setIsDisabled(isDisabled);
		};
	}, [formatStylesButtonsStateManager]);

	return (
		<PrimaryButton
			checked={isChecked}
			disabled={isDisabled}
			isChevron={false}
			onClick={onClick}
			className={toolbarButtonClassName}
		>
			<BoldIcon />
		</PrimaryButton>
	);
};
