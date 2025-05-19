
import { mergeRegister } from '@lexical/utils';
import { Button } from '@/components/ui/button';
import { TOGGLE_LINK_COMMAND } from '@lexical/link';
import { $setBlocksType } from '@lexical/selection';
import { Separator } from '@/components/ui/separator';
import { $createHeadingNode } from '@lexical/rich-text';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { $isListNode, INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, REMOVE_LIST_COMMAND } from '@lexical/list';
import { Bold, Heading1, Heading2, Italic, Link, List, ListOrdered, Redo, Strikethrough, Underline, Undo, Highlighter, Hash } from 'lucide-react';
import { $getSelection, $isRangeSelection, CAN_UNDO_COMMAND, CAN_REDO_COMMAND, FORMAT_TEXT_COMMAND, SELECTION_CHANGE_COMMAND, UNDO_COMMAND, REDO_COMMAND, $createParagraphNode, ParagraphNode } from 'lexical';

// const alignmentOptions = {
//     left: { label: 'Left Align', icon: <AlignLeft className="w-4 h-4" /> },
//     center: { label: 'Center Align', icon: <AlignCenter className="w-4 h-4" /> },
//     right: { label: 'Right Align', icon: <AlignRight className="w-4 h-4" /> },
//     justify: { label: 'Justify Align', icon: <AlignJustify className="w-4 h-4" /> },
// };

const headingOptions = {
    paragraph: { label: 'Normal', icon: null },
    h1: { label: 'Heading 1', icon: <Heading1 className="w-4 h-4" /> },
    h2: { label: 'Heading 2', icon: <Heading2 className="w-4 h-4" /> },
    // h3: { label: 'Heading 3', icon: <Heading3 className="w-4 h-4" /> },
};

const listTypes = [
    { value: 'bullet', label: 'Bullet List', icon: List },
    { value: 'number', label: 'Numbered List', icon: ListOrdered },
];

type TooltipButtonProps = {
    label: string;
    children: ReactNode;
    onClick?: () => void;
    variant?: 'outline' | 'secondary' | 'default';
    className?: string;
};

function TooltipButton({ label, children, onClick, variant = 'outline', className }: TooltipButtonProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button type="button" variant={variant} onClick={onClick} className={className}>
                        {children}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>{label}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}


