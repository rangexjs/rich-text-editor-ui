import { useEffect, useRef, useState } from "react";

import { PrimaryButton } from "../../../PrimaryButton";
import { CodeBlockIcon } from "../../../SVGs";

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
	state,
}: CodeBlockToolbarButtonProps) => {
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
				disabled={state.isDisabled}
				isChevron={true}
				anchorName={codeBlockToolbarButtonAnchor}
				popoverTargetElementRef={popoverTargetElementRef}
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
						className="rounded-none px-2 text-sm"
						onClick={() => onLanguageClick(language)}
					>
						{language}
					</PrimaryButton>
				))}
			</div>
		</>
	);
};
