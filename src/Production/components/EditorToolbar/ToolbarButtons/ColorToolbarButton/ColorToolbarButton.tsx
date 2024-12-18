import { useEffect, useRef, useState } from "react";

import { ColorPanel, type OnColorSelected } from "../../../ColorPanel";
import { ColorIcon } from "../../../SVGs";
import { ToolbarButton } from "../../../ToolbarButton";

import { Color } from "@utilities";
import type { CreateColorPropsProps } from "./ColorToolbarButton-types";

export const ColorToolbarButton = ({
	toolbarButtonsActionManager,
	state,
}: CreateColorPropsProps) => {
	const [isChecked, setIsChecked] = useState(false);
	const anchorName = "--color-button";

	const popoverTargetElementRef = useRef<HTMLDivElement>(null);

	const onColorSelected: OnColorSelected = ({ hsl }) => {
		const popoverTargetElement = popoverTargetElementRef.current;

		if (!popoverTargetElement) {
			throw new Error("PopoverTargetElement can't be null.");
		}

		popoverTargetElement.hidePopover();

		const color = hsl && Color.hsl(hsl).hex().hex;

		toolbarButtonsActionManager.onFormatStylesChange?.({ color });
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
				<ColorIcon />
			</ToolbarButton>
			<div
				ref={popoverTargetElementRef}
				className="mt-1 rounded-lg border border-slate-200 shadow-md"
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
