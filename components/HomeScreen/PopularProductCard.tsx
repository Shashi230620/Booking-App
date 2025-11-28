// PopularProductCard.tsx
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Product {
  id: number;
  name: string;
  price: number;
  unit: string;
  imageUrl: string;
}

interface PopularProductCardProps {
  product: Product;
}

const PopularProductCard: React.FC<PopularProductCardProps> = ({ product }) => {
  return (
    <View style={styles.productCard}>
      {/* Product Image */}
      <Image
        source={{ uri: product.imageUrl }}
        style={styles.productImage}
        accessibilityLabel={product.name}
      />

      <View style={styles.productDetails}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>
          <Text style={styles.priceValue}>${product.price}</Text>
          <Text style={styles.priceUnit}>{product.unit}</Text>
        </Text>
      </View>

      {/* Favorite Icon - Positioned differently to match image */}
      <TouchableOpacity style={styles.favoriteButton}>
        <AntDesign name="heart" size={20} color="#FF6347" />
      </TouchableOpacity>

      {/* Add to Cart Button */}
      <TouchableOpacity style={styles.addButton}>
        <AntDesign name="plus" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Changed to white as per image
    borderRadius: 20,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
    // Width can be controlled by parent for padding, or here for fixed size
    width: '100%', 
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 15, // Slightly less rounded than full circle from original
    marginRight: 15,
    resizeMode: 'contain',
    backgroundColor: '#EAEAEA', // Light background for images
  },
  productDetails: {
    flex: 1, // Takes up available space
    justifyContent: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
  },
  priceValue: {
    fontWeight: '700',
    color: '#4CD964',
  },
  priceUnit: {
    fontWeight: '400',
    color: '#666',
  },
  favoriteButton: {
    // Positioned relative to the card, slightly to the right of product image
    position: 'absolute',
    top: 10, // Adjust as needed
    right: 55, // Adjusted to match image
    padding: 5,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#4CD964',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10, // Spacing from other elements
  },
});

export default PopularProductCard;