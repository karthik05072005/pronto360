import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
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
      <section className="relative overflow-hidden bg-background">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent via-background to-background" />

        <div className="container-section relative py-20 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left Content */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5 text-sm font-medium text-primary">
                <CheckCircle className="h-4 w-4" />
                Trusted by 5,000+ Businesses
              </div>
              <h1 className="mb-6 text-4xl font-extrabold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                Fast. Reliable.{" "}
                <span className="text-gradient">360° Business</span>{" "}
                & Legal Solutions.
              </h1>
              <p className="mb-8 max-w-lg text-lg text-muted-foreground">
                From company registration to tax compliance — get expert assistance for all your business needs at affordable prices.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setLeadOpen(true)}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
                >
                  Get Free Consultation <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-7 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-accent"
                >
                  Explore Services
                </a>
              </div>
            </div>

            {/* Right: Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="card-elevated flex flex-col items-center justify-center p-6 text-center"
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
