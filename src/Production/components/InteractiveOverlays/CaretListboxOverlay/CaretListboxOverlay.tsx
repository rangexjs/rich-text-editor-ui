import { useEffect, useRef, useState } from "react";

import { interactiveOverlayId } from "@constants";

import { assertNever } from "@errorHandling";
import type {
	CaretListboxOverlayProps,
	ScrollToItemFn,
} from "./CaretListboxOverlay-types";

export const CaretListboxOverlay = ({
	caretListboxOverlayManager,
}: CaretListboxOverlayProps) => {
	const [mentionSearch, setMentionSearch] = useState(
		caretListboxOverlayManager.mentionSearch,
	);

	const [mentionList, setMentionList] = useState(
		caretListboxOverlayManager.mentionList,
	);

	const [isOpen, setIsOpen] = useState(false);
	const [selectedMentionIndex, setSelectedMentionIndex] = useState(0);

	const caretListboxOverlayRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		caretListboxOverlayManager.updateMentionSearchState = (mentionSearch) => {
			setMentionSearch(mentionSearch);
		};

		caretListboxOverlayManager.updateMentionListState = (mentionList) => {
			setMentionList(mentionList);
		};
	}, [caretListboxOverlayManager]);

	// Should be "@"
	const mentionSearchFirstChar = mentionSearch.at(0);

	// Everything after "@"
	const mentionSearchUserId = mentionSearch.slice(1);

	const regex = new RegExp(mentionSearchUserId, "i");

	const matchedMentionList = mentionList.filter(({ userId }) => {
		// TODO: We should improve the filter in the future (via diffing algorithm?)

		if (mentionSearchFirstChar !== "@") {
			return false;
		}

		return regex.test(userId);
	});

	const isEmpty = !matchedMentionList.length;

	caretListboxOverlayManager.onMatchedMentionListChange?.({ isEmpty });

	const onPopoverToggle = (event: React.ToggleEvent) => {
		const { newState } = event;

		if (newState === "open") {
			setSelectedMentionIndex(0);
			setIsOpen(true);
		}

		if (newState === "closed") {
			setIsOpen(false);
		}
	};

	const getMentionUserId = (userId: string) => `@${userId}`;

	const scrollToItem: ScrollToItemFn = (isActive) => (node) => {
		if (!(node && isActive)) {
			return;
		}

		node.scrollIntoView({ block: "nearest" });
	};

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const abortController = new AbortController();

		const { signal } = abortController;

		const navigateBackward = () => {
			const updatedSelectedMentionIndex =
				(selectedMentionIndex === 0
					? matchedMentionList.length
					: selectedMentionIndex) - 1;

			setSelectedMentionIndex(updatedSelectedMentionIndex);
		};

		const navigateForward = () => {
			const updatedSelectedMentionIndex =
				selectedMentionIndex === matchedMentionList.length - 1
					? 0
					: selectedMentionIndex + 1;

			setSelectedMentionIndex(updatedSelectedMentionIndex);
		};

		const handleKeyboardNavigation = (event: KeyboardEvent) => {
			const { key, shiftKey } = event;

			if (
				key !== "Enter" &&
				key !== "ArrowUp" &&
				key !== "ArrowDown" &&
				key !== "Tab" &&
				key !== "Esc"
			) {
				return;
			}

			event.preventDefault();
			event.stopPropagation();

			if (key === "Enter") {
				const user = matchedMentionList.at(selectedMentionIndex);

				if (!user) {
					throw new Error("User can't be undefined.");
				}

				const { userId, userName } = user;

				caretListboxOverlayManager.onSelectedMention?.({ userId, userName });

				return;
			}

			if (key === "ArrowUp") {
				navigateBackward();

				return;
			}

			if (key === "Tab") {
				if (shiftKey) {
					navigateBackward();
				} else {
					navigateForward();
				}

				return;
			}

			if (key === "ArrowDown") {
				navigateForward();

				return;
			}

			if (key === "Esc") {
				caretListboxOverlayManager.onCaretListboxClose?.();

				return;
			}

			assertNever(key);
		};

		document.addEventListener("keydown", handleKeyboardNavigation, { signal });

		return () => {
			abortController.abort();
		};
	}, [
		isOpen,
		selectedMentionIndex,
		matchedMentionList,
		caretListboxOverlayManager,
	]);

	return (
		<div
			ref={caretListboxOverlayRef}
			id={interactiveOverlayId.caretListbox}
			popover="manual"
			className="max-h-64 max-w-64 flex-col rounded-md py-2 shadow-md [&:popover-open]:flex"
			onToggle={onPopoverToggle}
		>
			{/* biome-ignore lint/correctness/noUnusedVariables: <Explanation> */}
			{matchedMentionList.map(({ userId, userName, userImage }, index) => {
				const isActive = selectedMentionIndex === index;
				const buttonBackground = isActive
					? "bg-primary/10"
					: "hover:bg-slate-100";
				const userIdColor = isActive ? "text-primary" : "text-slate-900";
				const userNameColor = isActive ? "text-primary/80" : "text-slate-700";
				const mentionUserId = getMentionUserId(userId);

				return (
					<button
						key={userId}
						type="button"
						className={`inline-flex items-center gap-2 p-1 px-3 focus:outline-hidden ${buttonBackground}`}
						ref={scrollToItem(isActive)}
						onClick={() => {
							caretListboxOverlayManager.onSelectedMention?.({
								userId,
								userName,
							});
						}}
					>
						{/* Visualizes the image that will be implemented in the future */}
						<span className="inline-block size-6 shrink-0 rounded-full bg-slate-300" />
						<span className={`text-sm ${userIdColor}`} title={mentionUserId}>
							{mentionUserId}
						</span>
						<span
							className={`truncate text-xs ${userNameColor}`}
							title={userName}
						>
							{userName}
						</span>
					</button>
				);
			})}
		</div>
	);
};
