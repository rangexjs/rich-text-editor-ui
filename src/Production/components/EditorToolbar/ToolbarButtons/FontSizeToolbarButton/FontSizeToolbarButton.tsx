import { useEffect, useRef, useState } from "react";

import { PrimaryButton } from "../../../PrimaryButton";
import { CheckIcon, FontSizeIcon } from "../../../SVGs";

import {
	ToolbarDropdown,
	setsAreEqual,
	toolbarButtonClassName,
} from "../Utilities";

import type {
	FontSizeToolbarButtonProps,
	OnFontSizeClickProps,
} from "./FontSizeToolbarButton-types";

const fontSizes = [
	10, 11, 12, 13, 14, 15, 16, 20, 22, 24, 36, 40, 48, 64, 96, 128,
] as const;

export const FontSizeToolbarButton = ({
	toolbarButtonsActionManager,
	formatStylesButtonsStateManager,
}: FontSizeToolbarButtonProps) => {
	const { fontSize } = formatStylesButtonsStateManager;

	const [isChecked, setIsChecked] = useState(false);
	const [isDisabled, setIsDisabled] = useState(fontSize.isDisabled);
	const [values, setValues] = useState(fontSize.values);

	const popoverTargetElementRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		formatStylesButtonsStateManager.updateFontSizeState = ({
			isDisabled,
			values: newValues,
		}) => {
			setIsDisabled(isDisabled);

			if (!setsAreEqual({ setA: values, setB: newValues })) {
				setValues(newValues);
			}
		};
	}, [formatStylesButtonsStateManager, values]);

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

	const fontSizeToolbarButtonAnchor = "--font-size-toolbar-button";

	const fontSizeDropdownAnchor = "--font-size-dropdown";

	const activeFontSizes = [...values].map((fontSize) =>
		Number.parseInt(fontSize, 10),
	);

	const commonFontSizes = [...new Set([...fontSizes, ...activeFontSizes])];

	const sortedFontSizes = commonFontSizes.sort((a, b) => a - b);

	const onFontSizeClick = (value: OnFontSizeClickProps) => {
		const popoverTargetElement = popoverTargetElementRef.current;

		if (!popoverTargetElement) {
			throw new Error("PopoverTargetElement can't be null.");
		}

		popoverTargetElement.hidePopover();

		if (value === "default") {
			toolbarButtonsActionManager.onFormatStyles?.({ fontSize: null });

			return;
		}

		const isActive = activeFontSizes.includes(value);

		if (!isActive || activeFontSizes.length > 1) {
			toolbarButtonsActionManager.onFormatStyles?.({
				fontSize: `${value}px`,
			});

			return;
		}

		toolbarButtonsActionManager.onFormatStyles?.({ fontSize: null });
	};

	return (
		<>
			<PrimaryButton
				checked={isChecked}
				disabled={isDisabled}
				isChevron={true}
				anchorName={fontSizeToolbarButtonAnchor}
				popoverTargetElementRef={popoverTargetElementRef}
				className={toolbarButtonClassName}
			>
				<FontSizeIcon />
			</PrimaryButton>
			<ToolbarDropdown
				ref={popoverTargetElementRef}
				className="max-h-80 flex-col py-2 text-sm [&:popover-open]:flex"
			>
				<PrimaryButton
					className="justify-center px-1 py-0.5 font-semibold"
					onClick={() => onFontSizeClick("default")}
				>
					Default
				</PrimaryButton>
				{sortedFontSizes.map((fontSize) => (
					<PrimaryButton
						key={fontSize}
						className="px-8 py-0.5 font-semibold"
						onClick={() => onFontSizeClick(fontSize)}
					>
						<span
							style={{
								// @ts-ignore
								anchorScope: fontSizeDropdownAnchor,
								anchorName: fontSizeDropdownAnchor,
							}}
						>
							{fontSize}
							{activeFontSizes.includes(fontSize) && (
								<span
									className="absolute"
									style={{
										// @ts-ignore
										positionAnchor: fontSizeDropdownAnchor,
										right: "calc(anchor(left) + 8px)",
										alignSelf: "anchor-center",
									}}
								>
									<CheckIcon size={0.6} />
								</span>
							)}
						</span>
					</PrimaryButton>
				))}
			</ToolbarDropdown>
		</>
	);
};
