import {LocationInput,TripOption,Header} from "@/components";

import { SearchFlightData } from "@/types";

import { FontAwesome5 } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import { useState } from "react";
import { View, ActivityIndicator } from "react-native";

export default function HomeScreen() {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [pageNavigation, setPageNavigation] = useState<string>("oneWay");
  const [searchFlightData, setSearchFlightData] = useState<SearchFlightData>({
    originCity: "",
    destinationCity: "",
    departureDate: "",
    seat: 0,
  });
  const handleNavigationChange = (type: string) => setPageNavigation(type);

  return (
    <View className="flex-1 items-center bg-[#F5F7FA] relative">
      <StatusBar style="light" />
      {isPending && (
        <View className="absolute z-50 h-full  bg-black bg-opacity-50 w-full justify-center items-center">
          <View className="bg-black bg-opacity-50 h-full w-full justify-center items-center opacity-[0.45]">
            <View className="absolute ">
              <ActivityIndicator size="large" color="#fff" />
            </View>
          </View>
        </View>
      )}
      {/* header  */}
      <View
        className="h-64 mb-4 justify-start border-orange-600 w-full bg-[#192031] relative pt-16 "
        style={{
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      >
        <Header />
      </View>
      {/* form area  */}
      <View className="w-full px-4 -mt-32 mx-4">
        <View className="bg-white rounded-3xl shadow-slate-300">
          <View className="flex-row justify-between w-full px-4 py-2">
            <TripOption
              pageNavigation={pageNavigation}
              handleNavigationChange={handleNavigationChange}
            />
          </View>

          {/* location Input  */}
          <LocationInput
            placeholder={
              searchFlightData.originCity
                ? searchFlightData.originCity
                : "Departure City"
            }
            value={searchFlightData.originCity}
            icon={
              <FontAwesome5 size={20} color={"gray"} name="plane-departure" />
            }
            onPress={() => {}}
          />
          {/* the next one Destination city */}
          <LocationInput
            placeholder={
              searchFlightData.destinationCity
                ? searchFlightData.destinationCity
                : "Destination City"
            }
            value={searchFlightData.destinationCity}
            icon={
              <FontAwesome5 size={20} color={"gray"} name="plane-arrival" />
            }
            onPress={() => {}}
          />
          {/* Date  */}
          <LocationInput
            placeholder={
              searchFlightData.departureDate
                ? searchFlightData.departureDate
                : "+970-123-1234"
            }
            value={searchFlightData.departureDate}
            icon={
              <FontAwesome5 size={20} color={"gray"} name="plane-departure" />
            }
            onPress={() => {}}
            date
          />
        </View>
      </View>
    </View>
  );
}
