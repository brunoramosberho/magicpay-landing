import HeroSection from "@/components/hero-section";
import LogoCloud from "@/components/logo-cloud";
import Subheader from "@/components/subheader";
import RotatingSubheader from "@/components/rotating-subheader";
import IntegrationsSection from "@/components/integrations-7";
import Features from "@/components/features-3";
import ContactSection from "@/components/contact";

export default function Home() {
  return (
    <>
      <HeroSection />
      {/* <RotatingSubheader /> */}
      {/* <Subheader /> */}
      {/* <LogoCloud /> */}
      {/* <IntegrationsSection /> */}
      <Features />
      <ContactSection />
    </>
  );
}
