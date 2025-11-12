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

const TableRow: React.FC<TableRowProps> = ({data}) => (
    <div className="flex items-center border-b border-gray-600 hover:bg-gray-600 transition-colors min-h-[4.5rem]">
        <div className="p-2 w-12 sm:w-16 flex items-center justify-center">
            <img
                src={data.image}
                alt="Crest"
                className="w-8 h-8 rounded-full object-cover"
            />
        </div>

        <div className="p-2 flex-1 min-w-[10ch]">
            <p className="text-white break-words">{data.location}</p>
        </div>

        <div className="p-2 w-14 sm:w-24 flex justify-end">
            <p className="text-green-400 text-right">{formatAmount(data.amount)}</p>
        </div>

        <div className="p-2 w-20 sm:w-28 flex justify-end">
            <p className="text-sm text-gray-300 text-right">{formatDate(data.deadline)}</p>
        </div>

        <div className="p-2 w-14 sm:w-24 flex justify-end">
            <a
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors w-full sm:w-auto"
            >
                View
            </a>
        </div>
    </div>
);

interface TableProps {
    data: TableData[];
}

const Table: React.FC<TableProps> = ({data}) => {
    const {language} = useLanguage();
    const t = (key: string) => getTranslation(language, key);
    return (
        <div className="w-full bg-gray-700 rounded-lg shadow-md overflow-hidden">
        <div className="flex items-center bg-gray-600 border-b border-gray-500 font-semibold text-gray-200 text-xs sm:text-sm">
            <div className="p-2 w-12 sm:w-16 flex items-center justify-center sm:justify-start">
                <span className="sm:hidden text-base" aria-hidden>🛡️</span>
                <span className="hidden sm:inline text-gray-200">{t('table.headers.crest')}</span>
            </div>

            <div className="p-2 flex-1 min-w-[10ch] flex items-center justify-start">
                <span className="sm:hidden text-base" aria-hidden>📍</span>
                <span className="hidden sm:inline text-gray-200">{t('table.headers.location')}</span>
            </div>

            <div className="p-2 w-14 sm:w-24 flex items-center justify-end">
                <span className="sm:hidden text-base text-green-400" aria-hidden>#</span>
                <span className="hidden sm:inline text-green-400 text-right">{t('table.headers.amount')}</span>
            </div>

            <div className="p-2 w-20 sm:w-28 flex items-center justify-end">
                <span className="sm:hidden text-base text-gray-300" aria-hidden>📅</span>
                <span className="hidden sm:inline text-gray-300 text-right">{t('table.headers.deadline')}</span>
            </div>

            <div className="p-2 w-14 sm:w-24 flex items-center justify-end">
                <span className="sm:hidden text-base" aria-hidden>🔗</span>
                <span className="hidden sm:inline text-gray-200">{t('table.headers.view')}</span>
            </div>
            </div>

            <div className="divide-y divide-gray-600">
                {data.map((row, index) => (
                    <TableRow key={index} data={row}/>
                ))}
            </div>
        </div>
    );
};

export default Table;