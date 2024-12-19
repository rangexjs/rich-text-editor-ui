import { useEffect, useRef, useState } from "react";

import { CheckIcon, FontFamilyIcon } from "../../../SVGs";
import { ToolbarButton } from "../../../ToolbarButton";

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
	state,
}: FontFamilyToolbarButtonProps) => {
	const [isChecked, setIsChecked] = useState(false);
	const popoverTargetElementRef = useRef<HTMLDivElement>(null);

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

	const activeFontFamilies = state.values;

	const onFontFamilyClick = (value: OnFontFamilyClickProps) => {
		const popoverTargetElement = popoverTargetElementRef.current;

		if (!popoverTargetElement) {
			throw new Error("PopoverTargetElement can't be null.");
		}

		popoverTargetElement.hidePopover();

		if (value === "default") {
			toolbarButtonsActionManager.onFormatStylesChange?.({ fontFamily: null });

			return;
		}

		const isActive = activeFontFamilies.has(value);

		if (!isActive || activeFontFamilies.size > 1) {
			toolbarButtonsActionManager.onFormatStylesChange?.({ fontFamily: value });

			return;
		}

		toolbarButtonsActionManager.onFormatStylesChange?.({ fontFamily: null });
	};

	return (
		<>
			<ToolbarButton
				checked={isChecked}
				disabled={state.isDisabled}
				isChevron={true}
				anchorName={anchorName}
				popoverTargetElementRef={popoverTargetElementRef}
			>
				<FontFamilyIcon />
			</ToolbarButton>
			<div
				ref={popoverTargetElementRef}
				className="absolute mt-1 max-h-80 flex-col rounded-md border border-slate-200 bg-white py-2 shadow-md [&:popover-open]:flex"
				popover="auto"
				style={{
					// @ts-ignore
					positionAnchor: anchorName,
					top: "anchor(bottom)",
					justifySelf: "anchor-center",
				}}
			>
				<ToolbarButton
					className="rounded-none px-6 py-1 font-semibold text-sm"
					onClick={() => onFontFamilyClick("default")}
				>
					Default
				</ToolbarButton>
				{fontFamilyList.map((fontFamily) => (
					<ToolbarButton
						key={fontFamily}
						className="rounded-none px-6 py-1 text-sm"
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
					</ToolbarButton>
				))}
			</div>
		</>
	);
};
