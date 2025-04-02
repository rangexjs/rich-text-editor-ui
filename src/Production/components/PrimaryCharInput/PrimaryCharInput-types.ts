import type { CSSProperties, RefObject } from "react";

export interface OnPrimaryCharInputChangeProps {
	value: string;
}

export type OnPrimaryCharInputChangeFn = (
	props: OnPrimaryCharInputChangeProps,
) => void;

export interface OnPrimaryCharFocusProps {
	event: React.FocusEvent;
}

export type OnPrimaryCharFocusFn = (props: OnPrimaryCharFocusProps) => void;

export interface OnPrimaryCharClickProps {
	event: React.MouseEvent;
}

export type OnPrimaryCharClickFn = (props: OnPrimaryCharClickProps) => void;

export interface InputProps {
	type: "text" | "number";
	value?: string;
	placeholder?: string;
	readOnly?: boolean;
	style?: CSSProperties;
	onChange?: OnPrimaryCharInputChangeFn;
	onClick?: OnPrimaryCharClickFn;
	onFocus?: OnPrimaryCharFocusFn;
}

export interface PrimaryCharInputProps {
	inputRef?: RefObject<HTMLInputElement | null>;
	inputProps: InputProps;
	title?: string;
	className?: string;
	isInvalid?: boolean;
	invalidMessage?: string;
}
