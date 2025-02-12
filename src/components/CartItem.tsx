import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Product } from '../services/api';

interface CartItemProps extends Product{
  quantity: number;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  title,
  quantity,
  description,
  price,
  images,
  thumbnail,
  onUpdateQuantity,
  onRemove,
}) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: thumbnail }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{title}</Text>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => onUpdateQuantity(id, quantity - 1)}
            style={styles.quantityButton}
          >
            <Icon name="remove" size={20} color="#007AFF" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity
            onPress={() => onUpdateQuantity(id, quantity + 1)}
            style={styles.quantityButton}
          >
            <Icon name="add" size={20} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => onRemove(id)} style={styles.removeButton}>
        <Icon name="delete" size={24} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 4,
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 12,
  },
  removeButton: {
    padding: 4,
  },
});

export default CartItem;
