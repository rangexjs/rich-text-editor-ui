import { useEffect, useState } from "react";

import {
	PrimaryButton,
	type PrimaryButtonOnClickFn,
} from "../../../PrimaryButton";
import { UnderlineIcon } from "../../../SVGs";

import { toolbarButtonClassName } from "../Utilities";

import type { UnderlineToolbarButtonProps } from "./UnderlineToolbarButton-types";

export const UnderlineToolbarButton = ({
	toolbarButtonsActionManager,
	formatStylesButtonsStateManager,
}: UnderlineToolbarButtonProps) => {
	const { underline } = formatStylesButtonsStateManager;

	const [isChecked, setIsChecked] = useState(underline.isChecked);
	const [isDisabled, setIsDisabled] = useState(underline.isDisabled);

	useEffect(() => {
		formatStylesButtonsStateManager.updateUnderlineState = ({
			isChecked,
			isDisabled,
		}) => {
			setIsChecked(isChecked);
			setIsDisabled(isDisabled);
		};
	}, [formatStylesButtonsStateManager]);

	const onClick: PrimaryButtonOnClickFn = () => {
		const textDecorationList: string[] = [];

		const { strikethrough, underline } = formatStylesButtonsStateManager;

		strikethrough.isChecked && textDecorationList.push("line-through");
		underline.isChecked || textDecorationList.push("underline");

		const textDecoration =
			textDecorationList.length === 0 ? null : textDecorationList.join(" ");

		toolbarButtonsActionManager.onFormatStyles?.({ textDecoration });
	};

	return (
		<PrimaryButton
			checked={isChecked}
			disabled={isDisabled}
			isChevron={false}
			onClick={onClick}
			className={toolbarButtonClassName}
		>
			<UnderlineIcon />
		</PrimaryButton>
	);
};
