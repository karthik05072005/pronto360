import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Building2, Scale, FileText, Landmark } from "lucide-react";
import { serviceCategories } from "@/data/services";
import LeadFormModal from "./LeadFormModal";

const categoryIcons: Record<string, React.ReactNode> = {
  Building2: <Building2 className="h-5 w-5 text-primary" />,
  Scale: <Scale className="h-5 w-5 text-primary" />,
  FileText: <FileText className="h-5 w-5 text-primary" />,
  Landmark: <Landmark className="h-5 w-5 text-primary" />,
};

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container-section flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-black text-primary-foreground">P</span>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-foreground">
              PRONTO<span className="text-primary">360</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            <Link to="/" className="rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
              Home
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <button className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                Services <ChevronDown className={`h-4 w-4 transition-transform ${megaOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Mega Dropdown */}
              {megaOpen && (
                <div className="absolute left-1/2 top-full z-50 w-[800px] -translate-x-1/2 pt-2">
                  <div className="grid grid-cols-4 gap-6 rounded-xl border border-border bg-popover p-6 shadow-xl">
                    {serviceCategories.map((cat) => (
                      <div key={cat.id}>
                        <div className="mb-3 flex items-center gap-2">
                          {categoryIcons[cat.icon]}
                          <h3 className="text-sm font-semibold text-foreground">{cat.title}</h3>
                        </div>
                        <ul className="space-y-1.5">
                          {cat.services.map((svc) => (
                            <li key={svc.slug}>
                              <Link
                                to={`/services/${svc.slug}`}
                                className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                                onClick={() => setMegaOpen(false)}
                              >
                                {svc.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link to="/services" className="rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
              Pricing
            </Link>
            <Link to="/contact" className="rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
              Contact
            </Link>
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLeadOpen(true)}
              className="hidden rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 sm:block"
            >
              Get Consultation
            </button>
            <button
              className="rounded-lg p-2 text-foreground lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="border-t border-border bg-background lg:hidden">
            <div className="container-section space-y-1 py-4">
              <Link to="/" onClick={() => setMobileOpen(false)} className="block rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-accent">
                Home
              </Link>
              <div>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-accent"
                >
                  Services
                  <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileServicesOpen && (
                  <div className="space-y-4 px-4 pb-4 pt-2">
                    {serviceCategories.map((cat) => (
                      <div key={cat.id}>
                        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {cat.title}
                        </h4>
                        <ul className="space-y-1">
                          {cat.services.map((svc) => (
                            <li key={svc.slug}>
                              <Link
                                to={`/services/${svc.slug}`}
                                className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent"
                                onClick={() => setMobileOpen(false)}
                              >
                                {svc.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Link to="/services" onClick={() => setMobileOpen(false)} className="block rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-accent">
                Pricing
              </Link>
              <Link to="/contact" onClick={() => setMobileOpen(false)} className="block rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-accent">
                Contact
              </Link>
              <div className="pt-2">
                <button
                  onClick={() => { setLeadOpen(true); setMobileOpen(false); }}
                  className="w-full rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
                >
                  Get Consultation
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <LeadFormModal open={leadOpen} onOpenChange={setLeadOpen} />
    </>
  );
};

export default Header;
