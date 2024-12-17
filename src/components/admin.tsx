import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import AddBookingForm from "./addPackageForm";
import BookingsView from "./bookingDetails";
import { deletePackage, fetchPackages } from "../action";
import PackageType from "../type";

function Admin() {
  const [isAddPackageModalOpen, setIsAddPackageModalOpen] = useState(false);
  const [packageDetails, setPackageDetails] = useState<PackageType | null>(
    null
  );
  const [packages, setPackages] = useState<PackageType[]>([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await fetchPackages();
      setPackages(data);
    };

    fetchAPI();
  }, [isAddPackageModalOpen]);

  const handleAddPackage = () => {
    setIsAddPackageModalOpen(true);
  };

  const handleDeletePackage = async (id: string) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this package?"
      );
      if (!confirmDelete) {
        return;
      }
      const response = await deletePackage(id);

      if (response.success) {
        const data = await fetchPackages();
        setPackages(data);
      }
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };

  return (
    <div className="min-h-screen h-full w-full bg-primary/20 flex flex-col items-center p-8 relative">
      {/* Add New Package Button */}

      <div className="w-full flex justify-end mb-8 sticky top-4 z-20">
        <button
          className="bg-gradient-to-br from-fourth to-secondary text-primary 
          text-lg font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-2xl 
          transition duration-300 transform hover:scale-105 border-2 border-secondary"
          onClick={handleAddPackage}>
          + Add New Package
        </button>
      </div>
      {isAddPackageModalOpen && (
        <AddBookingForm
          packageDetails={packageDetails || undefined}
          onClose={() => setIsAddPackageModalOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="w-full bg-secondary/20 py-12 px-4 rounded-lg">
        <h2 className="text-3xl font-bold text-third mb-6 text-center">
          Admin page
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages?.map((item, index) => (
            <div
              key={index}
              className="relative transform transition-all duration-300 
              hover:scale-105 hover:z-10 hover:shadow-2xl">
              <div
                className="bg-primary/90 rounded-xl overflow-hidden 
                border-4 border-third shadow-lg relative">
                {/* Delete Button */}
                <div
                  className="absolute top-4 right-4 z-10 flex gap-4"
                  onClick={() => handleDeletePackage(item._id)}>
                  <button className="border-secondary border-2 bg-fourth/70 text-secondary rounded-full p-2 hover:bg-fourth hover:shadow-md transition">
                    <Trash2 size={24} />
                  </button>
                </div>

                {/* Image */}
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover 
                    border-b-8 border-third/50 
                    transition-transform duration-300 
                    group-hover:brightness-110"
                  />
                  <div
                    className="absolute inset-0 
                    bg-gradient-to-b from-transparent to-black/40"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3
                    className="text-2xl font-bold text-third mb-2 
                    tracking-wider border-b-2 border-third/30 pb-2">
                    {item.title}
                  </h3>

                  <p
                    className="text-third/80 text-sm leading-relaxed mb-4 
                    italic font-medium">
                    {item.description}
                  </p>

                  {/* Available Dates */}
                  <div className="mb-4">
                    <p className="text-third font-semibold mb-2">
                      Available Dates:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.availableDates.map((date, dateIndex) => (
                        <span
                          key={dateIndex}
                          className="bg-fourth/20 text-third 
                          px-3 py-1 rounded-full text-xs font-bold 
                          border border-third/30 
                          hover:bg-fourth hover:text-primary 
                          transition duration-200">
                          {date}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price and Edit Button */}
                  <div
                    className="flex items-center justify-between 
                    mt-4 pt-4 border-t-2 border-third/30">
                    <div
                      className="bg-secondary text-primary 
                      px-4 py-2 rounded-lg shadow-md 
                      transform -rotate-3">
                      <span className="text-xl font-bold">${item.price}</span>
                      <span className="text-xs block -mt-1">per person</span>
                    </div>
                    <button
                      className="bg-third text-primary 
                      px-6 py-2 rounded-full font-bold 
                      hover:bg-fourth transition duration-300 
                      transform hover:scale-105"
                      onClick={() => {
                        setPackageDetails(item);
                        setIsAddPackageModalOpen(true);
                      }}>
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BookingsView />
    </div>
  );
}

export default Admin;
