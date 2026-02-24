// License Rules Configuration
export const licenseRules = {
  mandatory: [
    {
      id: "kpme",
      name: "KPME - Clinical License",
      mandatory: true,
      description: "Karnataka Private Medical Establishments Registration"
    },
    {
      id: "pcb",
      name: "Karnataka Pollution Control Board",
      mandatory: true,
      description: "Pollution Control Board Approval"
    },
    {
      id: "bmw",
      name: "Bio Medical Waste Authorization",
      mandatory: true,
      description: "Bio Medical Waste Management Authorization"
    }
  ],
  conditional: {
    "xray": {
      id: "aerb",
      name: "AERB - X-Ray License",
      description: "Atomic Energy Regulatory Board for X-Ray"
    },
    "ultrasound": {
      id: "pcpndt",
      name: "PC-PNDT Act",
      description: "Pre-Conception and Pre-Natal Diagnostic Techniques"
    },
    "ivf": {
      id: "art",
      name: "ART Clinic",
      description: "Assisted Reproductive Technology Clinic"
    },
    "pharmacy": {
      id: "dcd",
      name: "Drugs Control Department",
      description: "Drugs Control Department Pharmacy License"
    },
    "lab": {
      id: "lab-tech",
      name: "Laboratory Registration",
      description: "Laboratory Registration License"
    }
  },
  additional: {
    "gst": {
      id: "gst",
      name: "GST Registration",
      description: "Goods and Services Tax Registration"
    },
    "fssai": {
      id: "fssai",
      name: "FSSAI Registration",
      description: "Food Safety and Standards Authority Registration"
    },
    "labour": {
      id: "labour",
      name: "Shop & Establishment",
      description: "Department of Labour Shop & Establishment"
    },
    "iso": {
      id: "iso",
      name: "ISO Certification",
      description: "International Organization for Standardization"
    }
  }
};

// Category-based question logic
export const categoryQuestions = {
  "Medical": [
    {
      id: "xray",
      question: "Do you have X-Ray facility?",
      type: "boolean",
      options: ["Yes", "No"]
    },
    {
      id: "ultrasound",
      question: "Do you have Ultrasound facility?",
      type: "boolean",
      options: ["Yes", "No"]
    },
    {
      id: "ot",
      question: "Do you have Operation Theatre (OT)?",
      type: "boolean",
      options: ["Yes", "No"]
    },
    {
      id: "beds",
      question: "Number of beds in your facility?",
      type: "number",
      placeholder: "Enter number of beds"
    }
  ],
  "Dental": [
    {
      id: "xray",
      question: "Is there X-Ray equipment?",
      type: "boolean",
      options: ["Yes", "No"]
    },
    {
      id: "ot",
      question: "Is there Operation Theatre (OT)?",
      type: "boolean",
      options: ["Yes", "No"]
    },
    {
      id: "chairs",
      question: "Number of dental chairs?",
      type: "number",
      placeholder: "Enter number of chairs"
    }
  ],
  "Lab": [
    {
      id: "diagnostic",
      question: "Is it Diagnostic only?",
      type: "boolean",
      options: ["Yes", "No"]
    },
    {
      id: "imaging",
      question: "Is there imaging equipment?",
      type: "boolean",
      options: ["Yes", "No"]
    }
  ],
  "Ayurveda": [],
  "Homeopathy": [],
  "Physiotherapy": [],
  "Non-Medical Owner": []
};

// License generation logic
export const generateRequiredLicenses = (category, responses) => {
  const licenses = [...licenseRules.mandatory];
  
  // Add conditional licenses based on responses
  if (responses.xray === "Yes") {
    licenses.push(licenseRules.conditional.xray);
  }
  
  if (responses.ultrasound === "Yes") {
    licenses.push(licenseRules.conditional.ultrasound);
  }
  
  if (responses.ivf === "Yes") {
    licenses.push(licenseRules.conditional.ivf);
  }
  
  if (responses.pharmacy === "Yes") {
    licenses.push(licenseRules.conditional.pharmacy);
  }
  
  if (responses.lab === "Yes") {
    licenses.push(licenseRules.conditional.lab);
  }
  
  // Add additional licenses for non-medical owners
  if (category === "Non-Medical Owner") {
    licenses.push(
      licenseRules.additional.gst,
      licenseRules.additional.fssai,
      licenseRules.additional.labour,
      licenseRules.additional.iso
    );
  }
  
  return licenses;
};
