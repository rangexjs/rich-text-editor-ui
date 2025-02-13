import { PrimaryButton } from "../../../PrimaryButton";
import { AnchorIcon } from "../../../SVGs";

import type { AnchorToolbarButtonProps } from "./AnchorToolbarButton-types";

export const AnchorToolbarButton = ({
	toolbarButtonsActionManager,
	state,
}: AnchorToolbarButtonProps) => {
	const onClick = () => {
		toolbarButtonsActionManager.onNodeInsertion?.({ type: "anchor" });
	};

	return (
		<PrimaryButton
			checked={state.isChecked}
			disabled={state.isDisabled}
			onClick={onClick}
		>
			<AnchorIcon size={1.2} />
		</PrimaryButton>
	);
};
