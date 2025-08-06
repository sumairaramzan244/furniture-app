import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Linking } from 'react-native';

const Checkout = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    const formData = {
      name,
      email,
      address,
      contactNo,
    };

    fetch("https://appp-4c424-default-rtdb.firebaseio.com/FormOfCheckout.json", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then((response) => response.json())
    .then(() => {
      setSubmitted(true);

      const subject = 'Order Confirmation';
      const body = `Dear ${name},\n\nYour order has been confirmed!\n\nThank you for shopping with us.\n\nBest regards,\nQuerencia`;
      const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      Linking.openURL(mailtoUrl);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <View style={styles.container}>
      {submitted ? (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>Thank you for shopping with us!</Text>
        </View>
      ) : (
        <>
          <Text style={styles.text}>Enter Details</Text>
          <View style={styles.form}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
            />

            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
            />

            <Text style={styles.label}>Address:</Text>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="Enter your address"
            />

            <Text style={styles.label}>Contact Number:</Text>
            <TextInput
              style={styles.input}
              value={contactNo}
              onChangeText={setContactNo}
              placeholder="Enter your contact number"
              keyboardType="phone-pad"
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    justifyContent: 'center',
    textAlign: 'center',
    padding: 10,
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  form: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: '#fafafa',
  },
  button: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
});

export default Checkout;
