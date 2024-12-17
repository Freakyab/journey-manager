import { 
  Calendar, 
  User, 
  MapPin, 
  CreditCard, 
  Plane, 
  Phone, 
  Mail 
} from 'lucide-react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';

const BookingReceipt = ({
  bookingDetails,
  onGeneratePDF
}: {
  bookingDetails: {
    packageName: string;
    customerName: string;
    email: string;
    phone: string;
    travelers: number;
    date: string;
    totalPrice: number;
    specialRequests?: string;
    packageDetails: string;
    ref: string;
  };
  onGeneratePDF?: (pdfBlob: Blob) => void;
}) => {
  const {
    packageName,
    customerName,
    email,
    phone,
    travelers,
    date,
    totalPrice,
    specialRequests,
    packageDetails,
    ref,
  } = bookingDetails;

  // Generate PDF
  const generatePDF = async () => {
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();
      
      // Load a standard font
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      // Helper function to convert hex to PDFLib RGB
      const hexToRgb = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;
        return rgb(r, g, b);
      };

      // Header
      page.drawRectangle({
        x: 0,
        y: height - 100,
        width: width,
        height: 100,
        color: hexToRgb('#125b9a')
      });

      page.drawText('Adventure Booking Confirmation', {
        x: 50,
        y: height - 70,
        size: 20,
        font: boldFont,
        color: rgb(1, 1, 1)
      });

      // Booking Details
      let yPosition = height - 150;
      const details = [
        { label: 'Package', value: packageName },
        { label: 'Customer Name', value: customerName },
        { label: 'Email', value: email },
        { label: 'Phone', value: phone },
        { label: 'Booking Date', value: date },
        { label: 'Travelers', value: travelers.toString() },
        { label: 'Total Price', value: `$${totalPrice.toFixed(2)}` },
      ];

      details.forEach((detail) => {
        page.drawText(`${detail.label}: ${detail.value}`, {
          x: 50,
          y: yPosition,
          size: 12,
          font,
          color: rgb(0, 0, 0)
        });
        yPosition -= 20;
      });

      // Special Requests
      if (specialRequests) {
        yPosition -= 20;
        page.drawText('Special Requests:', {
          x: 50,
          y: yPosition,
          size: 12,
          font: boldFont,
          color: hexToRgb('#125b9a')
        });
        yPosition -= 20;
        page.drawText(specialRequests, {
          x: 50,
          y: yPosition,
          size: 10,
          font,
          color: rgb(0, 0, 0)
        });
      }

      // Package Details
      yPosition -= 40;
      page.drawText('Package Details:', {
        x: 50,
        y: yPosition,
        size: 12,
        font: boldFont,
        color: hexToRgb('#125b9a')
      });
      yPosition -= 20;
      page.drawText(packageDetails, {
        x: 50,
        y: yPosition,
        size: 10,
        font,
        color: rgb(0, 0, 0)
      });

      // Booking Reference
      page.drawText(`Booking Reference: ${ref}`, {
        x: 50,
        y: 50,
        size: 10,
        font,
        color: hexToRgb('#f05a7e')
      });

      // Generate PDF
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      
      // Save or callback
      if (onGeneratePDF) {
        onGeneratePDF(blob);
      } else {
        saveAs(blob, `booking-confirmation-${ref}.pdf`);
      }

      return blob;
    } catch (error) {
      console.error('PDF Generation Error:', error);
      throw error;
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden max-w-md mx-auto my-8 border-2 border-fourth">
      <div 
        className="text-white p-6 text-center"
        style={{
          backgroundColor: 'rgb(18, 91, 154)', // third color
          backgroundImage: 'linear-gradient(to right, rgb(18, 91, 154), rgb(11, 132, 148))', // third to fourth
        }}
      >
        <h1 className="text-2xl font-bold">Adventure Booking Confirmation</h1>
        <p className="text-sm opacity-80">Thank you for your booking!</p>
      </div>

      <div className="p-6 space-y-4">
        <div
          className="flex items-center border-b pb-4"
          style={{ borderBottomColor: '#ffbe98' }}>
          <Plane className="mr-4" style={{ color: '#0b8494' }} size={24} />
          <div>
            <h2 className="font-bold text-lg text-third">
              {packageName}
            </h2>
            <p className="text-sm text-secondary">
              Adventure Package
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <User className="mr-2" style={{ color: '#0b8494' }} size={20} />
            <div>
              <p className="font-semibold text-third">
                Customer Name
              </p>
              <p className="text-gray-600">{customerName}</p>
            </div>
          </div>

          <div className="flex items-center">
            <Calendar
              className="mr-2"
              style={{ color: '#0b8494' }}
              size={20}
            />
            <div>
              <p className="font-semibold text-third">
                Booking Date
              </p>
              <p className="text-gray-600">{date}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <MapPin
              className="mr-2"
              style={{ color: '#0b8494' }}
              size={20}
            />
            <div>
              <p className="font-semibold text-third">
                Travelers
              </p>
              <p className="text-gray-600">{travelers}</p>
            </div>
          </div>

          <div className="flex items-center">
            <CreditCard
              className="mr-2"
              style={{ color: '#0b8494' }}
              size={20}
            />
            <div>
              <p className="font-semibold text-third">
                Total Price
              </p>
              <p className="text-gray-600">${totalPrice.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Phone
              className="mr-2"
              style={{ color: '#0b8494' }}
              size={20}
            />
            <div>
              <p className="font-semibold text-third">
                Phone Number
              </p>
              <p className="text-gray-600">{phone}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Mail className="mr-2" style={{ color: '#0b8494' }} size={20} />
            <div>
              <p className="font-semibold text-third">
                Email Address
              </p>
              <p className="text-gray-600">{email}</p>
            </div>
          </div>
        </div>

        {specialRequests && (
          <div
            className="border-t pt-4"
            style={{ borderTopColor: '#ffbe98' }}>
            <p className="font-semibold mb-2 text-third">
              Special Requests
            </p>
            <p
              className="p-3 rounded-lg"
              style={{
                backgroundColor: '#ffbe98' + "20",
                color: 'inherit'
              }}>
              {specialRequests}
            </p>
          </div>
        )}

        <div
          className="p-4 rounded-lg"
          style={{
            backgroundColor: '#ffbe98' + "10",
          }}>
          <h3 className="font-bold mb-2 text-third">
            Package Details
          </h3>
          {packageDetails}
        </div>

        <div
          className="text-center mt-6 border-t pt-4"
          style={{ borderTopColor: '#ffbe98' }}>
          <p className="text-sm text-secondary">
            Booking Confirmation • Ref: {ref}
          </p>
          <button 
            onClick={generatePDF}
            className="mt-4 bg-third text-white px-4 py-2 rounded hover:bg-fourth transition duration-300"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};



export default BookingReceipt;