import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuth } from '@/context/AuthContext';
import DiscountBg from "../../assets/images/DiscountImage.jpg";
import { useProducts } from '../../hooks/useProducts';
import { BagProvider, useBag } from '../CartSection/BagContext';
import BagScreen from '../CartSection/BagScreen';
import ExpandedSearchView from './ExpandedSearchView';
import ProductDetailScreen from './ProductDetailScreen';
const { width } = Dimensions.get('window');

type Screen = 'Home' | 'Search' | 'Detail' | 'Bag';

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

interface DiscountCardProps {
    discount: number;
    title: string;
    color: string;
    imageComponent: React.ReactNode;
}

const DISCOUNTS: { title: string, discount: number, color: string }[] = [
    { title: 'New Member', discount: 40, color: '#C8DFC3' },
    { title: 'Seasonal', discount: 30, color: '#C8DFC3' },
    { title: 'Weekly Special', discount: 25, color: '#C8DFC3' },
];
const DiscountCard: React.FC<DiscountCardProps> = ({ discount, title, color, imageComponent }) => (
    <View style={[styles.discountCard, { backgroundColor: color }]}>
        <View style={styles.discountCardContent}>
            <Text style={styles.heading}>{title}</Text>

            <Text style={styles.subText}>discount</Text>

            <Text style={styles.discountValue}>{discount}%</Text>

            <TouchableOpacity style={styles.claimButton}>
                <Text style={styles.claimButtonText}>claim now</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
            {imageComponent}
        </View>
    </View>
);

const PopularProductCard: React.FC<{ product: Product, onPress: (product: Product) => void, onAddPress: (product: Product) => void }> = ({ product, onPress, onAddPress }) => (
    <TouchableOpacity onPress={() => onPress(product)} style={styles.popularProductCard}>
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
        <TouchableOpacity style={styles.popularFavoriteButton}>
            <AntDesign name="heart" size={20} color="#FF6347" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onAddPress(product)} style={styles.popularAddButton}>
            <AntDesign name="plus" size={20} color="white" />
        </TouchableOpacity>
    </TouchableOpacity>
);

const PopularSection: React.FC<{ products: Product[], insetsBottom: number, onProductPress: (product: Product) => void, onAddPress: (product: Product) => void }> = ({ products, insetsBottom, onProductPress, onAddPress }) => (
    <View style={styles.popularSectionContainer}>
        <Text style={styles.popularTitle}>Popular</Text>
        <ScrollView
            contentContainerStyle={styles.productList}
            showsVerticalScrollIndicator={false}
        >
            {products.map((product, index) => (
                <PopularProductCard
                    key={product.id}
                    product={product}
                    onPress={onProductPress}
                    onAddPress={onAddPress}
                />
            ))}
            <View style={{ height: insetsBottom + 20 }} />
        </ScrollView>
    </View>
);

