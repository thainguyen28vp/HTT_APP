import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useMemo, useState } from 'react'
import FastImage from '@d11/react-native-fast-image'
import images from '@app/assets/imagesAsset'
import VideoPlayer from '@app/components/VideoPlayer/VideoPlayer'
import ImageWidthLoading from '@app/components/ImageWidthLoading'
interface IProps {
  uri: string
  name: string
  number_of_comments: number | string
  number_of_like: number | string
  avtUrl: string
  paused?: boolean
  onPressMore: () => void
}
const PostForm = ({
  uri,
  name,
  number_of_comments,
  number_of_like,
  avtUrl,
  paused,
  onPressMore,
}: IProps) => {
  const [isLike, setIsLike] = useState(Number(number_of_like) % 2 === 0)
  const renderTop = useMemo(() => {
    console.log('redner top....', number_of_like)

    return (
      <View style={styles.wrapperTop}>
        <ImageWidthLoading
          imageUrl={avtUrl}
          containerStyle={styles.avt}
          imageStyle={{
            borderRadius: 40,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          }}
        />
        <View style={styles.wrapperName}>
          <Text style={styles.txtName}>{name}</Text>
          <Text style={styles.txtNow}>Vừa xong</Text>
        </View>
        <TouchableOpacity onPress={onPressMore}>
          <FastImage
            source={images.ic_more}
            style={{
              width: 24,
              aspectRatio: 1,
              paddingVertical: 8,
            }}
          />
        </TouchableOpacity>
      </View>
    )
  }, [])

  const renderBottom = useMemo(() => {
    return (
      <View style={styles.wrapperBottom}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => setIsLike(prev => !prev)}>
            {isLike ? (
              <FastImage
                source={images.ic_heart_bold}
                tintColor={'#EB212E'}
                style={styles.icon}
              />
            ) : (
              <FastImage
                source={images.ic_heart}
                style={styles.icon}
                tintColor={'#595959'}
              />
            )}
          </TouchableOpacity>
          <Text style={styles.txtNumberLike}>{number_of_like}</Text>
        </View>
        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
          <FastImage
            source={images.ic_chat}
            style={styles.icon}
            tintColor={'#595959'}
          />
          <Text style={styles.txtNumberLike}>{number_of_comments}</Text>
        </View>
        <FastImage source={images.ic_share} style={styles.icon} />
      </View>
    )
  }, [isLike])
  return (
    <View style={styles.container}>
      {renderTop}
      <VideoPlayer uri={uri} paused={paused} />
      {renderBottom}
    </View>
  )
}

export default memo(
  PostForm,
  (prev, next) =>
    // prev.name === next.name &&
    // prev.number_of_comments === next.number_of_comments &&
    // prev.number_of_like === next.number_of_like &&
    prev.paused === next.paused
  // prev.avtUrl === next.avtUrl
)

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff' },
  avt: { height: 40, width: 40, borderRadius: 80 },
  wrapperTop: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  txtName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  txtNow: {
    fontSize: 12,
    fontWeight: '400',
    color: '#8C8C8C',
  },
  wrapperName: {
    gap: 4,
    marginLeft: 12,
    flex: 1,
  },
  icon: {
    width: 24,
    aspectRatio: 1,
  },
  txtNumberLike: {
    fontSize: 16,
    color: '#262626',
    fontWeight: '400',
    marginLeft: 4,
  },
  wrapperBottom: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    gap: 10,
  },
})
