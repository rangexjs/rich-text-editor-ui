import { useEffect, useState } from "react";

import { PrimaryButton } from "../../../PrimaryButton";
import { LockIcon } from "../../../SVGs";

import { toolbarButtonClassName } from "../Utilities";

import type { IsTextAreaReadOnlyToolbarButtonProps } from "./IsTextAreaReadOnlyToolbarButton-types";

export const IsTextAreaReadOnlyToolbarButton = ({
	toolbarButtonsActionManager,
	nonCategorizedOperationButtonsStateManager,
}: IsTextAreaReadOnlyToolbarButtonProps) => {
	const { isTextAreaReadOnly } = nonCategorizedOperationButtonsStateManager;

	const [isChecked, setIsChecked] = useState(isTextAreaReadOnly.isChecked);

	useEffect(() => {
		nonCategorizedOperationButtonsStateManager.updateIsTextAreaReadOnlyState =
			({ isChecked }) => {
				setIsChecked(isChecked);
			};
	}, [nonCategorizedOperationButtonsStateManager]);

	const onClick = () => {
		toolbarButtonsActionManager.onNonCategorizedOperation?.({
			type: "isTextAreaReadOnly",
			newState: !isChecked,
		});
	};

	return (
		<PrimaryButton
			checked={isChecked}
			onClick={onClick}
			className={toolbarButtonClassName}
		>
			<LockIcon />
		</PrimaryButton>
	);
};
