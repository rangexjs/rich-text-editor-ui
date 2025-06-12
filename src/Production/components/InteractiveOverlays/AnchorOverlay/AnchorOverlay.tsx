import { useEffect, useRef, useState } from "react";

import { interactiveOverlayId } from "@constants";

import {
	type OnPrimaryCharInputChangeFn,
	PrimaryCharInput,
} from "../../PrimaryCharInput";
import { EditIcon, TrashIcon } from "../../SVGs";
import { ToggleButton } from "../../ToggleButton";

import type {
	AnchorInputValidity,
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

	const [initialFocusTarget, setInitialFocusTarget] = useState(
		anchorOverlayManager.initialFocusTarget,
	);

	const [isOpenNewTab, setIsOpenNewTab] = useState(
		anchorOverlayManager.isOpenNewTab,
	);

	const [isDownloadable, setIsDownloadable] = useState(
		anchorOverlayManager.isDownloadable,
	);

	const [inputValidity, setInputValidity] = useState<AnchorInputValidity>({
		url: true,
	});

	const [invalidURLMessage, setInvalidURLMessage] = useState("");

	const textToDisplayInputRef = useRef<HTMLInputElement>(null);

	const urlInputRef = useRef<HTMLInputElement>(null);

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

		anchorOverlayManager.updateInitialFocusTargetState = (
			initialFocusTarget,
		) => {
			setInitialFocusTarget(initialFocusTarget);
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
		setInputValidity((prev) => ({ ...prev, url: true }));

		setUrl(value);
	};

	const toggleNewTab = () => {
		setIsOpenNewTab((prev) => !prev);
	};

	const toggleDownloadable = () => {
		setIsDownloadable((prev) => !prev);
	};

	const onCancel = () => {
		setInputValidity({ url: true });

		updateLayoutView(anchorLayoutViewOptions.main);

		anchorOverlayManager.onAction?.({ type: "cancel" });
	};

	const isProtocolAllowed = (url: string) => {
		try {
			const parsedUrl = new URL(url, window.location.origin);

			const allowedProtocols = ["http:", "https:", "mailto:", "tel:"];

			return allowedProtocols.includes(parsedUrl.protocol);
		} catch {
			return false;
		}
	};

	const onApply = () => {
		const urlInput = urlInputRef.current;

		if (!urlInput) {
			throw new Error("URLInput can't be null.");
		}

		if (!url) {
			setInputValidity((prev) => ({ ...prev, url: false }));

			setInvalidURLMessage("URL can't be empty.");

			urlInput.focus();

			return;
		}

		if (!isProtocolAllowed(url)) {
			setInputValidity((prev) => ({ ...prev, url: false }));

			setInvalidURLMessage("Protocol is not allowed.");

			urlInput.focus();

			return;
		}

		anchorOverlayManager.onAction?.({
			type: "apply",
			textToDisplay,
			url,
			isOpenNewTab,
			isDownloadable,
		});

		updateLayoutView(anchorLayoutViewOptions.main);
	};

	const onPopoverToggle = (event: React.ToggleEvent) => {
		const { newState } = event;

		if (newState === "open") {
			if (initialFocusTarget === null) {
				return;
			}

			const input = {
				textToDisplay: textToDisplayInputRef.current,
				url: urlInputRef.current,
			}[initialFocusTarget];

			if (!input) {
				throw new Error("Input can't be null.");
			}

			input.focus();
		}

		if (newState === "closed") {
			setInputValidity({ url: true });

			anchorOverlayManager.onClose?.();
		}
	};

	const shouldShowMain = layoutView === anchorLayoutViewOptions.main;

	const shouldShowEdit = layoutView === anchorLayoutViewOptions.edit;

	return (
		<div
			id={interactiveOverlayId.anchor}
			className="w-60 rounded-md border border-slate-200 bg-white p-3 shadow-md"
			popover="auto"
			onToggle={onPopoverToggle}
		>
			<div
				className="flex items-center gap-1"
				style={{ display: shouldShowMain ? "" : "none" }}
			>
				<span className="w-36 overflow-hidden text-ellipsis whitespace-nowrap text-blue-700 text-sm underline">
					<a href={url} target="_blank" rel="noreferrer" title={url}>
						{url}
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
					inputRef={textToDisplayInputRef}
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
					inputRef={urlInputRef}
					className="mb-2 w-full"
					inputProps={{
						type: "text",
						value: url,
						onChange: onURLChange,
						placeholder: "https://example.com",
					}}
					title={"URL"}
					isInvalid={!inputValidity.url}
					invalidMessage={invalidURLMessage}
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
