import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Footer() {
  const [year] = React.useState(() => new Date().getFullYear());

  const footerSections = [
    {
      title: "About",
      links: [
        { text: "About Us", href: "/about" },
        { text: "Careers", href: "/careers" },
        { text: "Press", href: "/press" },
      ],
    },
    {
      title: "Legal",
      links: [
        { text: "Terms of Service", href: "/terms" },
        { text: "Privacy Policy", href: "/privacy" },
        { text: "Cookie Policy", href: "/cookies" },
      ],
    },
    {
      title: "Support",
      links: [
        { text: "Help Center", href: "/help" },
        { text: "Contact Us", href: "/contact" },
        { text: "FAQ", href: "/faq" },
      ],
    },
  ];

  const socialLinks = [
    { Icon: Facebook, href: "#", label: "Facebook" },
    { Icon: Twitter, href: "#", label: "Twitter" },
    { Icon: Instagram, href: "#", label: "Instagram" },
    { Icon: Linkedin, href: "#", label: "LinkedIn" },
    {
      Icon: Github,
      href: "https://github.com/VersionControlAdmin/Project-AetherNotes---frontend",
      label: "GitHub",
    },
  ];

  return (
    <footer className="w-full py-6 lg:py-8 mt-auto backdrop-blur-sm bg-black/30 text-gray-300">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="hidden lg:grid lg:grid-cols-4 gap-8">
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-100">
                {section.title}
              </h4>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link.text}>
                    <Link
                      to={link.href}
                      className="hover:text-white transition-colors"
                    >
                      {link.text} (Coming soon)
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-100">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="hover:text-white transition-colors"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:hidden">
          <Accordion type="single" collapsible className="w-full">
            {footerSections.map((section, index) => (
              <AccordionItem key={section.title} value={`item-${index}`}>
                <AccordionTrigger className="text-sm font-semibold text-gray-100">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-sm">
                    {section.links.map((link) => (
                      <li key={link.text}>
                        <Link
                          to={link.href}
                          className="hover:text-white transition-colors"
                        >
                          {link.text} (Coming soon)
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-6 space-y-3">
            <h4 className="text-sm font-semibold text-gray-100">Connect</h4>
            <div className="flex space-x-4 justify-center">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="hover:text-white transition-colors"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-6 flex flex-col lg:flex-row justify-between items-center">
          <p className="text-xs text-gray-400 text-center lg:text-left">
            © {year} AetherNotes. All rights reserved. |{" "}
            <Link
              to="https://github.com/VersionControlAdmin/Project-AetherNotes---frontend"
              className="hover:underline"
            >
              View on GitHub
            </Link>
          </p>
          <p className="text-xs text-gray-400 mt-4 lg:mt-0">
            Made with ❤️ in the digital realm
          </p>
        </div>
      </div>
    </footer>
  );
}
