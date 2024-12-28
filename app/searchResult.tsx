import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Container, Header2 } from '@/components';

export default function SearchResult() {
  // const params = useLocalSearchParams<any>();
  // const {flightOffers} = params;
  // const parseFightOffersData = JSON.parse(flightOffers);
  // console.log(parseFightOffersData)
  // console.log(params)
  return (
    <Container>
      <Header2 text='Search Page '/>
    </Container>
  )
}