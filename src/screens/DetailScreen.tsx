// src/screens/DetailScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const DetailScreen: React.FC<DetailScreenProps> = ({ route, navigation }) => {
  const { reel } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Details</Text>
      <Text style={styles.label}>Title:</Text>
      <Text style={styles.value}>{reel.title}</Text>

      <Text style={styles.label}>Description:</Text>
      <Text style={styles.value}>{reel.description}</Text>

      <Text style={styles.label}>Video URL:</Text>
      <Text style={styles.value}>{reel.videoUrl}</Text>

      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    marginTop: 10,
    fontWeight: 'bold',
  },
  value: {
    color: '#ccc',
    marginBottom: 10,
  },
});
