import { useEffect, useRef, useState } from "react";

import { CheckIcon, IndentationIcon } from "../../../SVGs";
import { ToolbarButton } from "../../../ToolbarButton";

import type {
	IndentationToolbarButtonProps,
	OnIndentationClickProps,
} from "./IndentationToolbarButton-types";

const indentations = [4, 8, 12, 16, 24, 32, 40, 48, 64, 80] as const;

export const IndentationToolbarButton = ({
	toolbarButtonsActionManager,
	state,
}: IndentationToolbarButtonProps) => {
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

	const indentationToolbarButtonAnchor = "--indentation-toolbar-button";

	const indentationDropdownAnchor = "--indentation-dropdown";

	const activeIndentations = [...state.values].map((indentation) =>
		Number.parseInt(indentation, 10),
	);

	const commonIndentations = [
		...new Set([...indentations, ...activeIndentations]),
	];

	const sortedIndentations = commonIndentations.sort((a, b) => a - b);

	const onIndentationClick = (value: OnIndentationClickProps) => {
		const popoverTargetElement = popoverTargetElementRef.current;

		if (!popoverTargetElement) {
			throw new Error("PopoverTargetElement can't be null.");
		}

		popoverTargetElement.hidePopover();

		if (value === "remove") {
			toolbarButtonsActionManager.onFormatStylesChange?.({
				paddingInlineStart: null,
			});

			return;
		}

		const isActive = activeIndentations.includes(value);

		if (!isActive || activeIndentations.length > 1) {
			toolbarButtonsActionManager.onFormatStylesChange?.({
				paddingInlineStart: `${value}px`,
			});

			return;
		}

		toolbarButtonsActionManager.onFormatStylesChange?.({
			paddingInlineStart: null,
		});
	};

	return (
		<>
			<ToolbarButton
				checked={isChecked}
				disabled={state.isDisabled}
				isChevron={true}
				anchorName={indentationToolbarButtonAnchor}
				popoverTargetElementRef={popoverTargetElementRef}
			>
				<IndentationIcon />
			</ToolbarButton>
			<div
				ref={popoverTargetElementRef}
				popover="auto"
				className="absolute mt-1 max-h-80 flex-col rounded-md border border-slate-200 bg-white py-2 text-sm shadow-md [&:popover-open]:flex"
				style={{
					// @ts-ignore
					positionAnchor: indentationToolbarButtonAnchor,
					top: "anchor(bottom)",
					justifySelf: "anchor-center",
				}}
			>
				<ToolbarButton
					className="justify-center rounded-none px-1 py-0.5 font-semibold"
					onClick={() => onIndentationClick("remove")}
				>
					Remove
				</ToolbarButton>
				{sortedIndentations.map((indentation) => (
					<ToolbarButton
						key={indentation}
						className="rounded-none px-8 py-0.5 text-start font-semibold"
						onClick={() => onIndentationClick(indentation)}
					>
						<span
							style={{
								// @ts-ignore
								anchorScope: indentationDropdownAnchor,
								anchorName: indentationDropdownAnchor,
							}}
						>
							{indentation}
							{activeIndentations.includes(indentation) && (
								<span
									className="absolute"
									style={{
										// @ts-ignore
										positionAnchor: indentationDropdownAnchor,
										right: "calc(anchor(left) + 8px)",
										alignSelf: "anchor-center",
									}}
								>
									<CheckIcon size={0.6} />
								</span>
							)}
						</span>
					</ToolbarButton>
				))}
			</div>
		</>
	);
};
