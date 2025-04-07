import { useEffect, useRef, useState } from "react";

import { PrimaryButton } from "../../../PrimaryButton";
import { CheckIcon, FontFamilyIcon } from "../../../SVGs";

import { ToolbarDropdown, toolbarButtonClassName } from "../Utilities";

import type {
	FontFamilyToolbarButtonProps,
	OnFontFamilyClickProps,
} from "./FontFamilyToolbarButton-types";

export const fontFamilyList = [
	"Arial", // System Font
	"Verdana", // System Font
	"Tahoma", // System Font
	"Times New Roman", // System Font
	"Georgia", // System Font
	"Courier New", // System Font
	"Consolas", // System Font
	"Open Sans", // Google Font
	"Roboto", // Google Font
	"Lato", // Google Font
	"Poppins", // Google Font
	"Montserrat", // Google Font
	"Merriweather", // Google Font
	"Playfair Display", // Google Font
	"Source Code Pro", // Google Font
	"Fira Code", // Google Font
] as const;

export const FontFamilyToolbarButton = ({
	toolbarButtonsActionManager,
	formatStylesButtonsStateManager,
}: FontFamilyToolbarButtonProps) => {
	const { fontFamily } = formatStylesButtonsStateManager;

	const [isChecked, setIsChecked] = useState(false);
	const [isDisabled, setIsDisabled] = useState(fontFamily.isDisabled);
	const [values, setValues] = useState(fontFamily.values);

	const popoverTargetElementRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		formatStylesButtonsStateManager.updateFontFamilyState = ({
			isDisabled,
			values,
		}) => {
			setIsDisabled(isDisabled);
			setValues(values);
		};
	}, [formatStylesButtonsStateManager]);

	useEffect(() => {
		const popoverTargetElement = popoverTargetElementRef.current;

		if (!popoverTargetElement) {
			return;
		}

		const onToggle = (event: ToggleEvent) => {
			const { newState } = event;

			if (newState === "open") {
				setIsChecked(true);
			}

			if (newState === "closed") {
				setIsChecked(false);
			}
		};

		// @ts-ignore
		popoverTargetElement.addEventListener("toggle", onToggle);

		return () => {
			// @ts-ignore
			popoverTargetElement.removeEventListener("toggle", onToggle);
		};
	}, []);

	const anchorName = "--font-family-toolbar-button";

	const fontFamilyDropdownAnchor = "--font-family-dropdown-anchor";

	const activeFontFamilies = values;

	const onFontFamilyClick = (value: OnFontFamilyClickProps) => {
		const popoverTargetElement = popoverTargetElementRef.current;

		if (!popoverTargetElement) {
			throw new Error("PopoverTargetElement can't be null.");
		}

		popoverTargetElement.hidePopover();

		if (value === "default") {
			toolbarButtonsActionManager.onFormatStyles?.({ fontFamily: null });

			return;
		}

		const isActive = activeFontFamilies.has(value);

		if (!isActive || activeFontFamilies.size > 1) {
			toolbarButtonsActionManager.onFormatStyles?.({ fontFamily: value });

			return;
		}

		toolbarButtonsActionManager.onFormatStyles?.({ fontFamily: null });
	};

	return (
		<>
			<PrimaryButton
				checked={isChecked}
				disabled={isDisabled}
				isChevron={true}
				anchorName={anchorName}
				popoverTargetElementRef={popoverTargetElementRef}
				className={toolbarButtonClassName}
			>
				<FontFamilyIcon />
			</PrimaryButton>
			<ToolbarDropdown
				ref={popoverTargetElementRef}
				className="max-h-80 flex-col py-2 [&:popover-open]:flex"
			>
				<PrimaryButton
					className="px-6 py-1 font-semibold text-sm"
					onClick={() => onFontFamilyClick("default")}
				>
					Default
				</PrimaryButton>
				{fontFamilyList.map((fontFamily) => (
					<PrimaryButton
						key={fontFamily}
						className="px-6 py-1 text-sm"
						onClick={() => onFontFamilyClick(fontFamily)}
					>
						<span
							style={{
								// @ts-ignore
								anchorScope: fontFamilyDropdownAnchor,
								anchorName: fontFamilyDropdownAnchor,
							}}
						>
							{fontFamily}
							{activeFontFamilies.has(fontFamily) && (
								<span
									className="absolute"
									style={{
										// @ts-ignore
										positionAnchor: fontFamilyDropdownAnchor,
										right: "calc(anchor(left) + 6px)",
										alignSelf: "anchor-center",
									}}
								>
									<CheckIcon size={0.7} />
								</span>
							)}
						</span>
					</PrimaryButton>
				))}
			</ToolbarDropdown>
		</>
	);
};
