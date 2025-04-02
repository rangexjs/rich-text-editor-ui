import { useSyncExternalStore } from "react";

import { interactiveOverlayId } from "@constants";
import {
	type AnchorLayoutView,
	anchorLayoutViewOptions,
} from "@externalStores";

import {
	type OnPrimaryCharInputChangeFn,
	PrimaryCharInput,
} from "../../PrimaryCharInput";
import { EditIcon, TrashIcon } from "../../SVGs";
import { ToggleButton } from "../../ToggleButton";

import type {
	AnchorPopoverProps,
	SetAnchorPropsFn,
} from "./AnchorOverlay-types";

export const AnchorOverlay = ({ anchorOverlayStore }: AnchorPopoverProps) => {
	const anchorOverlayState = useSyncExternalStore(
		anchorOverlayStore.subscribe.bind(anchorOverlayStore),
		anchorOverlayStore.getSnapshot.bind(anchorOverlayStore),
	);

	const { anchorProps, layoutView, onAction, onActiveViewChange } =
		anchorOverlayState;

	const updateLayoutView = (layoutView: AnchorLayoutView) => {
		anchorOverlayStore.updateState({ layoutView });

		onActiveViewChange({ activeView: layoutView });
	};

	const onEdit = () => {
		updateLayoutView(anchorLayoutViewOptions.edit);
	};

	const onUnlink = () => {
		onAction({ type: "unlink" });

		updateLayoutView(anchorLayoutViewOptions.main);
	};

	const setAnchorProps: SetAnchorPropsFn = (anchorProps) => {
		anchorOverlayStore.updateState({
			anchorProps: { ...anchorOverlayState.anchorProps, ...anchorProps },
		});
	};

	const onTextToDisplayChange: OnPrimaryCharInputChangeFn = ({ value }) => {
		setAnchorProps({ textToDisplay: value });
	};

	const onURLChange: OnPrimaryCharInputChangeFn = ({ value }) => {
		setAnchorProps({ url: value });
	};

	const toggleNewTab = () => {
		const { isOpenNewTab } = anchorProps;

		setAnchorProps({ isOpenNewTab: !isOpenNewTab });
	};

	const toggleDownloadable = () => {
		const { isDownloadable } = anchorProps;

		setAnchorProps({ isDownloadable: !isDownloadable });
	};

	const onCancel = () => {
		onAction({ type: "cancel" });

		updateLayoutView(anchorLayoutViewOptions.main);
	};

	const safeUrl = anchorProps.url.trim().replaceAll(/^javascript:/g, "");

	const onApply = () => {
		onAction({
			type: "apply",
			textToDisplay: anchorProps.textToDisplay,
			url: safeUrl,
			isOpenNewTab: anchorProps.isOpenNewTab,
			isDownloadable: anchorProps.isDownloadable,
		});

		updateLayoutView(anchorLayoutViewOptions.main);
	};

	const shouldShowMain = layoutView === anchorLayoutViewOptions.main;

	const shouldShowEdit = layoutView === anchorLayoutViewOptions.edit;

	return (
		<div
			id={interactiveOverlayId.anchor}
			className="w-60 bg-white p-3"
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
						{anchorProps.textToDisplay || safeUrl}
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
						value: anchorProps.textToDisplay,
						onChange: onTextToDisplayChange,
						placeholder: "Example website",
					}}
					title={"Text to display"}
				/>
				<PrimaryCharInput
					className="mb-2 w-full"
					inputProps={{
						type: "text",
						value: anchorProps.url,
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
					<ToggleButton isChecked={anchorProps.isOpenNewTab} />
				</div>
				<div
					className="flex cursor-pointer select-none justify-between"
					onClick={toggleDownloadable}
				>
					<span className="text-sm">Downloadable</span>
					<ToggleButton isChecked={anchorProps.isDownloadable} />
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
