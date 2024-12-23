import { useEffect, useRef, useState } from "react";

import { PrimaryButton } from "../../../PrimaryButton";
import {
	type OnPrimaryCharInputChangeFn,
	PrimaryCharInput,
} from "../../../PrimaryCharInput";
import {
	AnchorIcon,
	CloseIcon,
	ImageIcon,
	ImageUploadIcon,
} from "../../../SVGs";

import type {
	ImageToolbarButtonProps,
	PopoverButtons,
} from "./ImageToolbarButton-types";

export const ImageToolbarButton = ({
	toolbarButtonsActionManager,
	state,
}: ImageToolbarButtonProps) => {
	const [isChecked, setIsChecked] = useState(false);
	const [urlText, setURLText] = useState("");
	const popoverTargetElementRef = useRef<HTMLDivElement>(null);
	const inputFileRef = useRef<HTMLInputElement>(null);
	const imageUrlDialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const popoverTargetElement = popoverTargetElementRef.current;

		if (!popoverTargetElement) {
			return;
		}

		const onToggle = (event: ToggleEvent) => {
			const { newState } = event;

			if (newState === "open") {
				setIsChecked(true);
			}

			if (newState === "closed") {
				setIsChecked(false);
			}
		};

		// @ts-ignore
		popoverTargetElement.addEventListener("toggle", onToggle);

		return () => {
			// @ts-ignore
			popoverTargetElement.removeEventListener("toggle", onToggle);
		};
	}, []);

	useEffect(() => {
		const inputFile = inputFileRef.current;

		if (!inputFile) {
			return;
		}

		const onInputFileChange = () => {
			const { files } = inputFile;

			if (!files?.length) {
				return;
			}

			toolbarButtonsActionManager.onNodeInsertion?.({
				type: "image",
				insertionType: "file-upload",
				files,
			});
		};

		inputFile.addEventListener("change", onInputFileChange);

		return () => {
			inputFile.removeEventListener("change", onInputFileChange);
		};
	}, [toolbarButtonsActionManager]);

	const imageToolbarButtonAnchor = "--image-toolbar-button";

	const hidePopover = () => {
		const popoverTargetElement = popoverTargetElementRef.current;

		if (!popoverTargetElement) {
			throw new Error("PopoverTargetElement can't be null.");
		}

		popoverTargetElement.hidePopover();
	};

	const onUploadFromDeviceClick = () => {
		hidePopover();

		const inputFile = inputFileRef.current;

		if (!inputFile) {
			throw new Error("InputFile can't be null.");
		}

		inputFile.click();
	};

	const onUploadViaURLClick = () => {
		hidePopover();

		const imageUrlDialog = imageUrlDialogRef.current;

		if (!imageUrlDialog) {
			throw new Error("ImageUrlDialog can't be null.");
		}

		imageUrlDialog.showModal();
	};

	const closeImageUrlDialog = () => {
		const imageUrlDialog = imageUrlDialogRef.current;

		if (!imageUrlDialog) {
			throw new Error("ImageUrlDialog can't be null.");
		}

		imageUrlDialog.close();
	};

	const onUrlInputChange: OnPrimaryCharInputChangeFn = ({ value }) => {
		setURLText(value);
	};

	const insertImageViaURL = () => {
		closeImageUrlDialog();

		if (!urlText) {
			return;
		}

		toolbarButtonsActionManager.onNodeInsertion?.({
			type: "image",
			insertionType: "url",
			url: urlText,
		});
	};

	const popoverButtons: PopoverButtons = [
		{
			children: [
				<ImageUploadIcon key="image-icon" />,
				"Upload from device",
				<input
					key="input-file"
					ref={inputFileRef}
					type="file"
					className="hidden"
				/>,
			],
			onClick: onUploadFromDeviceClick,
		},
		{
			children: [<AnchorIcon key={"url"} />, "Upload via URL"],
			onClick: onUploadViaURLClick,
		},
	];

	return (
		<>
			<PrimaryButton
				checked={isChecked}
				disabled={state.isDisabled}
				isChevron={true}
				anchorName={imageToolbarButtonAnchor}
				popoverTargetElementRef={popoverTargetElementRef}
			>
				<ImageIcon />
			</PrimaryButton>
			<div
				ref={popoverTargetElementRef}
				popover="auto"
				className="absolute mt-1 flex-col rounded-md border border-slate-200 bg-white py-1 shadow-md [&:popover-open]:flex"
				style={{
					// @ts-ignore
					positionAnchor: imageToolbarButtonAnchor,
					top: "anchor(bottom)",
					justifySelf: "anchor-center",
				}}
			>
				{popoverButtons.map(({ children, onClick }, index) => (
					<PrimaryButton key={index} className="rounded-none" onClick={onClick}>
						<span className="inline-flex items-center gap-2 text-sm">
							{children}
						</span>
					</PrimaryButton>
				))}
			</div>
			<dialog
				ref={imageUrlDialogRef}
				className="w-[min(272px,100%)] rounded-md border border-slate-200 bg-white p-2 shadow-md"
			>
				<div className="flex items-center justify-between">
					<h2>Insert image via URL</h2>
					<button
						type="button"
						className="rounded-sm p-2 transition-colors hover:bg-slate-100"
						onClick={closeImageUrlDialog}
					>
						<CloseIcon size={0.7} />
					</button>
				</div>
				<hr className="my-3" />
				<PrimaryCharInput
					inputProps={{
						type: "text",
						value: urlText,
						onChange: onUrlInputChange,
						placeholder: "https://example.com/image.png",
						style: { width: "100%" },
					}}
					title="Width"
				/>
				<div className="mt-3 flex justify-end gap-3">
					<button
						type="button"
						className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1 font-semibold text-slate-600 text-sm transition-colors hover:border-slate-300 hover:bg-opacity-70"
						onClick={closeImageUrlDialog}
					>
						Cancel
					</button>
					<button
						type="button"
						className="rounded-md border border-primary border-opacity-40 bg-primary bg-opacity-10 px-3 py-1 font-semibold text-primary text-sm transition-colors hover:border-opacity-100"
						onClick={insertImageViaURL}
					>
						Insert
					</button>
				</div>
			</dialog>
		</>
	);
};
