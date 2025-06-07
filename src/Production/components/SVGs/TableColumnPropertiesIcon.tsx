import type { SVGImplementation } from "./Utilities";

export interface TableColumnPropertiesIconProps extends SVGImplementation {}

export const TableColumnPropertiesIcon = ({
	size = 1,
}: TableColumnPropertiesIconProps) => {
	return (
		<svg
			width={size * 16}
			height={size * 16}
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Table Column Properties</title>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M0 1.5C0 0.672999 0.673 -8.34465e-07 1.5 -8.34465e-07H14.5C15.327 -8.34465e-07 16 0.672999 16 1.5V14.5C16 15.327 15.327 16 14.5 16H1.5C0.673 16 0 15.327 0 14.5L0 1.5ZM11 0.999999L11 5L15 5V1.5C15 1.225 14.775 0.999999 14.5 0.999999H11ZM11 6V10H15V6L11 6ZM11 11V15H14.5C14.775 15 15 14.775 15 14.5V11H11ZM1 1.5L1 5H5V0.999999H1.5C1.225 0.999999 1 1.225 1 1.5ZM1 6L1 10H5L5 6H1ZM1 11L1 14.5C1 14.775 1.225 15 1.5 15H5V11H1Z"
				fill="currentColor"
			/>
		</svg>
	);
};
