import Placement from "./Placement";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Placement & Career Opportunities',
    description: 'Manage job placements, career opportunities, and recruitment processes for WeBrainTech students and alumni.',
    keywords: [
        'job placement management',
        'career opportunities',
        'recruitment',
        'placement tracking',
        'WeBrainTech placements',
        'student careers',
        'job listings',
        'employment opportunities',
        'career management',
        'placement dashboard',
    ],
    authors: [{ name: 'WeBrainTech' }],
    creator: 'WeBrainTech',
    publisher: 'WeBrainTech',
    robots: {
        index: false,
        follow: false,
        nocache: true,
    },
};
export default async function Page() {
    return <Placement />;
}