'use client';

import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import { useState } from 'react';

export function LanguageToggle() {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2"
    >
      <Languages className="h-4 w-4" />
      {language === 'en' ? 'हिंदी' : 'English'}
    </Button>
  );
}