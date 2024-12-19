import { useEffect, useRef, useState } from "react";

import { CheckIcon, FontSizeIcon } from "../../../SVGs";
import { ToolbarButton } from "../../../ToolbarButton";

import type {
	FontSizeToolbarButtonProps,
	OnFontSizeClickProps,
} from "./FontSizeToolbarButton-types";

const fontSizes = [
	10, 11, 12, 13, 14, 15, 16, 20, 22, 24, 36, 40, 48, 64, 96, 128,
] as const;

export const FontSizeToolbarButton = ({
	toolbarButtonsActionManager,
	state,
}: FontSizeToolbarButtonProps) => {
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

	const fontSizeToolbarButtonAnchor = "--font-size-toolbar-button";

	const fontSizeDropdownAnchor = "--font-size-dropdown";

	const activeFontSizes = [...state.values].map((fontSize) =>
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
			toolbarButtonsActionManager.onFormatStylesChange?.({ fontSize: null });

			return;
		}

		const isActive = activeFontSizes.includes(value);

		if (!isActive || activeFontSizes.length > 1) {
			toolbarButtonsActionManager.onFormatStylesChange?.({
				fontSize: `${value}px`,
			});

			return;
		}

		toolbarButtonsActionManager.onFormatStylesChange?.({ fontSize: null });
	};

	return (
		<>
			<ToolbarButton
				checked={isChecked}
				disabled={state.isDisabled}
				isChevron={true}
				anchorName={fontSizeToolbarButtonAnchor}
				popoverTargetElementRef={popoverTargetElementRef}
			>
				<FontSizeIcon />
			</ToolbarButton>
			<div
				ref={popoverTargetElementRef}
				popover="auto"
				className="absolute mt-1 max-h-80 flex-col rounded-md bg-slate-100 py-1 text-sm shadow-sm [&:popover-open]:flex"
				style={{
					// @ts-ignore
					positionAnchor: fontSizeToolbarButtonAnchor,
					top: "anchor(bottom)",
					justifySelf: "anchor-center",
				}}
			>
				<button
					type="button"
					className="px-1 py-0.5 font-semibold transition-colors hover:bg-slate-200"
					onClick={() => onFontSizeClick("default")}
				>
					Default
				</button>
				{sortedFontSizes.map((fontSize) => (
					<button
						key={fontSize}
						type="button"
						className="px-8 py-0.5 text-start font-semibold transition-colors hover:bg-slate-200"
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
					</button>
				))}
			</div>
		</>
	);
};
