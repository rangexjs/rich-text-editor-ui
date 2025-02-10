import { PrimaryButton } from "../PrimaryButton";

import type { RadioButtonsProps } from "./RadioButtons-types";

export const RadioButtons = ({ buttons, className }: RadioButtonsProps) => {
	return (
		<div className={`flex rounded-md border ${className}`}>
			{buttons.map(({ checked, children, onClick }, index) => (
				<PrimaryButton
					key={index}
					checked={checked}
					className="flex-grow justify-center"
					onClick={onClick}
				>
					{children}
				</PrimaryButton>
			))}
		</div>
	);
};
