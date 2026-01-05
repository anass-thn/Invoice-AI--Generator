import React from 'react';
import { Sparkles, BarChart3, BellRing, Files } from 'lucide-react';

const Features = () => {
    const features = [
        {
            icon: <Sparkles className="w-6 h-6 text-white" />,
            title: "AI Invoice Creation",
            description: "Generate professional invoices instantly with AI. Just describe your work and let our smart system create perfectly formatted invoices.",
            color: "bg-indigo-600",
            delay: "0"
        },
        {
            icon: <BarChart3 className="w-6 h-6 text-white" />,
            title: "AI-Powered Dashboard",
            description: "Get intelligent insights into your business. Track revenue, monitor payment trends, and receive AI-driven recommendations.",
            color: "bg-violet-600",
            delay: "100"
        },
        {
            icon: <BellRing className="w-6 h-6 text-white" />,
            title: "Smart Reminders",
            description: "Never miss a payment again. Automated reminders for overdue invoices and upcoming payment deadlines keep your cash flow healthy.",
            color: "bg-fuchsia-600",
            delay: "200"
        },
        {
            icon: <Files className="w-6 h-6 text-white" />,
            title: "Easy Invoice Management",
            description: "Organize, search, and filter all your invoices in one place. Export reports, track statuses, and manage clients effortlessly.",
            color: "bg-pink-600",
            delay: "300"
        }
    ];

    return (
        <section id="features" className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-violet-100 rounded-full blur-3xl opacity-50"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase mb-2">Features</h2>
                    <h3 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">Everything you need to <span className="text-gradient">grow faster</span></h3>
                    <p className="text-lg text-gray-600">Powerful tools designed to help you manage your finances with ease and precision.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-8 bg-white rounded-2xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 relative overflow-hidden"
                            style={{ animationDelay: `${feature.delay}ms` }}
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gray-50 to-transparent rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500"></div>

                            <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                                {feature.icon}
                            </div>

                            <h4 className="text-xl font-bold mb-3 text-gray-900 relative z-10">{feature.title}</h4>
                            <p className="text-gray-600 leading-relaxed relative z-10">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
