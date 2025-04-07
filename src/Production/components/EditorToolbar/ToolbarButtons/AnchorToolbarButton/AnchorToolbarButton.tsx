import { PrimaryButton } from "../../../PrimaryButton";
import { AnchorIcon } from "../../../SVGs";

import { toolbarButtonClassName } from "../Utilities";

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
			className={toolbarButtonClassName}
		>
			<AnchorIcon size={1.2} />
		</PrimaryButton>
	);
};
