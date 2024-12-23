import { LocationInput, TripOption, Header } from "@/components";

import { FlightOfferData, SearchFlightData } from "@/types";

import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { useState } from "react";
import {
  View,
  ActivityIndicator,
  TextInput,
  Pressable,
  Text,
} from "react-native";

export default function HomeScreen() {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [pageNavigation, setPageNavigation] = useState<string>("oneWay");
  const [searchFlightData, setSearchFlightData] = useState<SearchFlightData>({
    originCity: "",
    destinationCity: "",
    departureDate: "",
    seat: 0,
  });
  const [selctedDate, setSelectedDate] = useState<any>(new Date());
  const [flightOffers, setFlightOffers] = useState<FlightOfferData>({
    originLocationCode: "",
    destinationLocationCode: "",
    departureDate: new Date(),
    returnDate: new Date(),
    adults: 0,
    children: 0,
    maxResults: 10,
  });
  const handleNavigationChange = (type: string) => setPageNavigation(type);

  const handleTextChange = (text: string) => {
    const seatValue = parseInt(text, 10);
    const valueSeatValue = isNaN(seatValue) ? 0 : seatValue;
    setSearchFlightData((prev) => ({
      ...prev,
      seat: valueSeatValue,
    }));
    setFlightOffers((prev) => ({
      ...prev,
      adults: valueSeatValue,
    }));
  };

  return (
    <View className="flex-1 items-center bg-[#F5F7FA] relative">
      <StatusBar style="light" />

      {/* loading  */}
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
            onPress={() => router.push("/departure")}
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
              selctedDate && selctedDate.lenght > 0
                ? selctedDate.replace(/^"|"$/g, "/")
                : "Departure Date"
            }
            value={searchFlightData.departureDate.replace(/^"|"$/g, "/")}
            icon={<FontAwesome5 size={20} color={"gray"} name="calendar-alt" />}
            onPress={() => {}}
            date
          />

          {/* Seats  */}
          <View className="border-2 border-gray-300 mx-4 rounded-2xl py-3 justify-center flex-row items-center pl-4 ">
            <View>
              <MaterialCommunityIcons
                size={20}
                color={"gray"}
                name="seat-passenger"
              />
            </View>
            <TextInput
              className="w-[85%] text-base px-4 font-semibold"
              placeholder="Seats"
              keyboardType="numeric"
              value={String(searchFlightData.seat)}
              onChangeText={handleTextChange}
            />
          </View>
          {/* Search Button */}
          <View className="w-full justify-start pt-2 px-4 mt-4">
            <Pressable
              className="bg-[#12b3A8] rounded-l justify-center items-center py-4"
              onPress={() => {}}
            >
              <Text className="text-white font-bold text-lg">Search</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
