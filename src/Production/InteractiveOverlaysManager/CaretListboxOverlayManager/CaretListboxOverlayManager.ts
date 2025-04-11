import type { MentionList, MentionSearch } from "@components";

import type {
	OnCaretListboxCloseFn,
	OnMatchedMentionListChangeFn,
	OnSelectedMentionFn,
	UpdateCaretListboxOverlayStateProps,
	UpdateMentionListStateFn,
	UpdateMentionSearchStateFn,
} from "./CaretListboxOverlayManager-types";

export class CaretListboxOverlayManager {
	#mentionSearch: MentionSearch = "";
	#mentionList: MentionList = [];

	get mentionSearch() {
		return this.#mentionSearch;
	}

	get mentionList() {
		return this.#mentionList;
	}

	updateMentionSearchState: UpdateMentionSearchStateFn | null = null;
	updateMentionListState: UpdateMentionListStateFn | null = null;

	onMatchedMentionListChange: OnMatchedMentionListChangeFn | null = null;
	onSelectedMention: OnSelectedMentionFn | null = null;
	onCaretListboxClose: OnCaretListboxCloseFn | null = null;

	updateState({
		mentionSearch,
		mentionList,
		onMatchedMentionListChange,
		onSelectedMention,
		onCaretListboxClose,
	}: UpdateCaretListboxOverlayStateProps) {
		if (mentionSearch !== undefined) {
			this.#mentionSearch = mentionSearch;
			this.updateMentionSearchState?.(mentionSearch);
		}

		if (mentionList) {
			this.#mentionList = mentionList;
			this.updateMentionListState?.(mentionList);
		}

		if (onMatchedMentionListChange !== undefined) {
			this.onMatchedMentionListChange = onMatchedMentionListChange;
		}

		if (onSelectedMention !== undefined) {
			this.onSelectedMention = onSelectedMention;
		}

		if (onCaretListboxClose !== undefined) {
			this.onCaretListboxClose = onCaretListboxClose;
		}
	}
}
