import { View, Text, Pressable, TextInput, FlatList } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

export default function DepartureScreen() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [autoCompleteResult, setAutoCompleteResult] = useState<any[]>([]);
  const handleInputChange = (text: string) => setSearchInput(text);
  return (
    <View className="flex-1 items-center bg-[#f57fa] ">
      <View className="w-full h-full">
        <View
          className="mb-4 justify-start border-orange-600 w-full bg-[#192031] relative pt-16 pb-8"
          style={{
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}
        >
          <View>
            {/* header  */}
            <View className="flex-row gap-4 justify-start items-center h-14 ">
              <Pressable
                className="flex-row items-center justify-center h-14 w-[20%]"
                onPress={() => router.back()}
              >
                <View className="rounded-full bg-gray-500 h-8 w-8 justify-center items-center">
                  <MaterialIcons
                    name="keyboard-arrow-left"
                    size={30}
                    color="white"
                  />
                </View>
              </Pressable>
              <View className="w-[60%] justify-center items-center">
                <Text className="text-lg text-white font-extrabold">
                  Select Departure :
                </Text>
              </View>
              <View>
                <View>
                  <MaterialCommunityIcons
                    name="dots-horizontal"
                    size={30}
                    color="white"
                  />
                </View>
              </View>
            </View>

            {/* Airport or City Search  */}
            <View className="w-full py-4 px-4 relative">
              <View className="flex-row justify-between items-center bg-white border-2 border-gray-400 rounded-xl h-14 overflow-hidden">
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
                        onPress={() => {
                          setSearchInput(item.name);
                          setAutoCompleteResult([]);
                        }}
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
            </View>
          </View>
        </View>
      </View>
      <Text>DepartureScreen</Text>
    </View>
  );
}
