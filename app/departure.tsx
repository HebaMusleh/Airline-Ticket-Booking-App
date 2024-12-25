import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { View, Text, Pressable, TextInput, FlatList } from "react-native";

import { apiToken } from "@/utils/api";
import { FlightOfferData } from "@/types";
import { Container, Header2 } from "@/components";

export default function DepartureScreen() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [autoCompleteResult, setAutoCompleteResult] = useState<any[]>([]);
  const [flighOfferData, setFlightOfferData] = useState<FlightOfferData | any>({
    originLocationCode: "",
  });
  const [previousSelectedDeparture, setPreviousSelectedDeparture] = useState<
    { city: string; iataCode: string }[]
  >([]);

  const loadPreviousSelectedCities = async () => {
    try {
      const cities = await AsyncStorage.getItem("departureCities");
      if (cities !== null) {
        setPreviousSelectedDeparture(JSON.parse(cities));
      }
    } catch (error) {
      console.error("Error Loading previous selected cities", error);
    }
  };

  const autoCompleteSearch = async (searchInput: string) => {
    try {
      const headers = {
        Authorization: `Bearer ${apiToken}`,
      };
      const url = `https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT,CITY&keyword=${searchInput}`;

      const res = await axios.get(url, { headers });
      setAutoCompleteResult(res.data.data);
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 429
      ) {
        console.error("Rate limit exceeded, try again later");
      }
      console.log(error);
    }
  };
  const debounce = (func: any, delay: number) => {
    let timeOutId: any;
    return (...args: any) => {
      clearTimeout(timeOutId);
      timeOutId = setTimeout(() => func.apply(null, args), delay);
    };
  };
  const debouncedAutoCompleteSearch = debounce(autoCompleteSearch, 3000);
  const handleInputChange = (text: string) => {
    setSearchInput(text);
    debouncedAutoCompleteSearch(text);
  };

  const handleSelectedAutoComplete = async (item: any) => {
    const previousSelectedCities = [...previousSelectedDeparture];
    previousSelectedCities.push({ city: item.name, iataCode: item.iataCode });
    await AsyncStorage.setItem(
      "departureCities",
      JSON.stringify(previousSelectedCities)
    );
    setPreviousSelectedDeparture(previousSelectedCities);
    setFlightOfferData({
      ...flighOfferData,
      originLocationCode: item.iataCode,
    });
    setSearchInput(`${item.name} ${item.iataCode}`);
    setAutoCompleteResult([]);
  };
  useEffect(() => {
    loadPreviousSelectedCities();
  }, []);
  return (
    <Container>
        <Header2 text="Select Departure" />
        {/* Airport or City Search  */}
        <View className="w-full py-4 px-4 relative">
          <View className="flex-row justify-between items-center bg-white border-2 border-gray-400 rounded-xl h-14 overflow-hidden outline-none">
            <View className="w-full h-full justify-center">
              <TextInput
                placeholder="Search for Airport or City"
                placeholderTextColor={"gray"}
                value={searchInput}
                onChangeText={handleInputChange}
                className="bg-transparent text-gray-600 h-full px-2 capitalize"
              />
            </View>
          </View>

          {/* Search -autocomplete - Result  */}
          {autoCompleteResult.length > 0 && (
            <View className="border-2 border-gray-400 bg-white rounded-xl shadow-sm mt-4">
              <FlatList
                data={autoCompleteResult}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => handleSelectedAutoComplete(item)}
                    className="px-2 rounded-xl py-2 my-1"
                  >
                    <Text className="text-gray-500 capitalize">
                      {item.name} {item.iataCode}
                    </Text>
                  </Pressable>
                )}
              />
            </View>
          )}

          {/* Previous Selected Cities  */}
          <View className="px-4 w-full">
            <Text className="text-lg text-white font-bold">
              Previous Selected :
            </Text>
            {previousSelectedDeparture.map((city, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  setFlightOfferData({
                    ...flighOfferData,
                    originLocationCode: city.iataCode,
                  });
                  setSearchInput(`${city.city} ${city.iataCode}`);
                }}
                className="bg-white border-2 border-gray-400 rounded-xl px-2 py-3 my-2"
              >
                <Text className="text-gray-500 capitalize">
                  {city.city} {city.iataCode}
                </Text>
              </Pressable>
            ))}
          </View>
          </View>
    </Container>
  );
}
