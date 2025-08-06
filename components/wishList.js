import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function Wishlist({ navigation }) {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const fetchWishlistData = async () => {
      try {
        const response = await fetch('https://appp-4c424-default-rtdb.firebaseio.com/Wishlist.json'); // Correct path
        const data = await response.json();
        const items = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));
        setWishlistItems(items);
      } catch (error) {
        console.error('Error fetching wishlist data:', error);
      }
    };

    fetchWishlistData();
  }, []);

  const removeProduct = async (itemId) => {
    try {
      await fetch(`https://appp-4c424-default-rtdb.firebaseio.com/Wishlist/${itemId}.json`, {
        method: 'DELETE', // Correct path for removal
      });

      setWishlistItems(prevItems =>
        prevItems.filter(item => item.id !== itemId)
      );
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  const goToProduct = (item) => {
    navigation.navigate('ProductDetail', { product: item });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {wishlistItems.length > 0 ? (
          wishlistItems.map(item => (
            <View key={item.id} style={styles.productContainer}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.details}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>{item.price}</Text>
                <TouchableOpacity onPress={() => goToProduct(item)} style={styles.viewButton}>
                  <Text style={styles.viewButtonText}>View</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeProduct(item.id)} style={styles.removeButton}>
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyMessage}>Your wishlist is empty.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  productContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  details: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 16,
    color: '#2e8b57',
    marginVertical: 8,
  },
  viewButton: {
    backgroundColor: '#ddd',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 8,
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  removeButton: {
    backgroundColor: '#ddd',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 8,
  },
  removeButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  emptyMessage: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginTop: 20,
  },
});
