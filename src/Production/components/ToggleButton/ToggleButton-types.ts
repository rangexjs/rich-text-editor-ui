export type OnToggleButtonClickFn = () => void;

export interface ToggleButtonProps {
	isChecked: boolean;
	onClick?: OnToggleButtonClickFn;
}