const MainNavigator: React.FC = () => {
    const { user } = useAuth()
    const insets = useSafeAreaInsets();
    const { addItem, resetBag } = useBag();
    const [activeScreen, setActiveScreen] = useState<Screen>('Home');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const { products: firestoreProducts, loading, error } = useProducts();

    const displayProducts = firestoreProducts.map(fp => ({
        id: parseInt(fp.id) || Math.random(), // Use Firestore ID
        name: fp.name,
        price: fp.price,
        unit: fp.unit,
        imageUrl: fp.imageUrl,
        category: fp.category,
        rating: fp.rating,
        description: fp.description
    }));

    React.useEffect(() => {
        if (error) {
            Alert.alert('Error', 'Failed to load products from server.', [{ text: 'OK' }]);
        }
    }, [error]);

    const handleSearchInputPress = () => setActiveScreen('Search');
    const handleBackPress = () => setActiveScreen('Home');
    const handleProductPress = (product: Product) => {
        setSelectedProduct(product);
        setActiveScreen('Detail');
    };
    const handleDetailBackPress = () => setActiveScreen('Home');
    const handleOpenBag = () => setActiveScreen('Bag');
    const handleBagBackPress = () => setActiveScreen('Home');
    const handleHomePressAfterOrder = () => {
        resetBag();
        setActiveScreen('Home');
    }
    const handleAddToBagFromHome = (product: Product) => {
        addItem(product, 1);
    };
    const handleLocationChange = () => console.log('Location change pressed');
    const handleScan = () => console.log('Scan pressed');
    const handleProfile = () => console.log('Profile pressed');
     const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = searchQuery
        ? displayProducts.filter(p => 
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : displayProducts;

    if (loading && firestoreProducts.length === 0) {
        return (
            <View style={[styles.screenContainer, { justifyContent: 'center', alignItems: 'center', paddingTop: insets.top }]}>
                <StatusBar style="dark" />
                <ActivityIndicator size="large" color="#4CD964" />
                <Text style={{ marginTop: 10, color: '#666' }}>Loading products from Firestore...</Text>
            </View>
        );
    }

    if (!loading && firestoreProducts.length === 0) {
        return (
            <View style={[styles.screenContainer, { justifyContent: 'center', alignItems: 'center', paddingTop: insets.top }]}>
                <StatusBar style="dark" />
                <Text style={{ fontSize: 18, color: '#666', textAlign: 'center' }}>No products found in database.</Text>
                <Text style={{ marginTop: 10, color: '#999', textAlign: 'center' }}>Add products to your Firestore database.</Text>
            </View>
        );
    }

    if (activeScreen === 'Search') {
        return (
            <View style={[styles.screenContainer, { paddingTop: insets.top }]}>
                <StatusBar style="dark" />
                <ExpandedSearchView onBack={handleBackPress}  products={filteredProducts}   
                    onProductPress={handleProductPress}
                    searchQuery={searchQuery}        
                    onSearchChange={setSearchQuery}    />
            </View>
        );
    }

    if (activeScreen === 'Detail' && selectedProduct) {
        return (
            <View style={styles.detailContainer}>
                <StatusBar style="dark" />
                <ProductDetailScreen
                    product={selectedProduct}
                    onBack={handleDetailBackPress}
                    insetsTop={insets.top}
                />
            </View>
        );
    }

    if (activeScreen === 'Bag') {
        return (
            <BagScreen onBack={handleBagBackPress} onHomePress={handleHomePressAfterOrder} />
        );
    }

    return (
        <View style={[styles.screenContainer, { paddingTop: insets.top }]}>
            <StatusBar style="dark" />

            <View style={styles.header}>
                <TouchableOpacity onPress={handleProfile}>
                    <Image
                        source={{ uri: 'https://placehold.co/40x40/f4a261/ffffff?text=Yona' }}
                        style={styles.profilePic}
                        accessibilityLabel="Profile Picture"
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleLocationChange} style={styles.locationSelector}>
                    <Text style={styles.locationText}>{`${user?.displayName ?? "Yona"}'s Home`}</Text>
                    <AntDesign name="down" size={10} color="#333" style={{ marginLeft: 5 }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleOpenBag} style={styles.cartButton}>
                    <MaterialCommunityIcons name="basket" size={26} color="#333" />
                </TouchableOpacity>
            </View>

            <View style={styles.greetingSection}>
                <Text style={styles.greetingTitle}>Hey {user?.displayName ?? "Yona"} 👋</Text>
                <Text style={styles.greetingSubtitle}>Find fresh groceries you want</Text>
            </View>

            <TouchableOpacity onPress={handleSearchInputPress} style={styles.searchBarContainer}>
                <View style={styles.searchInputWrapper}>
                    <MaterialCommunityIcons name="magnify" size={24} color="#4CD964" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search fresh groceries"
                        placeholderTextColor="#999"
                        editable={false}
                    />
                </View>
                <TouchableOpacity onPress={handleScan} style={styles.scanButton}>
                    <MaterialCommunityIcons name="qrcode-scan" size={24} color="white" />
                </TouchableOpacity>
            </TouchableOpacity>

            <View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.discountCarousel}
                >
                    {DISCOUNTS.map((item, index) => (
                        <DiscountCard
                            key={index}
                            title={item.title}
                            discount={item.discount}
                            color={item.color}
                            imageComponent={<Image
                                source={DiscountBg}
                                style={styles.image}
                                resizeMode="cover"
                            />}
                        />
                    ))}
                </ScrollView>
            </View>

            <PopularSection
                products={displayProducts}
                insetsBottom={insets.bottom}
                onProductPress={handleProductPress}
                onAddPress={handleAddToBagFromHome}
            />
        </View>
    );
}