export default function Toolbar() {
    const [editor] = useLexicalComposerContext();
    const toolbarRef = useRef(null);
    // const imageInputRef = useRef<HTMLInputElement>(null);

    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);
    const [isHighlighted, setIsHighlighted] = useState(false);
    // const [blockAlignment, setBlockAlignment] = useState<keyof typeof alignmentOptions | null>(null);
    const [headingSelect, setHeadingSelect] = useState<'paragraph' | 'h1' | 'h2'>('paragraph');
    const [listType, setListType] = useState<'bullet' | 'number' | null>(null);
    // const [rows, setRows] = useState('3');
    // const [columns, setColumns] = useState('3');
    // const [openDrawer, setOpenDrawer] = useState(false);

    const updateToolbar = useCallback(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            setIsBold(selection.hasFormat('bold'));
            setIsItalic(selection.hasFormat('italic'));
            setIsUnderline(selection.hasFormat('underline'));
            setIsStrikethrough(selection.hasFormat('strikethrough'));
            setIsHighlighted(selection.hasFormat('highlight'));

            const anchorNode = selection.anchor.getNode();
            const parent = anchorNode.getParent();

            if (parent !== null) {
                // const formatType = parent.getFormatType?.();
                // setBlockAlignment(formatType && formatType in alignmentOptions ? formatType as keyof typeof alignmentOptions : null);

                if ($isListNode(parent)) {
                    const tag = parent.getTag();
                    setListType(tag === 'ul' ? 'bullet' : tag === 'ol' ? 'number' : null);
                } else {
                    setListType(null);
                }
            }
        }
    }, []);

    const handleHeadingChange = (value: 'paragraph' | 'h1' | 'h2') => {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $setBlocksType(selection, value === 'paragraph' ? $createParagraphNode : (() => $createHeadingNode(value)) as unknown as () => ParagraphNode);
            }
        });
        setHeadingSelect(value);
    };

    const handleListChange = (type: 'bullet' | 'number' | null) => {
        setListType(type);
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                const command = type === 'bullet' ? INSERT_UNORDERED_LIST_COMMAND : type === 'number' ? INSERT_ORDERED_LIST_COMMAND : REMOVE_LIST_COMMAND;
                editor.dispatchCommand(command, undefined);
            }
        });
    };

    const toggleListType = (type: 'bullet' | 'number') => {
        handleListChange(listType === type ? null : type);
    };

    // const insertTable = () => {
    //     editor.dispatchCommand(INSERT_TABLE_COMMAND, {
    //         columns: columns,
    //         rows: rows,
    //         includeHeaders: true,
    //     });
    //     setOpenDrawer(false);
    // };

    // const removeTabel = () => {
    //     editor.update(() => {
    //         const selection = $getSelection();
    //         if (!$isRangeSelection(selection)) return;
    //         const tableNode = selection.getNodes().find((node) =>
    //             $isTableNode(node) || ($isElementNode(node.getParent()) && $isTableNode(node.getParent()))
    //         );

    //         const tableToRemove = $isTableNode(tableNode)
    //             ? tableNode
    //             : $isTableNode(tableNode?.getParent())
    //                 ? tableNode.getParent()
    //                 : null;

    //         if (tableToRemove && $isElementNode(tableToRemove)) {
    //             tableToRemove.remove();
    //         }
    //     });
    // };

    // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = () => {
    //             const url = reader.result as string;
    //             editor.update(() => {
    //                 const selection = $getSelection();
    //                 const imageNode = new ImageNode(url);
    //                 selection?.insertNodes([imageNode]);
    //             });
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    useEffect(() => {
        return mergeRegister(
            editor.registerUpdateListener(({ editorState, dirtyElements, dirtyLeaves }) => {
                editorState.read(updateToolbar);
                if (dirtyElements.size === 0 && dirtyLeaves.size === 0) return;
            }),
            editor.registerCommand(SELECTION_CHANGE_COMMAND, () => { updateToolbar(); return false; }, 1),
            editor.registerCommand(CAN_UNDO_COMMAND, (payload) => { setCanUndo(payload as boolean); return false; }, 1),
            editor.registerCommand(CAN_REDO_COMMAND, (payload) => { setCanRedo(payload as boolean); return false; }, 1),

        );
    }, [editor, updateToolbar]);

    return (
        <>
            <div ref={toolbarRef} className="flex items-center flex-wrap gap-2 border-b-[1px] pb-2.5 mb-2.5">
                <TooltipButton label="Undo" variant={canUndo ? 'secondary' : 'outline'} onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}> <Undo /></TooltipButton>
                <TooltipButton label="Redo" variant={canRedo ? 'secondary' : 'outline'} onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}><Redo /></TooltipButton>
                <Separator orientation="vertical" className="!h-[30px]" />
                <TooltipButton label="Bold" variant={isBold ? 'secondary' : 'outline'} onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}><Bold /></TooltipButton>
                <TooltipButton label="Italic" variant={isItalic ? 'secondary' : 'outline'} onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}><Italic /></TooltipButton>
                <TooltipButton label="UnderLine" variant={isUnderline ? 'secondary' : 'outline'} onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}><Underline /></TooltipButton>
                <TooltipButton label="Strike Through" variant={isStrikethrough ? 'secondary' : 'outline'} onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}><Strikethrough /></TooltipButton>
                <TooltipButton label="High Light" variant={isHighlighted ? 'secondary' : 'outline'} onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'highlight')}><Highlighter /></TooltipButton>
                <Separator orientation="vertical" className="!h-[30px]" />
                <Select value={headingSelect} onValueChange={(value) => handleHeadingChange(value as 'paragraph' | 'h1' | 'h2')}>
                    <SelectTrigger className="!w-[150px]">
                        <SelectValue placeholder="Select Heading" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(headingOptions).map(([key, { label, icon }]) => (
                            <SelectItem key={key} value={key} className="flex items-center gap-2">{icon}{label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={listType ?? ''} onValueChange={(value: 'bullet' | 'number') => toggleListType(value)}>
                    <SelectTrigger className="!w-[150px]">
                        <SelectValue placeholder="Select List" />
                    </SelectTrigger>
                    <SelectContent>
                        {listTypes.map(({ value, label, icon: Icon }) => (
                            <SelectItem key={value} value={value} className="flex items-center gap-2"><Icon className="w-4 h-4" />{label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {/* <Select value={blockAlignment ?? ''} onValueChange={(value: ElementFormatType) => {
                    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, value);
                    setBlockAlignment(value in alignmentOptions ? value as keyof typeof alignmentOptions : null);
                }}>
                    <SelectTrigger className="!w-[150px]">
                        <SelectValue placeholder="Select Align" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(alignmentOptions).map(([key, { label, icon }]) => (
                            <SelectItem key={key} value={key} className="flex items-center gap-2">{icon}{label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select> */}
                <Separator orientation="vertical" className="!h-[30px]" />
                <TooltipButton label="Link" variant="outline" onClick={() => {
                    const url = prompt('Enter the URL');
                    if (url) editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
                }}><Link /></TooltipButton>
                <TooltipButton label="Hastag" variant="outline" onClick={() => {
                    editor.update(() => {
                        const selection = $getSelection();
                        if ($isRangeSelection(selection)) {
                            selection.insertText('#');
                        }
                    });
                }}><Hash /></TooltipButton>
                {/* <TooltipButton label="Image" variant="outline" onClick={() => imageInputRef.current?.click()}><ImageIcon /></TooltipButton> */}
                {/* <TooltipButton label="Table" variant="outline" onClick={() => setOpenDrawer(true)}><Table /></TooltipButton>
                <TooltipButton label="Table Remove" variant="outline" onClick={removeTabel}><Grid2X2X /></TooltipButton> */}
            </div>

            {/* Hidden inputs for file selection */}
            {/* <input ref={imageInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} /> */}

            {/* <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Insert Table</DrawerTitle>
                    </DrawerHeader>
                    <div className="flex flex-col gap-4 px-4 pb-4">
                        <Input type="number" min="1" placeholder="Rows" value={rows} onChange={(e) => setRows(e.target.value)} />
                        <Input type="number" min="1" placeholder="Columns" value={columns} onChange={(e) => setColumns(e.target.value)} />
                        <DrawerFooter>
                            <Button onClick={insertTable}>Insert</Button>
                            <DrawerClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer> */}
        </>
    );
}
