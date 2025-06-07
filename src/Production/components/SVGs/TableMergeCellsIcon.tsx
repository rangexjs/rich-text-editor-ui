import type { SVGImplementation } from "./Utilities";

export interface TableMergeCellsIconProps extends SVGImplementation {}

export const TableMergeCellsIcon = ({ size = 1 }: TableMergeCellsIconProps) => {
	return (
		<svg
			width={size * 16}
			height={size * 16}
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Table Merge Cells</title>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M14.5 0C15.327 0 16 0.673 16 1.5V14.5C16 15.327 15.327 16 14.5 16H1.5C0.673 16 0 15.327 0 14.5V1.5C0 0.673 0.673 0 1.5 0H14.5ZM15 5V1.5C15 1.225 14.775 1 14.5 1H11V5H15ZM15 13.875V6H6V15H13.875C14.4938 15 15 14.4938 15 13.875ZM6 5H10V1H6V5ZM5 5V1H1.5C1.225 1 1 1.225 1 1.5V5H5ZM1 10H5V6H1V10ZM5 15V11H1V14.5C1 14.775 1.225 15 1.5 15H5Z"
				fill="currentColor"
			/>
		</svg>
	);
};
