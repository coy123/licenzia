import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'it' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-50 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-md border border-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <span className="flex items-center gap-1">
        <span>{language === 'en' ? '🇬🇧' : '🇮🇹'}</span>
        <span>{language.toUpperCase()}</span>
      </span>
    </button>
  );
};

export default LanguageSwitcher;