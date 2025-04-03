import { useEffect, useRef, useState } from "react";

import { Color, type HSLFormat } from "@utilities";

import { ColorPanel, type OnColorSelected } from "../../../ColorPanel";
import { PrimaryButton } from "../../../PrimaryButton";
import { BackgroundColorIcon } from "../../../SVGs";

import { ToolbarDropdown, toolbarButtonClassName } from "../Utilities";

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

		toolbarButtonsActionManager.onFormatStyles?.({ backgroundColor });
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
				className={toolbarButtonClassName}
			>
				<BackgroundColorIcon />
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
