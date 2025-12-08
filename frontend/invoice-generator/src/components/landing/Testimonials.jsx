import React from 'react';

const Testimonials = () => {
    return (
        <section id="testimonials" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">What Our Users Say</h2>
                <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                    {/* Testimonial 1 */}
                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <p className="text-gray-600 italic mb-6">"This app has completely transformed how I handle my freelance billing. It's fast, easy, and the invoices look amazing."</p>
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                            <div>
                                <h4 className="font-bold">Sarah Johnson</h4>
                                <p className="text-sm text-gray-500">Freelance Designer</p>
                            </div>
                        </div>
                    </div>
                    {/* Testimonial 2 */}
                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <p className="text-gray-600 italic mb-6">"I used to dread end-of-month invoicing. Now it takes me minutes. Highly recommended for any small business owner."</p>
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                            <div>
                                <h4 className="font-bold">Michael Chen</h4>
                                <p className="text-sm text-gray-500">Consultant</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
