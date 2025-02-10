import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HarvestForm from '../components/HarvestForm'

const HarvestTab = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.flex}
    >
      <HarvestForm />
      <HarvestForm />
      <HarvestForm />
      <HarvestForm />
    </ScrollView>
  )
}

export default HarvestTab

const styles = StyleSheet.create({
  flex: {
    flexGrow: 1,
    paddingBottom: 24,
  },
})
