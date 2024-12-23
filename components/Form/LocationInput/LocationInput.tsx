import { InputProps } from "@/types";
import React from "react";
import { Pressable, View, Text } from "react-native";

const LocationInput: React.FC<InputProps> = ({
  placeholder,
  icon,
  value,
  onPress,
  date,
}) => {
  return (
    <View className="border-2 border-gray-300 mx-4 mb-4 rounded-2xl justify-center">
      <Pressable onPress={onPress}>
        <View className="px-4 flex-row justify-between items-center">
          <View className="w-[15%] border-r-2 border-gray-300">{icon}</View>
          <View className="w-[80%] py-3">
            {date ? (
              <Text className="bg-transparent text-gray-600 font-bold">
                {value || placeholder}
              </Text>
            ) : value ? (
              <Text className="bg-transparent text-gray-600 font-bold">
                {value}
              </Text>
            ) : (
              <Text className="bg-transparent text-lg text-gray-600 font-semibold">
                {placeholder}
              </Text>
            )}
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default LocationInput;
