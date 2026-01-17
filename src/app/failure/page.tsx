export default function FailurePage() {
  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Failed</h1>
        <p className="text-lg text-gray-600 mb-2">
          Your payment could not be processed.
        </p>
        <p className="text-gray-600 mb-8">
          Please try again or contact support for assistance.
        </p>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-center">
            <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span className="text-red-800 font-medium">Please verify your payment details</span>
          </div>
        </div>

        <p className="text-gray-600 mb-8">
          If you believe this is an error, please contact our support team with your order details.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://www.emergesolutions.io"
            className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-200 ease-in-out transform hover:scale-[1.02] text-center inline-block"
          >
            Try Again
          </a>
          <a
            href="/"
            className="py-3 px-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md transition duration-200 ease-in-out text-center inline-block"
          >
            Return Home
          </a>
        </div>
      </div>
    </div>
  );
}