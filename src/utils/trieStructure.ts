// Class definition for TrieNode
class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  spamScore: number;
  category?: string;

  constructor() {
    this.children = new Map<string, TrieNode>();
    this.isEndOfWord = false;
    this.spamScore = 0;
    this.category = undefined;
  }
}

// Statistics tracking interface
export interface SpamStatistics {
  totalMessages: number;
  spamMessages: number;
  safeMessages: number;
  avgConfidence: number;
  detectionsByDay: {
    [date: string]: {
      spam: number;
      safe: number;
    }
  };
  detectionsByCategory: {
    [category: string]: number;
  };
  history: Array<{
    text: string;
    isSpam: boolean;
    confidence: number;
    detectedWords: string[];
    category: string;
    timestamp: Date;
  }>;
}

// Class definition for Trie
export class Trie {
  root: TrieNode;
  spamWords: Array<{ word: string; score: number; category: string }>;
  statistics: SpamStatistics;

  constructor() {
    this.root = new TrieNode();
    this.spamWords = [
      // Phishing category
      { word: "account", score: 0.6, category: "phishing" },
      { word: "verify", score: 0.7, category: "phishing" },
      { word: "login", score: 0.5, category: "phishing" },
      { word: "password", score: 0.8, category: "phishing" },
      { word: "security", score: 0.5, category: "phishing" },
      { word: "bank", score: 0.6, category: "phishing" },
      { word: "update", score: 0.5, category: "phishing" },
      { word: "information", score: 0.4, category: "phishing" },
      { word: "suspended", score: 0.8, category: "phishing" },
      { word: "unusual", score: 0.6, category: "phishing" },
      { word: "restore", score: 0.6, category: "phishing" },
      { word: "restricted", score: 0.7, category: "phishing" },
      // Additional phishing words
      { word: "alert", score: 0.6, category: "phishing" },
      { word: "unauthorized", score: 0.8, category: "phishing" },
      { word: "confirm", score: 0.6, category: "phishing" },
      { word: "paypal", score: 0.7, category: "phishing" },
      { word: "apple", score: 0.5, category: "phishing" },
      { word: "google", score: 0.5, category: "phishing" },
      { word: "microsoft", score: 0.5, category: "phishing" },
      { word: "identity", score: 0.7, category: "phishing" },
      { word: "expire", score: 0.7, category: "phishing" },
      { word: "authentication", score: 0.6, category: "phishing" },
      { word: "deactivated", score: 0.8, category: "phishing" },
      { word: "compromised", score: 0.8, category: "phishing" },
      { word: "validation", score: 0.6, category: "phishing" },
      { word: "credentials", score: 0.8, category: "phishing" },
      { word: "webmaster", score: 0.7, category: "phishing" },
      { word: "administrat", score: 0.7, category: "phishing" },
      
      // Financial/Scam category
      { word: "urgent", score: 0.8, category: "financial" },
      { word: "money", score: 0.7, category: "financial" },
      { word: "cash", score: 0.6, category: "financial" },
      { word: "credit", score: 0.5, category: "financial" },
      { word: "loan", score: 0.6, category: "financial" },
      { word: "debt", score: 0.6, category: "financial" },
      { word: "invest", score: 0.5, category: "financial" },
      { word: "investment", score: 0.6, category: "financial" },
      { word: "bitcoin", score: 0.8, category: "financial" },
      { word: "cryptocurrency", score: 0.8, category: "financial" },
      { word: "wire", score: 0.7, category: "financial" },
      { word: "transfer", score: 0.6, category: "financial" },
      { word: "dollar", score: 0.5, category: "financial" },
      { word: "prince", score: 0.9, category: "financial" },
      { word: "inheritance", score: 0.8, category: "financial" },
      // Additional financial/scam words
      { word: "million", score: 0.8, category: "financial" },
      { word: "lottery", score: 0.9, category: "financial" },
      { word: "jackpot", score: 0.9, category: "financial" },
      { word: "millionaire", score: 0.8, category: "financial" },
      { word: "fortune", score: 0.7, category: "financial" },
      { word: "fund", score: 0.5, category: "financial" },
      { word: "beneficiary", score: 0.8, category: "financial" },
      { word: "transaction", score: 0.6, category: "financial" },
      { word: "donation", score: 0.5, category: "financial" },
      { word: "charity", score: 0.5, category: "financial" },
      { word: "stock", score: 0.6, category: "financial" },
      { word: "market", score: 0.4, category: "financial" },
      { word: "crypto", score: 0.7, category: "financial" },
      { word: "ethereum", score: 0.7, category: "financial" },
      { word: "wallet", score: 0.6, category: "financial" },
      { word: "deposit", score: 0.6, category: "financial" },
      { word: "profits", score: 0.7, category: "financial" },
      { word: "commission", score: 0.6, category: "financial" },
      { word: "banker", score: 0.6, category: "financial" },
      { word: "offshore", score: 0.8, category: "financial" },
      { word: "payment", score: 0.5, category: "financial" },
      
      // Prize/Promotional category
      { word: "winner", score: 0.8, category: "promotional" },
      { word: "congratulations", score: 0.7, category: "promotional" },
      { word: "prize", score: 0.8, category: "promotional" },
      { word: "offer", score: 0.6, category: "promotional" },
      { word: "free", score: 0.7, category: "promotional" },
      { word: "deal", score: 0.5, category: "promotional" },
      { word: "limited", score: 0.6, category: "promotional" },
      { word: "claim", score: 0.7, category: "promotional" },
      { word: "click", score: 0.6, category: "promotional" },
      { word: "buy", score: 0.4, category: "promotional" },
      { word: "discount", score: 0.5, category: "promotional" },
      { word: "opportunity", score: 0.5, category: "promotional" },
      { word: "selected", score: 0.6, category: "promotional" },
      { word: "subscription", score: 0.5, category: "promotional" },
      // Additional promotional words
      { word: "exclusive", score: 0.6, category: "promotional" },
      { word: "guaranteed", score: 0.7, category: "promotional" },
      { word: "instant", score: 0.6, category: "promotional" },
      { word: "amazing", score: 0.6, category: "promotional" },
      { word: "bonus", score: 0.7, category: "promotional" },
      { word: "gift", score: 0.6, category: "promotional" },
      { word: "reward", score: 0.6, category: "promotional" },
      { word: "voucher", score: 0.6, category: "promotional" },
      { word: "coupon", score: 0.5, category: "promotional" },
      { word: "iphone", score: 0.7, category: "promotional" },
      { word: "samsung", score: 0.6, category: "promotional" },
      { word: "smartphone", score: 0.5, category: "promotional" },
      { word: "trial", score: 0.5, category: "promotional" },
      { word: "access", score: 0.4, category: "promotional" },
      { word: "exclusive", score: 0.5, category: "promotional" },
      { word: "sale", score: 0.4, category: "promotional" },
      { word: "clearance", score: 0.5, category: "promotional" },
      { word: "lucky", score: 0.7, category: "promotional" },
      { word: "chance", score: 0.5, category: "promotional" },
      
      // Malware category
      { word: "attachment", score: 0.7, category: "malware" },
      { word: "download", score: 0.6, category: "malware" },
      { word: "document", score: 0.4, category: "malware" },
      { word: "file", score: 0.4, category: "malware" },
      { word: "invoice", score: 0.5, category: "malware" },
      { word: "executable", score: 0.9, category: "malware" },
      { word: "zip", score: 0.7, category: "malware" },
      { word: "install", score: 0.6, category: "malware" },
      // Additional malware words
      { word: "virus", score: 0.9, category: "malware" },
      { word: "malware", score: 0.9, category: "malware" },
      { word: "trojan", score: 0.9, category: "malware" },
      { word: "infected", score: 0.8, category: "malware" },
      { word: "ransomware", score: 0.9, category: "malware" },
      { word: "antivirus", score: 0.7, category: "malware" },
      { word: "spyware", score: 0.9, category: "malware" },
      { word: "backdoor", score: 0.8, category: "malware" },
      { word: "vulnerability", score: 0.7, category: "malware" },
      { word: "patch", score: 0.6, category: "malware" },
      { word: "threat", score: 0.7, category: "malware" },
      { word: "exploit", score: 0.8, category: "malware" },
      { word: "hack", score: 0.8, category: "malware" },
      { word: "hacker", score: 0.8, category: "malware" },
      { word: "breach", score: 0.7, category: "malware" },
      { word: "scan", score: 0.5, category: "malware" },
      { word: "malicious", score: 0.8, category: "malware" },
      { word: "keylogger", score: 0.9, category: "malware" },
      { word: "botnet", score: 0.9, category: "malware" },
      { word: "rootkit", score: 0.9, category: "malware" }
    ];
    
    this.statistics = {
      totalMessages: 0,
      spamMessages: 0,
      safeMessages: 0,
      avgConfidence: 0,
      detectionsByDay: {},
      detectionsByCategory: {
        phishing: 0,
        financial: 0,
        promotional: 0,
        malware: 0
      },
      history: []
    };
    
    this.initializeTrie();
    this.loadStoredStatistics();
  }

