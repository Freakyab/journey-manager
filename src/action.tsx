export const fetchPackages = async () => {
  try {
    const response = await fetch("https://journey-manager-backend.vercel.app/packages", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`Error: ${response.status} ${response.statusText}`);
      return [];
    }

    const data = await response.json();

    if (data.success) {
      return data.packages || []; // Ensure it returns the packages array
    } else {
      console.error("Error: API response indicates failure.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching packages:", error);
    return [];
  }
};

export const fetchPackageById = async (id: string) => {
  try {
    const response = await fetch(`https://journey-manager-backend.vercel.app/packages/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`Error: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();

    if (data.success) {
      console.log(data);
      return data.packages || null;
    } else {
      console.error("Error: API response indicates failure.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching package by ID:", error);
    return null;
  }
};

export const addPackage = async (formData: {
  title: string;
  description: string;
  price: number;
  location: string;
  availableDates: string[];
  image: string;
}) => {
  try {
    await fetch("https://journey-manager-backend.vercel.app/admin/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          return true;
        } else {
          return false;
        }
      });
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const generateBooking = async (bookingData: {
  name: string;
  email: string;
  phone: string;
  travelers: number;
  specialRequests: string;
  packageId: string;
}) => {
  if (
    !bookingData.name ||
    !bookingData.email ||
    !bookingData.phone ||
    !bookingData.travelers ||
    !bookingData.packageId
  ) {
    return false;
  }

  try {
    const res = await fetch("https://journey-manager-backend.vercel.app/bookings/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });
    if (!res.ok) {
      console.error(`Error: ${res.status} ${res.statusText}`);
      return {
        success: false,
        message: "Failed to book package. Please try again.",
      };
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to book package. Please try again.",
    };
  }
};

export const updatePackage = async (formData: {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  availableDates: string[];
  image: string;
}) => {
  try {
    const response = await fetch(
      `https://journey-manager-backend.vercel.app/admin/update/${formData._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      console.error(`Error: ${response.status} ${response.statusText}`);
      return {
        success: false,
      };
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to update package. Please try again.",
    };
  }
};

export const deletePackage = async (id: string) => {
  try {
    const response = await fetch(`https://journey-manager-backend.vercel.app/admin/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`Error: ${response.status} ${response.statusText}`);
      return {
        success: false,
      };
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};
