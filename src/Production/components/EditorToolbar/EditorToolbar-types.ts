import type { ToolbarButtonProps } from "../ToolbarButton";

type EditorToolbarRowGroup<ButtonProps = ToolbarButtonProps> = ButtonProps[];

type EditorToolbarRow<ButtonProps = ToolbarButtonProps> =
	EditorToolbarRowGroup<ButtonProps>[];

export type EditorToolbarRows<ButtonProps = ToolbarButtonProps> =
	EditorToolbarRow<ButtonProps>[];

export interface EditorToolbarProps {
	toolbarRows: EditorToolbarRows;
}
