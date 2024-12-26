import DevelopmentAlert from "@/components/DevelopmentAlert";
import Image from "next/image";

export default function Home() {
  return (
    <div className='container m-auto flex flex-col min-h-full'>
      <DevelopmentAlert />
      <main className=''>
        <Image
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
        />
      </main>
    </div>
  );
}
