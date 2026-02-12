import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getServiceDetail } from "@/data/services";
import { CheckCircle, FileText, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadFormModal from "@/components/LeadFormModal";

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceDetail(slug || "");
  const [leadOpen, setLeadOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-accent via-background to-background py-16">
          <div className="container-section">
            <Link to="/services" className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-primary">
              ← Back to Services
            </Link>
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <span className="mb-3 inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary">
                  {service.category}
                </span>
                <h1 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
                  {service.title}
                </h1>
                <p className="mb-6 text-lg text-muted-foreground">{service.description}</p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setLeadOpen(true)}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25"
                  >
                    Request Consultation <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-4 text-lg font-bold text-primary">{service.pricing}</p>
              </div>
              <div className="card-elevated p-8">
                <h3 className="mb-4 text-lg font-bold text-foreground">Quick Enquiry</h3>
                <button
                  onClick={() => setLeadOpen(true)}
                  className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
                >
                  Get Started Now
                </button>
                <p className="mt-3 text-center text-xs text-muted-foreground">Free consultation • No hidden charges</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16">
          <div className="container-section">
            <h2 className="mb-8 text-2xl font-bold text-foreground">Benefits</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border border-border p-4">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                  <span className="text-sm text-foreground">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Documents Required */}
        <section className="bg-muted py-16">
          <div className="container-section">
            <h2 className="mb-8 text-2xl font-bold text-foreground">Documents Required</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {service.documents.map((d, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg bg-background p-4 shadow-sm">
                  <FileText className="h-5 w-5 text-primary" />
                  <span className="text-sm text-foreground">{d}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16">
          <div className="container-section">
            <h2 className="mb-8 text-2xl font-bold text-foreground">Our Process</h2>
            <div className="relative">
              <div className="absolute left-6 top-0 h-full w-0.5 bg-border lg:left-1/2" />
              <div className="space-y-8">
                {service.process.map((p, i) => (
                  <div key={i} className="relative flex items-start gap-6 lg:justify-center">
                    <div className={`flex w-full items-start gap-4 lg:w-5/12 ${i % 2 === 0 ? "lg:flex-row-reverse lg:text-right" : "lg:ml-auto"}`}>
                      <div className="z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                        {p.step}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-foreground">{p.title}</h3>
                        <p className="text-sm text-muted-foreground">{p.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-muted py-16">
          <div className="container-section">
            <h2 className="mb-8 text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
            <div className="mx-auto max-w-2xl space-y-3">
              {service.faqs.map((faq, i) => (
                <div key={i} className="rounded-lg border border-border bg-background">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between p-5 text-left"
                  >
                    <span className="pr-4 text-sm font-semibold text-foreground">{faq.question}</span>
                    {openFaq === i ? <ChevronUp className="h-5 w-5 shrink-0 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />}
                  </button>
                  {openFaq === i && (
                    <div className="border-t border-border px-5 pb-5 pt-3">
                      <p className="text-sm text-muted-foreground">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container-section text-center">
            <h2 className="mb-4 text-2xl font-bold text-foreground">Ready to Get Started?</h2>
            <p className="mb-6 text-muted-foreground">Talk to our experts and get your {service.title.toLowerCase()} done hassle-free.</p>
            <button
              onClick={() => setLeadOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25"
            >
              Request Consultation <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      </main>
      <Footer />
      <LeadFormModal open={leadOpen} onOpenChange={setLeadOpen} prefilledService={service.title} />
    </div>
  );
};

export default ServiceDetail;
