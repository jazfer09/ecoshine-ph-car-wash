import React, { useState } from 'react';
import { PaymentMethod } from '../types';
import { ShieldCheck, CheckCircle2, QrCode, Smartphone, CreditCard, Banknote, Loader2, Sparkles, X, ArrowRight, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  bookingCode: string;
  customerName: string;
  plateNumber: string;
  serviceName: string;
  onPaymentSuccess: (method: PaymentMethod, reference: string) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  bookingCode,
  customerName,
  plateNumber,
  serviceName,
  onPaymentSuccess,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('gcash');
  const [phoneNumber, setPhoneNumber] = useState('0917-882-9912');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('883');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedRef, setGeneratedRef] = useState('');

  if (!isOpen) return null;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const refCode = `${selectedMethod.toUpperCase()}-${Math.floor(10000000 + Math.random() * 90000000)}`;
      setGeneratedRef(refCode);
      setIsProcessing(false);
      setIsSuccess(true);
      
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#1E40AF', '#DC2626', '#10B981', '#F59E0B']
      });

      onPaymentSuccess(selectedMethod, refCode);
    }, 1500);
  };

  const resetAndClose = () => {
    setIsSuccess(false);
    setIsProcessing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        id="payment-gateway-card"
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
      >
        {/* Top brand header */}
        <div className="p-5 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-white/10">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-base">EcoShine Secure Pay</h3>
                <span className="text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-300 font-semibold rounded-full border border-emerald-500/30">
                  256-bit Encrypted 🇵🇭
                </span>
              </div>
              <p className="text-xs text-blue-100">Official Philippine Payment Gateway</p>
            </div>
          </div>
          <button
            id="close-payment-modal"
            onClick={resetAndClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-6 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Payment Successful
              </span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display mt-0.5">
                ₱{amount.toLocaleString()} Paid
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Ref: <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{generatedRef}</span>
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-left text-xs space-y-2">
              <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300">
                <span>Official E-Receipt</span>
                <span>Booking: {bookingCode}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Customer:</span>
                <span className="font-medium text-slate-900 dark:text-white">{customerName}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Vehicle:</span>
                <span className="font-medium text-slate-900 dark:text-white">{plateNumber}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Service:</span>
                <span className="font-medium text-slate-900 dark:text-white">{serviceName}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Payment Method:</span>
                <span className="font-medium uppercase text-blue-600 dark:text-blue-400">{selectedMethod}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-900 dark:text-white">
                <span>Total Amount:</span>
                <span className="text-blue-600 dark:text-blue-400">₱{amount.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                id="btn-print-receipt"
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-2.5 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save Receipt</span>
              </button>
              <button
                id="btn-finish-payment"
                type="button"
                onClick={resetAndClose}
                className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-md transition-colors flex items-center justify-center space-x-1"
              >
                <span>Track Live Wash</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handlePay} className="p-6 space-y-4">
            {/* Amount Summary */}
            <div className="flex items-center justify-between p-3.5 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-900">
              <div>
                <span className="text-xs text-blue-700 dark:text-blue-300 font-medium">Total Payable (PHP)</span>
                <p className="text-2xl font-black text-blue-900 dark:text-blue-100 font-display">₱{amount.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Booking Code</span>
                <p className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">{bookingCode}</p>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Choose Philippine Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                {/* GCash */}
                <button
                  type="button"
                  id="pay-method-gcash"
                  onClick={() => setSelectedMethod('gcash')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                    selectedMethod === 'gcash'
                      ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/60 ring-2 ring-blue-600/30'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center mb-1 shadow-xs">
                    G
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">GCash</span>
                  <span className="text-[10px] text-slate-400">Mobile Wallet</span>
                </button>

                {/* Maya */}
                <button
                  type="button"
                  id="pay-method-maya"
                  onClick={() => setSelectedMethod('maya')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                    selectedMethod === 'maya'
                      ? 'border-emerald-600 bg-emerald-50/80 dark:bg-emerald-950/60 ring-2 ring-emerald-600/30'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center mb-1 shadow-xs">
                    M
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Maya</span>
                  <span className="text-[10px] text-slate-400">E-Wallet / Card</span>
                </button>

                {/* QR Ph */}
                <button
                  type="button"
                  id="pay-method-qrph"
                  onClick={() => setSelectedMethod('qrph')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                    selectedMethod === 'qrph'
                      ? 'border-red-600 bg-red-50/80 dark:bg-red-950/60 ring-2 ring-red-600/30'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-red-600 text-white font-bold text-xs flex items-center justify-center mb-1 shadow-xs">
                    <QrCode className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">QR Ph</span>
                  <span className="text-[10px] text-slate-400">Any PH Bank</span>
                </button>

                {/* Credit/Debit Card */}
                <button
                  type="button"
                  id="pay-method-card"
                  onClick={() => setSelectedMethod('card')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                    selectedMethod === 'card'
                      ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/60 ring-2 ring-blue-600/30'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-800 text-white font-bold text-xs flex items-center justify-center mb-1 shadow-xs">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Card</span>
                  <span className="text-[10px] text-slate-400">Visa / MC</span>
                </button>

                {/* GrabPay */}
                <button
                  type="button"
                  id="pay-method-grabpay"
                  onClick={() => setSelectedMethod('grabpay')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                    selectedMethod === 'grabpay'
                      ? 'border-emerald-600 bg-emerald-50/80 dark:bg-emerald-950/60 ring-2 ring-emerald-600/30'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white font-bold text-xs flex items-center justify-center mb-1 shadow-xs">
                    GP
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">GrabPay</span>
                  <span className="text-[10px] text-slate-400">Wallet</span>
                </button>

                {/* Cash on Arrival */}
                <button
                  type="button"
                  id="pay-method-cash"
                  onClick={() => setSelectedMethod('cash')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                    selectedMethod === 'cash'
                      ? 'border-amber-600 bg-amber-50/80 dark:bg-amber-950/60 ring-2 ring-amber-600/30'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-600 text-white font-bold text-xs flex items-center justify-center mb-1 shadow-xs">
                    <Banknote className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Cash</span>
                  <span className="text-[10px] text-slate-400">Pay at Bay</span>
                </button>
              </div>
            </div>

            {/* Dynamic Method Input */}
            {selectedMethod === 'gcash' && (
              <div className="p-4 bg-blue-50/60 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-900 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-semibold text-blue-900 dark:text-blue-200">
                  <Smartphone className="w-4 h-4 text-blue-600" />
                  <span>GCash Mobile Number</span>
                </div>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="09XX-XXX-XXXX"
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
                <p className="text-[11px] text-slate-500">
                  Instant authorization prompt will be simulated to verify GCash funds.
                </p>
              </div>
            )}

            {selectedMethod === 'qrph' && (
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-center space-y-2">
                <div className="w-36 h-36 bg-white p-2 mx-auto rounded-lg shadow-sm border flex flex-col items-center justify-center">
                  <QrCode className="w-28 h-28 text-slate-800" />
                  <span className="text-[8px] font-bold text-red-600">QR Ph National Standard</span>
                </div>
                <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Scan using BDO, BPI, UnionBank, GCash, or Maya App
                </p>
              </div>
            )}

            {selectedMethod === 'card' && (
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Expiry (MM/YY)
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                      CVV / CVC
                    </label>
                    <input
                      type="password"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedMethod === 'cash' && (
              <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200">
                <p className="font-semibold">Pay Over-the-Counter at Car Wash Bay</p>
                <p className="mt-1">
                  You can pay cash upon vehicle drop-off at our cashier counter. Your slot and bay are reserved immediately!
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              id="btn-confirm-pay"
              type="submit"
              disabled={isProcessing}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-bold rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Authorizing ₱{amount.toLocaleString()}...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  <span>
                    {selectedMethod === 'cash'
                      ? `Confirm Booking (₱${amount.toLocaleString()} on Arrival)`
                      : `Pay ₱${amount.toLocaleString()} Now`}
                  </span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
