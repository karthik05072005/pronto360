import { Shield, Clock, Users, Headphones } from "lucide-react";

const features = [
  {
    icon: <Shield className="h-7 w-7" />,
    title: "100% Compliance",
    description: "Every service follows government regulations to the letter.",
  },
  {
    icon: <Clock className="h-7 w-7" />,
    title: "Fast Turnaround",
    description: "Most services completed within 7-10 working days.",
  },
  {
    icon: <Users className="h-7 w-7" />,
    title: "Expert Team",
    description: "CAs, CSs, and Lawyers with 10+ years experience.",
  },
  {
    icon: <Headphones className="h-7 w-7" />,
    title: "Dedicated Support",
    description: "Personal relationship manager for every client.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-muted py-20">
      <div className="container-section">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Why Choose PRONTO360?
          </h2>
          <p className="text-lg text-muted-foreground">
            We make business compliance simple, fast, and affordable.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div key={i} className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                {f.icon}
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
