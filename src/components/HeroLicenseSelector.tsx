import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { serviceCategories } from "@/data/services";

const categoryLicenses = {
  "Business Registration": [
    { id: "private-limited", name: "Private Limited Company" },
    { id: "llp", name: "LLP Registration" },
    { id: "opc", name: "OPC Registration" },
    { id: "partnership", name: "Partnership Firm" },
    { id: "sole-proprietorship", name: "Sole Proprietorship" },
    { id: "startup-india", name: "Startup India Registration" }
  ],
  "Legal Services": [
    { id: "trademark", name: "Trademark Registration" },
    { id: "copyright", name: "Copyright Registration" },
    { id: "patent", name: "Patent Filing" },
    { id: "legal-notice", name: "Legal Notice Drafting" },
    { id: "contract", name: "Contract Drafting" },
    { id: "legal-consultation", name: "Legal Consultation" }
  ],
  "Tax & Compliance": [
    { id: "gst-registration", name: "GST Registration" },
    { id: "gst-filing", name: "GST Filing" },
    { id: "income-tax", name: "Income Tax Filing" },
    { id: "tds-filing", name: "TDS Filing" },
    { id: "roc-filing", name: "ROC Filing" },
    { id: "annual-compliance", name: "Annual Compliance" }
  ],
  "Government & Licenses": [
    { id: "fssai", name: "FSSAI License" },
    { id: "msme", name: "MSME Registration" },
    { id: "iec", name: "IEC Code" },
    { id: "shop-act", name: "Shop Act License" },
    { id: "labour-license", name: "Labour License" },
    { id: "import-export", name: "Import Export License" }
  ]
};

const HeroLicenseSelector = ({ onCategoryChange, onLicenseChange, selectedCategory, selectedLicense }: {
  onCategoryChange: (category: string) => void;
  onLicenseChange: (license: string) => void;
  selectedCategory: string;
  selectedLicense: string;
}) => {
  const availableLicenses = selectedCategory ? (categoryLicenses[selectedCategory as keyof typeof categoryLicenses] || []) : [];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-border p-7 w-full max-w-2xl">
      {/* Step indicator */}
      <div className="flex flex-col items-center w-full mb-6">
        <div className="flex flex-wrap justify-center gap-2 w-full">
          <div className={`flex items-center gap-2 min-w-max ${selectedCategory ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${selectedCategory ? 'bg-primary text-white' : 'bg-gray-200'}`}>1</div>
            <span className="font-medium text-sm whitespace-nowrap">Category</span>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground self-center mx-1" />
          <div className={`flex items-center gap-2 min-w-max ${selectedLicense ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${selectedLicense ? 'bg-primary text-white' : 'bg-gray-200'}`}>2</div>
            <span className="font-medium text-sm whitespace-nowrap">License Type</span>
          </div>
        </div>
      </div>

      {/* Dropdowns */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="relative">
          <label className="mb-2 block text-sm font-semibold text-foreground">
            Select Category <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => {
              onCategoryChange(e.target.value);
              onLicenseChange(""); // Reset license when category changes
            }}
            className="w-full h-14 rounded-lg border-2 border-border bg-white px-4 text-base font-medium text-foreground outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:ring focus:ring-offset-0 hover:border-primary/50"
            required
          >
            <option value="">Choose your category...</option>
            {serviceCategories.map(cat => (
              <option key={cat.id} value={cat.title}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>
        <div className="relative">
          <label className="mb-2 block text-sm font-semibold text-foreground">
            Select License Type <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedLicense}
            onChange={(e) => onLicenseChange(e.target.value)}
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
    </div>
  );
};

export default HeroLicenseSelector;