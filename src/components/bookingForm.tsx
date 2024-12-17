import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { generateBooking } from "../action";
import BookingReceipt from "./bookingReceipt";

function BookingForm({
  packageId,
  packageDetails,
  onClose,
}: {
  packageId: string;
  packageDetails: any;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelers: 1,
    specialRequests: "",
    date: "",
  });
  const [bookingDetails, setBookingDetails] = useState<{
    packageName: string;
    customerName: string;
    email: string;
    phone: string;
    travelers: number;
    date: string;
    totalPrice: number;
    specialRequests?: string;
    packageDetails: string;
    ref : string  
  } | null>(null);

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
      if (
        !formData.name ||
        !formData.email ||
        !formData.phone ||
        !formData.travelers ||
        !packageId
      ) {
        toast.error("Please fill all fields.");
        return;
      }

      const bookingData = {
        ...formData,
        packageId: packageId,
      };

      const response = await generateBooking(bookingData);
      console.log(response.data);
      if (response.success) {
        toast.success("Booking successful!");

        setBookingDetails({
          packageName: packageDetails.title,
          customerName: formData.name,
          email: formData.email,
          phone: formData.phone,
          travelers: formData.travelers,
          date: formData.date,
          totalPrice: calculateTotalPrice(),
          specialRequests: formData.specialRequests,
          packageDetails: packageDetails.description,
          ref : response.data._id
        });
        // generatePDF();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Booking failed. Please try again.");
      console.error("Booking error:", error);
    }
    // onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {bookingDetails ? (
        <BookingReceipt bookingDetails={bookingDetails} />
      ) : (
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

            <div>
              {/* map all the available date as button */}
              <label className="block text-third font-semibold mb-2">
                Select Date
              </label>

              {packageDetails.availableDates.map((date: string) => (
                <button
                  key={date}
                  onClick={(e) => {
                    e.preventDefault();
                    setFormData((prevState) => ({
                      ...prevState,
                      date: date,
                    }));
                  }}
                  className={`${
                    formData.date === date
                      ? "bg-fourth text-primary"
                      : "bg-third text-white/30"
                  } p-2 rounded-lg mr-2 mb-2`}>
                  {date}
                </button>
              ))}
            </div>

            <div className="bg-secondary/20 p-4 rounded-lg">
              <p className="text-third font-bold">
                Total Price: ${calculateTotalPrice()}
                <span className="text-sm font-normal ml-2">
                  ({formData.travelers} travelers at ${packageDetails.price}{" "}
                  each)
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
      )}
    </div>
  );
}

export default BookingForm;
