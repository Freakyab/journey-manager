import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addPackage, updatePackage } from "../action";
import PackageType from "../type";

// Add booking form component to create booking or edit booking
function AddPackageForm({
  packageDetails,
  onClose,
}: {
  packageDetails?: PackageType;
  onClose: () => void;
}) {

  // Form data state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    location: "",
    availableDates: [] as string[],
    image: "",
  });

  // to check the current date
  const [currentDate, setCurrentDate] = useState<string>("");


  // Set the form data if packageDetails is provided (for editing)
  useEffect(() => {
    if (packageDetails) {
      setFormData({
        title: packageDetails.title,
        description: packageDetails.description,
        price: packageDetails.price,
        location: packageDetails.location,
        availableDates: packageDetails.availableDates,
        image: packageDetails.image,
      });
    }
  }, [packageDetails]);

  useEffect(() => {
    // Listen for the escape key to close the form
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Handle input changes for text fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle adding a new date to the availableDates array
  const handleAddDate = () => {
    if (currentDate && !formData.availableDates.includes(currentDate)) {
      setFormData((prevState) => ({
        ...prevState,
        availableDates: [...prevState.availableDates, currentDate],
      }));
      setCurrentDate(""); // Reset the date input
    } else {
      toast.error("Invalid date or date already added.");
    }
  };

  // Handle removing a date
  const handleRemoveDate = (dateToRemove: string) => {
    setFormData((prevState) => ({
      ...prevState,
      availableDates: prevState.availableDates.filter(
        (date) => date !== dateToRemove
      ),
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
    
      // Check if all fields are filled
      if (
        !formData.title ||
        !formData.description ||
        !formData.price ||
        !formData.location ||
        !formData.image ||
        formData.availableDates.length === 0
      ) {
        toast.error("Please fill all fields.");
        return;
      }

      // Check if the price is negative
      if (formData.price < 0) {
        toast.error("Price cannot be negative.");
        return;
      }

      // Check if the date is in the past
      const currentDate = new Date().toISOString().split("T")[0];
      if (formData.availableDates.some((date) => date < currentDate)) {
        toast.error("Date cannot be in the past.");
        return;
      }

      // Send the data to the server
      await addPackage(formData).then((failed) => {
        if (failed) {
          throw new Error("Failed to create package.");
        } else {
          toast.success("Package created successfully!");
        }
      });
    } catch (error) {
      toast.error("Error submitting the package. Please try again.");
      console.error("Submission error:", error);
    }

    // Reset the form data and close the modal
    setFormData({
      title: "",
      description: "",
      price: 0,
      location: "",
      availableDates: [],
      image: "",
    });
    onClose(); // Close the modal
  };

  // Handle updating the package details
  const updatePackageDetails = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {

      // Check if the package ID is available
      if (!packageDetails?._id) {
        toast.error("Package ID not found");
        return;
      }

      // Create a new form data object with the package ID
      const newFormData = {
        ...formData,
        _id: packageDetails?._id,
      };

      // Check if all fields are filled
      if (
        newFormData.title === "" ||
        newFormData.description === "" ||
        newFormData.price === 0 ||
        newFormData.location === "" ||
        newFormData.image === "" ||
        newFormData.availableDates.length === 0
      ) {
        toast.error("Please fill all the fields");
        return;
      }

      // Check if there are any changes
      if (
        newFormData.title === packageDetails.title &&
        newFormData.description === packageDetails.description &&
        newFormData.price === packageDetails.price &&
        newFormData.location === packageDetails.location &&
        newFormData.image === packageDetails.image &&
        newFormData.availableDates.join(",") ===
          packageDetails.availableDates.join(",")
      ) {
        toast.error("No changes detected");
        return;
      }

      // Check if the price is negative
      if (newFormData.price < 0) {
        toast.error("Price cannot be negative");
        return;
      }

      // Check if the date is in the past
      const currentDate = new Date().toISOString().split("T")[0];
      if (newFormData.availableDates.some((date) => date < currentDate)) {
        toast.error("Date cannot be in the past");
        return;
      }

      // Send the data to the server
      const response = await updatePackage(newFormData);
      if (response.success) {
        toast.success("Package updated successfully!");
      } else {
        toast.error(response.message);
        console.error("Update error:", response);
      }
    } catch (error) {
      toast.error("Error updating the package. Please try again.");
      console.error("Update error:", error);
    }

    // Reset the form data and close the modal
    setFormData({
      title: "",
      description: "",
      price: 0,
      location: "",
      availableDates: [],
      image: "",
    });
    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-primary/90 rounded-xl shadow-2xl w-full max-w-xl p-8 max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-bold text-third mb-6 text-center">
          {packageDetails?._id ? "Edit Package" : "Create a New Package"}
        </h2>
        <form
          onSubmit={packageDetails?._id ? updatePackageDetails : handleSubmit}
          className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-third font-semibold mb-2">
              Package Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-3 border-2 border-third/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-fourth"
              placeholder="Enter package title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-third font-semibold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full p-3 border-2 border-third/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-fourth"
              placeholder="Enter package description"></textarea>
          </div>

          {/* Price */}
          <div>
            <label className="block text-third font-semibold mb-2">
              Price (per person)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="1"
              required
              className="w-full p-3 border-2 border-third/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-fourth"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-third font-semibold mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full p-3 border-2 border-third/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-fourth"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-third font-semibold mb-2">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              className="w-full p-3 border-2 border-third/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-fourth"
            />
          </div>

          {/* Available Dates */}
          <div>
            <label className="block text-third font-semibold mb-2">
              Available Dates
            </label>
            <div className="flex gap-2 items-center mb-4">
              <input
                type="date"
                value={currentDate}
                onChange={(e) => setCurrentDate(e.target.value)}
                className="p-3 border-2 border-third/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-fourth w-full"
              />
              <button
                type="button"
                onClick={handleAddDate}
                className="bg-fourth text-primary px-4 py-2 rounded-full font-bold hover:bg-third/90 transition duration-300">
                Add Date
              </button>
            </div>

            {/* Display added dates */}
            <div className="flex flex-wrap gap-2">
              {formData.availableDates.map((date, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-third/20 text-third px-3 py-1 rounded-full">
                  <span>{date}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveDate(date)}
                    className="text-red-500 hover:text-red-700">
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Confirm Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-third/20 text-third px-6 py-3 rounded-full hover:bg-third/30 transition duration-300">
              Cancel
            </button>
            <button
              type="submit"
              className="bg-third text-primary px-8 py-3 rounded-full hover:bg-fourth transition duration-300">
              Confirm Package
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPackageForm;
