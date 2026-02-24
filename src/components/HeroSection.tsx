import { useState } from "react";
import { ArrowRight, CheckCircle, Sparkles, Shield, Clock, Users, Star } from "lucide-react";
import LeadFormModal from "./LeadFormModal";

const HeroSection = () => {
  const [leadOpen, setLeadOpen] = useState(false);

  const stats = [
    { value: "5,000+", label: "Businesses Served" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "24hrs", label: "Avg. Response Time" },
    { value: "50+", label: "Services Available" },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-white">
        {/* Clean background - removing gradients and floating elements */}

        <div className="container-section relative py-24 lg:py-32">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Enhanced Left Content */}
            <div className="space-y-8">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-400 rounded-full animate-ping"></div>
                  <div className="relative p-1 bg-green-500 rounded-full">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                </div>
                <span className="text-green-700 font-medium">Trusted by 5,000+ Businesses</span>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-foreground">
                  Fast. Reliable.
                  <span className="block text-primary">
                    360° Business & Legal Solutions.
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                  From company registration to tax compliance — get expert assistance for all your business needs with custom solutions.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setLeadOpen(true)}
                  className="group relative inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <Sparkles className="h-5 w-5" />
                  Get Free Consultation
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#services"
                  className="inline-flex items-center gap-3 bg-white border border-border text-foreground px-8 py-4 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Explore Services
                </a>
              </div>
              
              {/* Trust indicators */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>100% Secure</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 text-primary" />
                  <span>4.9/5 Rating</span>
                </div>
              </div>
            </div>

            {/* Right: Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-sm border border-border/50 hover:shadow-md transition-shadow duration-300 flex flex-col items-center justify-center p-6 text-center"
                >
                  <span className="text-3xl font-extrabold text-primary">{s.value}</span>
                  <span className="mt-1 text-sm text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <LeadFormModal open={leadOpen} onOpenChange={setLeadOpen} />
    </>
  );
};

export default HeroSection;
