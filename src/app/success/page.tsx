export default function SuccessPage() {
  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
        <p className="text-lg text-gray-600 mb-2">
          Thank you for your payment.
        </p>
        <p className="text-gray-600 mb-8">
          Your transaction has been processed successfully.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span className="text-green-800 font-medium">Transaction confirmed and secured</span>
          </div>
        </div>

        <p className="text-gray-600 mb-8">
          You will receive a confirmation email shortly with the details of your transaction.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://www.emergesolutions.io"
            className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-200 ease-in-out transform hover:scale-[1.02] text-center inline-block"
          >
            Return Home
          </a>
          <a
            href="/"
            className="py-3 px-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md transition duration-200 ease-in-out text-center inline-block"
          >
            Make Another Payment
          </a>
        </div>
      </div>
    </div>
  );
}