  // Load statistics from localStorage if available
  private loadStoredStatistics(): void {
    const storedStats = localStorage.getItem('spamTrieStatistics');
    if (storedStats) {
      try {
        const parsedStats = JSON.parse(storedStats);
        
        // Convert string dates back to Date objects in history
        if (parsedStats.history) {
          parsedStats.history = parsedStats.history.map((item: any) => ({
            ...item,
            timestamp: new Date(item.timestamp)
          }));
        }
        
        this.statistics = parsedStats;
      } catch (e) {
        console.error("Error loading statistics:", e);
        // Keep default statistics
      }
    }
  }

  // Save current statistics to localStorage
  private saveStatistics(): void {
    try {
      localStorage.setItem('spamTrieStatistics', JSON.stringify(this.statistics));
    } catch (e) {
      console.error("Error saving statistics:", e);
    }
  }

  // Initialize the trie with spam words
  private initializeTrie(): void {
    for (const { word, score, category } of this.spamWords) {
      this.insert(word, score, category);
    }
  }

  // Insert a word into the trie
  insert(word: string, score: number, category?: string): void {
    let current = this.root;
    
    for (const char of word.toLowerCase()) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char)!;
    }
    
    current.isEndOfWord = true;
    current.spamScore = score;
    if (category) current.category = category;
  }

  // Search for a word in the trie
  search(word: string): { found: boolean; score: number; category?: string } {
    let current = this.root;
    
    for (const char of word.toLowerCase()) {
      if (!current.children.has(char)) {
        return { found: false, score: 0 };
      }
      current = current.children.get(char)!;
    }
    
    return { 
      found: current.isEndOfWord, 
      score: current.spamScore,
      category: current.category
    };
  }

  // For visualization: get the trie structure as a nested object
  getStructure(): any {
    const traverseNode = (node: TrieNode): any => {
      const result: any = {
        isEndOfWord: node.isEndOfWord,
        spamScore: node.spamScore,
        category: node.category,
        children: {}
      };
      
      for (const [char, childNode] of node.children.entries()) {
        result.children[char] = traverseNode(childNode);
      }
      
      return result;
    };
    
    return traverseNode(this.root);
  }

  // Get or calculate stats for display/analytics
  getStatistics(): SpamStatistics {
    return this.statistics;
  }

  // Analyze text for spam content with improved detection
  analyzeText(text: string): { 
    isSpam: boolean; 
    score: number; 
    detectedWords: string[];
    detectedCategories: Record<string, number>;
    primaryCategory: string;
    confidence: number;
  } {
    const words = text.toLowerCase().split(/\s+/);
    let totalScore = 0;
    const detectedWords: string[] = [];
    const detectedCategories: Record<string, number> = {
      phishing: 0,
      financial: 0,
      promotional: 0,
      malware: 0
    };
    
    // Search common spam patterns
    for (const word of words) {
      const cleanWord = word.replace(/[^\w]/g, '');
      if (cleanWord.length > 2) { // Ignore very short words
        const result = this.search(cleanWord);
        if (result.found) {
          totalScore += result.score;
          detectedWords.push(cleanWord);
          
          // Track category scores
          if (result.category) {
            detectedCategories[result.category] += result.score;
          }
        }
      }
    }
    
    // Check for additional patterns
    // URLs (with different weights for different domains)
    const urlMatches = text.match(/https?:\/\/[^\s]+/g) || [];
    if (urlMatches.length > 0) {
      totalScore += urlMatches.length * 0.5;
      
      // Check for suspicious TLDs
      const suspiciousTLDs = /(\.info|\.xyz|\.top|\.loan|\.stream|\.gq|\.cf|\.tk|\.ml)/i;
      for (const url of urlMatches) {
        if (suspiciousTLDs.test(url)) {
          totalScore += 0.8;
          detectedCategories.malware += 0.8;
        }
      }
    }
    
    // Check for excessive punctuation and capitalization
    const excessivePunctuation = (text.match(/[!?$]/g) || []).length > 3;
    if (excessivePunctuation) {
      totalScore += 0.5;
      detectedCategories.promotional += 0.3;
    }
    
    // Check for ALL CAPS text
    const allCapsWords = words.filter(w => w.length > 3 && w === w.toUpperCase()).length;
    if (allCapsWords > 2) {
      totalScore += 0.3 + (allCapsWords - 2) * 0.1; // More ALL CAPS = higher score
      detectedCategories.promotional += 0.3;
    }
    
    // Check for monetary patterns
    const moneyPattern = /\$\d+[,\d]*(\.\d+)?|\d+[,\d]*(\.\d+)?\s*(?:dollars|usd|euro|eur|gbp|£|€)/i;
    const moneyMatches = text.match(moneyPattern) || [];
    if (moneyMatches.length > 0) {
      totalScore += moneyMatches.length * 0.5;
      detectedCategories.financial += moneyMatches.length * 0.5;
    }
    
    // Check for common phishing phrases
    const phishingPhrases = [
      "verify your account",
      "update your information",
      "confirm your identity",
      "unusual activity",
      "suspicious login",
      "limited time",
      "act now"
    ];
    
    for (const phrase of phishingPhrases) {
      if (text.toLowerCase().includes(phrase)) {
        totalScore += 0.7;
        detectedWords.push(phrase);
        detectedCategories.phishing += 0.7;
      }
    }
    
    // Calculate spam confidence (0-100%)
    const baseThreshold = 2.0;
    const confidence = Math.min(100, Math.round((totalScore / baseThreshold) * 100));
    
    // Determine primary spam category
    let primaryCategory = "none";
    let highestCategoryScore = 0;
    
    for (const category in detectedCategories) {
      if (detectedCategories[category] > highestCategoryScore) {
        highestCategoryScore = detectedCategories[category];
        primaryCategory = category;
      }
    }
    
    // Update statistics
    const today = new Date().toISOString().split('T')[0];
    const isSpam = totalScore >= baseThreshold;
    
    // Update statistics counters
    this.statistics.totalMessages++;
    
    if (isSpam) {
      this.statistics.spamMessages++;
      if (primaryCategory !== "none") {
        this.statistics.detectionsByCategory[primaryCategory]++;
      }
    } else {
      this.statistics.safeMessages++;
    }
    
    // Update daily stats
    if (!this.statistics.detectionsByDay[today]) {
      this.statistics.detectionsByDay[today] = { spam: 0, safe: 0 };
    }
    
    if (isSpam) {
      this.statistics.detectionsByDay[today].spam++;
    } else {
      this.statistics.detectionsByDay[today].safe++;
    }
    
    // Update average confidence
    this.statistics.avgConfidence = (
      (this.statistics.avgConfidence * (this.statistics.totalMessages - 1) + confidence) / 
      this.statistics.totalMessages
    );
    
    // Add to history
    const historyEntry = {
      text: text.length > 200 ? text.substring(0, 200) + "..." : text,
      isSpam,
      confidence,
      detectedWords,
      category: primaryCategory,
      timestamp: new Date()
    };
    
    this.statistics.history = [historyEntry, ...this.statistics.history].slice(0, 100); // Keep last 100
    
    // Save updated statistics
    this.saveStatistics();
    
    return {
      isSpam,
      score: totalScore,
      detectedWords,
      detectedCategories,
      primaryCategory: primaryCategory !== "none" ? primaryCategory : "",
      confidence
    };
  }
  
  // Clear all statistics (for reset/testing)
  clearStatistics(): void {
    this.statistics = {
      totalMessages: 0,
      spamMessages: 0,
      safeMessages: 0,
      avgConfidence: 0,
      detectionsByDay: {},
      detectionsByCategory: {
        phishing: 0,
        financial: 0,
        promotional: 0,
        malware: 0
      },
      history: []
    };
    this.saveStatistics();
  }
}

