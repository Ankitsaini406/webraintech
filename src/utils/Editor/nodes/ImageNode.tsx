// app/editor/nodes/ImageNode.ts
import { DecoratorNode, SerializedLexicalNode, Spread } from 'lexical';
import Image from 'next/image';
import * as React from 'react';

type ImageProps = {
    src: string;
    alt?: string;
};

function ImageComponent({ src, alt = '' }: ImageProps) {
    return (
        <div className='relative h-96 aspect-video'>
            <Image src={src} alt={alt} className="rounded" fill />;
        </div>
    )
}

export class ImageNode extends DecoratorNode<React.JSX.Element> {
    __src: string;

    static getType() {
        return 'image';
    }

    static clone(node: ImageNode) {
        return new ImageNode(node.__src, node.__key);
    }

    constructor(src: string, key?: string) {
        super(key);
        this.__src = src;
    }

    createDOM(): HTMLElement {
        return document.createElement('div');
    }

    updateDOM(): boolean {
        return false;
    }

    decorate(): React.JSX.Element {
        return <ImageComponent src={this.__src} />;
    }

    static importJSON(serializedNode: SerializedImageNode): ImageNode {
        return new ImageNode(serializedNode.src);
    }

    exportJSON(): SerializedImageNode {
        return {
            type: 'image',
            version: 1,
            src: this.__src,
        };
    }
}

type SerializedImageNode = Spread<
    {
        type: 'image';
        version: 1;
        src: string;
    },
    SerializedLexicalNode
>;
