import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Freelance Designer",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            content: "This tool has completely transformed how I handle my billing. The AI auto-fill feature saves me hours every week. Highly recommended!",
            rating: 5
        },
        {
            name: "Michael Chen",
            role: "Small Business Owner",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            content: "I used to dread the end of the month invoicing. Now I can generate professional invoices in seconds. It's fully worth the premium subscription.",
            rating: 5
        },
        {
            name: "Emily Davis",
            role: "Marketing Consultant",
            image: "https://randomuser.me/api/portraits/women/68.jpg",
            content: "The dashboard insights helped me spot payment trends I hadn't noticed before. It's more than just an invoice generator; it's a business tool.",
            rating: 4
        }
    ];

    return (
        <section id="testimonials" className="py-24 bg-white relative">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase mb-2">Testimonials</h2>
                    <h3 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">Trusted by <span className="text-gradient">Professionals</span></h3>
                    <p className="text-lg text-gray-600">Don't just take our word for it. See what our users have to say about their experience.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-slate-50 p-8 rounded-2xl relative hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                            <Quote className="absolute top-8 right-8 w-8 h-8 text-indigo-100" />

                            <div className="flex items-center gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>

                            <p className="text-gray-700 mb-8 italic relative z-10 leading-relaxed">"{testimonial.content}"</p>

                            <div className="flex items-center gap-4">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                                />
                                <div>
                                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
