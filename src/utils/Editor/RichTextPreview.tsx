import Image from 'next/image';

interface LexicalNode {
    type: string;
    text?: string;
    format?: string | number;
    listType?: string;
    url?: string;
    children?: LexicalNode[];
    src?: string;
    alignment?: string;
    width?: number;
    height?: number;
}

const processChildren = (children: LexicalNode[], parentType?: string, parentCellIndex?: number): React.ReactNode[] => {
    return children.map((child, index) => {
        switch (child.type) {
            case 'paragraph': {
                const innerNodes = processChildren(child.children ?? [], child.type);
                return (
                    <p
                        key={index}
                        className={`mb-4 text-base ${child.alignment ? `text-${child.alignment}` : ''}`}
                    >
                        {innerNodes}
                    </p>
                );
            }
            case 'text': {
                const text = child.text || '';
                switch (child.format) {
                    case 1: return <strong key={index}>{text}</strong>;
                    case 2: return <em key={index}>{text}</em>;
                    case 4: return <u key={index}>{text}</u>;
                    case 8: return <del key={index}>{text}</del>;
                    case 129: return <mark key={index}>{text}</mark>;
                    default: return <span key={index}>{text}</span>;
                }
            }
            case 'hashtag':
                return (
                    <span key={index} className="text-blue-500 font-semibold cursor-pointer">
                        {child.text}
                    </span>
                );
            case 'h1':
                return <h1 key={index} className="text-4xl font-semibold mb-4">{processChildren(child.children ?? [], child.type)}</h1>;
            case 'h2':
                return <h2 key={index} className="text-3xl font-semibold mb-3">{processChildren(child.children ?? [], child.type)}</h2>;
            case 'list': {
                const ListTag = child.listType === 'bullet' ? 'ul' : 'ol';
                return (
                    <ListTag key={index} className={`pl-5 ${child.listType === 'bullet' ? 'list-disc' : 'list-decimal'} list-inside`}>
                        {processChildren(child.children ?? [], child.type)}
                    </ListTag>
                );
            }
            case 'listitem':
                return <li key={index} className="mb-2">{processChildren(child.children ?? [], child.type)}</li>;
            case 'link':
                return (
                    <a key={index} href={child.url} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                        {processChildren(child.children ?? [], child.type)}
                    </a>
                );
            case 'image':
                return (
                    <div key={index} className="my-4 relative w-full h-[400px] max-w-full">
                        <Image
                            src={child.src ?? ''}
                            alt={child.text ?? 'image'}
                            fill
                            sizes="(max-width: 768px) 100vw, 600px"
                            className="object-contain rounded"
                        />
                    </div>
                );
            case 'table': {
                const rows = child.children ?? [];
                const [headerRow, ...bodyRows] = rows;
                return (
                    <table key={index} className="table-auto w-full border-collapse border border-gray-300 my-4">
                        <thead className="bg-gray-100 text-gray-800 font-semibold">
                            {processChildren([headerRow], 'thead')}
                        </thead>
                        <tbody>{processChildren(bodyRows, 'tbody')}</tbody>
                    </table>
                );
            }
            case 'tablerow':
                return (
                    <tr key={index} className="border-b border-gray-200">
                        {(child.children ?? []).map((cell, cellIndex) =>
                            processChildren([cell], parentType, cellIndex)
                        )}
                    </tr>
                );
            case 'tablecell': {
                const CellTag = parentType === 'thead' ? 'th' : 'td';
                const isFirstColumn = parentCellIndex === 0;
                return (
                    <CellTag
                        key={index}
                        className={`p-2 border border-gray-300 text-left
            ${parentType === 'thead' ? 'bg-gray-100 text-gray-900 font-medium' : ''}
            ${isFirstColumn ? 'bg-blue-50 font-semibold' : ''}
            `}
                    >
                        {processChildren(child.children ?? [], child.type)}
                    </CellTag>
                );
            }
            default:
                return null;
        }
    });
};

export default function RichTextPreview({ lexicalJson }: { lexicalJson: { root: { children: LexicalNode[] } } }) {
    return <div className="border p-2">{processChildren(lexicalJson.root.children)}</div>;
}
