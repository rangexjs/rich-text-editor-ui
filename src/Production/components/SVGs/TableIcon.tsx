import type { SVGImplementation } from "./Utilities";

export interface TableIconProps extends SVGImplementation {}

export const TableIcon = ({ size = 1 }: TableIconProps) => {
	return (
		<svg
			width={size * 18}
			height={size * 16}
			viewBox="0 0 18 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Table</title>
			<path
				d="M1 5.375H16.75M1 10.625H16.75M6.25 5.375V15M11.5 5.375V15M3.8 15H13.95C14.9301 15 15.4202 15 15.7945 14.8092C16.1238 14.6415 16.3916 14.3738 16.5592 14.0445C16.75 13.6702 16.75 13.1801 16.75 12.2V3.8C16.75 2.81992 16.75 2.32987 16.5592 1.95552C16.3916 1.62623 16.1238 1.35852 15.7945 1.19074C15.4202 1 14.9301 1 13.95 1H3.8C2.81991 1 2.32986 1 1.95552 1.19074C1.62623 1.35852 1.35851 1.62623 1.19074 1.95552C1 2.32987 1 2.81991 1 3.8V12.2C1 13.1801 1 13.6702 1.19074 14.0445C1.35851 14.3738 1.62623 14.6415 1.95552 14.8092C2.32986 15 2.8199 15 3.8 15Z"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
