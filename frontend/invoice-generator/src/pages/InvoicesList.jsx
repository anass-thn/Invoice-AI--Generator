import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
import DeleteConfirmationModal from '../components/ui/DeleteConfirmationModal';
import SendMessageModal from '../components/ui/SendMessageModal';
import AIInvoiceModal from '../components/ui/AIInvoiceModal';
import {
    PencilSquareIcon,
    TrashIcon,
    PaperAirplaneIcon,
    SparklesIcon,
    PlusIcon,
    MagnifyingGlassIcon,
    FunnelIcon
} from '@heroicons/react/24/outline';

const InvoicesList = () => {
    const navigate = useNavigate();
    const [invoices, setInvoices] = useState([]);
    const [filteredInvoices, setFilteredInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Modal states
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, invoice: null });
    const [messageModal, setMessageModal] = useState({ isOpen: false, invoice: null });
    const [aiModalOpen, setAiModalOpen] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [statusUpdateLoading, setStatusUpdateLoading] = useState({});

    // Fetch invoices
    useEffect(() => {
        fetchInvoices();
    }, []);

    // Filter invoices
    useEffect(() => {
        let filtered = [...invoices];

        // Apply status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(inv => inv.status === statusFilter);
        }

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(inv =>
                inv.invoiceNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                inv.billTo?.clientName?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredInvoices(filtered);
    }, [invoices, statusFilter, searchTerm]);

    const fetchInvoices = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(API_PATHS.INVOICE.GET_ALL_INVOICE);
            setInvoices(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching invoices:', err);
            setError('Failed to load invoices. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusToggle = async (invoice) => {
        const newStatus = invoice.status === 'paid' ? 'unpaid' : 'paid';

        try {
            setStatusUpdateLoading(prev => ({ ...prev, [invoice._id]: true }));
            const response = await axiosInstance.patch(
                API_PATHS.INVOICE.UPDATE_INVOICE_STATUS(invoice._id),
                { status: newStatus }
            );

            // Update local state
            setInvoices(prev => prev.map(inv =>
                inv._id === invoice._id ? response.data : inv
            ));
        } catch (err) {
            console.error('Error updating status:', err);
            alert('Failed to update invoice status. Please try again.');
        } finally {
            setStatusUpdateLoading(prev => ({ ...prev, [invoice._id]: false }));
        }
    };

    const handleDelete = async () => {
        try {
            setDeleteLoading(true);
            await axiosInstance.delete(API_PATHS.INVOICE.DELETE_INVOICE(deleteModal.invoice._id));

            // Update local state
            setInvoices(prev => prev.filter(inv => inv._id !== deleteModal.invoice._id));
            setDeleteModal({ isOpen: false, invoice: null });
        } catch (err) {
            console.error('Error deleting invoice:', err);
            alert('Failed to delete invoice. Please try again.');
        } finally {
            setDeleteLoading(false);
        }
    };

    const handleSendMessage = async (invoice, message) => {
        // Simulate sending message (integrate with your email service)
        console.log('Sending message to:', invoice.billTo?.email);
        console.log('Message:', message);

        // Show success message
        alert(`Message sent successfully to ${invoice.billTo?.clientName}!`);
    };

    const getStatusBadgeClass = (status) => {
        const baseClass = 'px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full';
        switch (status) {
            case 'paid':
                return `${baseClass} bg-green-100 text-green-800`;
            case 'unpaid':
                return `${baseClass} bg-yellow-100 text-yellow-800`;
            case 'partial':
                return `${baseClass} bg-blue-100 text-blue-800`;
            case 'overdue':
                return `${baseClass} bg-red-100 text-red-800`;
            default:
                return `${baseClass} bg-gray-100 text-gray-800`;
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage all your invoices in one place
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                        to="/invoices/new"
                        className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Create New Invoice
                    </Link>
                    <button
                        onClick={() => setAiModalOpen(true)}
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <SparklesIcon className="h-5 w-5 mr-2" />
                        Create with AI
                    </button>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Search by invoice # or client name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Status Filter */}
                    <div className="flex items-center gap-2">
                        <FunnelIcon className="h-5 w-5 text-gray-400" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                            <option value="all">All Status</option>
                            <option value="paid">Paid</option>
                            <option value="unpaid">Unpaid</option>
                            <option value="partial">Partial</option>
                            <option value="overdue">Overdue</option>
                        </select>
                    </div>
                </div>

                {/* Results count */}
                <div className="mt-3 text-sm text-gray-500">
                    Showing {filteredInvoices.length} of {invoices.length} invoices
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">{error}</h3>
                        </div>
                    </div>
                </div>
            )}

            {/* Invoices Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Invoice #
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Client
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Due Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredInvoices.length > 0 ? (
                                filteredInvoices.map((invoice) => (
                                    <tr key={invoice._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {invoice.invoiceNumber}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {new Date(invoice.invoiceDate).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {invoice.billTo?.clientName || 'N/A'}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {invoice.billTo?.email || 'No email'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-semibold text-gray-900">
                                                ${invoice.total?.toFixed(2) || '0.00'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={getStatusBadgeClass(invoice.status)}>
                                                {invoice.status || 'pending'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(invoice.dueDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-2">
                                                {/* Toggle Status Button */}
                                                <button
                                                    onClick={() => handleStatusToggle(invoice)}
                                                    disabled={statusUpdateLoading[invoice._id]}
                                                    className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded ${invoice.status === 'paid'
                                                        ? 'text-yellow-700 bg-yellow-100 hover:bg-yellow-200'
                                                        : 'text-green-700 bg-green-100 hover:bg-green-200'
                                                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
                                                    title={invoice.status === 'paid' ? 'Mark as Unpaid' : 'Mark as Paid'}
                                                >
                                                    {statusUpdateLoading[invoice._id] ? (
                                                        <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                    ) : (
                                                        invoice.status === 'paid' ? 'Mark Unpaid' : 'Mark Paid'
                                                    )}
                                                </button>

                                                {/* Edit Button */}
                                                <button
                                                    onClick={() => navigate(`/invoices/${invoice._id}`)}
                                                    className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-md transition-colors"
                                                    title="Edit Invoice"
                                                >
                                                    <PencilSquareIcon className="h-5 w-5" />
                                                </button>

                                                {/* Message Button */}
                                                <button
                                                    onClick={() => setMessageModal({ isOpen: true, invoice })}
                                                    className="p-2 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded-md transition-colors"
                                                    title="Send Message"
                                                >
                                                    <PaperAirplaneIcon className="h-5 w-5" />
                                                </button>

                                                {/* Delete Button */}
                                                <button
                                                    onClick={() => setDeleteModal({ isOpen: true, invoice })}
                                                    className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md transition-colors"
                                                    title="Delete Invoice"
                                                >
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center">
                                            <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <h3 className="mt-2 text-sm font-medium text-gray-900">No invoices found</h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {searchTerm || statusFilter !== 'all'
                                                    ? 'Try adjusting your filters'
                                                    : 'Get started by creating a new invoice'}
                                            </p>
                                            {!searchTerm && statusFilter === 'all' && (
                                                <div className="mt-6 flex gap-3">
                                                    <Link
                                                        to="/invoices/new"
                                                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                                    >
                                                        <PlusIcon className="h-5 w-5 mr-2" />
                                                        Create Invoice
                                                    </Link>
                                                    <button
                                                        onClick={() => setAiModalOpen(true)}
                                                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                                    >
                                                        <SparklesIcon className="h-5 w-5 mr-2" />
                                                        Create with AI
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modals */}
            <DeleteConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, invoice: null })}
                onConfirm={handleDelete}
                invoice={deleteModal.invoice}
                loading={deleteLoading}
            />

            <SendMessageModal
                isOpen={messageModal.isOpen}
                onClose={() => setMessageModal({ isOpen: false, invoice: null })}
                invoice={messageModal.invoice}
                onSend={handleSendMessage}
            />

            <AIInvoiceModal
                isOpen={aiModalOpen}
                onClose={() => setAiModalOpen(false)}
            />
        </div>
    );
};

export default InvoicesList;
