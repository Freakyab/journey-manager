
// Pre-defined bookings data
const bookingsData = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    travelers: 2,
    specialRequests: "Vegetarian meals preferred"
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com", 
    phone: "+1 (555) 987-6543",
    travelers: 1,
    specialRequests: "Window seat if possible"
  },
  {
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    phone: "+1 (555) 456-7890",
    travelers: 3,
    specialRequests: "Family trip, need connecting rooms"
  }
];

function BookingsView() {
  return (
    <div className="w-full mt-8">
      <div className="bg-secondary/20 shadow-lg rounded-xl border border-gray-200">
        <div className="p-4 sm:p-6 md:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-third mb-6">
            Submitted Bookings
          </h2>

          {bookingsData.length === 0 ? (
            <div className="text-center text-gray-500 text-base sm:text-lg">
              No bookings found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {bookingsData.map((booking, index) => (
                <div 
                  key={index} 
                  className="bg-gray-50 rounded-lg border border-gray-200 p-4 sm:p-5 
                  transform transition duration-300 hover:scale-105 hover:shadow-md"
                >
                  {/* Header with Name and Traveler Count */}
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-third">
                      {booking.name}
                    </h3>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs sm:text-sm">
                      {booking.travelers} Traveler{booking.travelers > 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Booking Details */}
                  <div className="space-y-2">
                    {/* Email */}
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm sm:text-base text-gray-700 truncate">
                        {booking.email}
                      </p>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <p className="text-sm sm:text-base text-gray-700">
                        {booking.phone}
                      </p>
                    </div>

                    {/* Special Requests */}
                    {booking.specialRequests && (
                      <div className="flex items-start mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                        <p className="text-xs sm:text-sm text-gray-600 italic">
                          {booking.specialRequests}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingsView;