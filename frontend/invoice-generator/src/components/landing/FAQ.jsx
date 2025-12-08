import React from 'react';

const FAQ = () => {
    return (
        <section id="faq" className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-3xl">
                <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    <div className="border-b pb-6">
                        <h3 className="text-xl font-bold mb-2">Is there a free trial?</h3>
                        <p className="text-gray-600">Yes, we offer a 14-day free trial with full access to all features. No credit card required.</p>
                    </div>
                    <div className="border-b pb-6">
                        <h3 className="text-xl font-bold mb-2">Can I customize the invoice templates?</h3>
                        <p className="text-gray-600">Absolutely! You can add your logo, change colors, and adjust the layout to match your brand.</p>
                    </div>
                    <div className="border-b pb-6">
                        <h3 className="text-xl font-bold mb-2">Is my data secure?</h3>
                        <p className="text-gray-600">We use industry-standard encryption to ensure your data is always safe and secure.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
