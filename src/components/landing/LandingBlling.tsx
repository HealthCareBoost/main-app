import Image from "next/image";
import React from "react";
import { layout, styles } from "../../styles/style";

export const LandingBilling: React.FC = () => {
  return (
    <section id="product" className={layout.sectionReverse}>
      <div className={layout.sectionImgReverse}>
        <Image
          height={0}
          width={0}
          sizes={"100%"}
          src={"/assets/bill.png"}
          alt="billing"
          className="relative z-[5] h-[100%] w-[100%]"
        />

        {/* gradient start */}
        <div className="white__gradient absolute -left-1/2 top-0 z-[3] h-[50%] w-[50%] rounded-full" />
        <div className="pink__gradient absolute -left-1/2 bottom-0 z-[0] h-[50%] w-[50%] rounded-full" />
        {/* gradient end */}
      </div>

      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          Easily control your <br className="hidden sm:block" /> billing &
          invoicing
        </h2>
        <p className={`${styles.paragraph} mt-5 max-w-[470px]`}>
          Elit enim sed massa etiam. Mauris eu adipiscing ultrices ametodio
          aenean neque. Fusce ipsum orci rhoncus aliporttitor integer platea
          placerat.
        </p>

        <div className="mt-6 flex flex-row flex-wrap sm:mt-10">
          <Image
            height={42.05}
            width={128.86}
            src={"assets/apple.svg"}
            alt="google_play"
            className="mr-5 h-[42.05px] w-[128.86px] cursor-pointer object-contain"
          />
          <Image
            height={43.08}
            width={144.17}
            src={"assets/google.svg"}
            alt="google_play"
            className="h-[43.08px] w-[144.17px] cursor-pointer object-contain"
          />
        </div>
      </div>
    </section>
  );
};
