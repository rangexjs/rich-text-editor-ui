import { useEffect, useRef, useState } from "react";

import { PrimaryButton } from "../../../PrimaryButton";
import { ListIcon } from "../../../SVGs";

import { ToolbarDropdown, toolbarButtonClassName } from "../Utilities";

import type {
	ListItemList,
	ListToolbarButtonProps,
	OnListButtonClickProps,
} from "./ListToolbarButton-types";

export const ListToolbarButton = ({
	toolbarButtonsActionManager,
	nodeInsertionButtonsStateManager,
}: ListToolbarButtonProps) => {
	const { list } = nodeInsertionButtonsStateManager;

	const [isChecked, setIsChecked] = useState(false);
	const [isDisabled, setIsDisabled] = useState(list.isDisabled);

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

	const listToolbarButtonAnchor = "--list-toolbar-button";

	const listItemList: ListItemList = ["circle", "decimal", "disc", "square"];

	const listItemLineHeight = 14;
	const listItemFillerHeight = 4;

	const onListButtonClick = (listStyleType: OnListButtonClickProps) => {
		const popoverTargetElement = popoverTargetElementRef.current;

		if (!popoverTargetElement) {
			throw new Error("PopoverTargetElement can't be null.");
		}

		popoverTargetElement.hidePopover();

		toolbarButtonsActionManager.onNodeInsertion?.({
			type: "list",
			listStyleType,
		});
	};

	return (
		<>
			<PrimaryButton
				checked={isChecked}
				disabled={isDisabled}
				isChevron={true}
				anchorName={listToolbarButtonAnchor}
				popoverTargetElementRef={popoverTargetElementRef}
				className={toolbarButtonClassName}
			>
				<ListIcon />
			</PrimaryButton>
			<ToolbarDropdown ref={popoverTargetElementRef} className="p-1">
				<div className="grid grid-cols-2 gap-1">
					{listItemList.map((type) => (
						<PrimaryButton
							key={type}
							onClick={() => onListButtonClick(type)}
							className="rounded p-1"
						>
							<ul className="px-1 ps-4">
								{Array.from({ length: 3 }, (_, i) => (
									<li
										className="text-sm"
										style={{
											lineHeight: `${listItemLineHeight}px`,
											listStyleType: type,
										}}
										key={i}
									>
										<span
											className="relative inline-block w-6 rounded-full bg-slate-300 align-top"
											style={{
												top: `${listItemLineHeight / 2 - listItemFillerHeight / 2}px`,
												height: listItemFillerHeight,
											}}
										/>
									</li>
								))}
							</ul>
						</PrimaryButton>
					))}
				</div>
			</ToolbarDropdown>
		</>
	);
};
