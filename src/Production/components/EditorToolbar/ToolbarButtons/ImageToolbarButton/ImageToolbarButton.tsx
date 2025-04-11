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

import { ToolbarDropdown, toolbarButtonClassName } from "../Utilities";

import type {
	ImageToolbarButtonProps,
	PopoverButtons,
} from "./ImageToolbarButton-types";

export const ImageToolbarButton = ({
	toolbarButtonsActionManager,
	nodeInsertionButtonsStateManager,
}: ImageToolbarButtonProps) => {
	const { image } = nodeInsertionButtonsStateManager;

	const [isChecked, setIsChecked] = useState(false);
	const [isDisabled, setIsDisabled] = useState(image.isDisabled);
	const [urlText, setURLText] = useState("");
	const popoverTargetElementRef = useRef<HTMLDivElement>(null);
	const inputFileRef = useRef<HTMLInputElement>(null);
	const imageUrlDialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		nodeInsertionButtonsStateManager.updateImageState = ({ isDisabled }) => {
			setIsDisabled(isDisabled);
		};
	}, [nodeInsertionButtonsStateManager]);

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
				disabled={isDisabled}
				isChevron={true}
				anchorName={imageToolbarButtonAnchor}
				popoverTargetElementRef={popoverTargetElementRef}
				className={toolbarButtonClassName}
			>
				<ImageIcon />
			</PrimaryButton>
			<ToolbarDropdown
				ref={popoverTargetElementRef}
				className="flex-col py-1 [&:popover-open]:flex"
			>
				{popoverButtons.map(({ children, onClick }, index) => (
					<PrimaryButton key={index} className="p-2 py-1.5" onClick={onClick}>
						<span className="inline-flex items-center gap-2 text-sm">
							{children}
						</span>
					</PrimaryButton>
				))}
			</ToolbarDropdown>
			<dialog
				ref={imageUrlDialogRef}
				className="w-[min(272px,100%)] rounded-md border border-slate-200 bg-white p-2 shadow-md"
			>
				<div className="flex items-center justify-between">
					<h2>Insert image via URL</h2>
					<button
						type="button"
						className="rounded-xs p-2 transition-colors hover:bg-slate-100"
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
						className="default-btn px-3 py-1"
						onClick={closeImageUrlDialog}
					>
						Cancel
					</button>
					<button
						type="button"
						className="highlighted-btn px-3 py-1"
						onClick={insertImageViaURL}
					>
						Insert
					</button>
				</div>
			</dialog>
		</>
	);
};
