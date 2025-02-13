import type { TableRowPropertiesIconProps } from "./TableRowPropertiesIcon-types";

export const TableRowPropertiesIcon = ({
	size = 1,
}: TableRowPropertiesIconProps) => {
	return (
		<svg
			width={size * 16}
			height={size * 16}
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Table Row Properties</title>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M14.5 0C15.327 0 16 0.673 16 1.5V14.5C16 15.327 15.327 16 14.5 16H1.5C0.673 16 0 15.327 0 14.5V1.5C0 0.673 0.673 0 1.5 0H14.5ZM15 11H11V15H14.5C14.775 15 15 14.775 15 14.5V11ZM10 11H6V15H10V11ZM5 11H1V14.5C1 14.775 1.225 15 1.5 15H5V11ZM14.5 1H11V5H15V1.5C15 1.225 14.775 1 14.5 1ZM10 1H6V5H10V1ZM5 1H1.5C1.225 1 1 1.225 1 1.5V5H5V1Z"
				fill="currentColor"
			/>
		</svg>
	);
};
