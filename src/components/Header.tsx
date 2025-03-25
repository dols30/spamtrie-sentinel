
import React from 'react';
import { Shield } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 animate-fade-in">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-medium tracking-tight">
              <span className="text-primary">Spam</span>Trie
            </h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#" 
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              Dashboard
            </a>
            <a 
              href="#" 
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              History
            </a>
            <a 
              href="#" 
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              About
            </a>
          </nav>
          <button className="glass px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-white/90">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
