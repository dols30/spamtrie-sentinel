
import React, { useEffect, useState } from 'react';
import { AlertTriangle, Check, Info, X } from 'lucide-react';
import TrieVisualizer from './TrieVisualizer';

interface ResultCardProps {
  result: {
    isSpam: boolean;
    score: number;
    detectedWords: string[];
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
            <AlertTriangle className={`w-5 h-5 ${
              result.isSpam ? 'text-destructive' : 'text-green-500'
            }`} />
          ) : (
            <Check className="w-5 h-5 text-green-500" />
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium">
            {result.isSpam ? 'Spam Detected' : 'No Spam Detected'}
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
            
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-secondary/50">
                <h5 className="text-xs font-medium text-muted-foreground mb-1">Spam Score</h5>
                <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={`absolute top-0 left-0 h-full transition-all duration-1000 ease-out ${
                      result.isSpam ? 'bg-destructive' : 'bg-green-500'
                    }`}
                    style={{ 
                      width: animationComplete ? `${Math.min(100, result.confidence)}%` : '0%' 
                    }}
                  />
                </div>
                <div className="mt-1 flex justify-between items-center">
                  <span className="text-xs">{Math.round(result.score * 10) / 10}</span>
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
                  <div className="flex flex-wrap gap-1 mt-1">
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
