import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';

export default function Cart({ navigation }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch('https://appp-4c424-default-rtdb.firebaseio.com/Cart.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const items = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));
        setCartItems(items);
      } catch (error) {
        console.error('Error fetching cart data:', error);
        setError('Failed to load cart data');
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      await fetch(`https://appp-4c424-default-rtdb.firebaseio.com/Cart/${itemId}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
      Alert.alert('Error', 'Could not update quantity. Please try again.');
    }
  };

  const removeProduct = async (itemId) => {
    try {
      await fetch(`https://appp-4c424-default-rtdb.firebaseio.com/Cart/${itemId}.json`, {
        method: 'DELETE',
      });

      setCartItems(prevItems =>
        prevItems.filter(item => item.id !== itemId)
      );
    } catch (error) {
      console.error('Error removing product:', error);
      Alert.alert('Error', 'Could not remove product. Please try again.');
    }
  };

  const checkout = () => {
    navigation.navigate('Checkout');
  };

  const continueShopping = () => {
    navigation.goBack();
  };

  if (loading) {
    return <Text style={styles.emptyMessage}>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.emptyMessage}>{error}</Text>;
  }

  return (
    <View style={styles.container1}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.shippingMessage}>Free shipping above $1000.</Text>

        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <View key={item.id} style={styles.productContainer}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.details}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>

                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    onPress={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity || 1}</Text>
                  <TouchableOpacity
                    onPress={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => removeProduct(item.id)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyMessage}>Your cart is empty.</Text>
        )}

        <View style={styles.deliveryInfo}>
          <Text style={styles.deliveryTime}>Delivery time:</Text>
          <Text style={styles.deliveryDetails}>Small items: (3 to 7 working days)</Text>
          <Text style={styles.deliveryDetails}>Big items: (4 to 9 working days)</Text>
        </View>

        <TouchableOpacity onPress={checkout} style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>CHECKOUT</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={continueShopping} style={styles.continueButton}>
          <Text style={styles.continueButtonText}>CONTINUE SHOPPING</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    backgroundColor: '#f0f0f0',
    flex: 1,
  },
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  shippingMessage: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 16,
  },
  productContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    elevation: 3,
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderColor: '#d0d0d0',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    elevation: 2,
  },
  quantityButtonText: {
    fontSize: 18,
    color: '#333',
  },
  quantityText: {
    marginHorizontal: 12,
    fontSize: 18,
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    borderColor: '#d0d0d0',
    borderWidth: 1,
    marginBottom: 10,
    elevation: 3,
    marginTop: 10,
    width: 120,
  },
  removeButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyMessage: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginTop: 20,
  },
  deliveryInfo: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  deliveryTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e8b57',
    marginBottom: 4,
  },
  deliveryDetails: {
    fontSize: 14,
    color: '#757575',
    lineHeight: 20,
  },
  checkoutButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    borderColor: '#d0d0d0',
    borderWidth: 1,
    marginBottom: 10,
    elevation: 3,
    marginTop: 20,
  },
  checkoutButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    borderColor: '#d0d0d0',
    borderWidth: 1,
    marginBottom: 10,
    elevation: 3,
  },
  continueButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
