import React, { useEffect, useState } from 'react';
import { AlertTriangle, Check, Info, X, Shield, BarChart, DollarSign, BellRing, Bug } from 'lucide-react';
import TrieVisualizer from './TrieVisualizer';
import { Progress } from '@/components/ui/progress';

interface ResultCardProps {
  result: {
    isSpam: boolean;
    score: number;
    detectedWords: string[];
    detectedCategories?: Record<string, number>;
    primaryCategory?: string;
    confidence: number;
    text: string;
    timestamp: Date;
  };
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const [showVisualization, setShowVisualization] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  // Highlighted text with detected spam words
  const getHighlightedText = () => {
    if (!result.detectedWords.length) return result.text;
    
    let text = result.text;
    const words = [...result.detectedWords].sort((a, b) => b.length - a.length); // Sort by length to prevent partial replacements
    
    for (const word of words) {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      text = text.replace(regex, match => `<span class="bg-destructive/20 text-destructive font-medium px-1 rounded">${match}</span>`);
    }
    
    return text;
  };
  
  // Show animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Helper to get category labels
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'phishing': return 'Phishing Attempt';
      case 'financial': return 'Financial Scam';
      case 'promotional': return 'Promotional Spam';
      case 'malware': return 'Potential Malware';
      default: return 'Spam';
    }
  };

  // Helper to get category icons
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'phishing':
        return <Shield className="w-4 h-4 text-blue-500" />;
      case 'financial':
        return <DollarSign className="w-4 h-4 text-amber-500" />;
      case 'promotional':
        return <BellRing className="w-4 h-4 text-purple-500" />;
      case 'malware':
        return <Bug className="w-4 h-4 text-red-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
    }
  };
  
  return (
    <div className="mt-8 glass rounded-2xl overflow-hidden animate-fade-in">
      <div 
        className={`p-4 flex items-center space-x-3 transition-colors ${
          result.isSpam ? 'bg-destructive/10' : 'bg-green-500/10'
        }`}
      >
        <div className={`p-2 rounded-full ${
          result.isSpam ? 'bg-destructive/20' : 'bg-green-500/20'
        }`}>
          {result.isSpam ? (
            result.primaryCategory ? getCategoryIcon(result.primaryCategory) : 
            <AlertTriangle className="w-5 h-5 text-destructive" />
          ) : (
            <Check className="w-5 h-5 text-green-500" />
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium">
            {result.isSpam ? (
              result.primaryCategory ? 
                `${getCategoryLabel(result.primaryCategory)} Detected` : 
                'Spam Detected'
            ) : 'No Spam Detected'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {result.isSpam 
              ? `Spam confidence: ${result.confidence}%` 
              : 'This message appears to be legitimate'
            }
          </p>
        </div>
        
        <div>
          <button 
            onClick={() => setShowVisualization(!showVisualization)}
            className="p-2 rounded-full hover:bg-white/30 transition-colors"
            title="Toggle trie visualization"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <h4 className="text-sm font-medium text-muted-foreground mb-1">Analysis Results</h4>
          
          <div className="space-y-3">
            <div>
              <div 
                className="p-4 rounded-lg bg-secondary/50 text-foreground/90 text-sm overflow-auto max-h-40"
                dangerouslySetInnerHTML={{ __html: getHighlightedText() }}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-secondary/50">
                <h5 className="text-xs font-medium text-muted-foreground mb-1">Spam Score</h5>
                <Progress 
                  value={animationComplete ? Math.min(100, result.confidence) : 0}
                  className={`h-2 ${result.isSpam ? 'bg-destructive/30' : 'bg-green-500/30'}`}
                />
                <div className="mt-1 flex justify-between items-center">
                  <span className="text-xs">{Math.round(result.score * 10) / 10} score</span>
                  <span className="text-xs font-medium">
                    {result.confidence}% {result.isSpam ? 'Likely Spam' : 'Safe'}
                  </span>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-secondary/50">
                <h5 className="text-xs font-medium text-muted-foreground mb-1">
                  {result.detectedWords.length ? 'Detected Spam Words' : 'No Spam Words Detected'}
                </h5>
                {result.detectedWords.length ? (
                  <div className="flex flex-wrap gap-1 mt-1 max-h-20 overflow-y-auto">
                    {result.detectedWords.map((word, index) => (
                      <span 
                        key={index}
                        className="text-xs px-2 py-0.5 rounded-full bg-destructive/20 text-destructive"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground mt-2">
                    No suspicious words were found in this message.
                  </div>
                )}
              </div>
            </div>

            {/* Show Category Breakdown if Spam */}
            {result.isSpam && result.detectedCategories && (
              <div className="p-4 rounded-lg bg-secondary/50">
                <h5 className="text-xs font-medium text-muted-foreground mb-3">Spam Category Analysis</h5>
                
                <div className="space-y-3">
                  {Object.keys(result.detectedCategories).map(category => {
                    const score = result.detectedCategories![category];
                    if (score <= 0) return null;
                    
                    let barColor = 'bg-gray-400';
                    switch (category) {
                      case 'phishing': barColor = 'bg-blue-500'; break;
                      case 'financial': barColor = 'bg-amber-500'; break;
                      case 'promotional': barColor = 'bg-purple-500'; break;
                      case 'malware': barColor = 'bg-red-600'; break;
                    }
                    
                    // Convert score to percentage (max score assumed to be 3.0)
                    const percentage = Math.min(100, Math.round(score * 33.3));
                    
                    return (
                      <div key={category}>
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center space-x-1">
                            {getCategoryIcon(category)}
                            <span className="text-xs font-medium">{getCategoryLabel(category)}</span>
                          </div>
                          <span className="text-xs">{score.toFixed(1)}</span>
                        </div>
                        <Progress
                          value={animationComplete ? percentage : 0}
                          className="h-1.5 bg-secondary"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Safety Tips if Spam */}
            {result.isSpam && (
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <h5 className="text-xs font-medium text-destructive mb-2">Safety Tips</h5>
                <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1">
                  <li>Don't click on links or download attachments from suspicious messages</li>
                  <li>Don't reply with personal or financial information</li>
                  <li>Report spam messages to help improve detection systems</li>
                  {result.primaryCategory === 'phishing' && (
                    <li>Verify requests for information by contacting the company directly through their official website</li>
                  )}
                  {result.primaryCategory === 'financial' && (
                    <li>Legitimate financial institutions will never ask for sensitive information via email or messages</li>
                  )}
                  {result.primaryCategory === 'malware' && (
                    <li>Keep your antivirus software updated and scan any downloaded files before opening</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        {showVisualization && (
          <div className="mt-4 border-t border-border pt-4 animate-fade-in">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-medium">Trie Visualization</h4>
              <button 
                onClick={() => setShowVisualization(false)}
                className="p-1 rounded-full hover:bg-secondary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4 overflow-auto">
              <TrieVisualizer highlightedWords={result.detectedWords} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
