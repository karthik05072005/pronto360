import HeroSection from "@/components/HeroSection";
import ServiceInquiry from "@/components/ServiceInquiry";
import ServiceCategories from "@/components/ServiceCategories";
import WhyChooseUs from "@/components/WhyChooseUs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ServiceInquiry />
        <div id="services">
          <ServiceCategories />
        </div>
        <WhyChooseUs />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
