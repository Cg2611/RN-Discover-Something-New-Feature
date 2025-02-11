// src/screens/ReelsScreen.tsx
import React, { useRef, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Dimensions, ViewToken } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Reel } from '../../App';
import ReelItem from '../components/ReelItem';

type ReelsScreenProps = NativeStackScreenProps<RootStackParamList, 'Reels'>;

const { height } = Dimensions.get('window');

// Dummy data with 2 sample clips; replace with your own
const REELS_DATA: Reel[] = [
  {
    id: '1',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    title: 'Sunrise over sea',
    description: 'Beautiful sunrise timelapse',
  },
  {
    id: '2',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    title: 'Nebula in space',
    description: 'A mesmerizing space timelapse',
  },
  {
    id: '3',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    title: 'Chess',
    description: ' test 2',
  },
  {
    id: '4',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    title: 'chess 2',
    description: 'test 3',
  },
  {
    id: '5',
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    title: 'Waves on Rocks',
    description: 'Crashing ocean waves against rocky cliffs.',
  },
  {
    id: '6',
    videoUrl:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
   title: 'Rainforest Waterfall',
    description: 'A serene waterfall deep in the jungle.',
  },
  {
    id: '7',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    title: 'Starry Sky',
    description: 'Stars moving across the night sky in a timelapse.',
  },
  {
    id: '8',
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    title: 'Busy Crosswalk',
    description: 'Pedestrians crossing a city street from a top view.',
  },
  {
    id: '9',
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    title: 'Snowy Forest Path',
    description: 'A walk through a snow-covered forest trail.',
  },
  {
    id: '10',
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    title: 'Underwater Life',
    description: 'Sea creatures swimming around a coral reef.',
  },
];

export default function ReelsScreen({ navigation }: ReelsScreenProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems && viewableItems.length > 0 && viewableItems[0].index !== null) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50, // at least 50% in view to be considered "active"
  };

  const renderItem = useCallback(
    ({ item, index }: { item: Reel; index: number }) => (
      <View style={{ height }}>
        <ReelItem
          item={item}
          isActive={index === currentIndex}
          onOpenDetail={() => navigation.navigate('Detail', { reel: item })}
        />
      </View>
    ),
    [currentIndex, navigation]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={REELS_DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        snapToInterval={height}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
