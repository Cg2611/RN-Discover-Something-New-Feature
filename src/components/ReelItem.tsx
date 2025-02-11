// src/components/ReelItem.tsx

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Share } from 'react-native';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import type { ElementRef } from 'react';
import { Reel } from '../../App';

type VideoRef = ElementRef<typeof Video>;

const { width, height } = Dimensions.get('window');

interface ReelItemProps {
  item: Reel;
  isActive: boolean;
  onOpenDetail: () => void;
}

const ReelItem: React.FC<ReelItemProps> = ({ item, isActive, onOpenDetail }) => {
  const videoRef = useRef<VideoRef>(null);

  useEffect(() => {
    // If needed, manually pause/play using videoRef.current
  }, [isActive]);

  const onSharePress = async () => {
    try {
      await Share.share({
        message: `Check out this reel: ${item.videoUrl}`,
      });
    } catch (error) {
      console.error('Error sharing reel:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Fullscreen Video */}
      <Video
        ref={videoRef}
        source={{ uri: item.videoUrl }}
        style={styles.video}
        resizeMode="cover"
        repeat
        paused={!isActive}
      />

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <Text style={styles.title}>{item.title}</Text>

        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={onSharePress}>
            <Ionicons name="share-outline" size={26} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={onOpenDetail}>
            <Ionicons name="ellipsis-vertical" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ReelItem;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    position: 'relative',
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 25,
    left: 15,
    right: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // title on left, icons on right
  },
  title: {
    color: '#fff',
    fontSize: 20,
    flexWrap: 'wrap',
    maxWidth: '60%', // prevent overlap with icons
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 15,
  },
});
