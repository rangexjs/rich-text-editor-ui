import { useEffect, useRef, useState } from "react";

import { PrimaryButton } from "../../../PrimaryButton";
import { CheckIcon, LineHeightIcon } from "../../../SVGs";

import { ToolbarDropdown, toolbarButtonClassName } from "../Utilities";

import type {
	LineHeightToolbarButtonProps,
	OnLineHeightClickProps,
} from "./LineHeightToolbarButton-types";

const lineHeights = [
	0.8, 0.9, 1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.8, 2, 2.5, 3,
] as const;

export const LineHeightToolbarButton = ({
	toolbarButtonsActionManager,
	state,
}: LineHeightToolbarButtonProps) => {
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

	const lineHeightToolbarButtonAnchor = "--line-height-toolbar-button";

	const lineHeightDropdownAnchor = "--line-height-dropdown";

	const activeLineHeights = [...state.values];

	const commonLineHeights = [
		...new Set([...lineHeights, ...activeLineHeights]),
	];

	const sortedLineHeights = commonLineHeights.sort((a, b) => a - b);

	const onLineHeightClick = (value: OnLineHeightClickProps) => {
		const popoverTargetElement = popoverTargetElementRef.current;

		if (!popoverTargetElement) {
			throw new Error("PopoverTargetElement can't be null.");
		}

		popoverTargetElement.hidePopover();

		if (value === "default") {
			toolbarButtonsActionManager.onFormatStyles?.({ lineHeight: null });

			return;
		}

		const isActive = activeLineHeights.includes(value);

		if (!isActive || activeLineHeights.length > 1) {
			toolbarButtonsActionManager.onFormatStyles?.({
				lineHeight: `${value}`,
			});

			return;
		}

		toolbarButtonsActionManager.onFormatStyles?.({ lineHeight: null });
	};

	return (
		<>
			<PrimaryButton
				checked={isChecked}
				disabled={state.isDisabled}
				isChevron={true}
				anchorName={lineHeightToolbarButtonAnchor}
				popoverTargetElementRef={popoverTargetElementRef}
				className={toolbarButtonClassName}
			>
				<LineHeightIcon />
			</PrimaryButton>
			<ToolbarDropdown
				ref={popoverTargetElementRef}
				className="max-h-80 flex-col py-2 text-sm [&:popover-open]:flex"
			>
				<PrimaryButton
					className="justify-center px-1 py-0.5 font-semibold"
					onClick={() => onLineHeightClick("default")}
				>
					Default
				</PrimaryButton>
				{sortedLineHeights.map((lineHeight) => (
					<PrimaryButton
						key={lineHeight}
						className="px-8 py-0.5 text-start font-semibold"
						onClick={() => onLineHeightClick(lineHeight)}
					>
						<span
							style={{
								// @ts-ignore
								anchorScope: lineHeightDropdownAnchor,
								anchorName: lineHeightDropdownAnchor,
							}}
						>
							{lineHeight}
							{activeLineHeights.includes(lineHeight) && (
								<span
									className="absolute"
									style={{
										// @ts-ignore
										positionAnchor: lineHeightDropdownAnchor,
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
