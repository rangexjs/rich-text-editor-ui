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

	const [selectedMentionIndex, setSelectedMentionIndex] = useState(0);

	const caretListboxOverlayRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		caretListboxOverlayManager.updateMentionSearchState = (mentionSearch) => {
			setMentionSearch(mentionSearch);
			setSelectedMentionIndex(0);
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

	const getMentionUserId = (userId: string) => `@${userId}`;

	const scrollToItem: ScrollToItemFn = (isActive) => (node) => {
		if (!(node && isActive)) {
			return;
		}

		node.scrollIntoView({ block: "nearest" });
	};

	const dataUserId = "data-user-id";
	const dataIsActive = "data-is-active";

	useEffect(() => {
		const caretListboxOverlay = caretListboxOverlayRef.current;

		if (!caretListboxOverlay) {
			return;
		}

		const getSelectedUserInfos = () => {
			const activeButton = caretListboxOverlay.querySelector<HTMLButtonElement>(
				`[${dataIsActive}="true"]`,
			);

			if (!activeButton) {
				throw new Error("ActiveButton can't be null.");
			}

			const userId = activeButton.getAttribute(dataUserId);

			if (userId === null) {
				throw new Error("UserId can't be null.");
			}

			const user = matchedMentionList.find((user) => user.userId === userId);

			if (!user) {
				throw new Error("User can't be undefined.");
			}

			const { userName } = user;

			return { userId, userName };
		};

		const manageKeyboardNavigation = (event: KeyboardEvent) => {
			const isOpen = caretListboxOverlay.matches(":popover-open");

			if (!isOpen) {
				return;
			}

			const { key, shiftKey } = event;

			if (
				key !== "Enter" &&
				key !== "ArrowUp" &&
				key !== "ArrowDown" &&
				key !== "Tab" &&
				key !== "Escape"
			) {
				return;
			}

			event.preventDefault();
			event.stopPropagation();

			if (key === "Enter") {
				const { userId, userName } = getSelectedUserInfos();

				caretListboxOverlayManager.onSelectedMention?.({ userId, userName });

				return;
			}

			const navigateBackward = () => {
				setSelectedMentionIndex(
					(prev) => (prev === 0 ? matchedMentionList.length : prev) - 1,
				);
			};

			const navigateForward = () => {
				setSelectedMentionIndex((selectedIndex) =>
					selectedIndex === matchedMentionList.length - 1
						? 0
						: selectedIndex + 1,
				);
			};

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

			if (key === "Escape") {
				caretListboxOverlayManager.onCaretListboxClose?.();

				return;
			}

			assertNever(key);
		};

		const abortController = new AbortController();

		const { signal } = abortController;

		document.addEventListener("keydown", manageKeyboardNavigation, {
			capture: true,
			signal,
		});

		return () => {
			abortController.abort();
		};
	}, [caretListboxOverlayManager, matchedMentionList]);

	return (
		<div
			ref={caretListboxOverlayRef}
			id={interactiveOverlayId.caretListbox}
			popover="manual"
			className="max-h-64 max-w-64 flex-col rounded-md py-2 shadow-md [&:popover-open]:flex"
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
						{...{ [dataUserId]: userId, [dataIsActive]: isActive }}
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
