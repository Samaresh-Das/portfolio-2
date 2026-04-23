import Head from "next/head";
import { Fragment } from "react";
import AboutMe from "../components/AboutMe";
import Experience from "../components/Experience";
import Footer from "../components/Footer";
import Intro from "../components/Intro";
import Navbar from "../components/Navbar";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Contact from "../components/Contacts";
import AgenticAIs from "../components/AgenticAIs";

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Samaresh Das — Full Stack Developer</title>
        <meta name="description" content="Full-stack developer who builds production-ready web apps for founders, startups, and small teams. MERN Stack, Next.js, TypeScript, AWS." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1b1a17" />
        <meta property="og:title" content="Samaresh Das — Full Stack Developer" />
        <meta property="og:description" content="Production-ready web apps built fast, clean, and scalable." />
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <Navbar />
      <Intro />
      <AboutMe />
      <Experience />
      <Skills />
      <Projects />
      <AgenticAIs />
      <Contact />
      <Footer />
    </Fragment>
  );
}
