import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '@app/components/ScreenWrapper'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import { WIDTH } from '@app/theme'
import R from '@R'
import { useTheme } from '@app/context/ThemeContext'
import GeneralInfoTab from './screenTabView/GeneralInfoTab'
import PlantTab from './screenTabView/PlantTab'
import HarvestTab from './screenTabView/HarvestTab'

const WorkScreen = () => {
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'info', title: R.strings().general_info },
    { key: 'plant', title: R.strings().plant },
    { key: 'harvest', title: R.strings().harvest },
  ])
  const renderScene = SceneMap({
    info: GeneralInfoTab,
    plant: PlantTab,
    harvest: HarvestTab,
  })
  const renderTabBar = (props: any) => (
    <View style={styles.wrapperTabBar}>
      <TabBar
        {...props}
        indicatorStyle={styles.indicator}
        indicatorContainerStyle={{ width: WIDTH }}
        style={styles.tabBar}
        labelStyle={styles.label}
        activeColor="#F1A12A"
        inactiveColor="#666666"
        pressColor="transparent"
        tabStyle={styles.tab}
        // renderTabBarItem={() => <></>}
        // renderTabBarItem={({ route, focused }) => <Text>{route.title}</Text>}
      />
    </View>
  )
  const renderRightComponentHeader = () => {
    const { theme } = useTheme()

    return (
      <Text
        style={[styles.txtStatus, { backgroundColor: theme.colors.primary }]}
      >
        {R.strings().are_plating}
      </Text>
    )
  }
  return (
    <ScreenWrapper
      titleHeader="Vụ mùa thứ 2"
      renderRightComponentHeader={renderRightComponentHeader()}
      titlePosition="left"
      // onBack={}
    >
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={{ width: WIDTH }}
      />
    </ScreenWrapper>
  )
}

export default WorkScreen

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
    elevation: 0,
    shadowOpacity: 0,
  },
  label: {
    fontSize: 16,
  },
  indicator: {
    backgroundColor: '#F1A12A',
  },
  tab: { paddingHorizontal: 0 },
  wrapperTabBar: {
    backgroundColor: 'white',
    paddingHorizontal: 2,
  },
  txtStatus: {
    color: 'white',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 30,
  },
  wrapperLine: {
    flexDirection: 'row',
  },
})

// import * as React from 'react'
// import { View, useWindowDimensions } from 'react-native'
// import { TabView, SceneMap, TabBar } from 'react-native-tab-view'

// const renderScene = SceneMap({
//   first: () => <></>,
//   second: () => <></>,
// })

// const routes = [
//   { key: 'first', title: 'First' },
//   { key: 'second', title: 'Second' },
// ]

// export default function TabViewExample() {
//   const layout = useWindowDimensions()
//   const [index, setIndex] = React.useState(0)

//   return (
//     <TabView
//       navigationState={{ index, routes }}
//       renderScene={renderScene}
//       onIndexChange={setIndex}
//       renderTabBar={props => {
//         console.log(props)

//         return <TabBar {...props} />
//       }}
//       tabBarPosition="bottom"
//       initialLayout={{ width: layout.width }}
//     />
//   )
// }
