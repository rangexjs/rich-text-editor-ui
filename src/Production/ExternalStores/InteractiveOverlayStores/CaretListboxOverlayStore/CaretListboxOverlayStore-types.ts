import type { MentionList, MentionListItem } from "@components";

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
	mentionSearch: string;
	mentionList: MentionList;
	onMatchedMentionListChange: OnMatchedMentionListChangeFn;
	onSelectedMention: OnSelectedMentionFn;
	onCaretListboxClose: OnCaretListboxCloseFn;
}
