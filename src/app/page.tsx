import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { SocialProof } from "@/components/social-proof";
import { Problem } from "@/components/problem";
import { Solution } from "@/components/solution";
import { Features } from "@/components/features";
import { HowItWorks } from "@/components/how-it-works";
import { ProductPreview } from "@/components/product-preview";
import { Benefits } from "@/components/benefits";

import { DemoForm } from "@/components/demo-form";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Problem />
        <Solution />
        <Features />
        <HowItWorks />
        <ProductPreview />
        <Benefits />
        <DemoForm />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
