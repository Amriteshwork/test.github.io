import { Link } from "wouter";
import { Github, Linkedin, Twitter, Rss } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <Link href="/">
              <div className="text-2xl font-bold mb-4">
                <span className="text-blue-400">Alex</span>Chen.dev
              </div>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Machine Learning Engineer who turns caffeine into neural networks and 
              transforms business problems into algorithmic solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Rss className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors duration-200">Home</Link></li>
              <li><Link href="/projects" className="text-gray-400 hover:text-white transition-colors duration-200">Projects</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors duration-200">Blog</Link></li>
              <li><a href="/#contact" className="text-gray-400 hover:text-white transition-colors duration-200">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Resume</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Newsletter</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Uses</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">RSS Feed</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            © 2023 Alex Chen. All rights reserved. Built with too much coffee and questionable life choices.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Terms</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
