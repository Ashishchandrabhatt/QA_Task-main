import { useForm, usePage } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import { useState } from 'react';

export default function Recharge() {
    const { balance, flash } = usePage().props;
    const [successMessage, setSuccessMessage] = useState(flash?.success || null);
    const [errorMessage, setErrorMessage] = useState(flash?.error || null);

    const { data, setData, post, processing, errors } = useForm({
        mobile: '',
        operator: '',
        amount: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/recharge', {
            onSuccess: (page) => {
                if (page.props.flash?.success) {
                    setSuccessMessage(page.props.flash.success);
                    setErrorMessage(null);
                }
                if (page.props.flash?.error) {
                    setErrorMessage(page.props.flash.error);
                    setSuccessMessage(null);
                }
            },
            onError: () => {
                setErrorMessage('Something went wrong. Please try again.');
                setSuccessMessage(null);
            },
        });
    }

    return (
        <AppLayout>
            <div className="max-w-lg mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Mobile Recharge</h1>

                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <p className="text-sm text-gray-500">Available Balance</p>
                    <p className="text-2xl font-bold text-green-600">₹{balance}</p>
                </div>

                {successMessage && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                        {successMessage}
                    </div>
                )}

                {errorMessage && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                        {errorMessage}
                    </div>
                )}

                <div className="bg-white rounded-lg shadow p-6" style={{ width: '460px' }}>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Mobile Number
                            </label>
                            <input
                                type="text"
                                value={data.mobile}
                                onChange={e => setData('mobile', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Enter mobile number"
                            />
                            {errors.mobile && (
                                <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Operator
                            </label>
                            <select
                                value={data.operator}
                                onChange={e => setData('operator', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            >
                                <option value="">Select Operator</option>
                                <option value="Airtel">Airtel</option>
                                <option value="Jio">Jio</option>
                                <option value="Vi">Vi</option>
                                <option value="BSNL">BSNL</option>
                            </select>
                            {errors.operator && (
                                <p className="mt-1 text-sm text-red-600">{errors.operator}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Amount (₹)
                            </label>
                            <input
                                type="number"
                                value={data.amount}
                                onChange={e => setData('amount', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Enter amount"
                            />
                            {errors.amount && (
                                <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 font-medium disabled:opacity-50"
                        >
                            {processing ? 'Processing...' : 'Recharge Now'}
                        </button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
