import Image from "next/image";
// import { Alert } from "antd";
import styles from "./page.module.css";
import DevelopmentAlert from "@/components/DevelopmentAlert";

export default function Home() {
  return (
    <div className={styles.mainFlex}>
      <DevelopmentAlert />
      {/* <Alert style={{ width: '100%', textAlign: 'center', position: 'sticky', top: 0}}
        banner
        message="Our platform is currently under development mode. Comming Sonn..."
        type="warning"
        showIcon
      /> */}
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
