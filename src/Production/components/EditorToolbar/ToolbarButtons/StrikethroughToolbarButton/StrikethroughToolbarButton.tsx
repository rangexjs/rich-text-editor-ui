import { useEffect, useState } from "react";

import {
	PrimaryButton,
	type PrimaryButtonOnClickFn,
} from "../../../PrimaryButton";
import { StrikethroughIcon } from "../../../SVGs";

import { toolbarButtonClassName } from "../Utilities";

import type { StrikethroughToolbarButtonProps } from "./StrikethroughToolbarButton-types";

export const StrikethroughToolbarButton = ({
	toolbarButtonsActionManager,
	formatStylesButtonsStateManager,
}: StrikethroughToolbarButtonProps) => {
	const { strikethrough } = formatStylesButtonsStateManager;

	const [isChecked, setIsChecked] = useState(strikethrough.isChecked);
	const [isDisabled, setIsDisabled] = useState(strikethrough.isDisabled);

	useEffect(() => {
		formatStylesButtonsStateManager.updateStrikethroughState = ({
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

		strikethrough.isChecked || textDecorationList.push("line-through");
		underline.isChecked && textDecorationList.push("underline");

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
			<StrikethroughIcon />
		</PrimaryButton>
	);
};
