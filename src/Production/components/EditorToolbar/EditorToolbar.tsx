import { Fragment } from "react";

import { ToolbarButton } from "../ToolbarButton";

import type { EditorToolbarProps } from "./EditorToolbar-types";

export const EditorToolbar = ({ toolbarRows }: EditorToolbarProps) => {
	return (
		<div className="flex flex-col gap-1 border-slate-300 border-b p-2">
			{toolbarRows.map((toolbarRow, rowIndex) => (
				<div key={rowIndex} className="flex flex-wrap gap-1.5">
					{toolbarRow.map((groups, groupIndex, { length }) => (
						<Fragment key={groupIndex}>
							<div className="inline-flex flex-wrap items-center gap-1">
								{groups.map((buttonProps, buttonKey) => (
									<ToolbarButton key={buttonKey} {...buttonProps} />
								))}
							</div>
							{groupIndex < length - 1 && (
								<span className="inline-block w-px shrink-0 bg-gray-300" />
							)}
						</Fragment>
					))}
				</div>
			))}
		</div>
	);
};
