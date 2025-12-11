'use client';

import React from 'react';

interface VariantSelectorProps {
    options: {
        id: string;
        name: string;
        values: string[];
    }[];
    selectedOptions: Record<string, string>;
    onOptionChange: (name: string, value: string) => void;
}

const VariantSelector: React.FC<VariantSelectorProps> = ({
    options,
    selectedOptions,
    onOptionChange
}) => {
    return (
        <div className="space-y-4 mb-6">
            {options.map((option) => (
                <div key={option.id} className="space-y-2">
                    <label htmlFor={option.name} className="block text-sm font-medium text-gray-300 uppercase tracking-wide">
                        {option.name}
                    </label>
                    <div className="relative">
                        <select
                            id={option.name}
                            value={selectedOptions[option.name] || ''}
                            onChange={(e) => onOptionChange(option.name, e.target.value)}
                            className="w-full bg-surface text-white border border-border rounded-lg px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            {option.values.map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VariantSelector;
