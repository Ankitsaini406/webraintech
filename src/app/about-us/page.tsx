import Image from "next/image";

export const metadata = {
    title: "About Us",
    description:
        "Discover WeBrainTech Mission, Values, and Expert Team. Based in Sikar, we specialize in Web Development, Digital marketing, and IT training to empower businesses and individuals.",
    keywords: [
        "About Webraintech Academy",
        "Webraintech Academy Overview",
        "Webraintech Academy Mission",
        "Learn More About Webraintech",
        "Webraintech Academy Story",
        "About Our Academy",
        "Our Mission at Webraintech Academy",
        "Why Choose Webraintech Academy",
        "Webraintech Academy Values",
        "Webraintech Academy Team",
        "about WeBrainTech",
        "WeBrainTech Sikar",
        "WeBrainTech team",
        "WeBrainTech company profile",
        "WeBrainTech story",
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

function AboutUs() {
    return (
        <div className="container mx-auto py-4 sm:py-8 px-4 sm:px-8">
            <h1 className="text-3xl sm:text-4xl font-bold pb-2 sm:pb-4">About Us</h1>
            <p className="sm:leading-8 text-lg sm:text-xl pb-4 sm:pb-8"> In this era of technology there will be an the increasing demand for trained technical persons
                capable of driving our country to the 21 Century. Day by day the industries are orienting themselves
                towards automation & Computerization resulting in huge demand of qualified Computer
                Professionals. Thus WeBrainTech is offering various courses to take advantage of this situation.
                This organization has come forward in this connection to help set up Computer Training Institute to
                cater to cater to the increasing needs of the youth of our country. Being encouraged by the success
                achieved by the WeBrainTech, the facilities of Computer Training are gradually being expanded to
                include the Sub-division & also the rural areas. This is especially true of the IT industry. This has been
                witnessing unprecedented growth, with our country displaying all the signs of emerging as a
                knowledge-based Global Superpower. The programs have been expertly drawn up and designed to
                perfectly suit the needs of not only regular students but also of those seeking to update and upgrade
                their domain knowledge and skills.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold pb-2 sm:pb-4">Founder&apos;s Message</h2>
            <div className="border border-black object-top h-[300px] max-w-[400px] min-w-[200px] relative float-left mr-4 sm:mr-6">
                <Image alt="Directer Image"
                    className="bg-linear-to-b from-transparent to-black-opacity-30 object-cover h-full max-w-full"
                    src='/faculty/founder.webp'
                    fill />
            </div>
            <p className="sm:leading-8 text-lg sm:text-xl pb-4 sm:pb-8"> Information Technology has become a fastest growing Industry in
                today&apos;s scenario which is providing thousands of job to well trained
                professionals. India has achieved a terrific growth in this field and is
                being considered as a potential Information Technology  Super Power
                in the world.  Information Technology is providing the upcoming future
                that will change every face of human existence.
                In order to produce Information Technology Professionals, Information
                Technology education requires a high quality competence and infrastructure. Today,
                new packages, newer versions of current software and new technological tools are
                being adopted by the trade and industry periodically. The education therefore, must
                catch up with these developments well in time so that Information Technology
                students do not face the problem of obsolescence.  WeBrainTech feels the underlying
                concepts of new technology and tools along with reasonable skills be delivered to the
                students before they go out in the industry.
                Thus in a very fast changing technical scenario, concept and practical based
                education becomes quite important as against tool based education. Technological
                changes also demand that institutions must consider the market scenario, and adjust
                the contents and delivery of education matching the expectations of the business
                houses. I am sure our students can meet any demand & challenges that the employer
                may have on them. I wish them great success in all their Endeavour&apos;s and quest for a better tomorrow.
            </p>

            <h3 className="text-xl sm:text-2xl font-bold pb-2 sm:pb-4">Reason To Join WeBraintech</h3>
            <p className="sm:leading-8 text-lg sm:text-xl pb-4 sm:pb-8">A highly dedicated team of qualified and experienced faculty members, drawn from the best in
                profession and education, train the students properly by using sophisticated technology with an
                equal emphasis on theory and lab.</p>

            <h3 className="text-xl sm:text-2xl font-bold pb-2 sm:pb-4">Training and Placement</h3>
            <p className="sm:leading-8 text-lg sm:text-xl pb-4 sm:pb-8">The Academy provides the facility of Faculty Training for lab and
                theory classes under the “Faculty Training” program by WeBrainTech Those candidates
                which provide better performance in their modular courses, then the would get that
                opportunity to join this program and make his /her career themselves with a great
                experience.
            </p>

            <h3 className="text-lg sm:text-xl font-bold pb-2 sm:pb-4">Other Facilities</h3>
            <ul className="ml-8 pb-4 sm:pb-8 sm:leading-8">
                <li className="list-disc">Innovative, scientific and modern Training Technique.</li>
                <li className="list-disc">Support and services based on world-classs Quality Management System.</li>
                <li className="list-disc">24 x 7 on Line Support.</li>
                <li className="list-disc">Certificates of Global Recognition.</li>
            </ul>

            <h3 className="text-lg sm:text-xl font-bold pb-2 sm:pb-4">OUR GOALS  AND OBJECTIVES </h3>
            <ul className="ml-8 pb-4 sm:pb-8 sm:leading-8">
                <li className="list-disc">Every Indian Citizen should get an education.</li>
                <li className="list-disc">To carry the torch of education to each & every village of our country. </li>
                <li className="list-disc">To prepare such a course that can be easily understood by a layman. </li>
                <li className="list-disc">Special attention on Programming computer education.</li>
                <li className="list-disc">To make people literate in every village. </li>
                <li className="list-disc">To give self-employment after completing the Software Courses. </li>
                <li className="list-disc">Modern & Hi-tech  teaching methodology. </li>
                <li className="list-disc"> To ensure achieving this goal in a qualitative manner, the company has established a &quot;Premium Quality Management System&quot;.</li>
            </ul>
        </div>
    )
}

export default AboutUs;