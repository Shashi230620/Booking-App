// PopularSection.tsx
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PopularProductCard from './PopularProductCard'; // Assuming in the same directory

interface Product {
  id: number;
  name: string;
  price: number;
  unit: string;
  imageUrl: string;
}

interface PopularSectionProps {
  products: Product[];
  insetsBottom: number; // To handle safe area at the bottom
}

const PopularSection: React.FC<PopularSectionProps> = ({ products, insetsBottom }) => {
  return (
    <View>
      {/* Popular Section Header */}
      <Text style={styles.popularTitle}>Popular</Text>

      {/* Product List */}
      <ScrollView
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
      >
        {products.map(product => (
          <PopularProductCard key={product.id} product={product} />
        ))}
        {/* Extra margin for safe area bottom padding */}
        <View style={{ height: insetsBottom + 20 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  popularTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  productList: {
    paddingHorizontal: 20,
  },
});

export default PopularSection;