import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, SparklesIcon, DocumentTextIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const AIInvoiceModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Input, 2: Review, 3: Success
    const [inputText, setInputText] = useState('');
    const [parsedData, setParsedData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);

    const exampleText = `Invoice for Web Development Services

Client: Acme Corporation
Email: contact@acme.com
Phone: +1 234 567 8900
Address: 123 Business St, New York, NY 10001

Invoice Number: INV-2024-001
Date: January 15, 2024
Due Date: February 15, 2024

Services:
- Website Design: 40 hours @ $100/hr = $4,000
- Frontend Development: 60 hours @ $120/hr = $7,200
- Backend Development: 50 hours @ $120/hr = $6,000

Subtotal: $17,200
Tax (10%): $1,720
Total: $18,920

Payment Terms: Net 30
Notes: Thank you for your business!`;

    const handleParse = async () => {
        if (!inputText.trim()) {
            setError('Please enter some text to parse');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.post(API_PATHS.AI.PARSE_INVOICE_TEXT, {
                text: inputText
            });

            if (response.data.success) {
                setParsedData(response.data.parsedData);
                setStep(2);
            }
        } catch (err) {
            console.error('Error parsing invoice:', err);
            setError(err.response?.data?.message || 'Failed to parse invoice. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveInvoice = async () => {
        setSaving(true);
        setError(null);

        try {
            const response = await axiosInstance.post(API_PATHS.INVOICE.CREATE, parsedData);

            if (response.data) {
                setStep(3);
                // Auto-close and navigate after 2 seconds
                setTimeout(() => {
                    handleClose();
                    navigate('/invoices');
                }, 2000);
            }
        } catch (err) {
            console.error('Error saving invoice:', err);
            setError(err.response?.data?.message || 'Failed to save invoice. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleEditManually = async () => {
        setSaving(true);
        setError(null);

        try {
            const response = await axiosInstance.post(API_PATHS.INVOICE.CREATE, parsedData);

            if (response.data) {
                handleClose();
                navigate(`/invoices/${response.data._id}`);
            }
        } catch (err) {
            console.error('Error saving invoice for editing:', err);
            setError(err.response?.data?.message || 'Failed to save invoice for editing. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleClose = () => {
        setStep(1);
        setInputText('');
        setParsedData(null);
        setError(null);
        onClose();
    };

    const useExample = () => {
        setInputText(exampleText);
    };

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={handleClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-6">
                                {/* Close Button */}
                                <div className="absolute right-0 top-0 pr-4 pt-4">
                                    <button
                                        type="button"
                                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        onClick={handleClose}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                {/* Step 1: Input Text */}
                                {step === 1 && (
                                    <div>
                                        <div className="flex items-center">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-100 to-indigo-100">
                                                <SparklesIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                                            </div>
                                            <Dialog.Title as="h3" className="ml-4 text-lg font-semibold leading-6 text-gray-900">
                                                Create Invoice with AI
                                            </Dialog.Title>
                                        </div>

                                        <div className="mt-6">
                                            <p className="text-sm text-gray-500 mb-4">
                                                Paste any invoice-related text below, and our AI will extract the information to create a structured invoice for you.
                                            </p>

                                            {/* Example Button */}
                                            <div className="mb-4">
                                                <button
                                                    type="button"
                                                    onClick={useExample}
                                                    className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                                                >
                                                    📋 Use example text
                                                </button>
                                            </div>

                                            {/* Text Input */}
                                            <textarea
                                                rows={12}
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm font-mono"
                                                placeholder="Paste your invoice text here...

Example:
Invoice for consulting services
Client: John Doe, john@example.com
Services: Consulting - 10 hours @ $100/hr
Total: $1,000
Due: 30 days"
                                                value={inputText}
                                                onChange={(e) => setInputText(e.target.value)}
                                            />

                                            {error && (
                                                <div className="mt-4 rounded-md bg-red-50 p-4">
                                                    <p className="text-sm text-red-800">{error}</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3">
                                            <button
                                                type="button"
                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                onClick={handleClose}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                className="inline-flex w-full justify-center items-center rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-blue-700 hover:to-indigo-700 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                                                onClick={handleParse}
                                                disabled={loading || !inputText.trim()}
                                            >
                                                {loading ? (
                                                    <>
                                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Parsing with AI...
                                                    </>
                                                ) : (
                                                    <>
                                                        <SparklesIcon className="h-4 w-4 mr-2" />
                                                        Parse with AI
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Review Parsed Data */}
                                {step === 2 && parsedData && (
                                    <div>
                                        <div className="flex items-center">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                                                <DocumentTextIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                            </div>
                                            <Dialog.Title as="h3" className="ml-4 text-lg font-semibold leading-6 text-gray-900">
                                                Review Invoice Data
                                            </Dialog.Title>
                                        </div>

                                        <div className="mt-6 max-h-96 overflow-y-auto">
                                            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                                                {/* Invoice Details */}
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-xs font-medium text-gray-500">Invoice Number</p>
                                                        <p className="text-sm text-gray-900">{parsedData.invoiceNumber}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-medium text-gray-500">Invoice Date</p>
                                                        <p className="text-sm text-gray-900">{new Date(parsedData.invoiceDate).toLocaleDateString()}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-medium text-gray-500">Due Date</p>
                                                        <p className="text-sm text-gray-900">{new Date(parsedData.dueDate).toLocaleDateString()}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-medium text-gray-500">Payment Terms</p>
                                                        <p className="text-sm text-gray-900">{parsedData.paymentTerms || 'Net 30'}</p>
                                                    </div>
                                                </div>

                                                {/* Client Info */}
                                                <div>
                                                    <p className="text-xs font-medium text-gray-500 mb-2">Bill To</p>
                                                    <div className="bg-white rounded p-3 space-y-1">
                                                        <p className="text-sm font-medium text-gray-900">{parsedData.billTo?.clientName}</p>
                                                        <p className="text-sm text-gray-600">{parsedData.billTo?.email}</p>
                                                        <p className="text-sm text-gray-600">{parsedData.billTo?.phoneNumber}</p>
                                                        <p className="text-sm text-gray-600">{parsedData.billTo?.address}</p>
                                                    </div>
                                                </div>

                                                {/* Items */}
                                                <div>
                                                    <p className="text-xs font-medium text-gray-500 mb-2">Items</p>
                                                    <div className="bg-white rounded overflow-hidden">
                                                        <table className="min-w-full divide-y divide-gray-200">
                                                            <thead className="bg-gray-50">
                                                                <tr>
                                                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Item</th>
                                                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Qty</th>
                                                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Price</th>
                                                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Total</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="divide-y divide-gray-200">
                                                                {parsedData.items?.map((item, index) => (
                                                                    <tr key={index}>
                                                                        <td className="px-3 py-2 text-sm text-gray-900">{item.name}</td>
                                                                        <td className="px-3 py-2 text-sm text-gray-900">{item.quantity}</td>
                                                                        <td className="px-3 py-2 text-sm text-gray-900">${item.price?.toFixed(2)}</td>
                                                                        <td className="px-3 py-2 text-sm font-medium text-gray-900">${item.total?.toFixed(2)}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>

                                                {/* Totals */}
                                                <div className="bg-white rounded p-3 space-y-2">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-600">Subtotal:</span>
                                                        <span className="text-gray-900">${parsedData.subtotal?.toFixed(2)}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-600">Tax:</span>
                                                        <span className="text-gray-900">${parsedData.taxTotal?.toFixed(2)}</span>
                                                    </div>
                                                    <div className="flex justify-between text-base font-semibold border-t pt-2">
                                                        <span className="text-gray-900">Total:</span>
                                                        <span className="text-gray-900">${parsedData.total?.toFixed(2)}</span>
                                                    </div>
                                                </div>

                                                {/* Notes */}
                                                {parsedData.notes && (
                                                    <div>
                                                        <p className="text-xs font-medium text-gray-500 mb-2">Notes</p>
                                                        <p className="text-sm text-gray-900 bg-white rounded p-3">{parsedData.notes}</p>
                                                    </div>
                                                )}
                                            </div>

                                            {error && (
                                                <div className="mt-4 rounded-md bg-red-50 p-4">
                                                    <p className="text-sm text-red-800">{error}</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3">
                                            <button
                                                type="button"
                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                onClick={() => setStep(1)}
                                                disabled={saving}
                                            >
                                                ← Back
                                            </button>
                                            <button
                                                type="button"
                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm ring-1 ring-inset ring-blue-300 hover:bg-blue-50 sm:mt-0 sm:w-auto"
                                                onClick={handleEditManually}
                                                disabled={saving}
                                            >
                                                Edit Manually
                                            </button>
                                            <button
                                                type="button"
                                                className="inline-flex w-full justify-center items-center rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                                                onClick={handleSaveInvoice}
                                                disabled={saving}
                                            >
                                                {saving ? (
                                                    <>
                                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Saving...
                                                    </>
                                                ) : (
                                                    <>
                                                        <CheckCircleIcon className="h-4 w-4 mr-2" />
                                                        Save Invoice
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Success */}
                                {step === 3 && (
                                    <div className="text-center py-8">
                                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                            <CheckCircleIcon className="h-10 w-10 text-green-600" aria-hidden="true" />
                                        </div>
                                        <Dialog.Title as="h3" className="mt-4 text-lg font-semibold leading-6 text-gray-900">
                                            Invoice Created Successfully!
                                        </Dialog.Title>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Redirecting to invoices list...
                                        </p>
                                    </div>
                                )}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default AIInvoiceModal;
