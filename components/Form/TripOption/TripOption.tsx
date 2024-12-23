import { TripOptionProps } from "@/types";
import { View, Text, Pressable } from "react-native";
import {
  ArrowPathRoundedSquareIcon,
  ChevronDoubleRightIcon,
} from "react-native-heroicons/outline";

const TripOption: React.FC<TripOptionProps> = ({
  pageNavigation,
  handleNavigationChange,
}) => (
  <View className="flex-row justify-between w-full px-4 py-2">
    <Text>Trip Option</Text>
    <Pressable
      className="flex-row w-1/2 "
      onPress={() => handleNavigationChange("oneWay")}
    >
      <View
        className={`w-full justify-center items-center flex-row space-x-2 pb-2 ${
          pageNavigation === "oneWay"
            ? "border-b-4 border-[#1283AB]"
            : "border-transparent"
        }`}
      >
        <ChevronDoubleRightIcon
          size={20}
          strokeWidth={pageNavigation === "oneWay" ? 3 : 2}
          color={pageNavigation === "oneWay" ? "#1283AB" : "gray"}
        />
        <Text
          className={`text-xl pl-2 ${
            pageNavigation === "oneWay"
              ? "text-[text-[#1283AB]]"
              : "text-gray-500"
          }`}
          style={{
            fontWeight: pageNavigation === "oneWay" ? "700" : "500",
          }}
        >
          One Way
        </Text>
      </View>
    </Pressable>
    <Pressable
      className="flex-row w-1/2 "
      onPress={() => handleNavigationChange("roundTrip")}
    >
      <View
        className={`w-full justify-center items-center flex-row space-x-2 pb-2 ${
          pageNavigation === "roundTrip"
            ? "border-b-4 border-[#1283AB]"
            : "border-transparent"
        }`}
      >
        <ArrowPathRoundedSquareIcon
          size={20}
          strokeWidth={pageNavigation === "roundTrip" ? 3 : 2}
          color={pageNavigation === "roundTrip" ? "#1283AB" : "gray"}
        />
        <Text
          className={`text-xl pl-2 ${
            pageNavigation === "roundTrip"
              ? "text-[text-[#1283AB]]"
              : "text-gray-500"
          }`}
          style={{
            fontWeight: pageNavigation === "roundTrip" ? "700" : "500",
          }}
        >
          Round Trip
        </Text>
      </View>
    </Pressable>
  </View>
);

export default TripOption;
