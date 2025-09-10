import {
  HeroSection,
  PartnerBrandsSection,
  CompanyProfileSection,
  AboutUsSection,
  LocationSection,
} from "@/sections";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <PartnerBrandsSection />
      <CompanyProfileSection />
      <AboutUsSection />
      <LocationSection />
    </div>
  );
}
