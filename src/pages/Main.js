import React, { useEffect, useState } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, Image, View, Text } from 'react-native';

import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

export default function Main() {
  const [currentRegion, setCurrentRegion] = useState(null);

  useEffect(() => {
    async function loadInitialLocation() {
      const { granted } = await requestPermissionsAsync();

      if(granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        })
      }
    }

    loadInitialLocation();
  }, []);

  if(!currentRegion){
    return null;
  }

  return (
    <MapView initialRegion={currentRegion} style={styles.map} >
      <Marker coordinate={{ latitude: -27.211111164, longitude: -49.6374491 }}>
      <Image soure={{ uri: ''}} style={{styles.avatar}} />
      <Callout onPress={() => {

      }}>
        <View styles={{styles.callout}}>
          <Text styles={{styles.devName}}>Julio Henrique</Text>
          <Text styles={{styles.devBio}}>CTO</Text>
          <Text styles={{styles.callout}}>ReactJS, ReactNative, Node.js</Text>
        </View>
      </Callout>
      </Marker>
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#FFF'
  },
  callout: {
    width: 260,
  },
  devName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  devBio: {
    color: '#666',
    marginTop: 5,
  },
  devTechs: {
    marginTop: 5,
  }

})
