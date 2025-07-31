import { useEffect } from "react";
import HeroSection from "@/components/hero-section";
import ProjectsSection from "@/components/projects-section";
import BlogSection from "@/components/blog-section";
import ContactSection from "@/components/contact-section";

export default function Home() {
  useEffect(() => {
    // Smooth scroll for anchor links
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.href && target.href.includes('#')) {
        e.preventDefault();
        const element = document.querySelector(target.getAttribute('href')!);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    document.addEventListener('click', handleScroll);
    return () => document.removeEventListener('click', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProjectsSection />
      <BlogSection />
      <ContactSection />
    </div>
  );
}
