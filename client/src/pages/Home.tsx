import Layout from "@/components/layout/Layout";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Music from "@/components/sections/Music";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Skills />
      <Projects />
      <Music />
      <Contact />
    </Layout>
  );
}
