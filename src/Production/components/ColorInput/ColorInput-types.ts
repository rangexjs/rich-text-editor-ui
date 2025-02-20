import type { OnColorSelected } from "../ColorPanel";

export type GetValidInputHexProps = string | undefined;

export type GetValidInputHexReturn = string;

export interface ColorInputProps {
	color: string | undefined;
	className?: string;
	onColorSelected: OnColorSelected;
}
