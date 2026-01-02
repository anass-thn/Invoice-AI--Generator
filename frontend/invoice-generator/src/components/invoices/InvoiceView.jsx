import React from 'react';

const InvoiceView = ({ invoice }) => {
    const calculateItemTotal = (item) => {
        const qty = Number(item.quantity || item.qty) || 0;
        const price = Number(item.price) || 0;
        const tax = Number(item.tax) || 0;

        const baseTotal = qty * price;
        const taxAmount = (baseTotal * tax) / 100;
        return baseTotal + taxAmount;
    };

    const subtotal = invoice.items.reduce((acc, item) => {
        const qty = Number(item.quantity || item.qty) || 0;
        const price = Number(item.price) || 0;
        return acc + (qty * price);
    }, 0);

    const totalTax = invoice.items.reduce((acc, item) => {
        const qty = Number(item.quantity || item.qty) || 0;
        const price = Number(item.price) || 0;
        const tax = Number(item.tax) || 0;
        return acc + ((qty * price * tax) / 100);
    }, 0);

    const total = subtotal + totalTax;

    return (
        <div id="invoice-view" className="bg-white p-8 max-w-4xl mx-auto shadow-lg print:shadow-none print:p-0 print:max-w-none text-gray-800 font-sans">
            {/* Header / Brand */}
            <div className="flex justify-between items-start border-b-2 border-gray-100 pb-8 mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight">INVOICE</h1>
                    <p className="text-gray-500 mt-1">#{invoice.invoiceNumber}</p>
                </div>
                <div className="text-right">
                    <h2 className="text-xl font-bold text-gray-800">{invoice.billFrom?.businessName}</h2>
                    <div className="text-sm text-gray-600 mt-2 space-y-1">
                        <p>{invoice.billFrom?.email}</p>
                        <p>{invoice.billFrom?.address}</p>
                        <p>{invoice.billFrom?.phoneNumber}</p>
                    </div>
                </div>
            </div>

            {/* Dates & Client Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Bill To</h3>
                    <div className="text-gray-800">
                        <p className="font-bold text-lg">{invoice.billTo?.clientName}</p>
                        <p>{invoice.billTo?.email}</p>
                        <p>{invoice.billTo?.address}</p>
                        <p>{invoice.billTo?.phoneNumber}</p>
                    </div>
                </div>
                <div className="md:text-right">
                    <div className="space-y-2">
                        <div className="flex justify-between md:justify-end md:gap-8">
                            <span className="text-gray-500">Invoice Date:</span>
                            <span className="font-medium">{invoice.invoiceDate ? new Date(invoice.invoiceDate).toLocaleDateString() : ''}</span>
                        </div>
                        <div className="flex justify-between md:justify-end md:gap-8">
                            <span className="text-gray-500">Due Date:</span>
                            <span className="font-medium">{invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : ''}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Items Table */}
            <div className="mb-12">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50 border-y border-gray-200">
                            <th className="py-3 px-4 text-left font-semibold text-gray-600 text-sm uppercase tracking-wider">Item Description</th>
                            <th className="py-3 px-4 text-center font-semibold text-gray-600 text-sm uppercase tracking-wider w-24">Qty</th>
                            <th className="py-3 px-4 text-right font-semibold text-gray-600 text-sm uppercase tracking-wider w-32">Price</th>
                            <th className="py-3 px-4 text-right font-semibold text-gray-600 text-sm uppercase tracking-wider w-24">Tax</th>
                            <th className="py-3 px-4 text-right font-semibold text-gray-600 text-sm uppercase tracking-wider w-32">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {invoice.items.map((item, index) => (
                            <tr key={index}>
                                <td className="py-4 px-4 text-gray-800 font-medium">{item.name || item.item}</td>
                                <td className="py-4 px-4 text-center text-gray-600">{item.quantity || item.qty}</td>
                                <td className="py-4 px-4 text-right text-gray-600">${Number(item.price).toFixed(2)}</td>
                                <td className="py-4 px-4 text-right text-gray-600">{item.tax}%</td>
                                <td className="py-4 px-4 text-right text-gray-800 font-bold">${calculateItemTotal(item).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Totals */}
            <div className="flex flex-col md:flex-row justify-end mb-12">
                <div className="w-full md:w-1/2 lg:w-1/3 space-y-3">
                    <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Tax Amount</span>
                        <span>${totalTax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                        <span className="font-bold text-xl text-gray-900">Total</span>
                        <span className="font-bold text-2xl text-blue-600">${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Footer / Notes */}
            <div className="border-t-2 border-gray-100 pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {invoice.notes && (
                    <div>
                        <h4 className="font-bold text-gray-800 mb-2">Notes</h4>
                        <p className="text-sm text-gray-500">{invoice.notes}</p>
                    </div>
                )}
                {invoice.paymentTerms && (
                    <div>
                        <h4 className="font-bold text-gray-800 mb-2">Payment Terms</h4>
                        <p className="text-sm text-gray-500">{invoice.paymentTerms}</p>
                    </div>
                )}
            </div>

            {/* Print Footer Only */}
            <div className="hidden print:block text-center text-xs text-gray-400 mt-16">
                Generated by AI Invoice Generator
            </div>
        </div>
    );
};

export default InvoiceView;
