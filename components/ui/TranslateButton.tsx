'use client';

import { useEffect, useState } from 'react';
import { Button } from './button';
import { Languages } from 'lucide-react';

type TextNode = {
  node: Text;
  original: string;
};

export default function TranslateButton() {
  const [translated, setTranslated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [textNodes, setTextNodes] = useState<TextNode[]>([]);

  const LANGUAGE_KEY = 'preferred_language';

  const walkDOM = (node: Node, collected: TextNode[]) => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
      collected.push({ node: node as Text, original: node.textContent });
    } else {
      node.childNodes.forEach(child => walkDOM(child, collected));
    }
  };

  const translateToHindi = async () => {
    const nodes: TextNode[] = [];
    const root = document.querySelector('main') || document.body;
    walkDOM(root, nodes);

    const allText = nodes.map(n => n.original).join('\n');

    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: allText, targetLang: 'hi' }),
    });

    const data: { translation?: string; error?: string } = await res.json();

    if (data.translation) {
      const lines = data.translation.split('\n');
      nodes.forEach((item, index) => {
        item.node.textContent = lines[index] || item.original;
      });
      setTextNodes(nodes);
      setTranslated(true);
      localStorage.setItem(LANGUAGE_KEY, 'hi'); 
    } else {
      console.error(data.error);
    }
  };

  const revertToEnglish = () => {
    textNodes.forEach(item => {
      item.node.textContent = item.original;
    });
    setTranslated(false);
    localStorage.setItem(LANGUAGE_KEY, 'en'); 
  };

  const handleToggle = async () => {
    setLoading(true);
    if (translated) {
      revertToEnglish();
    } else {
      await translateToHindi();
    }
    setLoading(false);
  };

  useEffect(() => {
    const preferredLang = localStorage.getItem(LANGUAGE_KEY);
    if (preferredLang === 'hi' && !translated) {
      handleToggle(); 
    }
  }, []); 

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleToggle}
      className="flex items-center gap-2"
    >
      <Languages className="h-4 w-4" />
      {loading
        ? 'Translating...'
        : translated
        ? 'English'
        : 'हिंदी'}
    </Button>
  );
}
  