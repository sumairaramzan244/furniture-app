import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ProductList from './Product';

const bedroomProducts = [
  { id: '1', name: 'King Size Bed', category: 'Bedroom', image: { uri: 'https://www.sierralivingconcepts.com/blog/wp-content/uploads/2023/08/Handcarved-king-size-bedroom-set.jpg' }, price: '$499', description: 'Luxurious king size bed.' },
  { id: '2', name: 'Nightstand', category: 'Bedroom', image: { uri: 'https://static-01.daraz.pk/p/9ee06ad1ba9b614c8a150850b65dee7b.jpg' }, price: '$89', description: 'Wooden nightstand.' },
  { id: '3', name: 'Wardrobe', category: 'Bedroom', image: { uri: 'http://inspirations.pk/wp-content/uploads/2023/09/nsplsh_21cea9f7a1984ef8aad8981d4915ba33mv2.webp' }, price: '$799', description: 'Spacious wardrobe.' },
  { id: '4', name: 'Dresser', category: 'Bedroom', image: { uri: 'https://www.furniturepick.com/media/catalog/product/cache/1/image/650x650/9df78eab33525d08d6e5fb8d27136e95/1/6/1616W-15-vanity-1.jpg' }, price: '$349', description: 'Elegant wooden dresser.' },
  { id: '5', name: 'Bedroom Lamp', category: 'Bedroom', image: { uri: 'https://m.media-amazon.com/images/S/al-na-9d5791cf-3faf/63cb140f-9d56-4169-bfe7-0ce360b7a36a._SL480_.jpg' }, price: '$50', description: 'Modern bedside lamp.' },
];

export default function Bedroom({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bedroom Products</Text>
        
      </View>
      <ScrollView>
        <ProductList products={bedroomProducts} navigation={navigation} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
    marginTop: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
