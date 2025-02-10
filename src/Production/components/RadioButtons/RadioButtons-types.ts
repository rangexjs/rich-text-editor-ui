import type { ReactNode } from "react";

interface RadioButton {
	checked: boolean;
	children: ReactNode;
	onClick: () => void;
}

export type RadioButtonsList = RadioButton[];

export interface RadioButtonsProps {
	buttons: RadioButtonsList;
	className?: string;
}
