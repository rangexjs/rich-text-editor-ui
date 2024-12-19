import { useEffect, useRef, useState } from "react";

import { PrimaryButton } from "../../../PrimaryButton";
import { CheckIcon, LetterSpacingIcon } from "../../../SVGs";

import type {
	LetterSpacingToolbarButtonProps,
	OnLetterSpacingClickProps,
} from "./LetterSpacingToolbarButton-types";

const letterSpacings = [
	-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10,
] as const;

export const LetterSpacingToolbarButton = ({
	toolbarButtonsActionManager,
	state,
}: LetterSpacingToolbarButtonProps) => {
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

	const letterSpacingToolbarButtonAnchor = "--letter-spacing-toolbar-button";

	const letterSpacingDropdownAnchor = "--letter-spacing-dropdown";

	const activeLetterSpacings = [...state.values].map((letterSpacing) =>
		Number.parseFloat(letterSpacing),
	);

	const commonLetterSpacings = [
		...new Set([...letterSpacings, ...activeLetterSpacings]),
	];

	const sortedLetterSpacings = commonLetterSpacings.sort((a, b) => a - b);

	const onLetterSpacingClick = (value: OnLetterSpacingClickProps) => {
		const popoverTargetElement = popoverTargetElementRef.current;

		if (!popoverTargetElement) {
			throw new Error("PopoverTargetElement can't be null.");
		}

		popoverTargetElement.hidePopover();

		if (value === "default") {
			toolbarButtonsActionManager.onFormatStylesChange?.({
				letterSpacing: null,
			});

			return;
		}

		const isActive = activeLetterSpacings.includes(value);

		if (!isActive || activeLetterSpacings.length > 1) {
			toolbarButtonsActionManager.onFormatStylesChange?.({
				letterSpacing: `${value}px`,
			});

			return;
		}

		toolbarButtonsActionManager.onFormatStylesChange?.({ letterSpacing: null });
	};

	return (
		<>
			<PrimaryButton
				checked={isChecked}
				disabled={state.isDisabled}
				isChevron={true}
				anchorName={letterSpacingToolbarButtonAnchor}
				popoverTargetElementRef={popoverTargetElementRef}
			>
				<LetterSpacingIcon />
			</PrimaryButton>
			<div
				ref={popoverTargetElementRef}
				popover="auto"
				className="absolute mt-1 max-h-80 flex-col rounded-md border border-slate-200 bg-white py-2 text-sm shadow-sm [&:popover-open]:flex"
				style={{
					// @ts-ignore
					positionAnchor: letterSpacingToolbarButtonAnchor,
					top: "anchor(bottom)",
					justifySelf: "anchor-center",
				}}
			>
				<PrimaryButton
					className="justify-center rounded-none px-1 py-0.5 font-semibold"
					onClick={() => onLetterSpacingClick("default")}
				>
					Default
				</PrimaryButton>
				{sortedLetterSpacings.map((letterSpacing) => (
					<PrimaryButton
						key={letterSpacing}
						className="rounded-none px-8 py-0.5 text-start font-semibold"
						onClick={() => onLetterSpacingClick(letterSpacing)}
					>
						<span
							style={{
								// @ts-ignore
								anchorScope: letterSpacingDropdownAnchor,
								anchorName: letterSpacingDropdownAnchor,
							}}
						>
							{letterSpacing}
							{activeLetterSpacings.includes(letterSpacing) && (
								<span
									className="absolute"
									style={{
										// @ts-ignore
										positionAnchor: letterSpacingDropdownAnchor,
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
			</div>
		</>
	);
};
