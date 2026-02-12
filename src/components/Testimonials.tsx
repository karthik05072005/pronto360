import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/services";

const Testimonials = () => {
  return (
    <section className="bg-muted py-20">
      <div className="container-section">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Trusted by 5,000+ businesses across India
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <div key={i} className="card-elevated p-6">
              <Quote className="mb-3 h-8 w-8 text-primary/20" />
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                "{t.text}"
              </p>
              <div className="mb-2 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`h-4 w-4 ${j < t.rating ? "fill-yellow-400 text-yellow-400" : "text-border"}`}
                  />
                ))}
              </div>
              <p className="text-sm font-semibold text-foreground">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.company}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
