import type { CSSProperties, ReactNode } from "react";

export type ComboBoxId = string;

export type ListItemOnClick = () => void;

export interface OnListItemClickProps {
	onClick: ListItemOnClick;
}

export interface ComboBoxListItem {
	id: ComboBoxId;
	children: ReactNode;
	onClick: ListItemOnClick;
}

export type ComboBoxList = ComboBoxListItem[];

export interface ComboBoxProps {
	buttonChildren: ReactNode;
	list: ComboBoxList;
	className?: string;
	buttonStyles?: CSSProperties;
}
