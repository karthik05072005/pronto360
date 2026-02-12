import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="container-section py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-xs font-black text-primary-foreground">P</span>
              </div>
              <span className="text-lg font-extrabold text-foreground">
                PRONTO<span className="text-primary">360</span>
              </span>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Fast. Reliable. 360° Business & Legal Solutions. Your trusted partner for business registration, legal, tax, and licensing needs.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/services?category=business" className="transition-colors hover:text-primary">Business Registration</Link></li>
              <li><Link to="/services?category=legal" className="transition-colors hover:text-primary">Legal Services</Link></li>
              <li><Link to="/services?category=tax" className="transition-colors hover:text-primary">Tax & Compliance</Link></li>
              <li><Link to="/services?category=government" className="transition-colors hover:text-primary">Government & Licenses</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/contact" className="transition-colors hover:text-primary">Contact Us</Link></li>
              <li><Link to="/services" className="transition-colors hover:text-primary">All Services</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                +91 98867 09463
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                hello@pronto360.com
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                Bangalore, Karnataka, India
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} PRONTO360. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
