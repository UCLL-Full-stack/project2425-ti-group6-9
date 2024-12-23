import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@styles/Home.module.css";
import Header from "@components/header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Bookreader App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <main className={`${styles.main} ${inter.className} bg-white`}>
        <span>
          <h1>Welcome!</h1>
        </span>
        <div className={styles.description}>
          <p>
            Courses lets you see as a lecturer all the courses you are teaching
            and as a student all the courses you are enrolled in. <br />
            You can also see when the courses are scheduled and the students
            enrolled in each course.
          </p>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = async (context: { locale: any}) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
};
