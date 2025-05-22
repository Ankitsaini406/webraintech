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

export type LexicalDescription = {
    root: {
        children: LexicalNode[];
    };
};

export interface Course {
    id: string;
    title: string;
    slug: string;
    image: string;
    bannerImage: string;
    intro: string;
    description: string;
    price: number;
    certification: string;
    introVideo?: string;
    thumbnail: string;
    isPublish: boolean;
    isDelete: boolean;
    teacher: {
        id: string;
        name: string;
        email: string;
        brief: string | null;
        phoneNumber: string;
    } | null;
    enrollments: {
        studentId: string
    }[];
    chapters: {
        id: string;
        title: string;
        description: LexicalDescription;
        videoUrl: string;
        duration: number;
        slug: string;
        order: number;
    }[];
    faqs: {
        id: string;
        question: string;
        answer: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
}

type PlacementFormData = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    website: string;
    linkedin: string;
    companyName: string;
    address: string;
};

export const initialPlacement: PlacementFormData = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    website: '',
    linkedin: '',
    companyName: '',
    address: '',
};