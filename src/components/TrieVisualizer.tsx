import { spamTrie } from '@/utils/trieStructure';
const TrieVisualizer = ({ highlightedWords }: { highlightedWords: string[] }) => {
  const words = highlightedWords.filter(word => spamTrie.search(word).found).slice(0, 3);
  if (!words.length) return null;
  return (
    <div className="trie-paths">
      <h4>Matched trie paths</h4>
      {words.map(word => <div className="trie-path" key={word} aria-label={`Character path for ${word}`}><span className="trie-root">root</span>{[...word].map((char, index) => <span aria-hidden="true" key={index}>{char}</span>)}</div>)}
    </div>
  );
};
export default TrieVisualizer;
