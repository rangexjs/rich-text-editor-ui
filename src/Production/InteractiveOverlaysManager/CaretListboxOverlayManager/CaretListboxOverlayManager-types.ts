import type { MentionList, MentionListItem, MentionSearch } from "@components";

// MentionSearch
export type UpdateMentionSearchStateProps = MentionSearch;

export type UpdateMentionSearchStateFn = (
	props: UpdateMentionSearchStateProps,
) => void;

// MentionList
export type UpdateMentionListStateProps = MentionList;

export type UpdateMentionListStateFn = (
	props: UpdateMentionListStateProps,
) => void;

export interface OnMatchedMentionListChangeProps {
	isEmpty: boolean;
}

export type OnMatchedMentionListChangeFn = (
	props: OnMatchedMentionListChangeProps,
) => void;

export interface OnSelectedMentionProps
	extends Pick<MentionListItem, "userId" | "userName"> {}

export type OnSelectedMentionFn = (props: OnSelectedMentionProps) => void;

export type OnCaretListboxCloseFn = () => void;

export interface CaretListboxOverlayState {
	mentionSearch: MentionSearch;
	mentionList: MentionList;
	onMatchedMentionListChange: OnMatchedMentionListChangeFn;
	onSelectedMention: OnSelectedMentionFn;
	onCaretListboxClose: OnCaretListboxCloseFn;
}

export interface UpdateCaretListboxOverlayStateProps
	extends Partial<CaretListboxOverlayState> {}
