import React from 'react';
import { Link } from 'react-router-dom';

const InvoicesList = () => {
    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Invoices</h1>
                <Link to="/invoices/new" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Create New Invoice
                </Link>
            </div>
            <p>List of invoices will appear here.</p>
        </div>
    );
};

export default InvoicesList;
