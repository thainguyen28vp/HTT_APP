import ScreenWrapper from '@app/components/ScreenWrapper'
import LoginScreen from '@app/screens/Auth/login/LoginScreen'
import RegisterScreen from '@app/screens/Auth/register/RegisterScreen'
import { WIDTH } from '@app/theme'
import * as React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native'
import {
  TabView,
  SceneMap,
  TabBar,
  TabBarIndicator,
} from 'react-native-tab-view'

const routes = [
  { key: 'first', title: 'chung ha' },
  { key: 'second', title: 'rồng' },
  // { key: 'third', title: 'hoạch' },
  // { key: 'fourth', title: 'Đăng nhập wqww' },
  // { key: 'fifth', title: 'Đăng nhậpww' },
  // { key: 'sixth', title: 'Đăng nhập' },
  // { key: 'seventh', title: 'Đăng ký' },
]

export default function TabViewExample(props: any) {
  // console.log(props.route.params.changeIndex)
  const { params } = props.route
  React.useEffect(() => {
    setIndex(params?.changeIndex || 0)
  }, [params?.changeIndex])
  const Taa = () => {
    return (
      <ScreenWrapper styles={{ flex: 1, backgroundColor: 'red' }}>
        <Text>!2</Text>
      </ScreenWrapper>
    )
  }
  const renderScene = SceneMap({
    first: Taa,
    second: LoginScreen,
    // third: LoginScreen,
    // fourth: LoginScreen,
    // fifth: LoginScreen,
    // sixth: LoginScreen,
    // seventh: RegisterScreen,
  })
  const renderLazyPlaceholder = (props: any) => {
    console.log(props)

    return <View style={{ flex: 1, backgroundColor: 'pink' }}></View>
  }
  const layout = useWindowDimensions()
  const [index, setIndex] = React.useState(0)

  const renderTabBar = (props: any) => (
    <View
      style={{
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <TabBar
        {...props}
        indicatorStyle={styles.indicator}
        // renderIndicator={indicatorProps => {
        //   const width = indicatorProps.getTabWidth(index) - 24
        //   return (
        //     <TabBarIndicator
        //       {...indicatorProps}
        //       // style={styles.indicator}
        //       width={30}
        //     />
        //   )
        // }}
        // indicatorStyle={{
        //   backgroundColor: '#F1A12A',
        //   marginHorizontal: 40,
        //   width: 140,
        // }}
        indicatorContainerStyle={{ width: WIDTH }}
        style={styles.tabBar}
        labelStyle={styles.label}
        activeColor="#F1A12A"
        inactiveColor="#666666"
        pressColor="transparent"
        tabStyle={styles.tab}
        scrollEnabled
      />
    </View>
  )
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={{ width: layout.width }}
        lazy
        renderLazyPlaceholder={renderLazyPlaceholder}
      />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    // alignSelf: 'center',
    // alignItems: 'center',

    backgroundColor: 'white',
    // zIndex: 10,
    // width: 'auto',
    // width: 200,
    // flex: 1,
    // width: 'auto',
    // flexDirection: 'row',
    // alignItems: 'center',
    elevation: 0,
    // maxWidth: 300,
    minWidth: 1,
    // zIndex: 1,
    // alignSelf: 'center',
    // paddingVertical: 5,
    shadowOpacity: 0,
    // borderBottomWidth: 1,
    // borderBottomColor: '#EEEEEE',
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingHorizontal: 20,
  },
  indicator: {
    backgroundColor: '#F1A12A',
    height: 3,
    borderRadius: 10,
    marginBottom: 3,
    // paddingHorizontal: 30,
    // width: 30,
    // width: '30%',
    // paddingHorizontal: 20,
    // marginLeft: 20,
    // marginHorizontal: 20,
  },
  label: {
    fontWeight: '600',
    // zIndex: 100,
    textTransform: 'none', // Tránh viết hoa tự động
  },
  tab: {
    width: 'auto', // Cho phép tab có chiều rộng tự động theo nội dung
    // paddingHorizontal: 32,
    // backgroundColor: 'blue',
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // width: '80%',
    // marginHorizontal: -8,
    // backgroundColor: 'red',
    // paddingVertical: 5,
    // position: 'absolute',
  },
})
