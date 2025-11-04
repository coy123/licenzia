import enTranslations from './locales/en.json';
import itTranslations from './locales/it.json';

export type Language = 'en' | 'it';

export interface Translations {
  dashboard: {
    title: string;
    subtitle: string;
  };
  table: {
    title: string;
    headers: {
      crest: string;
      location: string;
      amount: string;
      deadline: string;
      view: string;
    };
    loading: string;
    lastUpdated: string;
  };
  language: {
    switch: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: enTranslations,
  it: itTranslations,
};

export const defaultLanguage: Language = 'en';

export const getTranslation = (language: Language, key: string): string => {
  const keys = key.split('.');
  let value: any = translations[language];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
};