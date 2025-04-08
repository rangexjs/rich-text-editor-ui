import { useEffect, useRef, useState } from "react";

import { buttonsName } from "@constants";

import { PrimaryButton } from "../../../PrimaryButton";
import { SymbolIcon } from "../../../SVGs";

import { ToolbarDropdown, toolbarButtonClassName } from "../Utilities";

import { emojis } from "./SymbolsList";

import type { SymbolsToolbarButtonProps } from "./SymbolsToolbarButton-types";

export const SymbolsToolbarButton = ({
	toolbarButtonsActionManager,
	nodeInsertionButtonsStateManager,
}: SymbolsToolbarButtonProps) => {
	const { symbols } = nodeInsertionButtonsStateManager;

	const [isChecked, setIsChecked] = useState(false);
	const [isDisabled, setIsDisabled] = useState(symbols.isDisabled);

	const popoverTargetElementRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		nodeInsertionButtonsStateManager.updateListState = ({ isDisabled }) => {
			setIsDisabled(isDisabled);
		};
	}, [nodeInsertionButtonsStateManager]);

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

	const symbolsToolbarButtonAnchor = "--symbols-toolbar-button-anchor";

	const onEmojiClick = (emoji: string) => {
		const popoverTargetElement = popoverTargetElementRef.current;

		if (!popoverTargetElement) {
			throw new Error("PopoverTargetElement can't be null.");
		}

		popoverTargetElement.hidePopover();

		toolbarButtonsActionManager.onNodeInsertion?.({
			type: buttonsName.symbols,
			data: emoji,
		});
	};

	return (
		<>
			<PrimaryButton
				checked={isChecked}
				disabled={isDisabled}
				isChevron={true}
				anchorName={symbolsToolbarButtonAnchor}
				popoverTargetElementRef={popoverTargetElementRef}
				className={toolbarButtonClassName}
			>
				<SymbolIcon />
			</PrimaryButton>
			<ToolbarDropdown ref={popoverTargetElementRef} className="max-h-52">
				<div className="inline-grid grid-cols-8 gap-0.5 p-1">
					{emojis.map((emoji, index) => (
						<button
							key={index}
							type="button"
							className="rounded-xs border border-transparent text-xl hover:border-slate-200 hover:bg-slate-100"
							onClick={() => onEmojiClick(emoji)}
						>
							{emoji}
						</button>
					))}
				</div>
			</ToolbarDropdown>
		</>
	);
};
