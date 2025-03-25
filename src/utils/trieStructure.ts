
// Class definition for TrieNode
class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  spamScore: number;

  constructor() {
    this.children = new Map<string, TrieNode>();
    this.isEndOfWord = false;
    this.spamScore = 0;
  }
}

// Class definition for Trie
export class Trie {
  root: TrieNode;
  spamWords: string[];

  constructor() {
    this.root = new TrieNode();
    this.spamWords = [
      "urgent", "winner", "congratulations", "money", "prize", 
      "offer", "free", "deal", "limited", "payment", "cash", 
      "credit", "lottery", "investment", "bitcoin", "cryptocurrency",
      "bank", "account", "deposit", "wire", "transfer", "prince",
      "inheritance", "claim", "click", "verify", "password",
      "security", "suspicious", "activity", "login", "verify",
      "restricted", "suspension", "unusual", "notification"
    ];
    this.initializeTrie();
  }

  // Initialize the trie with common spam words
  private initializeTrie(): void {
    for (const word of this.spamWords) {
      this.insert(word, 1); // Add spam word with score 1
    }
  }

  // Insert a word into the trie
  insert(word: string, score: number): void {
    let current = this.root;
    
    for (const char of word.toLowerCase()) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char)!;
    }
    
    current.isEndOfWord = true;
    current.spamScore = score;
  }

  // Search for a word in the trie
  search(word: string): { found: boolean; score: number } {
    let current = this.root;
    
    for (const char of word.toLowerCase()) {
      if (!current.children.has(char)) {
        return { found: false, score: 0 };
      }
      current = current.children.get(char)!;
    }
    
    return { 
      found: current.isEndOfWord, 
      score: current.spamScore 
    };
  }

  // For visualization: get the trie structure as a nested object
  getStructure(): any {
    const traverseNode = (node: TrieNode): any => {
      const result: any = {
        isEndOfWord: node.isEndOfWord,
        spamScore: node.spamScore,
        children: {}
      };
      
      for (const [char, childNode] of node.children.entries()) {
        result.children[char] = traverseNode(childNode);
      }
      
      return result;
    };
    
    return traverseNode(this.root);
  }

  // Analyze text for spam content
  analyzeText(text: string): { 
    isSpam: boolean; 
    score: number; 
    detectedWords: string[];
    confidence: number;
  } {
    const words = text.toLowerCase().split(/\s+/);
    let totalScore = 0;
    const detectedWords: string[] = [];
    
    // Search common spam patterns
    for (const word of words) {
      const cleanWord = word.replace(/[^\w]/g, '');
      if (cleanWord.length > 2) { // Ignore very short words
        const result = this.search(cleanWord);
        if (result.found) {
          totalScore += result.score;
          detectedWords.push(cleanWord);
        }
      }
    }
    
    // Check for additional patterns (URLs, excessive punctuation, etc.)
    const urlPattern = /https?:\/\/[^\s]+/g;
    const urlMatches = text.match(urlPattern) || [];
    totalScore += urlMatches.length * 0.5;
    
    const excessivePunctuation = (text.match(/[!?$]/g) || []).length > 3;
    if (excessivePunctuation) totalScore += 0.5;
    
    const allCaps = words.filter(w => w.length > 3 && w === w.toUpperCase()).length > 3;
    if (allCaps) totalScore += 0.5;
    
    // Calculate spam confidence (0-100%)
    const baseThreshold = 1.5;
    const confidence = Math.min(100, Math.round((totalScore / baseThreshold) * 100));
    
    return {
      isSpam: totalScore >= baseThreshold,
      score: totalScore,
      detectedWords,
      confidence
    };
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
  "Investment opportunity: Double your Bitcoin in just 24 hours! Limited offer, act NOW!"
];

export const sampleNormalMessages = [
  "Hi there, just checking if we're still meeting for coffee tomorrow at 10am?",
  "The quarterly report is ready for review. Let me know your thoughts when you have time.",
  "Could you please send me the document we discussed in the meeting yesterday?",
  "Happy birthday! Wishing you all the best on your special day.",
  "The project deadline has been extended to next Friday. Let me know if you need any help."
];
