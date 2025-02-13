import { useLayoutEffect, useState, useSyncExternalStore } from "react";

import {
	type OnPrimaryCharInputChangeFn,
	PrimaryCharInput,
} from "../../PrimaryCharInput";
import { EditIcon, TrashIcon } from "../../SVGs";
import { ToggleButton } from "../../ToggleButton";

import type { AnchorPopoverProps } from "./AnchorOverlay-types";

export const AnchorOverlay = ({ anchorOverlayStore }: AnchorPopoverProps) => {
	const anchorOverlayState = useSyncExternalStore(
		anchorOverlayStore.subscribe.bind(anchorOverlayStore),
		anchorOverlayStore.getSnapshot.bind(anchorOverlayStore),
	);

	const [layout, setLayout] = useState(anchorOverlayState.layout);
	const [url, setUrl] = useState(anchorOverlayState.url);
	const [isOpenNewTab, setIsOpenNewTab] = useState(
		anchorOverlayState.isOpenNewTab,
	);
	const [isDownloadable, setIsDownloadable] = useState(
		anchorOverlayState.isDownloadable,
	);

	useLayoutEffect(() => {
		setLayout(anchorOverlayState.layout);
		setUrl(anchorOverlayState.url);
		setIsOpenNewTab(anchorOverlayState.isOpenNewTab);
		setIsDownloadable(anchorOverlayState.isDownloadable);
	}, [anchorOverlayState]);

	const onEdit = () => {
		setLayout("edit");
	};

	const onUnlink = () => {
		anchorOverlayState.onAction({ type: "unlink" });
	};

	const onChange: OnPrimaryCharInputChangeFn = ({ value }) => {
		setUrl(value);
	};

	const toggleNewTab = () => {
		setIsOpenNewTab((prev) => !prev);
	};

	// const toggleDownloadable = () => {
	// 	setIsDownloadable((prev) => !prev);
	// };

	const onCancel = () => {
		anchorOverlayState.onAction({ type: "cancel" });
	};

	const onApply = () => {
		anchorOverlayState.onAction({
			type: "apply",
			url,
			isOpenNewTab,
			isDownloadable,
		});
	};

	const safeUrl = url.replaceAll(/^javascript:/g, "");

	return (
		<div className="w-60 p-3">
			<div
				className="flex items-center gap-1"
				style={{ display: layout === "default" ? "" : "none" }}
			>
				<span className="w-36 overflow-hidden text-ellipsis whitespace-nowrap text-blue-700 text-sm underline">
					<a href={safeUrl} target="_blank" rel="noreferrer" title={safeUrl}>
						{safeUrl}
					</a>
				</span>
				<span className="w-px shrink-0 self-stretch bg-slate-400" />
				<span className="inline-flex grow justify-around">
					<button type="button" className="default-btn p-1" onClick={onEdit}>
						<EditIcon />
					</button>
					<button type="button" className="default-btn p-1" onClick={onUnlink}>
						<TrashIcon />
					</button>
				</span>
			</div>
			<div style={{ display: layout === "edit" ? "" : "none" }}>
				<PrimaryCharInput
					className="mb-2 w-full"
					inputProps={{
						type: "text",
						value: url,
						onChange,
						placeholder: "https://example.com",
					}}
					title={"URL"}
				/>
				<div
					className="mb-1 flex cursor-pointer select-none justify-between"
					onClick={toggleNewTab}
				>
					<span className="text-sm">Open in new tab</span>
					<ToggleButton isChecked={isOpenNewTab} />
				</div>
				{/* <div
					className="flex cursor-pointer select-none justify-between"
					onClick={toggleDownloadable}
				>
					<span className="text-sm">Downloadable</span>
					<ToggleButton isChecked={isDownloadable} />
				</div> */}
				<div className="mt-3 flex justify-between gap-3">
					<button
						type="button"
						className="default-btn w-full py-1"
						onClick={onCancel}
					>
						Cancel
					</button>
					<button
						type="button"
						className="highlighted-btn w-full py-1"
						onClick={onApply}
					>
						Apply
					</button>
				</div>
			</div>
		</div>
	);
};
