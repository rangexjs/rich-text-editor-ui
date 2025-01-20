import { useEffect, useState, useSyncExternalStore } from "react";

import {
	type OnPrimaryCharInputChangeFn,
	PrimaryCharInput,
} from "../../PrimaryCharInput";
import { ToggleButton } from "../../ToggleButton";

import type { AnchorPopoverProps } from "./EditAnchorOverlay-types";

export const EditAnchorOverlay = ({
	editAnchorOverlayStore,
}: AnchorPopoverProps) => {
	const editAnchorOverlayState = useSyncExternalStore(
		editAnchorOverlayStore.subscribe.bind(editAnchorOverlayStore),
		editAnchorOverlayStore.getSnapshot.bind(editAnchorOverlayStore),
	);

	const [url, setUrl] = useState(editAnchorOverlayState.url);
	const [isOpenNewTab, setIsOpenNewTab] = useState(
		editAnchorOverlayState.isOpenNewTab,
	);
	const [isDownloadable, setIsDownloadable] = useState(
		editAnchorOverlayState.isDownloadable,
	);

	useEffect(() => {
		setUrl(editAnchorOverlayState.url);
		setIsOpenNewTab(editAnchorOverlayState.isOpenNewTab);
		setIsDownloadable(editAnchorOverlayState.isDownloadable);
	}, [editAnchorOverlayState]);

	const onChange: OnPrimaryCharInputChangeFn = ({ value }) => {
		setUrl(value);
	};

	const toggleNewTab = () => {
		setIsOpenNewTab((prev) => !prev);
	};

	const toggleDownloadable = () => {
		setIsDownloadable((prev) => !prev);
	};

	const onCancel = () => {
		editAnchorOverlayState.onAction({ type: "cancel" });
	};

	const onApply = () => {
		editAnchorOverlayState.onAction({
			type: "apply",
			url,
			isOpenNewTab,
			isDownloadable,
		});
	};

	return (
		<div className="w-52 p-2">
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
			<div
				className="flex cursor-pointer select-none justify-between"
				onClick={toggleDownloadable}
			>
				<span className="text-sm">Downloadable</span>
				<ToggleButton isChecked={isDownloadable} />
			</div>
			<div className="mt-3 flex justify-between gap-3">
				<button type="button" className="default-btn w-full" onClick={onCancel}>
					Cancel
				</button>
				<button
					type="button"
					className="highlighted-btn w-full"
					onClick={onApply}
				>
					Apply
				</button>
			</div>
		</div>
	);
};