// Export a singleton instance
export const spamTrie = new Trie();

// Utility for demo data
export const sampleSpamMessages = [
  "CONGRATULATIONS! You've won $5,000,000 in our lottery! Click here to claim your PRIZE now!",
  "Urgent: Your account has been compromised. Verify your password immediately to avoid suspension.",
  "Dear Friend, I am Prince Abdullah and I need your help transferring $15,000,000. Please send your bank details.",
  "FREE iPhone 13 Pro! You are our lucky visitor today. Claim your gift in the next 10 minutes!",
  "Investment opportunity: Double your Bitcoin in just 24 hours! Limited offer, act NOW!",
  "Your PayPal account has been limited. Please verify your information by clicking: https://pa.ypal-verify.xyz/account",
  "ATTENTION: Your tax refund of $1,487.23 is ready for direct deposit. Confirm your banking details here.",
  "Your package delivery has failed. Click to reschedule: tracking-delivery-status.info/package",
  "WARNING: Your computer has been infected with a virus! Download this security patch immediately."
];

export const sampleNormalMessages = [
  "Hi there, just checking if we're still meeting for coffee tomorrow at 10am?",
  "The quarterly report is ready for review. Let me know your thoughts when you have time.",
  "Could you please send me the document we discussed in the meeting yesterday?",
  "Happy birthday! Wishing you all the best on your special day.",
  "The project deadline has been extended to next Friday. Let me know if you need any help.",
  "Just a reminder that we have a team lunch scheduled for tomorrow at 12:30pm.",
  "Thanks for sending the files over. I'll review them and get back to you by end of day.",
  "Can you please confirm that you received my previous email with the contract attached?",
  "The office will be closed on Monday for the public holiday. See you all on Tuesday!"
];
