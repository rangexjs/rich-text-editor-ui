import { Fragment } from "react";

import { buttonsName } from "@constants";

import {
	AnchorToolbarButton,
	BackgroundColorToolbarButton,
	BlockQuoteToolbarButton,
	BoldToolbarButton,
	CodeBlockToolbarButton,
	ColorToolbarButton,
	FontFamilyToolbarButton,
	FontSizeToolbarButton,
	HistoryBackToolbarButton,
	HistoryForwardToolbarButton,
	ImageToolbarButton,
	IndentationToolbarButton,
	ItalicToolbarButton,
	LetterSpacingToolbarButton,
	LineHeightToolbarButton,
	LineTagNameToolbarButton,
	ListToolbarButton,
	RemoveFormatToolbarButton,
	StrikethroughToolbarButton,
	TableToolbarButton,
	TextAlignToolbarButton,
	TodoListToolbarButton,
	UnderlineToolbarButton,
} from "./ToolbarButtons";

import type { EditorToolbarProps } from "./EditorToolbar-types";

export const EditorToolbar = ({
	toolbarRows,
	toolbarButtonsActionManager,
	formatLineTagNameButtonsState,
	formatStylesButtonsState,
	historyNavigationButtonsState,
	nodeInsertionButtonsState,
}: EditorToolbarProps) => {
	const { tagName } = formatLineTagNameButtonsState;

	const {
		backgroundColor,
		bold,
		color,
		fontFamily,
		fontSize,
		indentation,
		italic,
		letterSpacing,
		lineHeight,
		strikethrough,
		textAlign,
		underline,
	} = formatStylesButtonsState;

	const { historyBack, historyForward } = historyNavigationButtonsState;

	const { anchor, blockQuote, codeBlock, image, list, table, todoList } =
		nodeInsertionButtonsState;

	const toolbarButtonProps = toolbarRows.map((toolbarRow) =>
		toolbarRow.map((groups) =>
			groups.map((name) => {
				if (buttonsName.anchor === name) {
					return (
						<AnchorToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							state={anchor}
						/>
					);
				}

				if (buttonsName.backgroundColor === name) {
					return (
						<BackgroundColorToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							state={backgroundColor}
						/>
					);
				}

				if (buttonsName.blockQuote === name) {
					return (
						<BlockQuoteToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							state={blockQuote}
						/>
					);
				}

				if (buttonsName.bold === name) {
					return (
						<BoldToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							state={bold}
						/>
					);
				}

				if (buttonsName.codeBlock === name) {
					return (
						<CodeBlockToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							state={codeBlock}
						/>
					);
				}

				if (buttonsName.color === name) {
					return (
						<ColorToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							state={color}
						/>
					);
				}

				if (buttonsName.fontFamily === name) {
					return (
						<FontFamilyToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							state={fontFamily}
						/>
					);
				}

				if (buttonsName.fontSize === name) {
					return (
						<FontSizeToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							state={fontSize}
						/>
					);
				}

				if (buttonsName.historyBack === name) {
					return (
						<HistoryBackToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							state={historyBack}
						/>
					);
				}

				if (buttonsName.historyForward === name) {
					return (
						<HistoryForwardToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							state={historyForward}
						/>
					);
				}

				if (buttonsName.image === name) {
					return (
						<ImageToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							state={image}
						/>
					);
				}

				if (buttonsName.indentation === name) {
					return (
						<IndentationToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							state={indentation}
						/>
					);
				}

				if (buttonsName.italic === name) {
					return (
						<ItalicToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							state={italic}
						/>
					);
				}

				if (buttonsName.letterSpacing === name) {
					return (
						<LetterSpacingToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							state={letterSpacing}
						/>
					);
				}

				if (buttonsName.lineHeight === name) {
					return (
						<LineHeightToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							state={lineHeight}
						/>
					);
				}

				if (buttonsName.lineTagName === name) {
					return (
						<LineTagNameToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							state={tagName}
						/>
					);
				}

				if (buttonsName.list === name) {
					return (
						<ListToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							state={list}
						/>
					);
				}

				if (buttonsName.removeFormat === name) {
					return (
						<RemoveFormatToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							formattableButtonsState={formatStylesButtonsState}
						/>
					);
				}

				if (buttonsName.strikethrough === name) {
					return (
						<StrikethroughToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							states={{ strikethrough, underline }}
						/>
					);
				}

				if (buttonsName.table === name) {
					return (
						<TableToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							state={table}
						/>
					);
				}

				if (buttonsName.textAlign === name) {
					return (
						<TextAlignToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							state={textAlign}
						/>
					);
				}

				if (buttonsName.todoList === name) {
					return (
						<TodoListToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							state={todoList}
						/>
					);
				}

				if (buttonsName.underline === name) {
					return (
						<UnderlineToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							states={{ strikethrough, underline }}
						/>
					);
				}
			}),
		),
	);

	return (
		<div className="flex flex-col gap-1 border-slate-300 border-b p-2">
			{toolbarButtonProps.map((toolbarRow, rowIndex) => (
				<div key={rowIndex} className="flex flex-wrap gap-1.5">
					{toolbarRow.map((groups, groupIndex, { length }) => (
						<Fragment key={groupIndex}>
							<div className="inline-flex flex-wrap items-center gap-0.5">
								{groups.map((Button, buttonKey) => (
									<span key={buttonKey}>{Button}</span>
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
