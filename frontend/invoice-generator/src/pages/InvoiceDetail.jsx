import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
import { PrinterIcon, PencilSquareIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import InvoiceView from '../components/invoices/InvoiceView';
import InvoiceForm from '../components/invoices/InvoiceForm';

const InvoiceDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [invoice, setInvoice] = useState(null);

    // Fetch Invoice Data
    useEffect(() => {
        fetchInvoice();
    }, [id]);

    const fetchInvoice = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(API_PATHS.INVOICE.GET_INVOICE_BY_ID(id));
            setInvoice(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching invoice:', error);
            alert('Failed to load invoice details.');
            navigate('/invoices');
        }
    };

    const handleSave = async (updatedInvoiceData) => {
        setSaving(true);
        try {
            // Make API call (PUT)
            await axiosInstance.put(API_PATHS.INVOICE.UPDATE_INVOICE(id), updatedInvoiceData);

            // Show success message
            alert('Invoice updated successfully!');

            // Refetch data to ensure view is consistent
            await fetchInvoice();

            // Switch back to view mode
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating invoice:', error);
            const errorMessage = error.response?.data?.message || 'Failed to update invoice. Please try again.';
            alert(`Error: ${errorMessage}`);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!invoice) return null;

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 print:p-0 print:bg-white">
            <div className="max-w-4xl mx-auto print:max-w-none">
                {/* Header (Hidden when printing) */}
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 print:hidden">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/invoices')}
                            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full transition-colors"
                            title="Back to Invoices"
                        >
                            <ArrowLeftIcon className="h-5 w-5" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {isEditing ? 'Edit Invoice' : 'Invoice Details'}
                            </h1>
                            <p className="text-sm text-gray-500">
                                {isEditing ? 'Update invoice information' : `Viewing invoice #${invoice.invoiceNumber}`}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        {!isEditing ? (
                            <>
                                <button
                                    onClick={() => window.print()}
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <PrinterIcon className="h-5 w-5 mr-2" />
                                    Print
                                </button>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <PencilSquareIcon className="h-5 w-5 mr-2" />
                                    Edit
                                </button>
                            </>
                        ) : (
                            // In edit mode, buttons are handled by the form, but we could add a "Back to View" here if we wanted.
                            // Form handles Cancel which does mostly the same.
                            <div className="hidden sm:block">
                                {/* Placeholder alignment */}
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                {isEditing ? (
                    <InvoiceForm
                        initialData={invoice}
                        onSave={handleSave}
                        onCancel={() => setIsEditing(false)}
                        saving={saving}
                    />
                ) : (
                    <InvoiceView invoice={invoice} />
                )}
            </div>
        </div>
    );
};

export default InvoiceDetail;
