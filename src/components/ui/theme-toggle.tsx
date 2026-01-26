'use client';

import * as React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';

type ThemeOption = 'light' | 'dark' | 'auto';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  const options: { value: ThemeOption; icon: React.ReactNode }[] = [
    { value: 'light', icon: <Sun className="h-3.5 w-3.5" /> },
    { value: 'auto', icon: <Monitor className="h-3.5 w-3.5" /> },
    { value: 'dark', icon: <Moon className="h-3.5 w-3.5" /> },
  ];

  const currentTheme = theme === 'system' ? 'auto' : (theme as ThemeOption);

  return (
    <div className="relative inline-flex items-center justify-between rounded-lg bg-white/5 p-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => setTheme(option.value === 'auto' ? 'system' : option.value)}
          className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
            currentTheme === option.value 
              ? 'bg-white/10 text-white' 
              : 'text-gray-400 hover:bg-white/5 hover:text-white'
          }`}
          aria-label={`${option.value} theme`}
        >
          {option.icon}
        </button>
      ))}
    </div>
  );
}
