import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useBag } from '../CartSection/BagContext'; // Import context

const { width, height } = Dimensions.get('window');
const IMAGE_HEADER_HEIGHT = width * 0.9; 

// Define the Product interface (should match BagContext's Omit<BagItem, 'quantity'>)
interface Product {
    id: number;
    name: string;
    price: number;
    unit: string;
    imageUrl: string;
    category: string;
    rating: number;
    description: string;
}

interface ProductDetailScreenProps {
    product: Product;
    onBack: () => void;
    insetsTop: number;
}

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ product, onBack, insetsTop }) => {
    const { addItem } = useBag();
    const [quantity, setQuantity] = useState(3); // Start quantity at 3 as per UI example

    const handleQuantityChange = (type: 'add' | 'subtract') => {
        setQuantity(prev => {
            if (type === 'add') return prev + 1;
            if (type === 'subtract' && prev > 1) return prev - 1;
            return prev;
        });
    };

    const handleAddToBag = () => {
        // Pass the product details (excluding quantity) and the current state quantity
        addItem(product, quantity);
        onBack(); // Optionally go back to the home screen after adding
    };

    return (
        <View style={styles.detailContainer}>
            {/* 1. Fixed Header/Image Section (No Scroll) */}
            <View style={styles.fixedImageWrapper}>
                <Image
                    source={{ uri: product.imageUrl }}
                    style={styles.detailImage}
                    accessibilityLabel={product.name}
                />
            </View>

            {/* Fixed Navigation Buttons (Absolute Positioned) */}
            <View style={[styles.detailHeader, { paddingTop: insetsTop + 10 }]}>
                <TouchableOpacity onPress={onBack} style={styles.detailHeaderButton}>
                    <AntDesign name="arrowleft" size={24} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.detailHeaderButton}>
                    <MaterialCommunityIcons name="bag-personal-outline" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            {/* 2. Scrollable Content Section */}
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }} 
                style={styles.scrollableContent} 
            >
                {/* Spacer to push the actual content below the image/header area */}
                <View style={{ height: IMAGE_HEADER_HEIGHT - 30 }} /> 

                {/* Content Section (The "Bottom Sheet" look) */}
                <View style={styles.detailContent}>
                    
                    {/* Floating Favorite Button */}
                    <TouchableOpacity style={styles.detailFavoriteButton}>
                        <AntDesign name="heart" size={28} color="#FF6347" />
                    </TouchableOpacity>

                    {/* Price/Shipping/Title */}
                    <View style={styles.detailTopRow}>
                        <MaterialCommunityIcons name="truck-fast-outline" size={16} color="#4CD964" />
                        <Text style={styles.detailShippingText}>Free shipping</Text>
                    </View>

                    <Text style={styles.detailProductName}>{product.name}</Text>

                    <View style={styles.detailMiddleRow}>
                        <View style={styles.detailInfoTag}>
                            <AntDesign name="star" size={12} color="#f4a261" />
                            <Text style={styles.detailTagText}>{product.rating}</Text>
                        </View>
                        <View style={styles.detailInfoTag}>
                            <MaterialCommunityIcons name="food-apple-outline" size={12} color="#4CD964" />
                            <Text style={styles.detailTagText}>{product.category}</Text>
                        </View>
                        
                        <View style={styles.detailPriceContainer}>
                            <Text style={styles.detailPriceValue}>${product.price}</Text>
                            <Text style={styles.detailPriceUnit}>{product.unit}</Text>
                        </View>
                    </View>

                    {/* Description */}
                    <Text style={styles.detailDescriptionTitle}>Description</Text>
                    <Text style={styles.detailDescriptionText}>{product.description}</Text>
                    <Text style={styles.detailDescriptionText}>{product.description}</Text>
                    <Text style={styles.detailDescriptionText}>{product.description}</Text>

                </View>
                
            </ScrollView>

            {/* 3. Sticky Bottom Bar (Add to Bag) */}
            <View style={styles.detailBottomBar}>
                <View style={styles.quantityControl}>
                    <TouchableOpacity onPress={() => handleQuantityChange('subtract')} style={styles.quantityButton}>
                        <Text style={styles.quantityText}>−</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <TouchableOpacity onPress={() => handleQuantityChange('add')} style={styles.quantityButton}>
                        <Text style={styles.quantityText}>+</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleAddToBag} style={styles.addToBagButton}>
                    <Text style={styles.addToBagText}>Add to bag</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
    detailContainer: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    fixedImageWrapper: {
        position: 'absolute',
        width: '100%',
        height: IMAGE_HEADER_HEIGHT,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    detailImage: {
        width: '70%',
        height: '70%',
        resizeMode: 'contain',
    },
    detailHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 3,
    },
    detailHeaderButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    },
    scrollableContent: {
        flex: 1,
        zIndex: 2,
    },
    detailContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 30,
        paddingTop: 45,
        minHeight: height - 120,
    },
    detailFavoriteButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: -30, 
        right: 30,
        zIndex: 5,
        shadowColor: '#FF6347', 
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    detailTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    detailShippingText: {
        marginLeft: 5,
        fontSize: 14,
        fontWeight: '500',
        color: '#4CD964',
    },
    detailProductName: {
        fontSize: 32,
        fontWeight: '800',
        color: '#333',
        marginBottom: 15,
    },
    detailMiddleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    detailInfoTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 15,
        marginRight: 10,
    },
    detailTagText: {
        marginLeft: 5,
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    detailPriceContainer: {
        flexDirection: 'row',
        position: 'absolute',
        right: 0,
        alignItems: 'flex-end',
    },
    detailPriceValue: {
        fontSize: 24,
        fontWeight: '800',
        color: '#4CD964',
        lineHeight: 24,
    },
    detailPriceUnit: {
        fontSize: 14,
        fontWeight: '500',
        color: '#999',
        marginLeft: 4,
        marginBottom: 2,
    },
    detailDescriptionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        marginBottom: 10,
        marginTop: 10,
    },
    detailDescriptionText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#666',
        marginBottom: 15,
    },
    detailBottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        zIndex: 5,
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        borderRadius: 12,
        paddingHorizontal: 10,
    },
    quantityButton: {
        padding: 10,
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
        marginHorizontal: 10,
    },
    addToBagButton: {
        flex: 1,
        marginLeft: 15,
        backgroundColor: '#4CD964',
        borderRadius: 12,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addToBagText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
    },
});