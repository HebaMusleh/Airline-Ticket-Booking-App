import { View, Text, SafeAreaView, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown } from "react-native-reanimated";
import { router } from "expo-router";

export default function WelcomeScreen() {
  return (
    <SafeAreaView className="pt-8 flex-1 bg-[#192031]">
      <StatusBar style="light" />
      <View className="h-full">
        <View className="w-full px-4 items-center my-8">
          <Animated.View
            entering={FadeInDown.duration(200).springify()}
            className="flex-row justify-center items-center pb-24"
          >
            <MaterialCommunityIcons name="airplane" size={24} color="#1283A8" />
            <Text className="text-white text-xl leading-[60px] pl-1">
              STACKS
            </Text>
            <Text className="text-[#4AE8DD] text-xl leading-[60px] pl-1 italic">
              FLY
            </Text>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(200).delay(200).springify()}
          >
            <Text className="text-white text-[52px] font-medium leading-[60px] mt-4">
              Discover you Dream Flight Easily
            </Text>
          </Animated.View>
          <Animated.View
            className="mt-4"
            entering={FadeInDown.duration(200).delay(400).springify()}
          >
            <Text className="text-neutral-300 text-lg font-medium leading-[38px] mt-4">
              find an easy way to buy airlane tickets with just a few clicks in
              the application
            </Text>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.duration(200).delay(600).springify()}
            className="h-1/4 w-full justify-start pt-8 px-4 "
          >
            <Pressable
              onPress={() => router.push("/(tabs)")}
              className="bg-[#12B3AB] rounded-xl justify-center items-center p-3"
            >
              <Text className="text-white font-bold text-lg">Discover</Text>
            </Pressable>
            <View className="flex-row mt-4 w-full justify-center gap-2">
              <Text className="text-neutral-300 font-medium text-lg leading-[38px] text-center">
                Don't have an account ?
              </Text>
              <Text className="text-neutral-300 font-semibold text-lg leading-[38px] text-center">
                Register
              </Text>
            </View>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
}
