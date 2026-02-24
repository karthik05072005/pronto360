export interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  slug: string;
  icon: string;
  benefits: string[];
  documents: string[];
  process: { step: number; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

export interface ServiceCategory {
  id: string;
  title: string;
  icon: string;
  services: { title: string; slug: string }[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "business",
    title: "Business Registration",
    icon: "Building2",
    services: [
      { title: "Private Limited Company", slug: "private-limited-company" },
      { title: "LLP Registration", slug: "llp-registration" },
      { title: "OPC Registration", slug: "opc-registration" },
      { title: "Partnership Firm", slug: "partnership-firm" },
      { title: "Sole Proprietorship", slug: "sole-proprietorship" },
      { title: "Startup India Registration", slug: "startup-india-registration" },
    ],
  },
  {
    id: "legal",
    title: "Legal Services",
    icon: "Scale",
    services: [
      { title: "Trademark Registration", slug: "trademark-registration" },
      { title: "Copyright Registration", slug: "copyright-registration" },
      { title: "Patent Filing", slug: "patent-filing" },
      { title: "Legal Notice Drafting", slug: "legal-notice-drafting" },
      { title: "Contract Drafting", slug: "contract-drafting" },
      { title: "Legal Consultation", slug: "legal-consultation" },
    ],
  },
  {
    id: "tax",
    title: "Tax & Compliance",
    icon: "FileText",
    services: [
      { title: "GST Registration", slug: "gst-registration" },
      { title: "GST Filing", slug: "gst-filing" },
      { title: "Income Tax Filing", slug: "income-tax-filing" },
      { title: "TDS Filing", slug: "tds-filing" },
      { title: "ROC Filing", slug: "roc-filing" },
      { title: "Annual Compliance", slug: "annual-compliance" },
    ],
  },
  {
    id: "government",
    title: "Government & Licenses",
    icon: "Landmark",
    services: [
      { title: "FSSAI License", slug: "fssai-license" },
      { title: "MSME Registration", slug: "msme-registration" },
      { title: "IEC Code", slug: "iec-code" },
      { title: "Shop Act License", slug: "shop-act-license" },
      { title: "Labour License", slug: "labour-license" },
      { title: "Import Export License", slug: "import-export-license" },
    ],
  },
];

export const serviceDetails: Record<string, Service> = {
  "private-limited-company": {
    id: "private-limited-company",
    title: "Private Limited Company Registration",
    description: "Register your Private Limited Company with end-to-end expert assistance. Get your company incorporated in just 7-10 working days.",
    category: "Business Registration",
    slug: "private-limited-company",
    icon: "Building2",
    benefits: [
      "Limited liability protection for shareholders",
      "Separate legal entity status",
      "Easy to raise funding from investors",
      "Greater credibility with clients and vendors",
      "Perpetual succession — company continues regardless of ownership changes",
      "Tax benefits and deductions available",
    ],
    documents: [
      "PAN Card of all Directors",
      "Aadhaar Card of all Directors",
      "Passport size photographs",
      "Address proof (Electricity Bill / Bank Statement)",
      "Registered office address proof",
      "Digital Signature Certificate (DSC)",
    ],
    process: [
      { step: 1, title: "Consultation", description: "Discuss your requirements with our experts" },
      { step: 2, title: "Name Approval", description: "Apply for company name approval with MCA" },
      { step: 3, title: "Document Preparation", description: "Prepare MOA, AOA, and other documents" },
      { step: 4, title: "Filing with MCA", description: "Submit incorporation application to MCA" },
      { step: 5, title: "Incorporation", description: "Receive Certificate of Incorporation" },
    ],
    faqs: [
      { question: "How long does it take to register a Pvt Ltd Company?", answer: "Typically 7-10 working days from the date of filing all documents." },
      { question: "What is the minimum capital required?", answer: "There is no minimum capital requirement. You can start with minimal investment." },
      { question: "How many directors are required?", answer: "A minimum of 2 directors are required for a Private Limited Company." },
    ],
  },
  "trademark-registration": {
    id: "trademark-registration",
    title: "Trademark Registration",
    description: "Protect your brand identity with trademark registration. Secure exclusive rights to your brand name, logo, and tagline.",
    category: "Legal Services",
    slug: "trademark-registration",
    icon: "Shield",
    benefits: [
      "Legal protection against brand infringement",
      "Exclusive rights to use the trademark",
      "Build brand trust and recognition",
      "Valid for 10 years, renewable indefinitely",
      "Can be licensed or franchised",
      "Legal recourse against counterfeit products",
    ],
    documents: [
      "Trademark / Logo copy",
      "Applicant's ID proof",
      "Address proof",
      "Business registration certificate",
      "Power of Attorney (if filing through agent)",
      "User affidavit (if trademark already in use)",
    ],
    process: [
      { step: 1, title: "Trademark Search", description: "Check availability and uniqueness of your trademark" },
      { step: 2, title: "Application Filing", description: "File trademark application with the Trademark Registry" },
      { step: 3, title: "Examination", description: "Trademark examiner reviews the application" },
      { step: 4, title: "Publication", description: "Trademark published in the Trademark Journal" },
      { step: 5, title: "Registration", description: "Receive Trademark Registration Certificate" },
    ],
    faqs: [
      { question: "How long does trademark registration take?", answer: "The entire process takes 12-18 months, but you get TM protection from filing date." },
      { question: "Can I register a trademark for my logo?", answer: "Yes, you can register wordmarks, logos, slogans, and even sounds as trademarks." },
      { question: "Is trademark registration mandatory?", answer: "While not mandatory, it provides legal protection and exclusive rights to your brand." },
    ],
  },
  "gst-registration": {
    id: "gst-registration",
    title: "GST Registration",
    description: "Get your GST registration done quickly and hassle-free. Mandatory for businesses with turnover above prescribed limits.",
    category: "Tax & Compliance",
    slug: "gst-registration",
    icon: "Receipt",
    benefits: [
      "Legal compliance with GST law",
      "Input tax credit on purchases",
      "Interstate business without restrictions",
      "Access to government tenders",
      "Build credibility with clients",
      "Easy loan approvals",
    ],
    documents: [
      "PAN Card of the business/owner",
      "Aadhaar Card",
      "Business registration proof",
      "Bank account details (cancelled cheque)",
      "Address proof of business",
      "Photographs of the owner/partners",
    ],
    process: [
      { step: 1, title: "Document Collection", description: "Gather all required documents" },
      { step: 2, title: "Application Filing", description: "File GST registration application online" },
      { step: 3, title: "Verification", description: "Application verified by GST officer" },
      { step: 4, title: "GSTIN Issued", description: "Receive your GST Identification Number" },
    ],
    faqs: [
      { question: "Is GST registration mandatory?", answer: "Yes, for businesses with annual turnover above prescribed limits by state." },
      { question: "How long does GST registration take?", answer: "Typically 3-7 working days from the date of application." },
      { question: "Can I register for GST voluntarily?", answer: "Yes, any business can voluntarily register for GST regardless of turnover." },
    ],
  },
  "fssai-license": {
    id: "fssai-license",
    title: "FSSAI License",
    description: "Get your FSSAI food license for your food business. Mandatory for all food businesses operating in India.",
    category: "Government & Licenses",
    slug: "fssai-license",
    icon: "UtensilsCrossed",
    benefits: [
      "Legal compliance for food businesses",
      "Consumer trust and confidence",
      "Access to larger markets",
      "Avoid hefty penalties and legal issues",
      "Quality assurance certification",
      "Business expansion opportunities",
    ],
    documents: [
      "Identity proof of the applicant",
      "Business registration documents",
      "Address proof of business premises",
      "Food safety management plan",
      "List of food products",
      "NOC from local municipality",
    ],
    process: [
      { step: 1, title: "Consultation", description: "Determine the type of FSSAI license needed" },
      { step: 2, title: "Document Preparation", description: "Prepare all necessary documents" },
      { step: 3, title: "Application Filing", description: "Submit application on FSSAI portal" },
      { step: 4, title: "Inspection", description: "FSSAI officer may inspect premises" },
      { step: 5, title: "License Issued", description: "Receive your FSSAI license" },
    ],
    faqs: [
      { question: "Is FSSAI license mandatory?", answer: "Yes, all food businesses in India must have an FSSAI license." },
      { question: "What are the types of FSSAI license?", answer: "Basic Registration, State License, and Central License based on turnover." },
      { question: "How long is the FSSAI license valid?", answer: "FSSAI license is valid for 1-5 years as chosen at the time of application." },
    ],
  },
};

// Generate generic service details for services without specific content
export function getServiceDetail(slug: string): Service {
  if (serviceDetails[slug]) return serviceDetails[slug];

  // Find service info from categories
  let serviceTitle = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  let categoryName = "Business Services";

  for (const cat of serviceCategories) {
    const found = cat.services.find(s => s.slug === slug);
    if (found) {
      serviceTitle = found.title;
      categoryName = cat.title;
      break;
    }
  }

  return {
    id: slug,
    title: serviceTitle,
    description: `Professional ${serviceTitle} services with expert guidance and complete support throughout the process.`,
    category: categoryName,
    slug,
    icon: "FileText",
    benefits: [
      "Expert professional assistance",
      "Quick and hassle-free process",
      "100% compliance guaranteed",
      "Custom pricing based on your requirements",
      "Dedicated support team",
      "End-to-end assistance",
    ],
    documents: [
      "Identity proof (PAN / Aadhaar)",
      "Address proof",
      "Business registration documents",
      "Photographs",
      "Other supporting documents",
    ],
    process: [
      { step: 1, title: "Consultation", description: "Discuss your requirements with our experts" },
      { step: 2, title: "Documentation", description: "Prepare and collect required documents" },
      { step: 3, title: "Filing", description: "Submit application with relevant authority" },
      { step: 4, title: "Processing", description: "Follow up and track application status" },
      { step: 5, title: "Completion", description: "Receive your certificate/license" },
    ],
    faqs: [
      { question: `How long does ${serviceTitle} take?`, answer: "The timeline varies based on the complexity and government processing times. Our experts will provide an accurate estimate during consultation." },
      { question: "What documents are required?", answer: "Basic identity proof, address proof, and business-specific documents. Our team will guide you through the complete checklist." },
      { question: "Do you provide ongoing support?", answer: "Yes, we provide complete support from filing to completion, including any follow-ups required." },
    ],
  };
}

export const testimonials = [
  {
    name: "Rajesh Kumar",
    company: "TechStart Solutions Pvt. Ltd.",
    text: "PRONTO360 made our company registration incredibly smooth. The team handled everything from name approval to incorporation in just 8 days!",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    company: "GreenLeaf Organics",
    text: "Got our FSSAI license without any hassle. The experts guided us at every step and kept us informed throughout the process.",
    rating: 5,
  },
  {
    name: "Amit Patel",
    company: "Innovate Digital",
    text: "Excellent trademark registration service. They conducted a thorough search and filed our application quickly. Highly recommended!",
    rating: 5,
  },
  {
    name: "Sneha Reddy",
    company: "CloudNine Exports",
    text: "PRONTO360 helped us with GST registration and IEC code. Their expert consultation and service quality is outstanding.",
    rating: 4,
  },
];
