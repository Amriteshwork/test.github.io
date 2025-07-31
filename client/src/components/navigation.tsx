import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Download } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/#contact", label: "Contact" },
  ];

  const NavLink = ({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) => {
    const isActive = location === href || (href !== "/" && location.startsWith(href));
    
    if (href.startsWith("/#")) {
      return (
        <a 
          href={href}
          className={`nav-link ${isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'} transition-colors duration-200`}
          onClick={onClick}
        >
          {label}
        </a>
      );
    }
    
    return (
      <Link
        href={href}
        className={`nav-link ${isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'} transition-colors duration-200`}
        onClick={onClick}
      >
        {label}
      </Link>
    );
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <div className="text-xl font-bold text-gray-900">
              <span className="text-blue-600">Alex</span>Chen.dev
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <NavLink key={item.href} href={item.href} label={item.label} />
              ))}
              <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200">
                <Download className="w-4 h-4 mr-2" />
                Resume
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-8">
                  {navItems.map((item) => (
                    <NavLink 
                      key={item.href} 
                      href={item.href} 
                      label={item.label} 
                      onClick={() => setIsOpen(false)}
                    />
                  ))}
                  <Button className="bg-blue-600 text-white hover:bg-blue-700 w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Resume
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
