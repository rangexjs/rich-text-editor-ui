import { buttonsName } from "@constants";

import {
	AnchorIcon,
	BackgroundColorIcon,
	BlockQuoteIcon,
	BoldIcon,
	CodeBlockIcon,
	ColorIcon,
	HistoryBackIcon,
	HistoryForwardIcon,
	ItalicIcon,
	StrikethroughIcon,
	UnderlineIcon,
} from "../../SVGs";
import type {
	ToolbarButtonOnClickFn,
	ToolbarButtonProps,
} from "../../ToolbarButton";

import type {
	CreateAnchorPropsProps,
	CreateBackgroundColorPropsProps,
	CreateBlockQuotePropsProps,
	CreateBoldPropsProps,
	CreateCodeBlockPropsProps,
	CreateColorPropsProps,
	CreateHistoryBackPropsProps,
	CreateItalicPropsProps,
	CreateStrikethroughPropsProps,
	CreateToolbarButtonPropsProps,
	CreateToolbarButtonPropsReturn,
	CreateUnderlinePropsProps,
} from "./CreateToolbarButtonProps-types";

const createAnchorProps = ({
	toolbarButtonsStateManager: _,
	state,
}: CreateAnchorPropsProps): ToolbarButtonProps => {
	// biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
	const onClick: ToolbarButtonOnClickFn = () => {};

	return {
		isChecked: false,
		isDisabled: state.isDisabled,
		isChevron: false,
		onClick,
		children: [<AnchorIcon key="anchor" />],
	};
};

const createBackgroundColorProps = ({
	toolbarButtonsStateManager: _,
	state,
}: CreateBackgroundColorPropsProps): ToolbarButtonProps => {
	// biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
	const onClick: ToolbarButtonOnClickFn = () => {};

	return {
		isChecked: false,
		isDisabled: state.isDisabled,
		isChevron: true,
		onClick,
		children: [<BackgroundColorIcon key="background-color" />],
	};
};

const createBlockQuoteProps = ({
	toolbarButtonsStateManager: _,
	state,
}: CreateBlockQuotePropsProps): ToolbarButtonProps => {
	// biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
	const onClick: ToolbarButtonOnClickFn = () => {};

	return {
		isChecked: false,
		isDisabled: state.isDisabled,
		isChevron: false,
		onClick,
		children: [<BlockQuoteIcon key="block-quote" />],
	};
};

const createBoldProps = ({
	toolbarButtonsStateManager: toolbarStateManager,
	state,
}: CreateBoldPropsProps): ToolbarButtonProps => {
	const onClick: ToolbarButtonOnClickFn = ({ isChecked }) => {
		const fontWeight = isChecked ? null : "bold";

		toolbarStateManager.onFormatStylesChange?.({ fontWeight });
	};

	return {
		isChecked: state.isChecked,
		isDisabled: state.isDisabled,
		isChevron: false,
		onClick,
		children: [<BoldIcon key="bold" />],
	};
};

const createCodeBlockProps = ({
	toolbarButtonsStateManager: _,
	state,
}: CreateCodeBlockPropsProps): ToolbarButtonProps => {
	// biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
	const onClick: ToolbarButtonOnClickFn = () => {};

	return {
		isChecked: false,
		isDisabled: state.isDisabled,
		isChevron: false,
		onClick,
		children: [<CodeBlockIcon key="code-block" />],
	};
};

const createColorProps = ({
	toolbarButtonsStateManager: _,
	state,
}: CreateColorPropsProps): ToolbarButtonProps => {
	// biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
	const onClick: ToolbarButtonOnClickFn = () => {};

	return {
		isChecked: false,
		isDisabled: state.isDisabled,
		isChevron: true,
		onClick,
		children: [<ColorIcon key="color" />],
	};
};

const createHistoryBackProps = ({
	toolbarButtonsStateManager: toolbarStateManager,
}: CreateHistoryBackPropsProps): ToolbarButtonProps => {
	const onClick: ToolbarButtonOnClickFn = () => {
		toolbarStateManager.onNavigationChange?.({ type: "history-back" });
	};

	return {
		isChecked: false,
		isDisabled: true,
		isChevron: false,
		onClick,
		children: [<HistoryBackIcon key="history-back" />],
	};
};

