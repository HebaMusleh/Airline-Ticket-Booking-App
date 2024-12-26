import { LocationInput, TripOption, Header } from "@/components";

import { FlightOfferData, SearchFlightData } from "@/types";
import { apiBaseUrl, apiToken } from "@/utils/api";

import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router, useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { useCallback, useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  TextInput,
  Pressable,
  Text,
  Alert,
} from "react-native";

export default function HomeScreen() {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [refreshData, setRefreshData] = useState<boolean>(true);
  const [pageNavigation, setPageNavigation] = useState<string>("oneWay");
  const [session, setSession] = useState<string>("");
  const [searchFlightData, setSearchFlightData] = useState<SearchFlightData>({
    originCity: "",
    destinationCity: "",
    departureDate: "",
    seat: 1,
  });
  const [selctedDate, setSelectedDate] = useState<any>(new Date());
  const [flightOffers, setFlightOffers] = useState<FlightOfferData>({
    originLocationCode: "",
    destinationLocationCode: "",
    departureDate: new Date(),
    returnDate: new Date(),
    adults: 1,
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

  const handleFromPreviousScreen = () => {
    setRefreshData(true);
  };

  useFocusEffect(
    useCallback(() => {
      handleFromPreviousScreen();
    }, [session])
  );

  const constructSearch = () => {
    const {
      originLocationCode,
      destinationLocationCode,
      departureDate,
      adults,
      maxResults,
    } = flightOffers;
    const formattedDepartureDate = departureDate.replace(/"/g, "");
    if (
      !originLocationCode ||
      !destinationLocationCode ||
      !departureDate ||
      !adults
    ) {
      Alert.alert("Please fill all the fields");
    }
    return `${apiBaseUrl}?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${formattedDepartureDate}&adults=${adults}&max=${maxResults}`;
  };

  const handleParentSearch = async () => {
    const searchUrl = constructSearch();
    setIsPending(true);
    console.log(searchUrl)

    try {
      const response = await axios.get(searchUrl, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      });
      setIsPending(false);

      if (response.data) {
        setIsPending(false);
        await AsyncStorage.setItem(
          "searchFlightData",
          JSON.stringify(searchFlightData)
        );
        console.log("test", response.data);
        router.push({
          pathname: "/searchResult",
          params: {
            flightOffers: JSON.stringify(response.data),
          },
        });
      }
    } catch (error) {
      console.error("Error fetching data", error);
      if (error.response && error.response.status === 401) {
        Alert.alert("Session Expired", "Please Refresh your access token", [
          { text: "OK" },
        ]);
      } else {
        Alert.alert(
          "Error",
          "An Error occurred while fetching flight offers ",
          [{ text: "OK" }]
        );
      }
    }
  };

  // Fix Depature date issue
  useEffect(() => {
    const loadSelectedDestination = async () => {
      try {
        const departureCities = await AsyncStorage.getItem("departureCities");
        const destinationCities = await AsyncStorage.getItem(
          "destinationCities"
        );
        const departureDate = await AsyncStorage.getItem("departureDate");
        if (departureCities !== null) {
          const departureCityArray = JSON.parse(departureCities);
          const lastArray = departureCityArray[departureCityArray.length - 1];
          setSearchFlightData((prev) => ({
            ...prev,
            originCity: lastArray.city,
          }));
          setFlightOffers((prev) => ({
            ...prev,
            originLocationCode: lastArray.iataCode,
          }));
        }
        if (departureDate !== null) {
          setSelectedDate(departureDate);
          setSearchFlightData((prev) => ({
            ...prev,
            departureDate,
          }));

          setFlightOffers((prev) => ({
            ...prev,
            departureDate,
          }));
        }
      } catch (error) {}
    };

    loadSelectedDestination();
    setRefreshData(false);
  }, [refreshData]);

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
            onPress={() => router.push("/destination")}
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
            onPress={() => router.push("/departureDate")}
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
              onPress={handleParentSearch}
            >
              <Text className="text-white font-bold text-lg">Search</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
