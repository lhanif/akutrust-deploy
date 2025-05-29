import LandingPageComponent from "@/components/pages/landingPages/landingPage";
import Navbar from '@/components/navbar';
import Footer from "@/components/footerSection";

export default function LandingPage() {
  return (
    <>
        <Navbar />
        <LandingPageComponent />
        <Footer />
    </>
  );
  
}
