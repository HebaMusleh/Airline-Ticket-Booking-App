import { View, Text } from "react-native";
import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <View className="flex-1 items-center bg-[#f57fa] ">
      <View className="w-full h-full">{children}</View>
    </View>
  );
}
