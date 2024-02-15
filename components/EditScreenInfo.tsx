import React, { useState } from "react";
import { Linking, StyleSheet,TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';

export default function EditScreenInfo({ path }: { path: string }) {
  const [href, setHref] = useState("");
  const fetchApi = async () => {
    const response = await fetch(
      "https://places.googleapis.com/v1/places:searchText",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-FieldMask": "*",
          "X-Goog-Api-Key": `${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`
        },
        body: JSON.stringify({
          textQuery: "bomb shelter around me",
          rankPreference: "DISTANCE",
          locationBias:{circle:{radius:100.0,}},
        }),
      }
    );
    const {places} = await response.json();
    setHref(places[0].googleMapsUri);
      const supported = await Linking.canOpenURL(href);
    
      if (supported) {
        await Linking.openURL(href);
      } else {
        console.log(`Don't know how to open this URL: ${href}`);
      }
  };
  return (
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Alert In Your Location Click To Find Shelter
        </Text>
      <TouchableOpacity style={styles.openMapButton} onPress={fetchApi}>
        <Text style={styles.textcolor}>Nevigate</Text>
      </TouchableOpacity>
         </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center', 
    backgroundColor:"#e8f3ff",
    borderRadius:20,
    padding:7,
  },
  getStartedText: {
    fontSize: 17,
    fontWeight:"bold",
    lineHeight: 24,
    textAlign: 'center',
    color:"red",
    flex: 0.4,

  },
  fetchButton: {
    alignItems: 'center',
    backgroundColor: '#ffa72b',
    padding: 10,
    marginTop:50,
    borderRadius:10,
  },
  openMapButton: {
    alignItems: 'center',
    backgroundColor: '#ff2b2b',
    color:"white",
    padding: 10,
    margin: 10,
    borderRadius:10,
  },
  textcolor:{
    color:"white",
  },
});