import images from '@app/assets/imagesAsset'
import { WIDTH } from '@app/theme'
import React, { useState, useRef } from 'react'
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
  paddingHorizontal?: number
  renderItem?: (item: any) => React.ReactNode
}

const ItemList = ({
  rows = 2,
  columns = 1,
  paddingHorizontal = 12,
}: IProps) => {
  const [data] = useState([
    {
      id: '1',
      name: 'Cồn 70 độ (Ethanol - 500ml)',
      price: '23.000 đ/Chai',
      image: images.ic_account,
      discount: '-20%',
    },
    {
      id: '2',
      name: 'Efferalgan',
      price: '23.000 đ/Chai',
      image: images.ic_account,
      discount: '-20%',
    },
    {
      id: '13',
      name: 'Cồn 70 độ (Ethanol - 500ml)',
      price: '23.000 đ/Chai',
      image: images.ic_account,
      discount: '-20%',
    },
    {
      id: '22',
      name: 'Efferalgan',
      price: '23.000 đ/Chai',
      image: images.ic_account,
      discount: '-20%',
    },
    {
      id: '2s2',
      name: 'Efferalgan',
      price: '23.000 đ/Chai',
      image: images.ic_account,
      discount: '-20%',
    },
    {
      id: '2s3',
      name: 'Paracetamol',
      price: '25.000 đ/Hộp',
      image: images.ic_account,
      discount: '-15%',
    },
  ])

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

  const renderProduct = (product: any) => (
    <View style={[styles.itemContainer, { width: ITEM_WIDTH }]}>
      <View style={styles.discountBadge}>
        <Text style={styles.discountText}>{product.discount}</Text>
      </View>
      <Image source={product.image} style={styles.productImage} />
      <Text numberOfLines={2} style={styles.productName}>
        {product.name}
      </Text>
      <Text style={styles.productPrice}>{product.price}</Text>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Thêm vào giỏ hàng</Text>
      </TouchableOpacity>
    </View>
  )

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
          style={[
            styles.rowContainer,
            { gap: paddingHorizontal, marginBottom: paddingHorizontal },
          ]}
        >
          {pageItems
            .slice(rowIndex * columns, (rowIndex + 1) * columns)
            .map((item: any) => (
              <View key={item.id} style={{ width: ITEM_WIDTH }}>
                {renderProduct(item)}
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
            outputRange: ['#D3D3D3', '#E32636', '#D3D3D3'],
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
    backgroundColor: '#f5f5f5',
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
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    height: 40,
  },
  productPrice: {
    fontSize: 14,
    color: '#E32636',
    fontWeight: 'bold',
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#E32636',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  discountBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#E32636',
    padding: 4,
    borderRadius: 4,
    zIndex: 1,
  },
  discountText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
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

export default ItemList
