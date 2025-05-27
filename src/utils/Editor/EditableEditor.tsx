import { useEffect, useRef } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { HashtagPlugin } from "@lexical/react/LexicalHashtagPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { HeadingNode } from "@lexical/rich-text";
import { LinkNode } from "@lexical/link";
import { HashtagNode } from "@lexical/hashtag";
import { ListNode, ListItemNode } from "@lexical/list";
import { TableNode, TableCellNode, TableRowNode } from "@lexical/table";
import { EditorState, ParagraphNode, SerializedEditorState, SerializedLexicalNode, TextNode } from "lexical";
import { ImageNode } from "./nodes/ImageNode";
import Toolbar from "./Toolbar";

type SerializedLexicalEditorState = {
    root: {
        type: "root";
        children: SerializedLexicalNode[];
        direction: string;
        format: string;
        indent: number;
        version: number;
    };
};


// Props
type Props = {
    initialValue: SerializedLexicalEditorState;
    onChange: (newState: SerializedLexicalEditorState) => void;
};

// Optional type guard for safety
function isValidLexicalState(
    state: unknown
): state is SerializedEditorState {
    return (
        typeof state === "object" &&
        state !== null &&
        "root" in state &&
        typeof (state as SerializedEditorState).root.type === "string" &&
        (state as SerializedEditorState).root.type === "root" &&
        Array.isArray((state as SerializedEditorState).root.children)
    );
}

// EditorCore: handles plugins and state init
function EditorCore({ initialValue, onChange }: Props) {
    const [editor] = useLexicalComposerContext();
    const hasInitialized = useRef(false);

    useEffect(() => {
        if (hasInitialized.current) return;

        if (!isValidLexicalState(initialValue)) {
            console.warn("Invalid initialValue provided. Skipping state initialization.");
            return;
        }

        try {
            const newState = editor.parseEditorState(JSON.stringify(initialValue));
            editor.setEditorState(newState);
            editor.setEditable(true);
            hasInitialized.current = true;
        } catch (err) {
            console.error("Failed to parse editor state", err);
        }
    }, [editor, initialValue]);

    return (
        <>
            <Toolbar />
            <LinkPlugin />
            <HashtagPlugin />
            <RichTextPlugin
                contentEditable={
                    <ContentEditable className="min-h-[200px] border rounded p-2 focus:outline-1 focus:outline-blue-500" />
                }
                placeholder={<div className="text-gray-400">Enter content...</div>}
                ErrorBoundary={({ children }) => <>{children}</>}
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
            <ListPlugin />
            <TablePlugin />
            <OnChangePlugin
                onChange={(editorState: EditorState) => {
                    const json = editorState.toJSON() as SerializedLexicalEditorState;
                    onChange(json);
                }}
            />
        </>
    );
}

// Main Export
export default function EditableEditor({ initialValue, onChange }: Props) {
    const initialConfig = {
        namespace: "EditableEditor",
        theme: {},
        editorState: null, // set via useEffect in EditorCore
        nodes: [
            TextNode,
            ParagraphNode,
            HeadingNode,
            ListNode,
            ListItemNode,
            LinkNode,
            HashtagNode,
            TableNode,
            TableCellNode,
            TableRowNode,
            ImageNode,
        ],
        onError: (error: Error) => {
            console.error("Lexical error:", error);
        },
    };

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <EditorCore initialValue={initialValue} onChange={onChange} />
        </LexicalComposer>
    );
}
