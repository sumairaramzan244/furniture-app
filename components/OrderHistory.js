
import { View, Text, FlatList, Button } from 'react-native';

const OrderHistory = ({ navigation }) => {
  const orders = []; // Load past orders here

  return (
    <View>
      <Text>Order History</Text>
      <FlatList
        data={orders}
        renderItem={({ item }) => (
          <View>
            <Text>Order Number: {item.orderNumber}</Text>
            <Text>Status: {item.status}</Text>
            <Button title="Reorder" onPress={() => {/* Reorder logic */}} />
          </View>
        )}
        keyExtractor={item => item.orderNumber}
      />
    </View>
  );
};

export default OrderHistory;
