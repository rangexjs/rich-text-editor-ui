import { useEffect, useState } from "react";
import {
	PrimaryButton,
	type PrimaryButtonOnClickFn,
} from "../../../PrimaryButton";
import { ItalicIcon } from "../../../SVGs";

import { toolbarButtonClassName } from "../Utilities";

import type { ItalicToolbarButtonProps } from "./ItalicToolbarButton-types";

export const ItalicToolbarButton = ({
	toolbarButtonsActionManager,
	formatStylesButtonsStateManager,
}: ItalicToolbarButtonProps) => {
	const { italic } = formatStylesButtonsStateManager;

	const [isChecked, setIsChecked] = useState(italic.isChecked);
	const [isDisabled, setIsDisabled] = useState(italic.isDisabled);

	useEffect(() => {
		formatStylesButtonsStateManager.updateItalicState = ({
			isChecked,
			isDisabled,
		}) => {
			setIsChecked(isChecked);
			setIsDisabled(isDisabled);
		};
	}, [formatStylesButtonsStateManager]);

	const onClick: PrimaryButtonOnClickFn = ({ isChecked }) => {
		const fontStyle = isChecked ? null : "italic";

		toolbarButtonsActionManager.onFormatStyles?.({ fontStyle });
	};

	return (
		<PrimaryButton
			checked={isChecked}
			disabled={isDisabled}
			isChevron={false}
			onClick={onClick}
			className={toolbarButtonClassName}
		>
			<ItalicIcon />
		</PrimaryButton>
	);
};
