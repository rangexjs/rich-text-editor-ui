import { useEffect, useRef, useState } from "react";

import type { LineTagNameValue } from "@components";

import { PrimaryButton } from "../../../PrimaryButton";
import { CheckIcon } from "../../../SVGs";

import {
	ToolbarDropdown,
	setsAreEqual,
	toolbarButtonClassName,
} from "../Utilities";

import type {
	DropDownButtonList,
	LineTagNameToolbarButtonProps,
} from "./LineTagNameToolbarButton-types";

export const LineTagNameToolbarButton = ({
	toolbarButtonsActionManager,
	formatLineTagNameButtonsStateManager,
}: LineTagNameToolbarButtonProps) => {
	const { lineTagName } = formatLineTagNameButtonsStateManager;

	const [isChecked, setIsChecked] = useState(false);
	const [isDisabled, setIsDisabled] = useState(lineTagName.isDisabled);
	const [values, setValues] = useState(lineTagName.values);

	const popoverTargetElementRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		formatLineTagNameButtonsStateManager.updateLineTagNameUpdate = ({
			isDisabled,
			values: newValues,
		}) => {
			setIsDisabled(isDisabled);

			if (!setsAreEqual({ setA: values, setB: newValues })) {
				setValues(newValues);
			}
		};
	}, [formatLineTagNameButtonsStateManager, values]);

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

	const anchorName = "--tag-name-toolbar-button";

	const lineTagNames = values;

	const buttonText = (() => {
		const firstItem = lineTagNames.values().next();

		if (firstItem.done) {
			return "None";
		}

		if (lineTagNames.size > 1) {
			return "Mixed";
		}

		const buttonTextDictionary = {
			p: "Paragraph",
			h1: "Heading 1",
			h2: "Heading 2",
			h3: "Heading 3",
			h4: "Heading 4",
			h5: "Heading 5",
			h6: "Heading 6",
		};

		return buttonTextDictionary[firstItem.value];
	})();

	const onClick = (tagName: LineTagNameValue) => {
		const popoverTargetElement = popoverTargetElementRef.current;

		if (!popoverTargetElement) {
			throw new Error("PopoverTargetElement can't be null.");
		}

		popoverTargetElement.hidePopover();

		toolbarButtonsActionManager.onFormatLineTagName?.({ tagName });
	};

	const dropdownButtonList: DropDownButtonList = [
		{
			tagName: "p",
			name: "Paragraph",
			isActive: lineTagNames.has("p"),
		},
		{
			tagName: "h1",
			name: "Heading 1",
			isActive: lineTagNames.has("h1"),
		},
		{
			tagName: "h2",
			name: "Heading 2",
			isActive: lineTagNames.has("h2"),
		},
		{
			tagName: "h3",
			name: "Heading 3",
			isActive: lineTagNames.has("h3"),
		},
		{
			tagName: "h4",
			name: "Heading 4",
			isActive: lineTagNames.has("h4"),
		},
		{
			tagName: "h5",
			name: "Heading 5",
			isActive: lineTagNames.has("h5"),
		},
		{
			tagName: "h6",
			name: "Heading 6",
			isActive: lineTagNames.has("h6"),
		},
	];

	const dropdownButtonAnchor = "--dropdown-button";

	return (
		<>
			<PrimaryButton
				checked={isChecked}
				disabled={isDisabled}
				isChevron={true}
				anchorName={anchorName}
				popoverTargetElementRef={popoverTargetElementRef}
				className={`${toolbarButtonClassName} min-w-28 justify-between text-sm`}
			>
				{buttonText}
			</PrimaryButton>
			<ToolbarDropdown
				ref={popoverTargetElementRef}
				className="w-32 flex-col py-2 [&:popover-open]:flex"
				position="left"
			>
				{dropdownButtonList.map(({ tagName, name, isActive }) => (
					<PrimaryButton
						key={tagName}
						className="justify-center p-1 text-sm"
						onClick={() => onClick(tagName)}
					>
						<span
							style={{
								// @ts-ignore
								anchorScope: dropdownButtonAnchor,
								anchorName: dropdownButtonAnchor,
							}}
						>
							{name}
							{isActive && (
								<span
									className="absolute"
									style={{
										// @ts-ignore
										positionAnchor: dropdownButtonAnchor,
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
