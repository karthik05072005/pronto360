import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { serviceCategories } from "@/data/services";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Services = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const filteredCategories = selectedCategory === "all"
    ? serviceCategories
    : serviceCategories.filter(c => c.id === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12">
        <div className="container-section">
          <h1 className="mb-2 text-3xl font-bold text-foreground sm:text-4xl">All Services</h1>
          <p className="mb-8 text-lg text-muted-foreground">Browse our comprehensive range of business solutions.</p>

          {/* Category Filter */}
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${selectedCategory === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"}`}
            >
              All
            </button>
            {serviceCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${selectedCategory === cat.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"}`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Service Cards */}
          {filteredCategories.map(cat => (
            <div key={cat.id} className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-foreground">{cat.title}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cat.services.map(svc => (
                  <Link
                    key={svc.slug}
                    to={`/services/${svc.slug}`}
                    className="card-elevated group p-5 transition-all hover:border-primary/30 flex flex-col h-full"
                  >
                    <div>
                      <h3 className="mb-2 text-base font-semibold text-foreground group-hover:text-primary">
                        {svc.title}
                      </h3>
                      <p className="mb-3 text-sm text-muted-foreground">
                        Professional {svc.title.toLowerCase()} services with expert guidance.
                      </p>
                    </div>
                    <div className="mt-auto">
                      <p className="text-xs text-muted-foreground mb-2">Custom pricing based on your requirements</p>
                      <span className="text-sm font-semibold text-primary">
                        View Details →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
