import { PrimaryButton } from "../PrimaryButton";

import type { RadioButtonsProps } from "./RadioButtons-types";

export const RadioButtons = ({ buttons, className }: RadioButtonsProps) => {
	return (
		<div className={`flex ${className}`}>
			{buttons.map(({ checked, children, onClick }, index) => (
				<PrimaryButton
					key={index}
					checked={checked}
					className="grow justify-center rounded-sm p-1.5"
					onClick={onClick}
				>
					{children}
				</PrimaryButton>
			))}
		</div>
	);
};
