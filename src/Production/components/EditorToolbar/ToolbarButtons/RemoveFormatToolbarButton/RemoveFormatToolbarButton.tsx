import { PrimaryButton } from "../../../PrimaryButton";
import { RemoveFormatIcon } from "../../../SVGs";

import { toolbarButtonClassName } from "../Utilities";

import type { RemoveFormatToolbarButtonProps } from "./RemoveFormatToolbarButton-types";

export const RemoveFormatToolbarButton = ({
	toolbarButtonsActionManager,
	formattableButtonsState,
}: RemoveFormatToolbarButtonProps) => {
	const {
		backgroundColor,
		bold,
		color,
		fontFamily,
		fontSize,
		indentation,
		italic,
		letterSpacing,
		lineHeight,
		strikethrough,
		textAlign,
		underline,
	} = formattableButtonsState;

	// TODO: Styles with default values (e.g.: textAlign) has to be reviewed
	const isDisabled =
		backgroundColor.values.size === 0 &&
		!bold.isChecked &&
		color.values.size === 0 &&
		fontFamily.values.size === 0 &&
		fontSize.values.size === 0 &&
		indentation.values.size === 0 &&
		!italic.isChecked &&
		letterSpacing.values.size === 0 &&
		lineHeight.values.size === 0 &&
		!strikethrough.isChecked &&
		textAlign.values.size === 0 &&
		!underline.isChecked;

	const onClick = () => {
		toolbarButtonsActionManager.onFormatStyles?.({
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
			textDecoration: null,
		});
	};

	return (
		<PrimaryButton
			checked={false}
			disabled={isDisabled}
			isChevron={false}
			onClick={onClick}
			className={toolbarButtonClassName}
		>
			<RemoveFormatIcon />
		</PrimaryButton>
	);
};
