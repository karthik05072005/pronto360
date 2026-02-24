import { useState } from "react";
import { Send, CheckCircle, MessageCircle, ChevronRight, Info, Sparkles } from "lucide-react";

const mandatoryLicenses = [
  {
    id: "kpme",
    name: "KPME - Clinical License",
    logo: "/logos/kpme (2).png"
  },
  {
    id: "pcb",
    name: "Karnataka Pollution Control Board",
    logo: "/logos/pcb.png"
  },
  {
    id: "bmw",
    name: "Bio Medical Waste Authorization",
    logo: "/logos/dcd.png"
  }
];

const categoryLicenses = {
  "Medical": [
    { id: "pcpndt", name: "PC-PNDT Act", logo: "/logos/pcpndt (2).png" },
    { id: "mtp", name: "MTP & Sterilization", logo: "/logos/mtp.png" },
    { id: "art", name: "ART Clinic", logo: "/logos/artclinic.png" },
    { id: "aerb", name: "AERB - X-Ray License", logo: "/logos/aerb (2).png" }
  ],
  "Dental": [
    { id: "dcd", name: "Drugs Control Department", logo: "/logos/dcd.png" }
  ],
  "Lab Technician": [
    { id: "lab-tech", name: "Laboratory Registration", logo: "/logos/ayush.png" }
  ],
  "Ayurveda": [
    { id: "ayush", name: "AYUSH Registration", logo: "/logos/ayush.png" }
  ],
  "Homeopathy": [
    { id: "ayush-homo", name: "AYUSH Registration (Homeopathy)", logo: "/logos/ayush.png" }
  ],
  "Unani": [
    { id: "ayush-unani", name: "AYUSH Registration (Unani)", logo: "/logos/ayush.png" }
  ],
  "Yoga & Naturopathy": [
    { id: "ayush-yoga", name: "AYUSH Registration (Yoga)", logo: "/logos/ayush.png" }
  ],
  "Integrated System": [
    { id: "ayush-integrated", name: "AYUSH Registration (Integrated)", logo: "/logos/ayush.png" }
  ],
  "Non Medical / Owner": [
    { id: "gst", name: "GST Registration", logo: "/logos/gst.png" },
    { id: "fssai", name: "FSSAI Registration", logo: "/logos/fssai.png" },
    { id: "labour", name: "Shop & Establishment", logo: "/logos/shop and est.png" },
    { id: "iso", name: "ISO Certification", logo: "/logos/gst.png" }
  ]
};

