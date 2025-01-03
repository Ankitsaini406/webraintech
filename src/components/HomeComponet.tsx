import { ButtonBlack, ButtonLink, ButtonWhite } from "@/utils/Buttons";
import Image from "next/image";

export function Enroll() {

    const enrollData = [
        {
            title: "Accessing Course Content Made Easy",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
            images: '/images/study_3.png',
        },
        {
            title: "Stay Engaged with Interactive Learning",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
            images: '/images/study_2.png',
        },
        {
            title: "Support at Every Step of Your Journey",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
            images: '/images/study.png',
        },
        {
            title: "Medium length section heading goes here",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
            images: '/images/study_4.png',
        },
    ]

    return (
        <div className="my-7 p-4 sm:p-8 bg-gray-100 dark:bg-zinc-800">
            <div className="container">
                <p className="pb-6 text-red-500">Enroll</p>
                <h1 className="text-4xl sm:text-5xl font-bold mb-6 sm:w-full">Simple Steps to Enroll in Courses</h1>
                <h2 className="w-full sm:w-3/4 xl:w-1/2 pb-8">Enrolling in our courses is a straightforward process. Just choose your desired course, complete the registration, and start learning immediately.</h2>

                {/* Card Items */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pb-10">
                    {
                        enrollData.map((item) => (
                            <div key={item.title} className="flex flex-col items-center sm:items-start cursor-pointer hover:bg-red-500 hover:text-white transition-all duration-300 p-4">

                                <div className="bg-gradient-to-b from-transparent to-black/30 aspect-square w-full sm:w-40 lg:w-full overflow-hidden relative z-10">
                                    <Image className="object-cover h-full hover:scale-105 transition-transform duration-300" src={item.images} alt={item.images} width={720} height={300} />
                                </div>
                                <h3 className="py-2 sm:py-4 text-base sm:text-xl font-bold">{item.title}</h3>
                                <h4>{item.description}</h4>
                            </div>
                        ))
                    }
                </div>

                <div className="flex gap-8 items-center">
                    <ButtonWhite title="Learn More" />
                    <ButtonLink title="Sign Up" />
                </div>
            </div>
        </div>
    )
}

export function FeatureSection() {

    return (
        <div className="container my-7 p-4 sm:p-8 flex flex-col-reverse sm:flex-row gap-4">
            <div className="flex flex-col gap-4 w-full">
                <p className="text-red-500">A Vision for Next-Gen</p>
                <h2 className="text-4xl sm:text-5xl font-bold mb-6">Medium length section heading goes here</h2>
                <p className="pb-0 sm:pb-4">Our courses are designed to equip you with practical skills and knowledge. Whether you are a beginner or looking to advance, we have something for everyone.</p>
                <ul className="list-disc counter-reset list-counter pl-8 sm:pl-6">
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                </ul>
            </div>
            <div className="border bg-gradient-to-b from-transparent to-black/30 aspect-video w-full overflow-hidden relative z-10">
                <Image className="object-cover w-full h-full hover:scale-105 transition-transform duration-300" src='/images/front_image.jpg' alt="cta" width={1500} height={900} />
            </div>
        </div>
    )
}

export function FeatureListSection() {
    return (
        <div className="container relative my-7 h-auto">
            {/* Background Image */}
            <div className="absolute inset-0 bg-cover bg-center">
                <video autoPlay muted loop playsInline>
                    <source src="/video/potential.mp4" type="video/mp4" />
                </video>
            </div>
            <div className=" container bg-gradient-to-b from-transparent to-black/30 aspect-video w-full">

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60"></div>

                {/* Text Content */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4 text-center">
                    <h1 className="container text-2xl sm:text-4xl xl:text-5xl font-bold mb-4 w-full">Unlock Your Potential with Our Expert-Led Courses and Flexible Learning Options</h1>
                </div>
            </div>
        </div>
    )
}

export function CtaSection() {
    return (
        <div className="container border border-black dark:border-white m-auto my-8 w-4/5 flex flex-col sm:flex-row justify-between">
            <div className="p-4 sm:p-8">
                <h2 className="text-2xl sm:text-5xl pb-4 sm:pb-8 font-bold">Discover Your Next Course</h2>
                <h4>Explore our diverse course offerings and find the perfect fit for your learning journey.</h4>
                <div className="flex gap-4 sm:gap-8 pt-4 sm:pt-8 flex-wrap">
                    <ButtonBlack title="Enroll" />
                    <ButtonWhite title="Learn More" />
                </div>
            </div>
            <div className="bg-gradient-to-b from-transparent to-black/30 w-full xl:h-96 sm:w-1/2 overflow-hidden relative z-10">
                <Image className="object-cover h-full hover:scale-105 transition-transform duration-300" src='/images/code.png' alt="cta" width={720} height={300} />
            </div>
        </div>
    )
}

export function BlogSection() {

    const blogPosts = [
        {
            title: "Unlocking Potential Through Education",
            description: "Discover how education transforms lives and careers.",
            images: '/blog/books.png',
            categorie: 'Education',
            time: '5 min read',
        },
        {
            title: "Unlocking Potential Through Education",
            description: "Discover how education transforms lives and careers.",
            images: '/blog/success.png',
            categorie: 'Success',
            time: '5 min read',
        },
        {
            title: "Unlocking Potential Through Education",
            description: "Discover how education transforms lives and careers.",
            images: '/blog/update.png',
            categorie: 'Upadate',
            time: '5 min read',
        },
    ]

    return (
        <div className="container p-4 sm:p-8">
            <div className="flex flex-col gap-4 sm:gap-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-0 md:items-end pb-4 sm:pb-8">
                    <div>
                        <p className="text-red-500 pb-4 sm:pb-8">Blog</p>
                        <h3 className="text-2xl sm:text-5xl pb-2 sm:pb-6 font-bold">Insights and Inspirations</h3>
                        <p>Explore our latest articles and success stories.</p>
                    </div>
                    <ButtonWhite title="View all" />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                    {
                        blogPosts.map((blog, index) => {
                            return (
                                <div key={index} className="block cursor-pointer w-full hover:text-red-500 transition-all duration-300">
                                    <div>
                                        <div className="bg-gradient-to-b from-transparent to-black/30 mb-4 overflow-hidden relative z-10">
                                            <Image className="h-60 w-full object-cover hover:scale-105 transition-transform duration-300" src={blog.images} alt={blog.title} width={500} height={400} />
                                        </div>
                                        <div className="flex flex-row gap-4 sm:gap-8 items-center mb-2">
                                            <h5 className="bg-gray-200 p-1 text-black text-sm">{blog.categorie}</h5>
                                            <p className="text-sm">{blog.time}</p>
                                        </div>
                                        <h4 className="font-bold text-base sm:text-lg pb-3">{blog.title}</h4>
                                        <p className="text-sm pb-2">{blog.description}</p>
                                        <ButtonLink title="Read more" />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export function CourseSection() {
    return (
        <div className="container p-4 sm:p-8">
            <p className="text-red-500 text-center pb-4 sm:pb-8">Courses</p>
            <h3 className="text-center text-2xl sm:text-5xl pb-4 sm:pb-8 font-bold">Explore Our Course Offerings</h3>
            <p className="text-center pb-4 sm:pb-8">Diverse course tailored for every learner&#39;s needs.</p>

            <div className="flex flex-col md:flex-row gap-4 sm:gap-6 justify-center">

                <div className="flex flex-col justify-between gap-4 lg:flex-row">
                    <div className="group relative border border-black hover:border-red-500 hover:dark:border-red-500 dark:border-white p-2 sm:p-4 flex flex-col justify-between gap-10 overflow-hidden">
                        <div className="absolute -inset-1 -translate-x-full group-hover:translate-x-0 bg-red-500 transition-transform duration-300"></div>

                        <div className="relative z-10">
                            <h4 className="font-bold text-lg sm:text-xl group-hover:text-white transition-colors duration-300">Find Your Perfect Course</h4>
                            <p className="group-hover:text-white transition-colors duration-300">Choose from beginner to advanced levels.</p>
                        </div>
                        <ButtonLink className="relative z-10 group-hover:text-white transition-colors duration-300" title="Learn" />
                    </div>

                    <div className="group relative border border-black hover:border-red-500 hover:dark:border-red-500 dark:border-white p-2 sm:p-4 flex flex-col justify-between gap-10 overflow-hidden">
                        <div className="absolute -inset-1 -translate-x-full group-hover:translate-x-0 bg-red-500 transition-transform duration-300"></div>

                        <div className="relative z-10">
                            <h4 className="font-bold text-lg sm:text-xl group-hover:text-white transition-colors duration-300">Specialized Courses for Professionals</h4>
                            <p className="group-hover:text-white transition-colors duration-300">Enhance your skills with expert-led training.</p>
                        </div>
                        <ButtonLink className="relative z-10 group-hover:text-white transition-colors duration-300" title="Enroll" />
                    </div>
                </div>

                <div className="border border-black dark:border-white flex flex-col lg:flex-row gap-4">
                    <div className="bg-gradient-to-b from-transparent to-black/30 w-full h-40 lg:w-80 lg:h-60 overflow-hidden relative z-10">
                        <Image className="object-cover w-full h-full hover:scale-105 transition-transform duration-300" src='/images/course.png' alt="cta" width={1500} height={900} />
                    </div>
                    <div className="flex flex-col gap-4 justify-center p-2 lg:p-0">
                        <p>Topics</p>
                        <h4>Flexible Learning Options Available</h4>
                        <h6>Study at your own pace, anytime, anywhere.</h6>
                        <ButtonLink title="Join" />
                    </div>
                </div>

            </div>
        </div>
    )
}

export function AboutSection() {
    return (
        <div className="container p-4 sm:p-8">
            <div className="flex gap-4 flex-col">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div>
                        <p className="text-red-500 pb-2 sm:pb-4">Learn</p>
                        <h3 className="text-2xl sm:text-5xl font-bold">Empowering Your Learning Journey with Us</h3>
                    </div>
                    <div className="flex flex-col gap-8 w-full">
                        <p>Founded with a vision to make education accessible, our platform has evolved to offer a diverse range of courses tailored to various learning styles. Our mission is to empower individuals through quality education, fostering a community of lifelong learners. Join us as we continue to innovate and inspire learning experiences that transform lives.</p>
                        <div className="flex gap-4 items-center">
                            <ButtonWhite title="Enroll" />
                            <ButtonLink title="Explore" />
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-b from-transparent to-black/30 aspect-video overflow-hidden relative z-10">
                    <Image className="object-cover h-full hover:scale-105 transition-transform duration-300" src='/images/about-us.png' alt="cta" width={1500} height={900} />
                </div>
            </div>
        </div>
    )
}