import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full py-6 md:py-8 mt-auto backdrop-blur-sm bg-black/30 left-0 right-0">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-100">About</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us (Coming soon)
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Careers (Coming soon)
                </Link>
              </li>
              <li>
                <Link
                  to="/press"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Press (Coming soon)
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-100">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/terms"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Terms of Service (Coming soon)
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Privacy Policy (Coming soon)
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Cookie Policy (Coming soon)
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-100">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/help"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Help Center (Coming soon)
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact Us (Coming soon)
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  FAQ (Coming soon)
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-100">Connect</h4>
            <div className="flex space-x-4 flex-row items-center justify-center">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook (Coming soon)</span>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter (Coming soon)</span>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram (Coming soon)</span>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn (Coming soon)</span>
              </a>
              <a
                href="https://github.com/VersionControlAdmin/Project-AetherNotes---frontend"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} AetherNotes. All rights reserved. |{" "}
            <Link
              to="https://github.com/VersionControlAdmin/Project-AetherNotes---frontend"
              className="hover:underline"
            >
              View on GitHub
            </Link>
          </p>
          <p className="text-xs text-gray-400 mt-4 md:mt-0">
            Made with ❤️ in the digital realm
          </p>
        </div>
      </div>
    </footer>
  );
}
