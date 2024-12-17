import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PackageType from "./type";
import { fetchPackages } from "./action";
import { Loader2 } from "lucide-react";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [filterData, setFilterData] = useState<PackageType[] | []>();
  const [fetchData, setFetchData] = useState<PackageType[] | []>();
  const [searchTerm, setSearchTerm] = useState("");
  const navigater = useNavigate();

  useEffect(() => {
    const fetchAPI = async () => {
      setIsLoading(true);
      const data = await fetchPackages();
      setFetchData(data);
      setFilterData(data);
      setIsLoading(false);
    };

    fetchAPI();
  }, []);

  const handleSearch = () => {
    const filteredData = fetchData?.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilterData(filteredData);
  };

  return (
    <div className="bg-primary min-h-screen w-full p-4 sm:p-6">
      {/* Header Section */}
      <header className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-third tracking-wide">
          JourneyManager
        </h1>
        <h2 className="text-lg sm:text-xl font-medium text-third/80 pt-2">
          Discover your next adventure
        </h2>
      </header>

      {/* Top Visited Places Section */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold text-third mb-6 tracking-wide text-start">
          Top Visited Places
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {isLoading && <Loader2 className="text-third mx-auto animate-spin" size="64" />}
          {fetchData?.map((item, index) => (
            <div
              key={index}
              className={`bg-white border-2 border-secondary rounded-lg shadow-lg overflow-hidden group relative transition-transform duration-300 
              ${index === 1 ? "sm:col-span-2 sm:row-span-2" : "col-span-1"}
              transform hover:scale-105`}>
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 sm:h-full object-cover group-hover:scale-110 transform duration-300"
              />

              {/* Overlay */}
              <div className="hidden group-hover:flex absolute inset-0 bg-black bg-opacity-50 items-center justify-center flex-col text-center p-2 sm:p-4">
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-white text-xs sm:text-sm mt-2">
                  {item.description}
                </p>
                <div className="mt-2 sm:mt-4 flex gap-2 sm:gap-4">
                  {/* <button className="bg-third text-white py-1 px-2 sm:py-2 sm:px-4 rounded-md text-sm sm:text-base hover:bg-fourth transition duration-200">
                    Book Now
                  </button> */}
                  <button
                    className="bg-fourth text-white py-1 px-2 sm:py-2 sm:px-4 rounded-md text-sm sm:text-base hover:bg-third transition duration-200"
                    onClick={() => navigater(`/package/${item._id}`)}>
                    Know More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Search Section */}
      <section className="mt-8 sm:mt-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-third mb-6 tracking-wide text-start">
          Search Packages & Trips
        </h2>
        <div className="flex justify-center items-center bg-primary/20 pt-4 sm:pt-8 rounded-t-xl">
          <div className="bg-secondary/10 shadow-2xl p-4 sm:p-8 rounded-2xl w-full sm:max-w-[80%] border-4 border-third/50">
            <label
              className="text-xl sm:text-3xl font-bold text-third block mb-4 sm:mb-6 text-center tracking-wide"
              htmlFor="destination">
              Your Journey Awaits...
            </label>
            <div className="flex flex-col sm:flex-row gap-4 ">
              <input
                className="flex-grow p-2 sm:p-4 text-base sm:text-xl border-2 border-third rounded-xl bg-primary/20 
                focus:outline-none focus:ring-2 focus:ring-fourth 
                placeholder-third/70 text-third font-medium"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                id="destination"
                placeholder="Discover Your Next Adventure"
              />
              <button
                onClick={handleSearch}
                className="bg-third text-primary px-4 sm:px-8 py-2 sm:py-4 text-base sm:text-xl font-bold rounded-xl
                hover:bg-fourth transition duration-300 transform hover:scale-105 active:scale-95">
                Explore
              </button>
            </div>
          </div>
        </div>

        {/* Retro Styled Search Results */}
        <div className="bg-secondary/20 my-6 sm:my-12 py-8 sm:py-12 px-2 sm:px-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {isLoading && <Loader2 className="text-third mx-auto animate-spin" size="64" />}
            {filterData?.map((item, index) => (
              <div
                key={index}
                className="relative transform transition-all duration-300 
                hover:scale-105 hover:z-10 hover:shadow-2xl">
                <div
                  className="bg-primary/90 rounded-xl overflow-hidden 
                  border-4 border-third shadow-lg relative">
                  {/* Vintage Stamp Effect */}
                  <div
                    className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 
                    bg-fourth/80 text-primary rounded-full 
                    w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center 
                    rotate-12 shadow-xl">
                    <span className="text-[10px] sm:text-xs font-bold text-center">
                      EXPLORE
                    </span>
                  </div>

                  {/* Image with Vintage Border */}
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 sm:h-64 object-cover 
                      border-b-8 border-third/50 
                      transition-transform duration-300 
                      group-hover:brightness-110"
                    />
                    <div
                      className="absolute inset-0 
                      bg-gradient-to-b from-transparent to-black/40"></div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6">
                    {/* Title */}
                    <h3
                      className="text-xl sm:text-2xl font-bold text-third mb-2 
                      tracking-wider border-b-2 border-third/30 pb-2">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-third/80 text-xs sm:text-sm leading-relaxed mb-2 sm:mb-4 
                      italic font-medium">
                      {item.description}
                    </p>

                    {/* Available Dates */}
                    <div className="mb-2 sm:mb-4">
                      <p className="text-third font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                        Available Dates:
                      </p>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {item.availableDates.map((date, dateIndex) => (
                          <span
                            key={dateIndex}
                            className="bg-fourth/20 text-third 
                            px-2 py-1 rounded-full text-[10px] sm:text-xs font-bold 
                            border border-third/30 
                            hover:bg-fourth hover:text-primary 
                            transition duration-200">
                            {date}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price with Vintage Tag */}
                    <div
                      className="flex items-center justify-between 
                      mt-2 sm:mt-4 pt-2 sm:pt-4 border-t-2 border-third/30">
                      <div
                        className="bg-secondary text-primary 
                        px-3 py-1 sm:px-4 sm:py-2 rounded-lg shadow-md 
                        transform -rotate-3">
                        <span className="text-base sm:text-xl font-bold">
                          ${item.price}
                        </span>
                        <span className="text-[10px] sm:text-xs block -mt-1">
                          per person
                        </span>
                      </div>
                      <button
                        onClick={() => navigater(`/package/${item._id}`)}
                        className="bg-third text-primary 
                        px-4 py-2 sm:px-6 sm:py-2 rounded-full font-bold text-sm sm:text-base
                        hover:bg-fourth transition duration-300 
                        transform hover:scale-105">
                        Book Trip
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
