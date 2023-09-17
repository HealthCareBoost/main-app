import React from "react";
import Layout from "../components/Layout";
import { Separator } from "../components/ui/Separator";
import { styles } from "../styles/style";

const AboutPage = () => {
  const howProps = {
    title: "How it works",
    description: `Discover, collect, and sell extraordinary NFTs
        on the world's first & largest NFT marketplace. There are  three things you'll need in place to open your account and start buying or selling NFTs on BUM.`,
    items: [
      {
        title: "Digital Currency",
        description:
          "You can get ETH, the digital currency that fuels transactions on the Ethereum blockchain, from a digital currency exchange",
      },
      {
        title: "Crypto Wallet",
        description:
          "A crypto wallet, such as MetaMask, stores your ETH and processes transactions on the Ethereum blockchain.",
      },
      {
        title: "BUM.",
        description:
          "Let's connect your wallet to BUM, edit your profile, and begin interacting in the space.",
      },
    ],

    link: "https://google.com",
  };

  return (
    <Layout>
      {/* <div className="relative left-[7.5vw] top-[5vh] mx-auto flex items-center justify-center">
        <div className="absolute top-0 left-0 h-[75vh] w-4/5 rounded-xl bg-orange-400"></div>
        <div className="absolute top-0 left-0 m-8 flex h-[75vh] w-4/5 flex-col items-center rounded-xl border-2 border-orange-400 bg-white dark:bg-primaryDark">
          <h1 className={`${styles.heading2} my-4 text-center`}>About us</h1>
          <Separator className="my-1 w-4/5 bg-orange-400" />

          <div className={`${styles.paragraph}`}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              sunt odio debitis itaque adipisci, at distinctio totam
              consequuntur nobis asperiores eaque necessitatibus praesentium
              nulla, explicabo quisquam ipsam, ipsa quod minus?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              sunt odio debitis itaque adipisci, at distinctio totam
              consequuntur nobis asperiores eaque necessitatibus praesentium
              nulla, explicabo quisquam ipsam, ipsa quod minus?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              sunt odio debitis itaque adipisci, at distinctio totam
              consequuntur nobis asperiores eaque necessitatibus praesentium
              nulla, explicabo quisquam ipsam, ipsa quod minus?
            </p>
          </div>
        </div>
      </div> */}
      <main className={`bg-orange-400 p-4`}>
        <div
          className={`${styles.boxWidth} mx-auto flex flex-col items-center justify-center rounded-xl bg-white dark:bg-bgDark`}
        >
          <h1 className={`${styles.heading2} my-4 text-center`}>About us</h1>
          <Separator className="my-1 w-4/5 bg-orange-400" />

          <div className={`${styles.paragraph} p-4`}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              sunt odio debitis itaque adipisci, at distinctio totam
              consequuntur nobis asperiores eaque necessitatibus praesentium
              nulla, explicabo quisquam ipsam, ipsa quod minus?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              sunt odio debitis itaque adipisci, at distinctio totam
              consequuntur nobis asperiores eaque necessitatibus praesentium
              nulla, explicabo quisquam ipsam, ipsa quod minus?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              sunt odio debitis itaque adipisci, at distinctio totam
              consequuntur nobis asperiores eaque necessitatibus praesentium
              nulla, explicabo quisquam ipsam, ipsa quod minus?
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default AboutPage;
