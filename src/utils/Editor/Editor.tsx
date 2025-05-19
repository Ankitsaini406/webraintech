"use client";

import Toolbars from './Toolbar';
import { LinkNode } from '@lexical/link';
import { ImageNode } from './nodes/ImageNode';;
import { HashtagNode } from '@lexical/hashtag';
import { HeadingNode } from '@lexical/rich-text';
import { ListNode, ListItemNode } from '@lexical/list';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { TableNode, TableCellNode, TableRowNode } from '@lexical/table';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';

interface EditorProps {
    onChange?: (editorStateJSON: object) => void;
}

const theme = {
    ltr: 'ltr',
    rtl: 'rtl',
    paragraph: 'editor-paragraph',
    quote: 'editor-quote',
    heading: {
        h1: 'text-3xl',
        h2: 'text-2xl text-red-900',
        h3: 'text-xl',
        h4: 'editor-heading-h4',
        h5: 'editor-heading-h5',
        h6: 'editor-heading-h6',
    },
    list: {
        nested: {
            listitem: 'editor-nested-listitem',
        },
        ol: 'list-decimal ml-4',
        ul: 'list-disc ml-4',
        listitem: 'editor-listItem',
        listitemChecked: 'editor-listItemChecked',
        listitemUnchecked: 'editor-listItemUnchecked',
    },
    hashtag: 'text-blue-500 cursor-pointer bg-gray-100',
    image: 'editor-image',
    link: 'text-blue-500 underline cursor-pointer',
    text: {
        bold: 'bold',
        code: 'editor-textCode',
        italic: 'italic',
        strikethrough: 'line-through',
        subscript: 'editor-textSubscript',
        superscript: 'editor-textSuperscript',
        underline: 'underline',
        underlineStrikethrough: 'underline line-through',
    },
    code: 'editor-code',
    codeHighlight: {
        atrule: 'editor-tokenAttr',
        attr: 'editor-tokenAttr',
        boolean: 'editor-tokenProperty',
        builtin: 'editor-tokenSelector',
        cdata: 'editor-tokenComment',
        char: 'editor-tokenSelector',
        class: 'editor-tokenFunction',
        'class-name': 'editor-tokenFunction',
        comment: 'editor-tokenComment',
        constant: 'editor-tokenProperty',
        deleted: 'editor-tokenProperty',
        doctype: 'editor-tokenComment',
        entity: 'editor-tokenOperator',
        function: 'editor-tokenFunction',
        important: 'editor-tokenVariable',
        inserted: 'editor-tokenSelector',
        keyword: 'editor-tokenAttr',
        namespace: 'editor-tokenVariable',
        number: 'editor-tokenProperty',
        operator: 'editor-tokenOperator',
        prolog: 'editor-tokenComment',
        property: 'editor-tokenProperty',
        punctuation: 'editor-tokenPunctuation',
        regex: 'editor-tokenVariable',
        selector: 'editor-tokenSelector',
        string: 'editor-tokenSelector',
        symbol: 'editor-tokenProperty',
        tag: 'editor-tokenProperty',
        url: 'editor-tokenOperator',
        variable: 'editor-tokenVariable',
    },
};

function onError(error: unknown) {
    console.error(error);
}

export default function Editor({ onChange }: EditorProps) {
    const initialConfig: import('@lexical/react/LexicalComposer').InitialConfigType = {
        namespace: 'MyEditor',
        theme: theme,
        onError,
        nodes: [HeadingNode, ListItemNode, ListNode, HashtagNode, LinkNode, TableNode, TableCellNode, TableRowNode, ImageNode],
    };

    const handleChange = (editorState: import('lexical').EditorState) => {
        const editorStateJSON = editorState.toJSON();
        onChange?.(editorStateJSON);
    };

    return (
        <div className='mx-auto rounded-lg p-5 bg-white border'>
            <LexicalComposer initialConfig={initialConfig}>
                <Toolbars />
                <LinkPlugin />
                <HashtagPlugin />
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable className='focus:outline-none' />
                    }
                    placeholder={<div className='text-gray-500'>Enter some text...</div>}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin />
                <AutoFocusPlugin />
                <ListPlugin />
                <TablePlugin />
                <OnChangePlugin onChange={handleChange} />
            </LexicalComposer>
        </div>
    );
}