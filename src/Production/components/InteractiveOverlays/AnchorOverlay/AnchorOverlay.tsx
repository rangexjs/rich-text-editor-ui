import { useEffect, useState } from "react";

import { interactiveOverlayId } from "@constants";

import {
	type OnPrimaryCharInputChangeFn,
	PrimaryCharInput,
} from "../../PrimaryCharInput";
import { EditIcon, TrashIcon } from "../../SVGs";
import { ToggleButton } from "../../ToggleButton";

import type {
	AnchorLayoutView,
	AnchorOverlayProps,
} from "./AnchorOverlay-types";

export const anchorLayoutViewOptions = {
	main: "main",
	edit: "edit",
} as const;

export const AnchorOverlay = ({ anchorOverlayManager }: AnchorOverlayProps) => {
	const [layoutView, setLayoutView] = useState(anchorOverlayManager.layoutView);

	const [textToDisplay, setTextToDisplay] = useState(
		anchorOverlayManager.textToDisplay,
	);

	const [url, setUrl] = useState(anchorOverlayManager.url);

	const [isOpenNewTab, setIsOpenNewTab] = useState(
		anchorOverlayManager.isOpenNewTab,
	);

	const [isDownloadable, setIsDownloadable] = useState(
		anchorOverlayManager.isDownloadable,
	);

	useEffect(() => {
		anchorOverlayManager.updateLayoutViewState = (layoutView) => {
			setLayoutView(layoutView);
		};

		anchorOverlayManager.updateTextToDisplayState = (textToDisplay) => {
			setTextToDisplay(textToDisplay);
		};

		anchorOverlayManager.updateUrlState = (url) => {
			setUrl(url);
		};

		anchorOverlayManager.updateIsOpenNewTabState = (isOpenNewTab) => {
			setIsOpenNewTab(isOpenNewTab);
		};

		anchorOverlayManager.updateIsDownloadableState = (isDownloadable) => {
			setIsDownloadable(isDownloadable);
		};
	}, [anchorOverlayManager]);

	const updateLayoutView = (layoutView: AnchorLayoutView) => {
		anchorOverlayManager.updateState({ layoutView });

		anchorOverlayManager.onActiveViewChange?.({ activeView: layoutView });
	};

	const onEdit = () => {
		updateLayoutView(anchorLayoutViewOptions.edit);
	};

	const onUnlink = () => {
		anchorOverlayManager.onAction?.({ type: "unlink" });

		updateLayoutView(anchorLayoutViewOptions.main);
	};

	const onTextToDisplayChange: OnPrimaryCharInputChangeFn = ({ value }) => {
		setTextToDisplay(value);
	};

	const onURLChange: OnPrimaryCharInputChangeFn = ({ value }) => {
		setUrl(value);
	};

	const toggleNewTab = () => {
		setIsOpenNewTab((prev) => !prev);
	};

	const toggleDownloadable = () => {
		setIsDownloadable((prev) => !prev);
	};

	const onCancel = () => {
		anchorOverlayManager.onAction?.({ type: "cancel" });

		updateLayoutView(anchorLayoutViewOptions.main);
	};

	const safeUrl = url.trim().replaceAll(/^javascript:/g, "");

	const onApply = () => {
		anchorOverlayManager.onAction?.({
			type: "apply",
			textToDisplay,
			url: safeUrl,
			isOpenNewTab,
			isDownloadable,
		});

		updateLayoutView(anchorLayoutViewOptions.main);
	};

	const shouldShowMain = layoutView === anchorLayoutViewOptions.main;

	const shouldShowEdit = layoutView === anchorLayoutViewOptions.edit;

	return (
		<div
			id={interactiveOverlayId.anchor}
			className="w-60 rounded-md border border-slate-200 bg-white p-3 shadow-md"
			popover="manual"
		>
			<div
				className="flex items-center gap-1"
				style={{
					display: shouldShowMain ? "" : "none",
				}}
			>
				<span className="w-36 overflow-hidden text-ellipsis whitespace-nowrap text-blue-700 text-sm underline">
					<a href={safeUrl} target="_blank" rel="noreferrer" title={safeUrl}>
						{textToDisplay || safeUrl}
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
			<div style={{ display: shouldShowEdit ? "" : "none" }}>
				<PrimaryCharInput
					className="mb-4 w-full"
					inputProps={{
						type: "text",
						value: textToDisplay,
						onChange: onTextToDisplayChange,
						placeholder: "Example website",
					}}
					title={"Text to display"}
				/>
				<PrimaryCharInput
					className="mb-2 w-full"
					inputProps={{
						type: "text",
						value: url,
						onChange: onURLChange,
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
				<div
					className="flex cursor-pointer select-none justify-between"
					onClick={toggleDownloadable}
				>
					<span className="text-sm">Downloadable</span>
					<ToggleButton isChecked={isDownloadable} />
				</div>
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
