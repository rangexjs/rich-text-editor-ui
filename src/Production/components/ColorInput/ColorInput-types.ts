import type { OnColorSelected } from "../ColorPanel";

export interface ColorInputProps {
	hex: string | null;
	className?: string;
	onColorSelected: OnColorSelected;
}
