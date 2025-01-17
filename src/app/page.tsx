
import DevelopmentAlert from "@/components/DevelopmentAlert";
import { Enroll, FeatureSection, AboutSection } from "@/components/HomeComponet";
import Hero from "@/components/hero/hero";
// import TestimonialsSection from "@/components/testimonials";
// import Image from "next/image";

export default function Home() {
  return (
    <div className='m-auto min-h-screen'>
      <DevelopmentAlert />
      <main className=''>

        <Hero />
        <Enroll />
        <FeatureSection />
        {/* <FeatureListSection /> */}
        {/* <CourseSection /> */}
        {/* <BlogSection /> */}
        {/* <CtaSection /> */}
        <AboutSection />
        {/* <TestimonialsSection /> */}
      </main>
    </div>
  );
}
