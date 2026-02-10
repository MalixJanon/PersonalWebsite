import { Suspense, lazy } from "react";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/sections/Hero";

// Lazy load non-critical sections for faster initial load
const Skills = lazy(() => import("@/components/sections/Skills"));
const Projects = lazy(() => import("@/components/sections/Projects"));
const Portfolio = lazy(() => import("@/components/sections/Portfolio"));
const Music = lazy(() => import("@/components/sections/Music"));
const Contact = lazy(() => import("@/components/sections/Contact"));

// Minimal fallback for sections
const SectionFallback = () => null;

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <Skills />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Portfolio />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Music />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Contact />
      </Suspense>
    </Layout>
  );
}
