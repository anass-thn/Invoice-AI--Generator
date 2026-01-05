import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, toggle }) => {
    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:border-indigo-100 transition-colors duration-300">
            <button
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                onClick={toggle}
            >
                <span className="font-semibold text-lg text-gray-900">{question}</span>
                {isOpen ?
                    <ChevronUp className="w-5 h-5 text-indigo-600" /> :
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                }
            </button>
            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-50">
                    {answer}
                </div>
            </div>
        </div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "Is there a free trial?",
            answer: "Yes, we offer a 14-day free trial on all paid plans. You can also start with our 'Forever Free' plan which includes 5 invoices per month."
        },
        {
            question: "Can I customize the invoice templates?",
            answer: "Absolutely! Our professional plan allows you to add your logo, change colors, and even modify the layout to match your brand identity perfectly."
        },
        {
            question: "Is my data secure?",
            answer: "We take security seriously. All your data is encrypted using bank-grade 256-bit encryption, and we never share your client information with third parties."
        },
        {
            question: "Can I export my data?",
            answer: "Yes, you can export your invoices and reports in multiple formats including PDF, CSV, and Excel at any time."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-24 bg-slate-50 relative">
            {/* Decorative blob */}
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-indigo-100 rounded-full blur-[80px] -translate-y-1/2 -translate-x-1/2 opacity-60"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase mb-2">FAQ</h2>
                    <h3 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">Frequently Asked <span className="text-gradient">Questions</span></h3>
                    <p className="text-lg text-gray-600">Have questions? We're here to help you find the answers.</p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            toggle={() => toggleFAQ(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
