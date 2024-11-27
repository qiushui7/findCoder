'use client';
export const dynamic = 'force-dynamic';

import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import languageData from '@/language.json';
import { FilterDropdown } from '../ui/filter-dropdown';

interface RecommendTabsProps {
  activeTab: 'personalized' | 'trending';
  onTabChange: (tab: 'personalized' | 'trending') => void;
  onFilterChange?: (language: string, since: string) => void;
}

interface LanguageOption {
  value: string;
  label: string;
}

const languages = [
  { value: '', label: '全部' },
  ...[
    'JavaScript',
    'TypeScript',
    'Python',
    'Java',
    'Go',
    'Rust',
    'C',
    'C++',
    'PHP',
    'Ruby',
  ]
    .map((lang) => {
      const found = languageData.find((item) => item.name === lang);
      return found ? { value: found.urlParam, label: found.name } : null;
    })
    .filter((lang): lang is LanguageOption => lang !== null),
];

const timeRanges = [
  { value: 'daily', label: '今日' },
  { value: 'weekly', label: '本周' },
  { value: 'monthly', label: '本月' },
];

export function RecommendTabs({
  activeTab,
  onTabChange,
  onFilterChange,
}: RecommendTabsProps) {
  const session = useSession();
  const isAuthenticated = useMemo(() => !!session.data?.user, [session]);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [selectedTime, setSelectedTime] = useState(timeRanges[0]);

  const handleLanguageSelect = (language: LanguageOption) => {
    setSelectedLanguage(language);
    onFilterChange?.(language.value, selectedTime.value);
  };

  const handleTimeSelect = (time: (typeof timeRanges)[0]) => {
    setSelectedTime(time);
    onFilterChange?.(selectedLanguage.value, time.value);
  };

  return (
    <div className="relative flex justify-center items-center mb-8">
      <div className="flex gap-4">
        <button
          onClick={() => onTabChange('trending')}
          className={cn(
            'px-6 py-2 rounded-full border border-borderColor transition-all duration-300',
            activeTab === 'trending'
              ? 'bg-blueBorderColor text-white border-blueBorderColor'
              : 'hover:border-blueBorderColor hover:text-blueBorderColor',
          )}
        >
          热门开发者
        </button>
        <div className="relative group">
          <button
            onClick={() => isAuthenticated && onTabChange('personalized')}
            className={cn(
              'px-6 py-2 rounded-full border transition-all duration-300',
              !isAuthenticated && 'opacity-50 cursor-not-allowed',
              activeTab === 'personalized'
                ? 'bg-blueBorderColor text-white border-blueBorderColor'
                : 'border-borderColor hover:border-blueBorderColor hover:text-blueBorderColor',
            )}
          >
            为你推荐
          </button>
          {!isAuthenticated && (
            <div
              className="absolute left-1/2 -translate-x-1/2 mt-2 w-max px-4 py-2 bg-bgColor rounded-lg 
            border border-borderColor shadow-lg 
            invisible opacity-0 group-hover:visible group-hover:opacity-100 
            transition-all duration-200 z-10"
            >
              <div className="flex items-center gap-2 text-sm text-textColor whitespace-nowrap">
                <Info className="h-4 w-4" />
                <span>请登录后使用个性化推荐功能</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {activeTab === 'trending' && (
        <div className="absolute right-0 flex gap-2">
          <FilterDropdown
            options={languages}
            value={selectedLanguage}
            onChange={handleLanguageSelect}
          />
          <FilterDropdown
            options={timeRanges}
            value={selectedTime}
            onChange={handleTimeSelect}
          />
        </div>
      )}
    </div>
  );
}
