import React, { useState, useEffect } from 'react';
import Table from './components/Table';
import LanguageSwitcher from './components/LanguageSwitcher';
import { LanguageProvider } from './contexts/LanguageContext';
import { TableData } from './types';
import { useLanguage } from './contexts/LanguageContext';
import { getTranslation } from './i18n';
import data from './data.json';

const AppContent: React.FC = () => {
  const { language } = useLanguage();
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const t = (key: string) => getTranslation(language, key);

  useEffect(() => {
    const loadData = async () => {
      try {
        setTableData(data as TableData[]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return React.createElement('div', {
      className: 'min-h-screen bg-gray-800 flex items-center justify-center'
    }, React.createElement('div', {
      className: 'text-center'
    }, [
      React.createElement('div', {
        key: 'spinner',
        className: 'animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'
      }),
      React.createElement('p', {
        key: 'loading-text',
        className: 'mt-4 text-gray-300'
      }, t('table.loading'))
    ]));
  }

  if (error) {
    return React.createElement('div', {
      className: 'min-h-screen bg-gray-800 flex items-center justify-center'
    }, React.createElement('div', {
      className: 'text-center'
    }, [
      React.createElement('div', {
        key: 'error-title',
        className: 'text-red-600 text-xl font-semibold mb-2'
      }, t('table.title') + ' - ' + t('table.loading')),
      React.createElement('p', {
        key: 'error-message',
        className: 'text-gray-300'
      }, error)
    ]));
  }

  return React.createElement('div', {
    className: 'min-h-screen bg-gray-800 py-4 sm:py-8 px-4 sm:px-6 lg:px-8'
  }, [
    React.createElement(LanguageSwitcher, {
      key: 'language-switcher'
    }),
    React.createElement('div', {
      className: 'w-full max-w-4xl mx-auto lg:w-4/5 xl:w-3/4'
    }, [
      React.createElement('div', {
        key: 'header',
        className: 'mb-6 sm:mb-8'
      }, [
        React.createElement('h1', {
          key: 'title',
          className: 'text-2xl sm:text-3xl font-bold text-white mb-2'
        }, t('dashboard.title')),
        React.createElement('p', {
          key: 'subtitle',
          className: 'text-sm sm:text-base text-gray-300'
        }, t('dashboard.subtitle'))
      ]),
      React.createElement('div', {
        key: 'table-container',
        className: 'bg-gray-700 rounded-lg shadow-sm p-4 sm:p-6'
      }, [
        React.createElement('div', {
          key: 'table-header',
          className: 'mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between'
        }, [
          React.createElement('h2', {
            key: 'table-title',
            className: 'text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-0'
          }, `${t('table.title')} (${tableData.length})`),
          React.createElement('div', {
            key: 'last-updated',
            className: 'text-sm text-gray-400'
          }, `${t('table.lastUpdated')}: ${new Date().toLocaleDateString('en-GB')}`)
        ]),
        React.createElement(Table, {
          key: 'table',
          data: tableData
        })
      ])
    ])
  ]);
};

const App: React.FC = () => {
  return React.createElement(LanguageProvider, null,
    React.createElement(AppContent, null)
  );
};

export default App;