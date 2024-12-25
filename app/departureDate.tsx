import { Alert } from "react-native";
import React, { useState } from "react";

import { Container, Header2 } from "@/components";
import { Calendar } from "react-native-calendars";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function departureDate() {
  const [flightOfferData, setFlightOfferData] = useState<any>({
    departureDate: new Date(),
  });

  const saveDepartureDate = async () => {
    try {
      const departureDate = new Date(flightOfferData.departureDate);
      const dateString = departureDate.toISOString().split("T")[0];
      await AsyncStorage.setItem("departureDate", dateString);
      Alert.alert("Departure Date Saved");
    } catch (err) {
      console.error("Error saving departure date", err);
    }
  };
  return (
    <Container>
      <Header2 text="Departure Date" date onPress={() => saveDepartureDate()} />
      {/* calender view  */}
      <Calendar
        onDayPress={(day: any) => {
          setFlightOfferData({
            ...flightOfferData,
            departureDate: new Date(day.dateString),
          });
        }}
        markedDates={{
          [flightOfferData.departureDate.toISOString().split("T")[0]]: {
            selected: true,
            selectedColor: "#12B3A8",
            selectedTextColor: "#ffffff",
            disableTouchEvent: true,
          },
        }}
        current={flightOfferData.departureDate}
      />
    </Container>
  );
}
