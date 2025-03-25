
import React from 'react';
import Header from '../components/Header';
import SpamDetector from '../components/SpamDetector';
import StatisticsPanel from '../components/StatisticsPanel';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12 md:px-6">
        <div className="max-w-3xl mx-auto mb-8">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
              Advanced Spam Detection
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Identify Spam with <span className="text-primary">Precision</span>
            </h1>
            <p className="text-xl text-muted-foreground mx-auto max-w-2xl">
              Our cutting-edge trie-based algorithm analyzes messages to detect spam patterns with high accuracy.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-16">
          <SpamDetector />
          <StatisticsPanel />
        </div>
      </main>
      
      <footer className="py-10 bg-secondary/30 mt-24 border-t border-border">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p className="text-sm text-muted-foreground">
            SpamTrie Sentinel &copy; {new Date().getFullYear()} &middot; Advanced spam detection using trie data structures
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
