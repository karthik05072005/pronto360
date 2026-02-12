import { Link } from "react-router-dom";
import { Building2, Scale, FileText, Landmark, ArrowRight } from "lucide-react";
import { serviceCategories } from "@/data/services";

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="h-8 w-8" />,
  Scale: <Scale className="h-8 w-8" />,
  FileText: <FileText className="h-8 w-8" />,
  Landmark: <Landmark className="h-8 w-8" />,
};

const ServiceCategories = () => {
  return (
    <section className="bg-background py-20">
      <div className="container-section">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive business, legal, tax, and licensing solutions — all under one roof.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCategories.map((cat, i) => (
            <div
              key={cat.id}
              className="card-elevated group p-6"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-primary">
                {iconMap[cat.icon]}
              </div>
              <h3 className="mb-3 text-lg font-bold text-foreground">{cat.title}</h3>
              <ul className="mb-5 space-y-2">
                {cat.services.slice(0, 4).map((svc) => (
                  <li key={svc.slug}>
                    <Link
                      to={`/services/${svc.slug}`}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {svc.title}
                    </Link>
                  </li>
                ))}
                {cat.services.length > 4 && (
                  <li className="text-sm text-muted-foreground">+{cat.services.length - 4} more</li>
                )}
              </ul>
              <Link
                to={`/services?category=${cat.id}`}
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all group-hover:gap-2"
              >
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
