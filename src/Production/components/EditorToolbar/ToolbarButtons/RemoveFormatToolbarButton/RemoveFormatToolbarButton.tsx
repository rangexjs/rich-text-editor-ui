import { RemoveFormatIcon } from "../../../SVGs";
import { ToolbarButton } from "../../../ToolbarButton";

import type { RemoveFormatToolbarButtonProps } from "./RemoveFormatToolbarButton-types";

export const RemoveFormatToolbarButton = ({
	toolbarButtonsActionManager,
	formattableButtonsState,
}: RemoveFormatToolbarButtonProps) => {
	const { backgroundColor, bold, color, italic, strikethrough, underline } =
		formattableButtonsState;

	const isDisabled =
		backgroundColor.values.size === 0 &&
		!bold.isChecked &&
		color.values.size === 0 &&
		!italic.isChecked &&
		!strikethrough.isChecked &&
		!underline.isChecked;

	const onClick = () => {
		toolbarButtonsActionManager.onFormatStylesChange?.({
			backgroundColor: null,
			color: null,
			fontFamily: null,
			fontSize: null,
			fontStyle: null,
			fontWeight: null,
			letterSpacing: null,
			lineHeight: null,
			paddingInlineStart: null,
			textAlign: null,
			textDecoration: new Set(),
		});
	};

	return (
		<ToolbarButton
			checked={false}
			disabled={isDisabled}
			isChevron={false}
			onClick={onClick}
		>
			<RemoveFormatIcon />
		</ToolbarButton>
	);
};
