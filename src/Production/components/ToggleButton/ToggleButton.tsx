import type { ToggleButtonProps } from "./ToggleButton-types";

export const ToggleButton = ({ isChecked, onClick }: ToggleButtonProps) => {
	const toggleButtonAnchor = "--toggle-button-anchor";

	const circleSize = 18;

	const leftPosition = isChecked
		? `calc(anchor(right) - ${circleSize * 0.8}px)`
		: `calc(anchor(left) - ${circleSize * 0.2}px)`;

	return (
		<button
			type="button"
			className="toggle-button"
			data-is-checked={isChecked}
			style={{
				// @ts-ignore
				anchorScope: toggleButtonAnchor,
				anchorName: toggleButtonAnchor,
			}}
			onClick={onClick}
		>
			<span
				data-is-checked={isChecked}
				style={{
					// @ts-ignore
					positionAnchor: toggleButtonAnchor,
					alignSelf: "anchor-center",
					width: `${circleSize}px`,
					height: `${circleSize}px`,
					left: leftPosition,
				}}
			/>
		</button>
	);
};
