import type { TableCellPropertiesIconProps } from "./TableCellPropertiesIcon-types";

export const TableCellPropertiesIcon = ({
	size = 1,
}: TableCellPropertiesIconProps) => {
	return (
		<svg
			width={size * 18}
			height={size * 16}
			viewBox="0 0 18 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Table Cell Properties</title>
			<path
				d="M6.13134 12.9731H2.71045C1.76579 12.9731 1 12.2074 1 11.2627V2.71045C1 1.76579 1.76579 1 2.71045 1H12.9731C13.9178 1 14.6836 1.76579 14.6836 2.71045V4.42089"
				stroke="currentColor"
				strokeWidth="2"
			/>
			<path d="M1.85547 4.4209H15.539" stroke="currentColor" strokeWidth="2" />
			<path
				d="M1.85547 8.69702H6.13158"
				stroke="currentColor"
				strokeWidth="2"
			/>
			<path
				d="M8.30409 12.0942C8.01648 11.5772 8.01648 10.9482 8.30409 10.4312L8.88111 9.39405L9.49079 8.37582C9.79474 7.86825 10.3394 7.55378 10.931 7.54429L12.1177 7.52539L13.3044 7.54429C13.896 7.55378 14.4407 7.86825 14.7446 8.37582L15.3543 9.39405L15.9313 10.4312C16.2189 10.9482 16.2189 11.5772 15.9313 12.0942L15.3543 13.1314L14.7446 14.1496C14.4407 14.6572 13.896 14.9716 13.3044 14.9811L12.1177 15L10.931 14.9811C10.3394 14.9716 9.79474 14.6572 9.49079 14.1496L8.88111 13.1314L8.30409 12.0942Z"
				stroke="currentColor"
				strokeWidth="2"
			/>
			<path
				d="M12.1179 12.1179C12.5902 12.1179 12.9731 11.735 12.9731 11.2627C12.9731 10.7904 12.5902 10.4075 12.1179 10.4075C11.6456 10.4075 11.2627 10.7904 11.2627 11.2627C11.2627 11.735 11.6456 12.1179 12.1179 12.1179Z"
				fill="currentColor"
			/>
		</svg>
	);
};
