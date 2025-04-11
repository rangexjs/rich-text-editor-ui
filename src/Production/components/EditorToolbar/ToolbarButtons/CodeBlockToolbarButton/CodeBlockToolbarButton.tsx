import { useEffect, useRef, useState } from "react";

import { PrimaryButton } from "../../../PrimaryButton";
import { CodeBlockIcon } from "../../../SVGs";

import { toolbarButtonClassName } from "../Utilities";

import type {
	CodeBlockToolbarButtonProps,
	OnLanguageClickProps,
} from "./CodeBlockToolbarButton-types";

export const codeBlockLanguages = [
	"JavaScript",
	"TypeScript",
	"HTML",
	"CSS",
	"React",
	"Python",
	"Java",
	"C",
	"C++",
	"C#",
	"Rust",
	"Go",
	"Kotlin",
	"PHP",
	"Ruby",
	"Swift",
	"Dart",
	"SQL",
	"Bash",
	"Markdown",
] as const;

export const CodeBlockToolbarButton = ({
	toolbarButtonsActionManager,
	nodeInsertionButtonsStateManager,
}: CodeBlockToolbarButtonProps) => {
	const { codeBlock } = nodeInsertionButtonsStateManager;

	const [isChecked, setIsChecked] = useState(false);
	const [isDisabled, setIsDisabled] = useState(codeBlock.isDisabled);

	const popoverTargetElementRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		nodeInsertionButtonsStateManager.updateCodeBlockState = ({
			isDisabled,
		}) => {
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

	const codeBlockToolbarButtonAnchor = "--code-block-toolbar-button";

	const onLanguageClick = (language: OnLanguageClickProps) => {
		const popoverTargetElement = popoverTargetElementRef.current;

		if (!popoverTargetElement) {
			throw new Error("PopoverTargetElement can't be null.");
		}

		popoverTargetElement.hidePopover();

		toolbarButtonsActionManager.onNodeInsertion?.({
			type: "codeBlock",
			language,
		});
	};

	return (
		<>
			<PrimaryButton
				checked={isChecked}
				disabled={isDisabled}
				isChevron={true}
				anchorName={codeBlockToolbarButtonAnchor}
				popoverTargetElementRef={popoverTargetElementRef}
				className={toolbarButtonClassName}
			>
				<CodeBlockIcon />
			</PrimaryButton>
			<div
				ref={popoverTargetElementRef}
				popover="auto"
				className="absolute mt-1 max-h-80 flex-col rounded-md border border-slate-200 bg-white py-1 shadow-md [&:popover-open]:flex"
				style={{
					// @ts-ignore
					positionAnchor: codeBlockToolbarButtonAnchor,
					top: "anchor(bottom)",
					justifySelf: "anchor-center",
				}}
			>
				{codeBlockLanguages.map((language) => (
					<PrimaryButton
						key={language}
						className="px-2 py-1 text-sm"
						onClick={() => onLanguageClick(language)}
					>
						{language}
					</PrimaryButton>
				))}
			</div>
		</>
	);
};
