import Image from "next/image";

export default function CoursePage() {
    return (
        <div>
            <div className="bg-gradient-to-b from-transparent to-black/30 aspect-square w-full h-[500px] overflow-hidden relative z-10">
                <Image className="object-cover h-full hover:scale-105 transition-transform duration-300" src='/courses/web-tech.webp' alt='web-technology' fill />
            </div>
            <div className="container p-4 sm:p-8">
                <h1>This is first course</h1>
            </div>
        </div>
    )
}