import images from '@app/assets/imagesAsset'
import { WIDTH } from '@app/theme'
import React, { memo, useRef } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  Animated,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native'

interface IProps {
  rows?: number
  columns?: number
  gap?: number
  paddingHorizontal?: number
  dotActiveColor?: string
  data: any[]
  renderItem: (item: any) => React.ReactNode
}

const ItemList = ({
  rows = 1,
  columns = 2,
  paddingHorizontal = 12,
  gap = paddingHorizontal,
  dotActiveColor = '#F1A12A',
  data = [],
  renderItem,
}: IProps) => {
  const scrollX = useRef(new Animated.Value(0)).current

  // Tính số sản phẩm trên mỗi trang
  const itemsPerPage = rows * columns

  // Tính số trang
  const numberOfPages = Math.ceil(data.length / itemsPerPage)

  // Tạo mảng các trang
  const pages = Array.from({ length: numberOfPages }, (_, i) =>
    data.slice(i * itemsPerPage, (i + 1) * itemsPerPage)
  )

  // Tính toán kích thước item
  const ITEM_WIDTH =
    (WIDTH - paddingHorizontal * 2 - paddingHorizontal * (columns - 1)) /
    columns

  const renderPage = ({ item: pageItems }: any) => (
    <View
      style={[
        styles.pageContainer,
        {
          width: WIDTH,
          paddingHorizontal: paddingHorizontal,
        },
      ]}
    >
      {Array.from({ length: rows }, (_, rowIndex) => (
        <View
          key={`row-${rowIndex}`}
          style={[styles.rowContainer, { gap: gap, marginBottom: gap }]}
        >
          {pageItems
            .slice(rowIndex * columns, (rowIndex + 1) * columns)
            .map((item: any) => (
              <View key={item.id} style={{ width: ITEM_WIDTH }}>
                {renderItem(item)}
              </View>
            ))}
        </View>
      ))}
    </View>
  )

  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {pages.map((_, index) => {
          const inputRange = [
            (index - 1) * WIDTH,
            index * WIDTH,
            (index + 1) * WIDTH,
          ]

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 16, 8],
            extrapolate: 'clamp',
          })

          const backgroundColor = scrollX.interpolate({
            inputRange,
            outputRange: ['#D3D3D3', dotActiveColor, '#D3D3D3'],
            extrapolate: 'clamp',
          })

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.2, 0.8],
            extrapolate: 'clamp',
          })

          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  width: dotWidth,
                  backgroundColor,
                  transform: [{ scale }],
                },
              ]}
            />
          )
        })}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pages}
        renderItem={renderPage}
        keyExtractor={(_, index) => `page-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={WIDTH}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      />
      {renderDots()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  pageContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
})

export default memo(ItemList)