export default function HomeScreen() {
    return (
        <BagProvider>
            <MainNavigator />
        </BagProvider>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    detailContainer: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 15,
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    locationSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: '#F0F0F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2,
    },
    locationText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    cartButton: {
        padding: 5,
    },
    greetingSection: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    greetingTitle: {
        fontSize: 26,
        fontWeight: '700',
        color: '#333',
    },
    greetingSubtitle: {
        fontSize: 16,
        color: '#666',
    },
    searchBarContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 20,
        alignItems: 'center',
        width: '100%',
    },
    searchInputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#F0F0F0',
        borderRadius: 12,
        paddingHorizontal: 15,
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        marginLeft: 8,
        color: '#333',
    },
    scanButton: {
        width: 50,
        height: 50,
        borderRadius: 12,
        backgroundColor: '#4CD964',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: 16,        // Smaller font size for the top text
        fontWeight: '600',   // Semi-bold
        color: '#1f2937',    // Dark grey (Tailwind gray-800 equivalent)
        marginBottom: 4,     // Space between title and percentage
    },
    subheading: {
        fontSize: 34,        // Large font size for the percentage
        fontWeight: 'bold',  // Extra bold
        color: '#064E3B',    // Darker green (or black) to stand out
        marginBottom: 12,    // Space before the button
    },
    discountCarousel: {
        paddingHorizontal: 20,
        marginBottom: 25,
    },
    discountCard: {
        flexDirection: 'row', // Aligns content and image horizontally
        borderRadius: 24,     // Matches the rounded look in screenshot
        height: 170,          // Fixed height ensures consistency
        overflow: 'hidden',   // Ensures the image doesn't bleed outside the rounded corners
        position: 'relative',
        width: '70%',
        marginRight: 20,
        elevation: 5,
        shadowColor: '#000',  // Shadow for iOS
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    discountCardImagePlaceholder: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.8,
    },
    discountCardContent: {
        flex: 1,              // Takes up the available space on the left
        padding: 20,
        justifyContent: 'center',
        zIndex: 1,            // Ensures text sits above image if they overlap
    }, discountCardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 4,
    },
    discountCardValue: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 12,
    },
    claimButton: {
        backgroundColor: '#34D399', // The darker green button color
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        alignSelf: 'flex-start',    // Keeps button size to content width
    },
    claimButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 12,
    },
    imageContainer: {
        width: '60%',          // The image takes up the right 50% of the card
        height: '100%',
        position: 'absolute',  // Position absolute allows it to sit on the right
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    popularSectionContainer: {
        flex: 1,
    },
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
    popularProductCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 3,
        width: '100%',
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 15,
        marginRight: 15,
        resizeMode: 'contain',
        backgroundColor: '#EAEAEA',
    },
    productDetails: {
        flex: 1,
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
    popularFavoriteButton: {
        position: 'absolute',
        top: 10,
        right: 55,
        padding: 5,
    },
    popularAddButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#4CD964',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    subText: {
        fontSize: 16,      // Slightly smaller or lighter for "discount"
        fontWeight: '400', // Regular weight
        color: '#4B5563',  // Slightly lighter grey
        marginBottom: 8,   // Space before the "30%"
    },
    discountValue: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#064E3B',
        marginBottom: 12,
    },
});