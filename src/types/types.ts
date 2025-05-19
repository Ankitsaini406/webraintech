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

export const courseinitial = {
    title: "",
    image: "",
    bannerImage: "",
    intro: "",
    description: "",
    thumbnail: "",
    introVideo: "",
    price: 0,
    discount: 0,
    certification: "",
    chapters: [],
    faqs: [],
};

export interface CourseState {
    title: string;
    image: string;
    bannerImage: string;
    intro: string;
    description: string;
    thumbnail: string;
    introVideo: string;
    price: number;
    discount: number;
    certification: string;
    chapters: Chapter[];
    faqs: FAQ[];
}

export interface Chapter {
    title: string;
    description: { root: { children: LexicalNode[] } };
    videoUrl?: string;
    duration?: number;
}

export interface FAQ {
    question: string;
    answer: string;
}