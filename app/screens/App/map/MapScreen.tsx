import React, { useEffect, useRef, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native'
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'
import { requestPermissionLocation } from '@app/utils/AppPermissions'
import ScreenWrapper from '@app/components/ScreenWrapper'

const VIETNAM_BOUNDS = {
  minLat: 8.1791, // Cực Nam (Mũi Cà Mau)
  maxLat: 23.3927, // Cực Bắc (Lũng Cú)
  minLng: 102.1444, // Cực Tây (Apa Chải)
  maxLng: 114.3707, // Cực Đông (Đảo Trường Sa)
}

const MapScreen = () => {
  const mapRef = useRef<MapView>(null)
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 10.762622, // Tọa độ mặc định (Sài Gòn)
    longitude: 106.660172,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  const generateRandomVietnamCoordinate = () => {
    return {
      latitude: getRandomInRange(
        VIETNAM_BOUNDS.minLat,
        VIETNAM_BOUNDS.maxLat,
        6
      ),
      longitude: getRandomInRange(
        VIETNAM_BOUNDS.minLng,
        VIETNAM_BOUNDS.maxLng,
        6
      ),
    }
  }

  // Helper function
  function getRandomInRange(min, max, decimalPlaces) {
    const factor = Math.pow(10, decimalPlaces)
    return Math.floor((Math.random() * (max - min) + min) * factor) / factor
  }

  useEffect(() => {
    // console.log('rednderrr...')
    // mapRef.current?.animateToRegion(currentPosition, 2000)
    // return
    mapRef.current?.animateCamera(
      {
        center: {
          latitude: currentPosition.latitude,
          longitude: currentPosition.longitude,
        },
        zoom: 15, // Level zoom cụ thể
        heading: 0, // Hướng bản đồ
        altitude: 1000, // Độ cao
        pitch: 45, // Góc nghiêng
      },
      { duration: 1000 }
    )
  }, [currentPosition])

  // Lấy vị trí hiện tại
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords
        setCurrentPosition({
          ...currentPosition,
          latitude,
          longitude,
        })
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  }

  useEffect(() => {
    const fetchLocation = async () => {
      const hasPermission = await requestPermissionLocation()
      if (hasPermission) {
        getCurrentLocation()
      }
    }
    fetchLocation()
  }, [])

  return (
    <ScreenWrapper titleHeader="Ban do">
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={currentPosition}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={true}
      >
        <Marker
          coordinate={{
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
          }}
          title="Vị trí của bạn"
          description="Đây là vị trí hiện tại"
        >
          <View style={styles.customMarker}>
            <Text style={styles.markerText}>📍</Text>
          </View>
        </Marker>

        <Circle
          center={{
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
          }}
          radius={1000} // Bán kính 1000 mét
          strokeColor="rgba(0,150,255,0.5)"
          fillColor="rgba(0,150,255,0.2)"
        />
      </MapView>
      {/* <TouchableOpacity
        onPress={() =>
          setCurrentPosition(prev => {
            return { ...prev, ...generateRandomVietnamCoordinate() }
          })
        }
        style={{
          position: 'absolute',
          top: 150,
          left: 100,
          width: 100,
          height: 100,
          backgroundColor: 'red',
        }}
      ></TouchableOpacity> */}
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  customMarker: {
    backgroundColor: 'transparent',
  },
  markerText: {
    fontSize: 28,
  },
})

export default MapScreen
