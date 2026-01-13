'use client';

import React, { useState } from 'react';
import { FAQItem } from '@/types';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQProps {
    items: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({ items }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    if (!items || items.length === 0) return null;

    const toggleIndex = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full mt-12 border-t border-white/10 pt-8">
            <h3 className="text-xl font-bold italic uppercase tracking-wider text-white mb-6">Preguntas Frecuentes</h3>
            {items.map((item, index) => (
                <div key={index} className="border-b border-white/10 last:border-0">
                    <button
                        className="w-full py-4 flex items-center justify-between text-left focus:outline-none group"
                        onClick={() => toggleIndex(index)}
                    >
                        <span className={`font-bold transition-colors uppercase text-sm tracking-wide ${openIndex === index ? 'text-primary' : 'text-gray-200 group-hover:text-primary'
                            }`}>
                            {item.question}
                        </span>
                        <span className={`transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-primary' : 'text-gray-400 group-hover:text-primary'
                            }`}>
                            <ChevronDown size={20} />
                        </span>
                    </button>
                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'
                            }`}
                    >
                        <div className="text-gray-400 leading-relaxed whitespace-pre-line text-sm pl-0">
                            {item.answer}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FAQ;
