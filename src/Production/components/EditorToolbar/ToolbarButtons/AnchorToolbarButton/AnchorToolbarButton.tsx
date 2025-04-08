import { useEffect, useState } from "react";

import { PrimaryButton } from "../../../PrimaryButton";
import { AnchorIcon } from "../../../SVGs";

import { toolbarButtonClassName } from "../Utilities";

import type { AnchorToolbarButtonProps } from "./AnchorToolbarButton-types";

export const AnchorToolbarButton = ({
	toolbarButtonsActionManager,
	nodeInsertionButtonsStateManager,
}: AnchorToolbarButtonProps) => {
	const { anchor } = nodeInsertionButtonsStateManager;

	const [isChecked, setIsChecked] = useState(anchor.isChecked);
	const [isDisabled, setIsDisabled] = useState(anchor.isDisabled);

	useEffect(() => {
		nodeInsertionButtonsStateManager.updateAnchorState = ({
			isChecked,
			isDisabled,
		}) => {
			setIsChecked(isChecked);
			setIsDisabled(isDisabled);
		};
	}, [nodeInsertionButtonsStateManager]);

	const onClick = () => {
		toolbarButtonsActionManager.onNodeInsertion?.({ type: "anchor" });
	};

	return (
		<PrimaryButton
			checked={isChecked}
			disabled={isDisabled}
			onClick={onClick}
			className={toolbarButtonClassName}
		>
			<AnchorIcon size={1.2} />
		</PrimaryButton>
	);
};
