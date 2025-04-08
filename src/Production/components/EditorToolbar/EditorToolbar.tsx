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
	IsTextAreaReadOnlyToolbarButton,
	ItalicToolbarButton,
	LetterSpacingToolbarButton,
	LineHeightToolbarButton,
	LineTagNameToolbarButton,
	ListToolbarButton,
	RemoveFormatToolbarButton,
	StrikethroughToolbarButton,
	SymbolsToolbarButton,
	TableToolbarButton,
	TextAlignToolbarButton,
	TodoListToolbarButton,
	UnderlineToolbarButton,
} from "./ToolbarButtons";

import type { EditorToolbarProps } from "./EditorToolbar-types";

export const EditorToolbar = ({
	toolbarRows,
	toolbarButtonsActionManager,
	formatLineTagNameButtonsStateManager,
	formatStylesButtonsStateManager,
	historyNavigationButtonsStateManager,
	nodeInsertionButtonsStateManager,
	nonCategorizedOperationButtonsStateManager,
}: EditorToolbarProps) => {
	const toolbarButtonProps = toolbarRows.map((toolbarRow) =>
		toolbarRow.map((groups) =>
			groups.map((name) => {
				if (buttonsName.anchor === name) {
					return (
						<AnchorToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							nodeInsertionButtonsStateManager={
								nodeInsertionButtonsStateManager
							}
						/>
					);
				}

				if (buttonsName.backgroundColor === name) {
					return (
						<BackgroundColorToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							formatStylesButtonsStateManager={formatStylesButtonsStateManager}
						/>
					);
				}

				if (buttonsName.blockQuote === name) {
					return (
						<BlockQuoteToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							nodeInsertionButtonsStateManager={
								nodeInsertionButtonsStateManager
							}
						/>
					);
				}

				if (buttonsName.bold === name) {
					return (
						<BoldToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							formatStylesButtonsStateManager={formatStylesButtonsStateManager}
						/>
					);
				}

				if (buttonsName.codeBlock === name) {
					return (
						<CodeBlockToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							nodeInsertionButtonsStateManager={
								nodeInsertionButtonsStateManager
							}
						/>
					);
				}

				if (buttonsName.color === name) {
					return (
						<ColorToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							formatStylesButtonsStateManager={formatStylesButtonsStateManager}
						/>
					);
				}

				if (buttonsName.fontFamily === name) {
					return (
						<FontFamilyToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							formatStylesButtonsStateManager={formatStylesButtonsStateManager}
						/>
					);
				}

				if (buttonsName.fontSize === name) {
					return (
						<FontSizeToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							formatStylesButtonsStateManager={formatStylesButtonsStateManager}
						/>
					);
				}

				if (buttonsName.historyBack === name) {
					return (
						<HistoryBackToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							historyNavigationStateManager={
								historyNavigationButtonsStateManager
							}
						/>
					);
				}

				if (buttonsName.historyForward === name) {
					return (
						<HistoryForwardToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							historyNavigationStateManager={
								historyNavigationButtonsStateManager
							}
						/>
					);
				}

				if (buttonsName.image === name) {
					return (
						<ImageToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							nodeInsertionButtonsStateManager={
								nodeInsertionButtonsStateManager
							}
						/>
					);
				}

				if (buttonsName.indentation === name) {
					return (
						<IndentationToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							formatStylesButtonsStateManager={formatStylesButtonsStateManager}
						/>
					);
				}

				if (buttonsName.isTextAreaReadOnly === name) {
					return (
						<IsTextAreaReadOnlyToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							nonCategorizedOperationButtonsStateManager={
								nonCategorizedOperationButtonsStateManager
							}
						/>
					);
				}

				if (buttonsName.italic === name) {
					return (
						<ItalicToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							formatStylesButtonsStateManager={formatStylesButtonsStateManager}
						/>
					);
				}

				if (buttonsName.letterSpacing === name) {
					return (
						<LetterSpacingToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							formatStylesButtonsStateManager={formatStylesButtonsStateManager}
						/>
					);
				}

				if (buttonsName.lineHeight === name) {
					return (
						<LineHeightToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							formatStylesButtonsStateManager={formatStylesButtonsStateManager}
						/>
					);
				}

				if (buttonsName.lineTagName === name) {
					return (
						<LineTagNameToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							formatLineTagNameButtonsStateManager={
								formatLineTagNameButtonsStateManager
							}
						/>
					);
				}

				if (buttonsName.list === name) {
					return (
						<ListToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							nodeInsertionButtonsStateManager={
								nodeInsertionButtonsStateManager
							}
						/>
					);
				}

				if (buttonsName.removeFormat === name) {
					return (
						<RemoveFormatToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							formatStylesButtonsStateManager={formatStylesButtonsStateManager}
						/>
					);
				}

				if (buttonsName.strikethrough === name) {
					return (
						<StrikethroughToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							formatStylesButtonsStateManager={formatStylesButtonsStateManager}
						/>
					);
				}

				if (buttonsName.symbols === name) {
					return (
						<SymbolsToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							nodeInsertionButtonsStateManager={
								nodeInsertionButtonsStateManager
							}
						/>
					);
				}

				if (buttonsName.table === name) {
					return (
						<TableToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							nodeInsertionButtonsStateManager={
								nodeInsertionButtonsStateManager
							}
						/>
					);
				}

				if (buttonsName.textAlign === name) {
					return (
						<TextAlignToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							formatStylesButtonsStateManager={formatStylesButtonsStateManager}
						/>
					);
				}

				if (buttonsName.todoList === name) {
					return (
						<TodoListToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							nodeInsertionButtonsStateManager={
								nodeInsertionButtonsStateManager
							}
						/>
					);
				}

				if (buttonsName.underline === name) {
					return (
						<UnderlineToolbarButton
							toolbarButtonsActionManager={toolbarButtonsActionManager}
							formatStylesButtonsStateManager={formatStylesButtonsStateManager}
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
								<span className="w-px shrink-0 bg-gray-300" />
							)}
						</Fragment>
					))}
				</div>
			))}
		</div>
	);
};
