import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function BookingForm({
  packageDetails,
  onClose,
}: {
  packageDetails: any;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelers: 1,
    specialRequests: "",
  });

  useEffect(() => {
    // listen for the escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // add the event listener
    document.addEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const calculateTotalPrice = () => {
    return packageDetails.price * formData.travelers;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      //   const bookingData = {
      //     ...formData,
      //     packageId: packageDetails._id,
      //     packageTitle: packageDetails.title,
      //     totalPrice: calculateTotalPrice(),
      //     bookingDate: new Date(),
      //   };

      //   const response = await axios.post("/api/bookings", bookingData);

      onClose(); // Close the modal
    } catch (error) {
      toast.error("Booking failed. Please try again.");
      console.error("Booking error:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-primary/90 rounded-xl shadow-2xl w-full max-w-xl p-8 max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-bold text-third mb-6 text-center">
          Book Your Adventure
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4 w-full">
            <div>
              <label className="block text-third font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border-2 border-third/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-fourth"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-third font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border-2 border-third/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-fourth"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-third font-semibold mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-3 border-2 border-third/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-fourth"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-third font-semibold mb-2">
              Number of Travelers
            </label>
            <input
              type="number"
              name="travelers"
              value={formData.travelers}
              onChange={handleChange}
              min="1"
              max="10"
              required
              className="w-full p-3 border-2 border-third/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-fourth"
            />
          </div>

          <div>
            <label className="block text-third font-semibold mb-2">
              Special Requests (Optional)
            </label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              className="w-full p-3 border-2 border-third/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-fourth"
              placeholder="Any special requirements?"
              rows={3}
            />
          </div>

          <div className="bg-secondary/20 p-4 rounded-lg">
            <p className="text-third font-bold">
              Total Price: ${calculateTotalPrice()}
              <span className="text-sm font-normal ml-2">
                ({formData.travelers} travelers at ${packageDetails.price} each)
              </span>
            </p>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-third/20 text-third px-6 py-3 rounded-full hover:bg-third/30 transition duration-300">
              Cancel
            </button>
            <button
              type="submit"
              className="bg-third text-primary px-8 py-3 rounded-full hover:bg-fourth transition duration-300">
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;
