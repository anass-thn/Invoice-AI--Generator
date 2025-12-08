import React from 'react';
import { useParams } from 'react-router-dom';

const InvoiceDetail = () => {
    const { id } = useParams();
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Invoice Details</h1>
            <p>Viewing invoice ID: {id}</p>
        </div>
    );
};

export default InvoiceDetail;
