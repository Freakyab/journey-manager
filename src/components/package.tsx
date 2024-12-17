import { useEffect, useState } from "react";
import BookingForm from "./bookingForm";
import { useParams } from "react-router-dom";
import PackageType from "../type";
import { fetchPackageById } from "../action";

function Package() {
  // Get the package ID from the URL
  const { id } = useParams<{ id: string }>();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [packageData, setPackageData] = useState<PackageType | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchAPI = async () => {
      const data = await fetchPackageById(id);
      setPackageData(data);
    };

    fetchAPI();
  }, [id]);

  return (
    <div className="bg-primary/20 min-h-screen min-w-screen flex justify-center items-center p-8">
      {packageData && (
        <div className="border-4 border-third rounded-xl shadow-2xl min-h-[80vh] flex min-w-[80vw] bg-primary/50 overflow-hidden">
          {/* Image Section */}
          <div className="w-1/3 relative">
            <img
              src={packageData.image}
              alt={packageData.title}
              className="w-full min-h-[80vh] h-full object-cover rounded-l-lg"
            />
            {/* Vintage Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-third/40"></div>
            {/* Stamp Effect */}
            <div
              className="absolute top-4 right-4 
            bg-fourth/80 text-primary rounded-full 
            w-20 h-20 flex items-center justify-center 
            rotate-12 shadow-xl z-10">
              <span className="text-xs font-bold text-center">ADVENTURE</span>
            </div>
          </div>

          {/* Package Details Section */}
          <div className="p-8 w-2/3 flex flex-col justify-between">
            {/* Header */}
            <div>
              <h1 className="text-4xl font-bold text-third mb-4 pb-2 border-b-2 border-third/30">
                {packageData.title}
              </h1>
              <p className="text-third/80 italic mb-6">
                {packageData.description}
              </p>
            </div>

            {/* Package Details Grid */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Destination Details */}
              <div className="bg-secondary/10 p-4 rounded-lg border border-third/20">
                <h3 className="text-xl font-semibold text-third mb-2">
                  Destination Details
                </h3>
                <p className="text-third/80">
                  <strong>Location:</strong> {packageData.location}
                  <br />
                  <strong>Region:</strong> Coastal Exploration
                  <br />
                  <strong>Terrain:</strong> Beaches, Scenic Landscapes
                </p>
              </div>

              {/* Trip Highlights */}
              <div className="bg-secondary/10 p-4 rounded-lg border border-third/20">
                <h3 className="text-xl font-semibold text-third mb-2">
                  Trip Highlights
                </h3>
                <ul className="list-disc list-inside text-third/80">
                  <li>Scenic Beach Tours</li>
                  <li>Local Culture Immersion</li>
                  <li>Historical Site Visits</li>
                  <li>Authentic Cuisine Experience</li>
                </ul>
              </div>
            </div>

            {/* Available Dates */}
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-third mb-4">
                Available Dates
              </h3>
              <div className="flex flex-wrap gap-4">
                {packageData.availableDates.map((date, index) => (
                  <span
                    key={index}
                    className="bg-fourth/20 text-third 
                  px-4 py-2 rounded-full text-sm font-bold 
                  border border-third/30 
                  hover:bg-fourth hover:text-primary 
                  transition duration-200">
                    {date}
                  </span>
                ))}
              </div>
            </div>

            {/* Pricing and Booking */}
            <div className="flex justify-between items-center border-t-2 border-third/30 pt-6">
              <div
                className="bg-secondary text-primary 
              px-6 py-3 rounded-lg shadow-md 
              transform -rotate-3">
                <span className="text-2xl font-bold">${packageData.price}</span>
                <span className="text-xs block -mt-1">per person</span>
              </div>
              <div className="flex gap-4">
                <button
                  className="bg-third text-primary 
                px-8 py-3 rounded-full font-bold 
                hover:bg-fourth transition duration-300 
                transform hover:scale-105"
                  onClick={() => setIsBookingModalOpen(true)}>
                  Book Now
                </button>
              </div>
            </div>

            {isBookingModalOpen && id && (
              <BookingForm
                packageId={id}
                packageDetails={packageData}
                onClose={() => setIsBookingModalOpen(false)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Package;
