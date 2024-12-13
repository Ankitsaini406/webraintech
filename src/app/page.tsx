import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.mainFlex}>
      <main className={styles.imageBox}>
        <Image 
        className={styles.image}
        src='/images/front_image.jpg'
        alt="Front Image"
        width={600}
        height={800}
        >
        </Image>

        <Image
        className={styles.image}
        src='/images/back_image.jpg'
        alt="Back Image"
        width={600}
        height={800}
        >
        </Image>
      </main>
    </div>
  );
}
