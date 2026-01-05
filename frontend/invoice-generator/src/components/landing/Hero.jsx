import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Sparkles, Plus, MoreHorizontal, Download, Send, CreditCard } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-200/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-200/30 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4"></div>
            </div>

            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Text Content */}
                    <div className="flex-1 text-center lg:text-left z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-indigo-100 text-indigo-600 text-sm font-medium mb-8 shadow-sm backdrop-blur-sm animate-fade-in-up">
                            <Sparkles className="w-4 h-4" />
                            <span>AI-Powered Invoicing is Here</span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-gray-900 leading-tight tracking-tight">
                            Invoicing Made <br className="hidden lg:block" />
                            <span className="text-gradient">Effortless & Smart</span>
                        </h1>

                        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            Stop wasting time on manual billing. Create professional, AI-generated invoices in seconds and get paid faster.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <Link to="/signup" className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-xl text-lg font-semibold hover:bg-indigo-700 transition-all duration-300 shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-2 group hover:-translate-y-1">
                                Start for Free
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl text-lg font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 flex items-center justify-center hover:-translate-y-1 shadow-sm">
                                View Demo
                            </Link>
                        </div>

                        <div className="mt-10 flex items-center justify-center lg:justify-start gap-8 text-sm text-gray-500 font-medium">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-indigo-500" />
                                <span>No credit card required</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-indigo-500" />
                                <span>Cancel anytime</span>
                            </div>
                        </div>
                    </div>

                    {/* Hero UI Mockup */}
                    <div className="flex-1 relative w-full lg:max-w-[650px] perspective-1000">
                        {/* Main App Container */}
                        <div className="relative z-10 bg-white rounded-2xl shadow-2xl shadow-indigo-200/40 border border-slate-200 overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-indigo-200/60">

                            {/* App Header */}
                            <div className="bg-slate-50 border-b border-slate-100 p-4 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1.5 mr-4">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                                    </div>
                                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">New Invoice</div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400">
                                        <Download className="w-4 h-4" />
                                    </div>
                                    <button className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-medium rounded-lg flex items-center gap-1.5 hover:bg-indigo-700 transition-colors">
                                        <Send className="w-3 h-3" /> Send
                                    </button>
                                </div>
                            </div>

                            {/* App Body */}
                            <div className="p-8 bg-white">
                                {/* Invoice Header */}
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-800 mb-1">Invoice #INV-2024-001</h3>
                                        <p className="text-slate-500 text-sm">Issued: Jan 15, 2026</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="inline-block px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-semibold border border-amber-100">
                                            Pending Payment
                                        </div>
                                    </div>
                                </div>

                                {/* Address Section */}
                                <div className="grid grid-cols-2 gap-8 mb-8">
                                    <div>
                                        <p className="text-xs font-semibold text-slate-400 uppercase mb-2">From</p>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                                                DS
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-800 text-sm">Design Studio Inc.</p>
                                                <p className="text-slate-500 text-xs">San Francisco, CA</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Bill To</p>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                                                TC
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-800 text-sm">TechCorp Global</p>
                                                <p className="text-slate-500 text-xs">New York, NY</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Line Items */}
                                <div className="bg-slate-50 rounded-xl border border-slate-100 overflow-hidden mb-6">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-slate-100 text-slate-500 font-medium">
                                            <tr>
                                                <th className="px-4 py-3">Item Description</th>
                                                <th className="px-4 py-3 text-right">Qty</th>
                                                <th className="px-4 py-3 text-right">Price</th>
                                                <th className="px-4 py-3 text-right">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            <tr>
                                                <td className="px-4 py-3">
                                                    <p className="font-medium text-slate-700">UI/UX Design Renewal</p>
                                                    <p className="text-xs text-slate-400">Landing page redesign & assets</p>
                                                </td>
                                                <td className="px-4 py-3 text-right text-slate-600">1</td>
                                                <td className="px-4 py-3 text-right text-slate-600">$2,400.00</td>
                                                <td className="px-4 py-3 text-right font-medium text-slate-800">$2,400.00</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3">
                                                    <p className="font-medium text-slate-700">SEO Optimization</p>
                                                    <p className="text-xs text-slate-400">Q1 2026 Strategy</p>
                                                </td>
                                                <td className="px-4 py-3 text-right text-slate-600">4</td>
                                                <td className="px-4 py-3 text-right text-slate-600">$150.00</td>
                                                <td className="px-4 py-3 text-right font-medium text-slate-800">$600.00</td>
                                            </tr>
                                        </tbody>
                                        <tfoot className="bg-slate-50">
                                            <tr>
                                                <td colSpan="3" className="px-4 py-3 text-right font-semibold text-slate-500">Total Due</td>
                                                <td className="px-4 py-3 text-right font-bold text-indigo-600 text-lg">$3,000.00</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Floating Interaction Elements */}
                        <div className="absolute -right-6 top-32 glass p-4 rounded-xl shadow-xl border border-white/60 animate-bounce-slow hidden md:block backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
                                    <CreditCard className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Status Update</div>
                                    <div className="font-bold text-slate-800 text-sm">Payment Received</div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -left-8 bottom-32 glass p-4 rounded-xl shadow-xl border border-white/60 animate-bounce-slow delay-700 hidden md:block backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">AI Assistant</div>
                                    <div className="font-bold text-slate-800 text-sm">Invoice Generated!</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
