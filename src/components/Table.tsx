import React from 'react';
import {useLanguage} from '../contexts/LanguageContext';
import {getTranslation} from '../i18n';
import {TableData} from '../types';

interface TableRowProps {
    data: TableData;
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('de-DE').format(amount);
};

const TableRow: React.FC<TableRowProps> = ({data}) => {

    return React.createElement('div', {
        className: 'flex items-center border-b border-gray-600 hover:bg-gray-600 transition-colors min-h-[4.5rem]'
    }, [
        React.createElement('div', {
            key: 'logo',
            className: 'flex-auto p-2'
        }, React.createElement('img', {
            src: data.image,
            alt: 'Crest',
            className: 'w-8 h-8 rounded-full object-cover'
        })),

        React.createElement('div', {
            key: 'location',
            className: 'flex-auto p-2 w-16'
        }, React.createElement('p', {
            className: 'text-white'
        }, data.location)),

        React.createElement('div', {
            key: 'amount',
            className: 'flex-auto p-2'
        }, React.createElement('p', {
            className: 'text-green-400 text-right'
        }, formatAmount(data.amount))),

        React.createElement('div', {
            key: 'deadline',
            className: 'flex-auto p-2 w-8'
        }, React.createElement('p', {
            className: 'text-sm text-gray-300 text-right'
        }, formatDate(data.deadline))),

        React.createElement('div', {
            key: 'button',
            className: 'p-2'
        }, React.createElement('a', {
            href: data.url,
            target: '_blank',
            rel: 'noopener noreferrer',
            className: 'inline-flex items-center justify-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors w-full'
        }, 'View'))
    ]);
}

interface TableProps {
    data: TableData[];
}

const Table: React.FC<TableProps> = ({data}) => {
    const {language} = useLanguage();
    const t = (key: string) => getTranslation(language, key);
    return React.createElement('div', {
        className: 'w-full bg-gray-700 rounded-lg shadow-md overflow-hidden'
    }, [
        React.createElement('div', {
            key: 'header',
            className: 'flex items-center bg-gray-600 border-b border-gray-500 font-semibold text-gray-200'
        }, [
            React.createElement('div', {
                key: 'header-logo',
                className: 'flex-auto p-2'
            }, React.createElement('span', {
                className: 'text-sm text-gray-200'
            }, t('table.headers.crest'))),

            React.createElement('div', {
                key: 'header-location',
                className: 'flex-auto p-2 w-16'
            }, React.createElement('span', {
                className: 'text-sm text-gray-200 text-right'
            }, t('table.headers.location'))),

            React.createElement('div', {
                key: 'header-amount',
                className: 'flex-auto p-2'
            }, React.createElement('p', {
                className: 'text-sm text-green-400 text-right'
            }, t('table.headers.amount'))),

            React.createElement('div', {
                key: 'header-deadline',
                className: 'flex-auto p-2 w-8'
            }, React.createElement('p', {
                className: 'text-sm text-gray-300 text-right'
            }, t('table.headers.deadline'))),

            React.createElement('div', {
                key: 'header-action',
                className: 'p-2'
            }, React.createElement('span', {
                className: 'text-sm text-gray-200'
            }, t('table.headers.view')))
        ]),

        React.createElement('div', {
                key: 'body',
                className: 'divide-y divide-gray-600'
            }, data.map((row, index) =>
                React.createElement(TableRow, {
                    key: index,
                    data: row
                }))
        )
    ]);
};

export default Table;