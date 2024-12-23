interface SearchFlightData {
  originCity: string;
  destinationCity: string;
  departureDate: string;
  seat: number;
}
interface InputProps {
  placeholder: string;
  icon: React.ReactNode;
  value: string;
  onPress: () => void;
  date?:boolean
}

interface TripOptionProps {
  pageNavigation: string;
  handleNavigationChange: (type: string) => void;
}

interface FlightOfferData {
  originLocationCode: string;
    destinationLocationCode: string;
    departureDate: Date;
    returnDate: Date;
    adults: number;
    children: number;
    maxResults: number;
}

export { SearchFlightData, InputProps, TripOptionProps,FlightOfferData };
