// {
//     "id": 5,
//     "title": "Cultural Japan Tour",
//     "description": "Immerse yourself in the rich culture of Japan, from ancient temples to bustling modern cities.",
//     "price": 2500,
//     "location": "Japan",
//     "availableDates": ["2025-03-01", "2025-04-10", "2025-05-20"],
//     "image": "https://i0.wp.com/www.touristjapan.com/wp-content/uploads/2017/04/shutterstock_667925704-scaled.jpg?fit=500%2C334&ssl=1"
// },

type PackageType = {
    _id: any;
    title: string;
    description: string;
    price: number;
    location: string;
    availableDates: string[];
    image: string;
};

export default PackageType;