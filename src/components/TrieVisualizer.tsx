
import React, { useEffect, useRef } from 'react';
import { spamTrie } from '../utils/trieStructure';

interface TrieVisualizerProps {
  highlightedWords: string[];
}

const TrieVisualizer: React.FC<TrieVisualizerProps> = ({ highlightedWords }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Simplified visualization - just show a representation of the detection process
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw nodes
    const drawNode = (x: number, y: number, radius: number, text: string, highlighted: boolean) => {
      // Draw circle
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      
      if (highlighted) {
        ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.8)';
      } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.strokeStyle = 'rgba(203, 213, 225, 0.8)';
      }
      
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.stroke();
      
      // Draw text
      ctx.fillStyle = highlighted ? 'rgba(239, 68, 68, 1)' : 'rgba(30, 41, 59, 0.8)';
      ctx.font = '14px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, x, y);
    };
    
    // Draw line
    const drawLine = (x1: number, y1: number, x2: number, y2: number, highlighted: boolean) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = highlighted ? 'rgba(239, 68, 68, 0.6)' : 'rgba(203, 213, 225, 0.6)';
      ctx.lineWidth = highlighted ? 2 : 1;
      ctx.stroke();
    };
    
    // Draw a simplified trie visualization with sample paths
    const rootX = canvas.width / 2;
    const rootY = 50;
    const radius = 20;
    const levelHeight = 60;
    const spreadFactor = 100;
    
    // Draw root
    drawNode(rootX, rootY, radius, 'root', false);
    
    // Selected suspicious words to visualize from the trie
    const words = highlightedWords.length > 0 
      ? highlightedWords.slice(0, 3) // Use detected words
      : ['spam', 'free', 'offer']; // Default words
    
    words.forEach((word, wordIndex) => {
      let currentX = rootX;
      let currentY = rootY;
      const angleOffset = (wordIndex - (words.length - 1) / 2) * 0.4;
      
      for (let i = 0; i < word.length; i++) {
        const nextX = rootX + Math.sin(angleOffset) * spreadFactor * (i + 1);
        const nextY = rootY + levelHeight * (i + 1);
        
        // Draw line to next node
        drawLine(currentX, currentY, nextX, nextY, true);
        
        // Draw next character node
        drawNode(nextX, nextY, radius, word[i], true);
        
        currentX = nextX;
        currentY = nextY;
      }
    });
    
    // Add some random non-highlighted branches for visual complexity
    const randomBranches = [
      { chars: 'hello', angle: -0.8 },
      { chars: 'good', angle: 0.8 },
    ];
    
    randomBranches.forEach(branch => {
      let currentX = rootX;
      let currentY = rootY;
      
      for (let i = 0; i < branch.chars.length; i++) {
        const nextX = rootX + Math.sin(branch.angle) * spreadFactor * (i + 1);
        const nextY = rootY + levelHeight * (i + 1);
        
        // Draw line to next node
        drawLine(currentX, currentY, nextX, nextY, false);
        
        // Draw next character node
        drawNode(nextX, nextY, radius, branch.chars[i], false);
        
        currentX = nextX;
        currentY = nextY;
      }
    });
    
  }, [highlightedWords]);
  
  return (
    <div className="w-full">
      <canvas 
        ref={canvasRef} 
        className="w-full" 
        style={{ maxHeight: '300px' }}
      />
      <p className="text-xs text-center text-muted-foreground mt-2">
        Simplified visualization of the Trie structure used for spam detection
      </p>
    </div>
  );
};

export default TrieVisualizer;
