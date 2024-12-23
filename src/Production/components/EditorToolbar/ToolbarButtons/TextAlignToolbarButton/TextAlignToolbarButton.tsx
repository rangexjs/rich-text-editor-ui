import { useEffect, useRef, useState } from "react";

import { PrimaryButton } from "../../../PrimaryButton";
import {
	TextAlignCenterIcon,
	TextAlignJustifyIcon,
	TextAlignLeftIcon,
	TextAlignRightIcon,
} from "../../../SVGs";

import type {
	OnTextAlignClickProps,
	TextAlignList,
	TextAlignToolbarButtonProps,
} from "./TextAlignToolbarButton-types";

const textAlignList: TextAlignList = ["left", "center", "right", "justify"];

export const TextAlignToolbarButton = ({
	toolbarButtonsActionManager,
	state,
}: TextAlignToolbarButtonProps) => {
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

	const textAlignToolbarButtonAnchor = "--text-align-toolbar-button";

	const textAlignValues = [...state.values];

	// RTL writing mode will be handled later
	!textAlignValues.length && textAlignValues.push("left");

	const firstItem = textAlignValues.at(0);

	if (!firstItem) {
		throw new Error("FirstItem can't be undefined.");
	}

	const onTextAlignClick = (value: OnTextAlignClickProps) => {
		const popoverTargetElement = popoverTargetElementRef.current;

		if (!popoverTargetElement) {
			throw new Error("PopoverTargetElement can't be null.");
		}

		popoverTargetElement.hidePopover();

		const isActive = textAlignValues.includes(value);

		const textAlign = isActive && textAlignValues.length === 1 ? null : value;

		console.log(textAlign);

		toolbarButtonsActionManager.onFormatStyles?.({ textAlign });
	};

	return (
		<>
			<PrimaryButton
				checked={isChecked}
				disabled={state.isDisabled}
				isChevron={true}
				anchorName={textAlignToolbarButtonAnchor}
				popoverTargetElementRef={popoverTargetElementRef}
			>
				{firstItem === "center" && <TextAlignCenterIcon />}
				{firstItem === "justify" && <TextAlignJustifyIcon />}
				{firstItem === "left" && <TextAlignLeftIcon />}
				{firstItem === "right" && <TextAlignRightIcon />}
			</PrimaryButton>
			<div
				ref={popoverTargetElementRef}
				popover="auto"
				className="absolute mt-1 gap-0.5 rounded-md border border-slate-200 bg-white p-1 text-sm shadow-md [&:popover-open]:flex"
				style={{
					// @ts-ignore
					positionAnchor: textAlignToolbarButtonAnchor,
					top: "anchor(bottom)",
					justifySelf: "anchor-center",
				}}
			>
				{textAlignList.map((textAlign) => (
					<PrimaryButton
						key={textAlign}
						checked={textAlignValues.includes(textAlign)}
						onClick={() => onTextAlignClick(textAlign)}
					>
						{textAlign === "center" && <TextAlignCenterIcon />}
						{textAlign === "justify" && <TextAlignJustifyIcon />}
						{textAlign === "left" && <TextAlignLeftIcon />}
						{textAlign === "right" && <TextAlignRightIcon />}
					</PrimaryButton>
				))}
			</div>
		</>
	);
};
