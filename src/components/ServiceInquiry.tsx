import { useState } from "react";
import { serviceCategories } from "@/data/services";
import { Send, CheckCircle, MessageCircle, ChevronDown } from "lucide-react";

const ServiceInquiry = () => {
  const [category, setCategory] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showServices, setShowServices] = useState(false);

  const selectedCategory = serviceCategories.find((c) => c.id === category);
  const subServices = selectedCategory?.services ?? [];

  const handleServiceToggle = (serviceSlug: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceSlug) 
        ? prev.filter(s => s !== serviceSlug)
        : [...prev, serviceSlug]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || selectedServices.length === 0 || !name || !phone || !email) return;
    
    // Get selected service names
    const selectedServiceNames = subServices
      .filter(s => selectedServices.includes(s.slug))
      .map(s => s.title);
    
    // Get department name
    const departmentName = selectedCategory?.title || '';
    
    // Create WhatsApp message
    const message = `Hi PRONTO360,%0A%0AI need help with the following services:%0A%0A📋 *Department:* ${departmentName}%0A🔧 *Services/Licenses:*%0${selectedServiceNames.map(service => `• ${service}`).join('%0A')}%0A%0A👤 *Contact Details:*%0A• Name: ${name}%0A• Phone: ${phone}%0A• Email: ${email}%0A%0APlease let me know the next steps. Thank you!`;
    
    // Redirect to WhatsApp
    const whatsappUrl = `https://wa.me/919886709463?text=${message}`;
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setCategory("");
      setSelectedServices([]);
      setName("");
      setPhone("");
      setEmail("");
      setShowServices(false);
    }, 3000);
  };

  return (
    <section className="bg-accent/50 py-16">
      <div className="container-section">
        <div className="mx-auto max-w-3xl text-center mb-10">
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
            Find the Right <span className="text-gradient">Service</span> for You
          </h2>
          <p className="mt-3 text-muted-foreground">
            Select your department and choose one or more services to get started with a free consultation.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-2xl rounded-2xl border border-border bg-background p-6 shadow-lg sm:p-8"
        >
          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <CheckCircle className="h-12 w-12 text-secondary" />
              <h3 className="text-xl font-bold text-foreground">Thank You!</h3>
              <p className="text-muted-foreground">
                We've received your inquiry. Our team will contact you shortly.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Department Dropdown */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-foreground">
                  Department <span className="text-destructive">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setSelectedServices([]);
                    setShowServices(false);
                  }}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  required
                >
                  <option value="">--- Select Department ---</option>
                  {serviceCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Services Selection */}
              {category && (
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="text-sm font-semibold text-foreground">
                      Services / Licenses <span className="text-destructive">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowServices(!showServices)}
                      className="flex items-center gap-1 text-sm text-primary hover:text-primary/80"
                    >
                      {showServices ? "Hide" : "Show"} Services
                      <ChevronDown className={`h-4 w-4 transition-transform ${showServices ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                  
                  {showServices && (
                    <div className="max-h-60 overflow-y-auto rounded-lg border border-border bg-background p-4">
                      <div className="space-y-3">
                        {subServices.map((s) => (
                          <label
                            key={s.slug}
                            className="flex items-center gap-3 cursor-pointer rounded-lg p-2 hover:bg-accent/50 transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={selectedServices.includes(s.slug)}
                              onChange={() => handleServiceToggle(s.slug)}
                              className="h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/20"
                            />
                            <span className="text-sm text-foreground">{s.title}</span>
                          </label>
                        ))}
                      </div>
                      {selectedServices.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-border">
                          <p className="text-xs text-muted-foreground">
                            {selectedServices.length} service{selectedServices.length > 1 ? 's' : ''} selected
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Contact Fields - shown after services are selected */}
              {selectedServices.length > 0 && (
                <div className="space-y-4 border-t border-border pt-5">
                  <p className="text-sm font-medium text-muted-foreground">
                    Enter your details and we'll get back to you:
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-foreground">
                        Full Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-foreground">
                        Phone Number <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-foreground">
                      Email Address <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 sm:w-auto"
                  >
                    <Send className="h-4 w-4" />
                    Submit Inquiry
                  </button>
                  <a
                    href="https://wa.me/919886709463?text=Hi%20PRONTO360%2C%20I%20need%20help%20with%20a%20service."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground shadow-sm transition-all hover:bg-accent sm:w-auto"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chat on WhatsApp
                  </a>
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default ServiceInquiry;
