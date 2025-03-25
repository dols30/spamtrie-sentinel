
import React, { useState, useRef, useEffect } from 'react';
import { spamTrie, sampleSpamMessages, sampleNormalMessages } from '../utils/trieStructure';
import { Search, AlertTriangle, Check, Copy, RefreshCw } from 'lucide-react';
import ResultCard from './ResultCard';

interface AnalysisResult {
  isSpam: boolean;
  score: number;
  detectedWords: string[];
  confidence: number;
  text: string;
  timestamp: Date;
}

const SpamDetector: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showExamples, setShowExamples] = useState<boolean>(false);

  const analyzeText = () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate processing delay for UX
    setTimeout(() => {
      const analysis = spamTrie.analyzeText(inputText);
      const newResult = {
        ...analysis,
        text: inputText,
        timestamp: new Date()
      };
      
      setResult(newResult);
      setHistory(prev => [newResult, ...prev].slice(0, 10)); // Keep last 10 entries
      setIsAnalyzing(false);
    }, 800);
  };

  const handleReset = () => {
    setInputText('');
    setResult(null);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const loadExample = (isSpam: boolean) => {
    const examples = isSpam ? sampleSpamMessages : sampleNormalMessages;
    const randomIndex = Math.floor(Math.random() * examples.length);
    setInputText(examples[randomIndex]);
    setShowExamples(false);
  };

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        analyzeText();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputText]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="glass rounded-2xl p-6 shadow-sm animate-scale-in">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Spam Message Detector</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Enter an email or message to analyze for spam
              </p>
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setShowExamples(!showExamples)}
                className="text-sm text-primary hover:underline focus:outline-none"
              >
                Load example
              </button>
              
              {showExamples && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 overflow-hidden glass animate-fade-in">
                  <div 
                    className="px-4 py-2 hover:bg-secondary/50 cursor-pointer transition-colors"
                    onClick={() => loadExample(true)}
                  >
                    <div className="text-sm font-medium">Spam Example</div>
                    <div className="text-xs text-muted-foreground">Load known spam message</div>
                  </div>
                  <div 
                    className="px-4 py-2 hover:bg-secondary/50 cursor-pointer transition-colors"
                    onClick={() => loadExample(false)}
                  >
                    <div className="text-sm font-medium">Normal Example</div>
                    <div className="text-xs text-muted-foreground">Load normal message</div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type or paste your message here..."
              className="w-full h-40 p-4 rounded-lg border border-border bg-white/50 focus:ring-2 focus:ring-primary/20 focus:border-primary/50 focus:outline-none resize-none transition-all"
            />
            
            <div className="absolute bottom-3 right-3 flex space-x-2">
              {inputText && (
                <button
                  onClick={handleReset}
                  className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                  title="Clear"
                >
                  <RefreshCw className="w-4 h-4 text-secondary-foreground" />
                </button>
              )}
              
              <button
                onClick={analyzeText}
                disabled={!inputText.trim() || isAnalyzing}
                className={`px-4 py-2 rounded-full flex items-center space-x-2 transition-all ${
                  !inputText.trim() || isAnalyzing 
                    ? 'bg-secondary text-secondary-foreground cursor-not-allowed' 
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Analyze</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="absolute bottom-3 left-3 text-xs text-muted-foreground">
              {inputText && `${inputText.length} characters · Press ⌘+Enter to analyze`}
            </div>
          </div>
        </div>
      </div>
      
      {result && <ResultCard result={result} />}
      
      {history.length > 0 && !result && (
        <div className="mt-8 glass rounded-2xl p-6 animate-fade-in">
          <h3 className="text-lg font-medium mb-4">Recent Analyses</h3>
          <div className="space-y-2">
            {history.map((item, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/30 cursor-pointer transition-colors"
                onClick={() => {
                  setInputText(item.text);
                  setResult(item);
                }}
              >
                <div className="flex items-center space-x-3">
                  {item.isSpam ? (
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                  ) : (
                    <Check className="w-5 h-5 text-green-500" />
                  )}
                  <div>
                    <p className="text-sm font-medium truncate max-w-md">
                      {item.text.substring(0, 50)}{item.text.length > 50 ? '...' : ''}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(item.timestamp).toLocaleTimeString()} · 
                      {item.isSpam 
                        ? ` Spam (${item.confidence}% confidence)` 
                        : ' Not spam'
                      }
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    className="p-1.5 rounded-full hover:bg-white/80"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(item.text);
                    }}
                    title="Copy message"
                  >
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpamDetector;
