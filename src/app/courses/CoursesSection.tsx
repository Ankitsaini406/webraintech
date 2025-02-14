import { ButtonBlack } from "@/utils/Buttons";
import Image from "next/image";
import Link from "next/link";

export default function CoursesSection() {

    const enrollData = [
        {
            title: "Web Technology",
            slug: 'web-technology',
            description: "Our Web Technology course teaches front-end and back-end development with frameworks and databases, preparing students for careers as developers or designers.",
            images: '/courses/web-tech.webp',
        },
        {
            title: "AI Python",
            slug: 'ai-python',
            description: "The AI Python course covers Python programming, machine learning, deep learning, and data science, preparing students for careers in AI, data analysis, and development.",
            images: '/courses/ai-python.webp',
        },
        {
            title: "Ethical Hacking",
            slug: 'ethical-hacking',
            description: "Our Ethical Hacking course covers penetration testing, network security, and tools, preparing students for certifications like CEH and careers in cybersecurity.",
            images: '/courses/ethical-hacking.webp',
        },
        {
            title: "Digital Marketing",
            slug: 'digital-marketing',
            description: "The Digital Marketing course covers SEO, social media, PPC, content marketing, and analytics, preparing students for careers in digital marketing and campaign management.",
            images: '/courses/digital-marketing.webp',
        },
        {
            title: "Graphic Animation",
            slug: 'graphic-animation',
            description: "This course covers animation and VFX using Adobe Animate, After Effects, and Blender, preparing students for careers in animation, design, and multimedia.",
            images: '/courses/graphic-design.webp',
        },
        {
            title: "German Language",
            slug: 'german-language',
            description: "Our German Language course improves speaking, listening, reading, and writing skills, building grammar and vocabulary for careers in translation, teaching, and international business.",
            images: '/courses/german.webp',
        },
        {
            title: "Spoken English",
            slug: 'spoken-english',
            description: "This course improves speaking, listening, and conversational skills, enhancing pronunciation, vocabulary, and grammar for careers in teaching, customer service, and business.",
            images: '/courses/spoken-english.webp',
        },
    ]

    return (
        <div>

            <div className="container p-4 sm:p-8">
                <h1 className="font-bold text-xl sm:text-3xl pb-4">Courses</h1>
                <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        enrollData.map((item) => (
                            <div key={item.title} className="border flex-shrink-0 flex flex-col justify-between hover:bg-red-500 hover:text-white transition-all duration-300 p-4">
                                <div>
                                <div className="bg-gradient-to-b from-transparent to-black/30 aspect-square w-full overflow-hidden relative z-10">
                                    <Image className="object-cover h-full hover:scale-105 transition-transform duration-300" src={item.images} alt={item.images} width={720} height={300} />
                                </div>
                                <h3 className="py-2 sm:py-4 text-base sm:text-xl font-bold">{item.title}</h3>
                                <h4>{item.description}</h4>
                                </div>
                                <Link className="mt-4" href={`/courses/${item.slug}`}>
                                    <ButtonBlack title="View Course" />
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}