const createHistoryForwardProps = ({
	toolbarButtonsStateManager: toolbarStateManager,
}: CreateHistoryBackPropsProps): ToolbarButtonProps => {
	const onClick: ToolbarButtonOnClickFn = () => {
		toolbarStateManager.onNavigationChange?.({ type: "history-forward" });
	};

	return {
		isChecked: false,
		isDisabled: true,
		isChevron: false,
		onClick,
		children: [<HistoryForwardIcon key="history-forward" />],
	};
};

const createItalicProps = ({
	toolbarButtonsStateManager,
	state,
}: CreateItalicPropsProps): ToolbarButtonProps => {
	const onClick: ToolbarButtonOnClickFn = ({ isChecked }) => {
		const fontStyle = isChecked ? null : "italic";

		toolbarButtonsStateManager.onFormatStylesChange?.({ fontStyle });
	};

	return {
		isChecked: state.isChecked,
		isDisabled: state.isDisabled,
		isChevron: false,
		onClick,
		children: [<ItalicIcon key="italic" />],
	};
};

const createStrikethroughProps = ({
	toolbarButtonsStateManager,
	state,
}: CreateStrikethroughPropsProps): ToolbarButtonProps => {
	const onClick: ToolbarButtonOnClickFn = ({ isChecked }) => {
		const textDecoration = isChecked ? null : "line-through";

		toolbarButtonsStateManager.onFormatStylesChange?.({ textDecoration });
	};

	return {
		isChecked: state.isChecked,
		isDisabled: state.isDisabled,
		isChevron: false,
		onClick,
		children: [<StrikethroughIcon key="strikethrough" />],
	};
};

const createUnderlineProps = ({
	toolbarButtonsStateManager,
	state,
}: CreateUnderlinePropsProps): ToolbarButtonProps => {
	const onClick: ToolbarButtonOnClickFn = ({ isChecked }) => {
		const textDecoration = isChecked ? null : "underline";

		toolbarButtonsStateManager.onFormatStylesChange?.({ textDecoration });
	};

	return {
		isChecked: state.isChecked,
		isDisabled: state.isDisabled,
		isChevron: false,
		onClick,
		children: [<UnderlineIcon key="underline" />],
	};
};

export const createToolbarButtonProps = ({
	buttonName,
	toolbarButtonsStateManager,
	formattableButtons,
	insertionButtons,
	navigationButtons,
}: CreateToolbarButtonPropsProps): CreateToolbarButtonPropsReturn => {
	const { backgroundColor, bold, color, italic, strikethrough, underline } =
		formattableButtons;

	const { anchor, blockQuote, codeBlock } = insertionButtons;

	const { historyBack, historyForward } = navigationButtons;

	if (buttonName === buttonsName.anchor) {
		return createAnchorProps({ toolbarButtonsStateManager, state: anchor });
	}

	if (buttonName === buttonsName.backgroundColor) {
		return createBackgroundColorProps({
			toolbarButtonsStateManager,
			state: backgroundColor,
		});
	}

	if (buttonName === buttonsName.blockQuote) {
		return createBlockQuoteProps({
			toolbarButtonsStateManager,
			state: blockQuote,
		});
	}

	if (buttonName === buttonsName.bold) {
		return createBoldProps({
			toolbarButtonsStateManager,
			state: bold,
		});
	}

	if (buttonName === buttonsName.codeBlock) {
		return createCodeBlockProps({
			toolbarButtonsStateManager,
			state: codeBlock,
		});
	}

	if (buttonName === buttonsName.color) {
		return createColorProps({ toolbarButtonsStateManager, state: color });
	}

	if (buttonName === buttonsName.historyBack) {
		return createHistoryBackProps({
			toolbarButtonsStateManager,
			state: historyBack,
		});
	}

	if (buttonName === buttonsName.historyForward) {
		return createHistoryForwardProps({
			toolbarButtonsStateManager,
			state: historyForward,
		});
	}

	if (buttonName === buttonsName.italic) {
		return createItalicProps({ toolbarButtonsStateManager, state: italic });
	}

	if (buttonName === buttonsName.strikethrough) {
		return createStrikethroughProps({
			toolbarButtonsStateManager,
			state: strikethrough,
		});
	}

	if (buttonName === buttonsName.underline) {
		return createUnderlineProps({
			toolbarButtonsStateManager,
			state: underline,
		});
	}

	throw new Error("Every type has to be handled.");
};
