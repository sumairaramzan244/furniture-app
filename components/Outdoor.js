import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ProductList from './Product';

const outdoorFurniture = [
  { 
    id: '12', 
    name: 'Patio Sofa Set', 
    price: '$999', 
    image: { uri: 'https://images.thdstatic.com/productImages/6fec3929-b7dc-4366-8106-a0951bb923f1/svn/outdoor-sectionals-an016orange49-64_600.jpg' }, 
    description: 'Comfortable patio sofa set with weather-resistant cushions.' 
  },
  { 
    id: '13', 
    name: 'Outdoor Dining Table', 
    price: '$799', 
    image: { uri: 'https://www.viewmastercms.com/assets/VMAPP_Universal_Furniture/image/ic/orig/U012652_OVERHEAD_vm_001.jpg' }, 
    description: 'Spacious outdoor dining table for backyard gatherings.' 
  },
  { 
    id: '14', 
    name: 'Hammock', 
    price: '$199', 
    image: { uri: 'https://www.hammockuniverse.com/cdn/shop/articles/Hammock-Universe-Blog-Featured-Image-YOUR-ULTIMATE-GUIDE-ON-HANGING-HAMMOCKS-OUTDOORS_900x.jpg?v=1678807426' }, 
    description: 'Relaxing hammock made of durable cotton.' 
  },
  { 
    id: '15', 
    name: 'Outdoor Lounge Chair', 
    price: '$399', 
    image: { uri: 'https://img.edilportale.com/news/j_83750_08.jpeg' }, 
    description: 'Ergonomic lounge chair perfect for sunbathing.' 
  },
  { 
    id: '16', 
    name: 'Fire Pit', 
    price: '$499', 
    image: { uri: 'https://www.sophistimom.com/wp-content/uploads/2023/04/813nHL8YY7L.jpg' }, 
    description: 'Stylish fire pit for cozy outdoor evenings.' 
  },
  { 
    id: '17', 
    name: 'Garden Bench', 
    price: '$299', 
    image: { uri: 'https://m.media-amazon.com/images/I/51tyPj2EkjL._AC_UF894,1000_QL80_.jpg' }, 
    description: 'Classic wooden garden bench with armrests.' 
  }
];

export default function Outdoor({ navigation }) {
  const [sortedProducts, setSortedProducts] = useState(outdoorFurniture);
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    sortProducts(sortOrder);
  }, [sortOrder]);

  const sortProducts = (order) => {
    const sorted = [...outdoorFurniture].sort((a, b) => {
      const priceA = parseFloat(a.price.replace('$', ''));
      const priceB = parseFloat(b.price.replace('$', ''));
      return order === 'high-to-low' ? priceB - priceA : priceA - priceB;
    });
    setSortedProducts(sorted);
  };

  const addProductsToDatabase = async () => {
    for (const product of outdoorFurniture) {
      const response = await fetch("https://mubileproject-default-rtdb.firebaseio.com/Outdoor.json", {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: product.id,
          name: product.name,
          price: product.price,
          description: product.description,
          image: product.image.uri,
        }),
      });
      if (!response.ok) {
        Alert.alert("Error", "There was an error adding products to the database. Please try again.");
        console.error('Error:', response.statusText);
        return;
      }
    }
    Alert.alert("Success", "All products added to the Outdoor category in the database.");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}></Text>
       
      </View>
      <ScrollView>
        <ProductList products={sortedProducts} navigation={navigation} />
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