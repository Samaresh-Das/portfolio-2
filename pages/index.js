import Head from "next/head";
import { Fragment } from "react";
import AboutMe from "../components/AboutMe";
import Experience from "../components/Experience";
import Footer from "../components/Footer";
import Intro from "../components/Intro";
import Navbar from "../components/Navbar";
import Projects from "../components/Projects";
import Skills from "../components/Skills";

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Samaresh&apos;s Portfolio</title>
      </Head>
      <Navbar />
      <Intro />
      <AboutMe />
      <Experience />
      <Skills />
      <Projects />
      <Footer />
    </Fragment>
  );
}
