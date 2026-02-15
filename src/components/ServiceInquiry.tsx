import { useState } from "react";
import { Send, CheckCircle, MessageCircle } from "lucide-react";

const servicesByDepartment = {
  "Business Registration": [
    "Private Limited Company Registration",
    "LLP Registration", 
    "OPC Registration",
    "Partnership Firm Registration",
    "Sole Proprietorship",
    "Startup India Registration"
  ],
  "Legal Services": [
    "Trademark Registration",
    "Copyright Registration",
    "Patent Filing",
    "Legal Notice Drafting",
    "Contract Drafting",
    "Legal Consultation"
  ],
  "Tax & Compliance": [
    "GST Registration",
    "GST Filing",
    "Income Tax Filing",
    "TDS Filing",
    "ROC Filing",
    "Annual Compliance"
  ],
  "Government & Licenses": [
    "FSSAI License",
    "MSME Registration",
    "IEC Code",
    "Shop Act License",
    "Labour License",
    "Import Export License"
  ]
};

const ServiceInquiry = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const availableServices = selectedDepartment ? servicesByDepartment[selectedDepartment as keyof typeof servicesByDepartment] : [];

  const handleDepartmentChange = (department: string) => {
    setSelectedDepartment(department);
    setSelectedServices([]);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
  };

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) => {
      if (prev.includes(service)) {
        return prev.filter((s) => s !== service);
      } else {
        return [...prev, service];
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDepartment || selectedServices.length === 0 || !name || !phone || !email) return;
    
    const servicesList = selectedServices.map(service => `• ${service}`).join('%0A');
    const message = `Hi PRONTO360,%0A%0AI need help with the following services:%0A%0A📋 *Department:* ${selectedDepartment}%0A🔧 *Services:*%0A${servicesList}%0A%0A👤 *Contact Details:*%0A• Name: ${name}%0A• Phone: ${phone}%0A• Email: ${email}%0A%0APlease let me know the next steps. Thank you!`;
    
    const whatsappUrl = `https://wa.me/919886709463?text=${message}`;
    window.open(whatsappUrl, '_blank');
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedDepartment("");
      setSelectedServices([]);
      setName("");
      setPhone("");
      setEmail("");
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
            Select your department and choose a service to get started with a free consultation.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto max-w-4xl rounded-2xl border border-border bg-background p-6 shadow-lg sm:p-8">
          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <CheckCircle className="h-12 w-12 text-secondary" />
              <h3 className="text-xl font-bold text-foreground">Thank You!</h3>
              <p className="text-muted-foreground">
                We've received your inquiry. Our team will contact you shortly.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-foreground">
                  Department <span className="text-destructive">*</span>
                </label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => handleDepartmentChange(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  required
                >
                  <option value="">--- Select Department ---</option>
                  {Object.keys(servicesByDepartment).map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {selectedDepartment && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="text-lg font-semibold text-foreground">Available Licenses / Services</h3>
                  
                  {isLoading ? (
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />
                      ))}
                    </div>
                  ) : (
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                      {availableServices.map((service, index) => (
                        <label
                          key={service}
                          className={`
                            relative flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all duration-200
                            ${selectedServices.includes(service) 
                              ? 'bg-blue-50 border-2 border-blue-300 shadow-md' 
                              : 'bg-gray-50 border border-gray-200 hover:bg-blue-50 hover:shadow-sm'
                            }
                          `}
                          style={{ animation: `fadeIn 0.3s ease-out ${index * 0.05}s both` }}
                        >
                          <input
                            type="checkbox"
                            name="services"
                            checked={selectedServices.includes(service)}
                            onChange={() => handleServiceToggle(service)}
                            className="sr-only"
                          />
                          <div className="flex-1">
                            <div className="w-4 h-4 rounded border-2 border-gray-300 bg-white flex items-center justify-center">
                              {selectedServices.includes(service) && (
                                <div className="w-2 h-2 rounded bg-blue-600" />
                              )}
                            </div>
                            <span className="text-sm font-semibold text-gray-900">{service}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {selectedServices.length > 0 && (
                <div className="text-sm text-muted-foreground mb-4">
                  Selected Services: {selectedServices.length}
                </div>
              )}

              {selectedServices.length > 0 && (
                <div className="space-y-4 border-t border-border pt-6 animate-in fade-in duration-300">
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
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Submit Inquiry
                    </button>
                    <a
                      href="https://wa.me/919886709463?text=Hi%20PRONTO360%2C%20I%20need%20help%20with%20a%20service."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground shadow-sm transition-all hover:bg-accent"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Chat on WhatsApp
                    </a>
                  </div>
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
