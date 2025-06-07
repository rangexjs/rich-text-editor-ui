import type { SVGImplementation } from "./Utilities";

export interface TableUpdateCellsIconProps extends SVGImplementation {}

export const TableUpdateCellsIcon = ({
	size = 1,
}: TableUpdateCellsIconProps) => {
	return (
		<svg
			width={size * 17}
			height={size * 16}
			viewBox="0 0 17 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Table Update Cells</title>
			<path
				d="M1.83333 5.16667H15.1667M5.16667 5.16667V14.3333M3.66667 14.3333H13.3333C14.2667 14.3333 14.7335 14.3333 15.09 14.1517C15.4036 13.9919 15.6586 13.7369 15.8183 13.4233C16 13.0668 16 12.6001 16 11.6667V3.66667C16 2.73325 16 2.26653 15.8183 1.91002C15.6586 1.59641 15.4036 1.34144 15.09 1.18166C14.7335 1 14.2667 1 13.3333 1H3.66667C2.73325 1 2.26653 1 1.91002 1.18166C1.59641 1.34144 1.34144 1.59641 1.18166 1.91002C1 2.26653 1 2.73324 1 3.66667V11.6667C1 12.6001 1 13.0668 1.18166 13.4233C1.34144 13.7369 1.59641 13.9919 1.91002 14.1517C2.26653 14.3333 2.73324 14.3333 3.66667 14.3333Z"
				stroke="black"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
};