const ServiceInquiry = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLicense, setSelectedLicense] = useState("");
  const [selectedLicenses, setSelectedLicenses] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const availableLicenses = selectedCategory ? categoryLicenses[selectedCategory as keyof typeof categoryLicenses] : [];
  const displayedLicenses = selectedCategory ? [
    ...mandatoryLicenses,
    ...(categoryLicenses[selectedCategory as keyof typeof categoryLicenses] || [])
  ] : [];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedLicense(""); // Reset license when category changes
    setSelectedLicenses([]); // Reset all selections
  };

  const handleLicenseToggle = (licenseId: string) => {
    setSelectedLicenses(prev => {
      if (prev.includes(licenseId)) {
        return prev.filter(id => id !== licenseId);
      } else {
        return [...prev, licenseId];
      }
    });
  };

  const handleLicenseChange = (license: string) => {
    setSelectedLicense(license);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || selectedLicenses.length === 0 || !name || !phone || !email) return;
    
    // Get selected license names
    const selectedLicenseNames = displayedLicenses
      .filter(license => selectedLicenses.includes(license.id))
      .map(license => `• ${license.name}`)
      .join('%0A');
    
    const message = `Hi PRONTO360,%0A%0AI need help with the following licenses:%0A%0A📋 *Category:* ${selectedCategory}%0A🔧 *License Type:* ${selectedLicense}%0A%0A� *Required Licenses:*%0A${selectedLicenseNames}%0A%0A� *Contact Details:*%0A• Name: ${name}%0A• Phone: ${phone}%0A• Email: ${email}%0A%0APlease let me know the next steps. Thank you!`;
    
    const whatsappUrl = `https://wa.me/919886709463?text=${message}`;
    window.open(whatsappUrl, '_blank');
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedCategory("");
      setSelectedLicense("");
      setSelectedLicenses([]);
      setName("");
      setPhone("");
      setEmail("");
    }, 3000);
  };

  return (
    <section className="relative bg-white py-20 overflow-hidden">
      
      <div className="container-section relative z-10">
        {/* Enhanced header */}
        <div className="mx-auto max-w-4xl text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="p-2 bg-primary rounded-full">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            Find Your Perfect <span className="text-primary">License Solution</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Navigate the licensing journey with confidence. Our expert team guides you through every step of the process.
          </p>
          
          {/* Stats badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-border">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm font-medium text-foreground">500+ Licenses Processed</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-border">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm font-medium text-foreground">98% Success Rate</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-border">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm font-medium text-foreground">24/7 Support</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto max-w-5xl bg-white rounded-3xl shadow-lg border border-border p-5 sm:p-8 md:p-12">
          {submitted ? (
            <div className="flex flex-col items-center gap-6 py-16 text-center">
              <div className="relative">
                <div className="absolute inset-0 bg-success/20 rounded-full scale-150 animate-ping"></div>
                <div className="relative p-4 bg-success rounded-full shadow-lg">
                  <CheckCircle className="h-12 w-12 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-foreground">Thank You! 🎉</h3>
              <p className="text-lg text-muted-foreground max-w-md">
                Your inquiry has been received successfully. Our licensing experts will contact you within 24 hours.
              </p>
              <div className="flex gap-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  WhatsApp message sent
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Team notified
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Step indicator */}
              <div className="flex flex-col items-center w-full px-4 sm:px-0">
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 w-full max-w-2xl">
                  <div className={`flex items-center gap-2 min-w-max ${selectedCategory ? 'text-primary' : 'text-muted-foreground'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${selectedCategory ? 'bg-primary text-white' : 'bg-gray-200'}`}>1</div>
                    <span className="font-medium text-sm sm:text-base whitespace-nowrap">Category</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground hidden sm:block self-center" />
                  <div className={`flex items-center gap-2 min-w-max ${selectedLicense ? 'text-primary' : 'text-muted-foreground'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${selectedLicense ? 'bg-primary text-white' : 'bg-gray-200'}`}>2</div>
                    <span className="font-medium text-sm sm:text-base whitespace-nowrap">License Type</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground hidden sm:block self-center" />
                  <div className={`flex items-center gap-2 min-w-max ${selectedLicenses.length > 0 ? 'text-primary' : 'text-muted-foreground'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${selectedLicenses.length > 0 ? 'bg-primary text-white' : 'bg-gray-200'}`}>3</div>
                    <span className="font-medium text-sm sm:text-base whitespace-nowrap">Licenses</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground hidden sm:block self-center" />
                  <div className={`flex items-center gap-2 min-w-max ${name && phone && email ? 'text-primary' : 'text-muted-foreground'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${name && phone && email ? 'bg-primary text-white' : 'bg-gray-200'}`}>4</div>
                    <span className="font-medium text-sm sm:text-base whitespace-nowrap">Contact</span>
                  </div>
                </div>
              </div>

              {/* Enhanced dropdowns */}
              <div className="grid gap-6 sm:gap-8 sm:grid-cols-2">
                <div className="relative">
                  <label className="mb-2 block text-sm sm:text-base font-semibold text-foreground flex items-center gap-2">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">1</span>
                    </div>
                    Select Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full h-14 rounded-lg border-2 border-border bg-white px-4 text-base font-medium text-foreground outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:ring focus:ring-offset-0 hover:border-primary/50"
                    required
                  >
                    <option value="">Choose your category...</option>
                    <option value="Medical">🏥 Medical</option>
                    <option value="Dental">🦷 Dental</option>
                    <option value="Lab Technician">🔬 Lab Technician</option>
                    <option value="Ayurveda">🌿 Ayurveda</option>
                    <option value="Homeopathy">🏠 Homeopathy</option>
                    <option value="Unani">⚕️ Unani</option>
                    <option value="Yoga & Naturopathy">🧘 Yoga & Naturopathy</option>
                    <option value="Integrated System">🔄 Integrated System</option>
                    <option value="Non Medical / Owner">💼 Non Medical / Owner</option>
                  </select>
                </div>
                <div className="relative">
                  <label className="mb-2 block text-sm sm:text-base font-semibold text-foreground flex items-center gap-2">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">2</span>
                    </div>
                    Select License Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedLicense}
                    onChange={(e) => handleLicenseChange(e.target.value)}
                    disabled={!selectedCategory}
                    className="w-full h-14 rounded-lg border-2 border-border bg-white px-4 text-base font-medium text-foreground outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:ring focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary/50"
                    required
                  >
                    <option value="">
                      {selectedCategory ? "Select license type..." : "Select category first"}
                    </option>
                    {availableLicenses.map((license) => (
                      <option key={license.id} value={license.name}>
                        {license.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {selectedCategory && selectedLicense && (
                <div className="space-y-8 animate-in fade-in duration-500">
                  {/* Enhanced instruction */}
                  <div className="text-center bg-muted rounded-2xl p-6 border border-border">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Info className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold text-foreground">Available Licenses</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Based on your <span className="font-semibold text-primary">{selectedCategory}</span> selection, 
                      choose the licenses you need assistance with:
                    </p>
                  </div>
                  
                  {/* Enhanced license cards grid */}
                  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {displayedLicenses.map((license, index) => (
                      <label
                        key={license.id}
                        className={`
                          relative group cursor-pointer transition-all duration-300 transform
                          ${selectedLicenses.includes(license.id)
                            ? 'scale-105'
                            : 'hover:scale-102'
                          }
                        `}
                        style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both` }}
                      >
                        <div className={`
                          relative flex flex-col items-center p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1
                          ${selectedLicenses.includes(license.id)
                            ? 'bg-muted border-primary shadow-xl'
                            : 'bg-white border-border hover:border-primary'
                          }
                        `}>
                          {/* Checkbox */}
                          <input
                            type="checkbox"
                            checked={selectedLicenses.includes(license.id)}
                            onChange={() => handleLicenseToggle(license.id)}
                            className="absolute top-4 right-4 w-5 h-5 text-primary border-2 border-border rounded-lg focus:ring-2 focus:ring-primary focus:ring-offset-2"
                          />
                          
                          {/* Logo container */}
                          <div className={`
                            w-full h-24 mb-4 rounded-2xl flex items-center justify-center transition-all duration-300
                            ${selectedLicenses.includes(license.id)
                              ? 'bg-primary/10'
                              : 'bg-muted group-hover:bg-primary/5'
                            }
                          `}>
                            <img 
                              src={license.logo} 
                              alt={license.name}
                              className="max-h-[70px] max-w-[140px] object-contain transition-all duration-300"
                              onError={(e) => {
                                e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'/%3E%3C/svg%3E";
                              }}
                            />
                          </div>
                          
                          {/* License name */}
                          <span className="text-sm font-semibold text-center text-foreground leading-tight px-2">
                            {license.name}
                          </span>
                          
                          {/* Selection indicator */}
                          {selectedLicenses.includes(license.id) && (
                            <div className="absolute -top-2 -right-2">
                              <div className="bg-success text-white rounded-full p-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                  
                  {/* Enhanced selection counter */}
                  <div className="text-center bg-white rounded-xl border border-border p-4 shadow-sm">
                    <div className="flex items-center justify-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${selectedLicenses.length > 0 ? 'bg-success' : 'bg-muted-foreground'}`}></div>
                      <span className="text-lg font-semibold text-foreground">
                        {selectedLicenses.length} License{selectedLicenses.length !== 1 ? 's' : ''} Selected
                      </span>
                      {selectedLicenses.length > 0 && (
                        <span className="text-sm text-success font-medium">✓ Ready to proceed</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {selectedCategory && selectedLicense && selectedLicenses.length > 0 && (
                <div className="space-y-8 border-t border-gray-100 pt-8 animate-in fade-in duration-500">
                  {/* Enhanced contact form header */}
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 bg-success/20 text-success px-4 py-2 rounded-full text-sm font-medium mb-4">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                      Almost done! Just your contact details
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Get Your Free Consultation</h3>
                    <p className="text-muted-foreground">
                      Our licensing experts will contact you within 24 hours with a personalized solution
                    </p>
                  </div>
                  
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">👤</span>
                        </div>
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-muted-foreground"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">📱</span>
                        </div>
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-muted-foreground"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">✉️</span>
                      </div>
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-muted-foreground"
                      required
                    />
                  </div>
                  
                  {/* Enhanced action buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      type="submit"
                      className="group relative flex-1 bg-primary text-white px-8 py-4 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <Send className="h-5 w-5" />
                        Submit Request
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
                    <a
                      href="https://wa.me/919886709463?text=Hi%20PRONTO360%2C%20I%20need%20help%20with%20a%20license."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex-1 flex items-center justify-center gap-2 bg-white border border-primary text-primary px-8 py-4 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Chat on WhatsApp
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    </a>
                  </div>
                  
                  {/* Trust indicators */}
                  <div className="flex flex-wrap justify-center gap-6 pt-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3 text-success" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      Secure & Private
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      Quick Response
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Expert Assistance
                    </div>
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
