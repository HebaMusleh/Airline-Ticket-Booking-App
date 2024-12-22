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

export { SearchFlightData, InputProps, TripOptionProps };
