import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

const SendMessageModal = ({ isOpen, onClose, invoice, onSend }) => {
    const [messageType, setMessageType] = useState('reminder');
    const [customMessage, setCustomMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const messageTemplates = {
        reminder: `Dear ${invoice?.billTo?.clientName || 'Customer'},\n\nThis is a friendly reminder that invoice #${invoice?.invoiceNumber} for $${invoice?.total?.toFixed(2)} is due on ${invoice?.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : 'N/A'}.\n\nPlease process the payment at your earliest convenience.\n\nBest regards`,
        thankYou: `Dear ${invoice?.billTo?.clientName || 'Customer'},\n\nThank you for your payment of $${invoice?.total?.toFixed(2)} for invoice #${invoice?.invoiceNumber}.\n\nWe appreciate your business and look forward to working with you again.\n\nBest regards`,
        followUp: `Dear ${invoice?.billTo?.clientName || 'Customer'},\n\nWe noticed that invoice #${invoice?.invoiceNumber} for $${invoice?.total?.toFixed(2)} is now overdue.\n\nPlease contact us if you have any questions or concerns regarding this invoice.\n\nBest regards`
    };

    const handleSend = async () => {
        setLoading(true);
        const message = customMessage || messageTemplates[messageType];
        await onSend(invoice, message);
        setLoading(false);
        handleClose();
    };

    const handleClose = () => {
        setCustomMessage('');
        setMessageType('reminder');
        onClose();
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
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

                                <div>
                                    <div className="flex items-center">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                                            <PaperAirplaneIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                                        </div>
                                        <Dialog.Title as="h3" className="ml-4 text-lg font-semibold leading-6 text-gray-900">
                                            Send Message
                                        </Dialog.Title>
                                    </div>

                                    <div className="mt-6">
                                        {/* Invoice Info */}
                                        <div className="rounded-md bg-gray-50 p-4 mb-4">
                                            <dl className="grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <dt className="font-medium text-gray-700">Invoice #:</dt>
                                                    <dd className="text-gray-900">{invoice?.invoiceNumber}</dd>
                                                </div>
                                                <div>
                                                    <dt className="font-medium text-gray-700">Client:</dt>
                                                    <dd className="text-gray-900">{invoice?.billTo?.clientName || 'N/A'}</dd>
                                                </div>
                                                <div>
                                                    <dt className="font-medium text-gray-700">Amount:</dt>
                                                    <dd className="text-gray-900">${invoice?.total?.toFixed(2)}</dd>
                                                </div>
                                                <div>
                                                    <dt className="font-medium text-gray-700">Email:</dt>
                                                    <dd className="text-gray-900">{invoice?.billTo?.email || 'N/A'}</dd>
                                                </div>
                                            </dl>
                                        </div>

                                        {/* Message Type Selection */}
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Message Type
                                            </label>
                                            <div className="grid grid-cols-3 gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => setMessageType('reminder')}
                                                    className={`px-4 py-2 text-sm font-medium rounded-md ${messageType === 'reminder'
                                                            ? 'bg-blue-600 text-white'
                                                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    Reminder
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setMessageType('thankYou')}
                                                    className={`px-4 py-2 text-sm font-medium rounded-md ${messageType === 'thankYou'
                                                            ? 'bg-blue-600 text-white'
                                                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    Thank You
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setMessageType('followUp')}
                                                    className={`px-4 py-2 text-sm font-medium rounded-md ${messageType === 'followUp'
                                                            ? 'bg-blue-600 text-white'
                                                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    Follow Up
                                                </button>
                                            </div>
                                        </div>

                                        {/* Message Preview/Edit */}
                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                                Message
                                            </label>
                                            <textarea
                                                id="message"
                                                rows={8}
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                value={customMessage || messageTemplates[messageType]}
                                                onChange={(e) => setCustomMessage(e.target.value)}
                                                placeholder="Enter your message..."
                                            />
                                            <p className="mt-2 text-xs text-gray-500">
                                                You can edit the message above before sending.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3">
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={handleClose}
                                        disabled={loading}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                                        onClick={handleSend}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <PaperAirplaneIcon className="h-4 w-4 mr-2" />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default SendMessageModal;
