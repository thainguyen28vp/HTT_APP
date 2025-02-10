import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '@app/components/ScreenWrapper'
import { TabBar, TabBarIndicator, TabView } from 'react-native-tab-view'
import { WIDTH } from '@app/theme'
import R from '@R'
import { callAPIHook } from '@app/utils/CallApiHelper'
import { requestGetBreed } from '@app/service/Network/order/orderApi'
import { useAppSelector } from '@app/redux/store'
import TabChild from './components/TabChild'
import { useTheme } from '@app/context/ThemeContext'

interface Iroutes {
  key: string
  title: string
}

const WorkScreen = () => {
  const { theme } = useTheme()
  const { data }: any = useAppSelector(state => state.breedReducer)
  const [index, setIndex] = useState(0)
  const [routes, setRoutes] = useState<Iroutes[]>(
    !!data.length
      ? data?.map((value: any) => {
          return { key: value.id + '', title: value.name }
        })
      : [{ key: '1', title: '' }]
  )
  useEffect(() => {
    if (!!data.length) {
      setRoutes(
        data?.map((value: any) => {
          return { key: value.id + '', title: value.name }
        })
      )
    }
  }, [data])

  const renderScene = ({ route }: any) => {
    return <TabChild id={route.key} />
  }
  const renderTabBar = (props: any) => {
    return (
      <View style={styles.wrapperTabBar}>
        {!!routes.length && (
          <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            indicatorContainerStyle={{ width: WIDTH }}
            style={[
              styles.tabBar,
              { backgroundColor: theme.colors.background },
            ]}
            renderIndicator={props => <TabBarIndicator {...props} width={50} />}
            activeColor="#F1A12A"
            inactiveColor="#666666"
            pressColor="transparent"
            tabStyle={styles.tab}
            scrollEnabled
          />
        )}
      </View>
    )
  }
  const renderLazyPlaceholder = () => (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }} />
  )
  const RenderLabel = ({ route, labelText, focused, color }: any) => {
    return (
      <View style={styles.tabItem}>
        <Text
          style={[
            styles.tabText,
            {
              color: color,
            },
          ]}
        >
          {route?.title || labelText}
        </Text>
        <View
          style={[
            styles.badge,
            focused ? styles.badgeActive : styles.badgeInactive,
          ]}
        >
          <Text style={styles.badgeText}>{3}</Text>
        </View>
      </View>
    )
  }
  return (
    <ScreenWrapper showBackHeader={false} titleHeader={R.strings().work}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={{ width: WIDTH }}
        renderLazyPlaceholder={renderLazyPlaceholder}
        lazy
        commonOptions={{
          label: props => <RenderLabel {...props} />,
        }}
      />
    </ScreenWrapper>
  )
}

export default WorkScreen

const styles = StyleSheet.create({
  wrapperTabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tabBar: {
    backgroundColor: 'white',
    elevation: 0,
    shadowOpacity: 0,
    // width: 'auto',
    minWidth: 90,
  },
  tab: {
    width: 'auto',
    // paddingHorizontal: 15,
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    width: 'auto',
    // gap: 6,
    // paddingHorizontal: 6,
  },
  tabText: {
    fontSize: 14,
    marginRight: 4,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    minWidth: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeActive: {
    backgroundColor: '#F1A12A',
  },
  badgeInactive: {
    backgroundColor: '#E0E0E0',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  indicator: {
    backgroundColor: '#F1A12A',
    height: 3,
    borderRadius: 10,
    marginBottom: 5,
  },
})
