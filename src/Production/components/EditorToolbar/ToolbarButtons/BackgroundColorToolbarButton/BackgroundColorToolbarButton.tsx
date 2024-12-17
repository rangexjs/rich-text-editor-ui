import { useEffect, useRef, useState } from "react";

import { Color } from "@utilities";

import { ColorPanel, type OnColorSelected } from "../../../ColorPanel";
import { BackgroundColorIcon } from "../../../SVGs";
import { ToolbarButton } from "../../../ToolbarButton";

import type { CreateBackgroundColorPropsProps } from "./BackgroundColorToolbarButton-types";

export const BackgroundColorToolbarButton = ({
	toolbarButtonsActionManager,
	state,
}: CreateBackgroundColorPropsProps) => {
	const [isChecked, setIsChecked] = useState(false);
	const anchorName = "--background-color-button";

	const popoverTargetElementRef = useRef<HTMLDivElement>(null);

	const onColorSelected: OnColorSelected = ({ hsl }) => {
		const popoverTargetElement = popoverTargetElementRef.current;

		if (!popoverTargetElement) {
			throw new Error("PopoverTargetElement can't be null.");
		}

		popoverTargetElement.hidePopover();

		const backgroundColor = hsl && Color.hsl(hsl).hex().hex;

		toolbarButtonsActionManager.onFormatStylesChange?.({ backgroundColor });
	};

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

	return (
		<>
			<ToolbarButton
				checked={isChecked}
				disabled={state.isDisabled}
				isChevron={true}
				anchorName={anchorName}
				popoverTargetElementRef={popoverTargetElementRef}
			>
				<BackgroundColorIcon />
			</ToolbarButton>
			<div
				ref={popoverTargetElementRef}
				className="mt-1 shadow-md"
				popover="auto"
				style={{
					// @ts-ignore
					positionAnchor: anchorName,
					top: "anchor(bottom)",
					justifySelf: "anchor-center",
				}}
			>
				<ColorPanel activeColors={[]} onColorSelected={onColorSelected} />
			</div>
		</>
	);
};
