import CtaSection from "@/components/cta";
import DevelopmentAlert from "@/components/DevelopmentAlert";
import Enroll from "@/components/enroll";
import FeatureSection, { AboutSection, BlogSection, CourseSection, FeatureListSection } from "@/components/HomeComponet";
import Hero from "@/components/hero/hero";
// import TestimonialsSection from "@/components/testimonials";
// import Image from "next/image";

export default function Home() {
  return (
    <div className='m-auto min-h-screen'>
      <DevelopmentAlert />
      <main className=''>

        <Hero />
        {/* <Image
          className='h-full w-full'
          src="/images/front_image.jpg"
          alt="Front Image"
          width={600}
          height={800}
        />
        <Image
          className='h-full w-full'
          src="/images/back_image.jpg"
          alt="Back Image"
          width={600}
          height={800}
        /> */}
        <Enroll />
        <FeatureSection />
        <FeatureListSection />
        <CourseSection />
        <BlogSection />
        <CtaSection />
        <AboutSection />
        {/* <TestimonialsSection /> */}
      </main>
    </div>
  );
}
