import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function ConfirmationScreen({ route }) {
  const { product, formData } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Order Confirmation</Text>
      
      <Text style={styles.sectionTitle}>Product Details</Text>
      <Image source={product.image} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>

      <Text style={styles.sectionTitle}>Customer Details</Text>
      <Text style={styles.label}>
        Name: <Text style={styles.value}>{formData.firstName} {formData.lastName}</Text>
      </Text>
      <Text style={styles.label}>
        Email: <Text style={styles.value}>{formData.email}</Text>
      </Text>
      <Text style={styles.label}>
        Contact No: <Text style={styles.value}>{formData.contactNo}</Text>
      </Text>
      <Text style={styles.label}>
        Address: <Text style={styles.value}>{formData.address}, {formData.city}, {formData.country}</Text>
      </Text>
      <Text style={styles.label}>
        Payment Type: <Text style={styles.value}>{formData.paymentType}</Text>
      </Text>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: 'green',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: '#333',
  },
  value: {
    fontWeight: 'bold',
    color: '#555',
  },
});
