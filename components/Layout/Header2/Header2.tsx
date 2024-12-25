import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

export default function Header2({text}:{text:string}) {
  return (
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
                {text}
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
        </View>
      </View>
  )
}