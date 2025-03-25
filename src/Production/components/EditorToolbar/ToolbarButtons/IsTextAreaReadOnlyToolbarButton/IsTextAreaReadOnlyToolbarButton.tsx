import { PrimaryButton } from "../../../PrimaryButton";
import { LockIcon } from "../../../SVGs";

import type { IsTextAreaReadOnlyToolbarButtonProps } from "./IsTextAreaReadOnlyToolbarButton-types";

export const IsTextAreaReadOnlyToolbarButton = ({
	toolbarButtonsActionManager,
	state,
}: IsTextAreaReadOnlyToolbarButtonProps) => {
	const { isChecked } = state;

	const onClick = () => {
		toolbarButtonsActionManager.onNonCategorizedOperation?.({
			type: "isTextAreaReadOnly",
			newState: !isChecked,
		});
	};

	return (
		<PrimaryButton checked={isChecked} onClick={onClick}>
			<LockIcon />
		</PrimaryButton>
	);
};
