import { useEffect, useRef, useState } from "react";

import { Color, type HSLFormat } from "@utilities";

import { ColorPanel, type OnColorSelected } from "../../../ColorPanel";
import { PrimaryButton } from "../../../PrimaryButton";
import { ColorIcon } from "../../../SVGs";

import { ToolbarDropdown } from "../Utilities";

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

		toolbarButtonsActionManager.onFormatStyles?.({ color });
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

	const activeColors: HSLFormat[] = [];

	for (const color of state.values) {
		try {
			const hslFormat = Color.fromColor({ color }).hslFormat();

			activeColors.push(hslFormat);
		} catch {
			console.warn("Color couldn't be processed.", { color });
		}
	}

	return (
		<>
			<PrimaryButton
				checked={isChecked}
				disabled={state.isDisabled}
				isChevron={true}
				anchorName={anchorName}
				popoverTargetElementRef={popoverTargetElementRef}
			>
				<ColorIcon />
			</PrimaryButton>
			<ToolbarDropdown ref={popoverTargetElementRef}>
				<ColorPanel
					activeColors={activeColors}
					onColorSelected={onColorSelected}
				/>
			</ToolbarDropdown>
		</>
	);
};
