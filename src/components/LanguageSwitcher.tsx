import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../i18n';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'it' : 'en');
  };

  return React.createElement('button', {
    onClick: toggleLanguage,
    className: 'fixed top-4 right-4 z-50 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-md border border-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
  }, React.createElement('span', {
    className: 'flex items-center gap-1'
  }, [
    React.createElement('span', {
      key: 'flag'
    }, language === 'en' ? '🇬🇧' : '🇮🇹'),
    React.createElement('span', {
      key: 'text'
    }, language.toUpperCase())
  ]));
};

export default LanguageSwitcher;