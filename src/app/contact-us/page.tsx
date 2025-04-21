import ContactUs from "./ContactUs";

export const metadata = {
    title: "Contact Us",
    description:
        "Reach out to WeBrainTech for Web Development, Digital Marketing, and IT training Courses in Sikar. Contact us today for inquiries, quotes, or more information.",
    keywords: [
        "contact WeBrainTech",
        "WeBrainTech contact information",
        "contact IT Academy in Sikar",
        "contact digital marketing company Sikar",
        "get in touch with WeBrainTech",
    ],
    openGraph: {
        title: "About Webraintech Academy",
        description:
            "Webraintech Academy empowers students with career-focused training in Digital Marketing, AI, and more. Discover how we're shaping the future through education.",
        url: "https://webraintech.in/about-us",
        type: "website",
        images: [
            {
                url: "https://webraintech.in/faculty/founder.webp",
                width: 1200,
                height: 630,
                alt: "Webraintech Academy - Empowering Future Careers",
            },
        ],
    },
};

export default function Page() {
    return <ContactUs />
}