import type { CSSProperties } from "react";

export interface OnPrimaryCharInputChangeFnProps {
	value: string;
}

export type OnPrimaryCharInputChangeFn = (
	props: OnPrimaryCharInputChangeFnProps,
) => void;

export interface InputProps {
	type: "text" | "number";
	value?: string;
	placeholder?: string;
	style?: CSSProperties;
	onChange?: OnPrimaryCharInputChangeFn;
}

export interface PrimaryCharInputProps {
	inputProps: InputProps;
	title?: string;
	className?: string;
}
