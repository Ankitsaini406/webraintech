import Image from "next/image";
import styles from "./page.module.css";
import DevelopmentAlert from "@/components/DevelopmentAlert";

export default function Home() {
  return (
    <div className={styles.mainFlex}>
      <DevelopmentAlert />
      <main className={styles.imageBox}>
        <Image
          className={styles.image}
          src="/images/front_image.jpg"
          alt="Front Image"
          width={600}
          height={800}
        />
        <Image
          className={styles.image}
          src="/images/back_image.jpg"
          alt="Back Image"
          width={600}
          height={800}
        />
      </main>
    </div>
  );
}
