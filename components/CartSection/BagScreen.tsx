import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBag } from './BagContext'; // Import context

const { width } = Dimensions.get('window');

// --- Component for individual item in the bag ---
interface BagItemCardProps {
    item: {
        id: number;
        name: string;
        price: number;
        unit: string;
        imageUrl: string;
        quantity: number;
    };
}

const BagItemCard: React.FC<BagItemCardProps> = ({ item }) => {
    const { updateItemQuantity } = useBag();

    const handleQuantityChange = (type: 'add' | 'subtract') => {
        const newQuantity = type === 'add' ? item.quantity + 1 : item.quantity - 1;
        updateItemQuantity(item.id, newQuantity);
    };

    const itemTotal = (item.price * item.quantity).toFixed(1);
    const itemUnitDisplay = `${item.quantity} ${item.unit.replace('/', '')}`;
    
    return (
        <View style={styles.bagItemCard}>
            <Image 
                source={{ uri: item.imageUrl }} 
                style={styles.itemImage}
                accessibilityLabel={item.name}
            />
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantityUnit}>{itemUnitDisplay}</Text>
                <Text style={styles.itemPrice}>${itemTotal}</Text>
            </View>
            <View style={styles.itemControls}>
                <TouchableOpacity onPress={() => handleQuantityChange('subtract')} style={styles.quantityButton}>
                    <AntDesign name="minus" size={16} color="#333" />
                </TouchableOpacity>
                <Text style={styles.quantityDisplay}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => handleQuantityChange('add')} style={styles.quantityButton}>
                    <AntDesign name="plus" size={16} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.favoriteButton}>
                    <AntDesign name="heart" size={16} color="#FF6347" />
                </TouchableOpacity>
            </View>
        </View>
    );
};


// --- SCREEN STATES ---

const EmptyBagView: React.FC = () => (
    <View style={styles.emptyContainer}>
        <View style={styles.emojiWrapper}>
            <Text style={styles.emoji}>🥺</Text>
        </View>
        <Text style={styles.emptyTitle}>{`It's lonely here`}</Text>
        <Text style={styles.emptySubtitle}>Start and add more items to the bag.</Text>
        {/* No button in the original empty view */}
    </View>
);

interface OrderConfirmedViewProps {
    onHomePress: () => void;
}

const OrderConfirmedView: React.FC<OrderConfirmedViewProps> = ({ onHomePress }) => (
    <View style={styles.confirmedContainer}>
        <View style={styles.confirmedContent}>
            <View style={styles.checkmarkWrapper}>
                <AntDesign name="check" size={40} color="white" />
            </View>
            <Text style={styles.confirmedTitle}>Success!</Text>
            <Text style={styles.confirmedSubtitle}>You have successfully created your order.</Text>
        </View>

        <TouchableOpacity onPress={onHomePress} style={styles.browseHomeButton}>
            <Text style={styles.browseHomeText}>Browse Home</Text>
        </TouchableOpacity>
    </View>
);


// --- MAIN BAG SCREEN ---

interface BagScreenProps {
    onBack: () => void;
    onHomePress: () => void;
}

const BagScreen: React.FC<BagScreenProps> = ({ onBack, onHomePress }) => {
    const insets = useSafeAreaInsets();
    const { items, total, status, proceedToCheckout } = useBag();

    if (status === 'Confirmed') {
        return (
            <View style={[styles.container, { paddingTop: insets.top }]}>
                <OrderConfirmedView onHomePress={onHomePress} />
            </View>
        );
    }

    const itemCount = items.length;
    
    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={onBack}>
                      <Text style={styles.backIcon}>‹</Text>
                    </TouchableOpacity>
            </View>
            
            <View style={styles.contentWrapper}>
                <Text style={styles.title}>My Bag</Text>
                <Text style={styles.itemCountText}>{itemCount} {itemCount === 1 ? 'item' : 'items'}</Text>
            </View>

            {itemCount === 0 ? (
                <EmptyBagView />
            ) : (
                <>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.itemList}>
                        {items.map(item => (
                            <BagItemCard key={item.id} item={item} />
                        ))}
                    </ScrollView>

                    {/* Footer/Checkout */}
                    <View style={styles.footer}>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalText}>Total</Text>
                            <Text style={styles.totalValue}>${total.toFixed(1)}</Text>
                        </View>
                        <TouchableOpacity onPress={proceedToCheckout} style={styles.checkoutButton}>
                            <Text style={styles.checkoutButtonText}>Proceed To Checkout</Text>
                        </TouchableOpacity>
                        <View style={{ height: insets.bottom }} />
                    </View>
                </>
            )}
        </View>
    );
};

export default BagScreen;

// --- STYLES ---

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    backBtn: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  backIcon: {
    fontSize: 26,
    color: '#333',
    marginTop: -2,
  },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    },
    contentWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        paddingHorizontal: 20,
        marginBottom: 20,
        marginTop: 110
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
        color: '#1C402A', // Dark green color
    },
    itemCountText: {
        fontSize: 16,
        color: '#999',
    },
    itemList: {
        paddingHorizontal: 20,
    },
    // --- Bag Item Card Styles ---
    bagItemCard: {
        flexDirection: 'row',
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
        alignItems: 'center',
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 15,
        marginRight: 15,
        resizeMode: 'contain',
        backgroundColor: '#EAEAEA',
    },
    itemDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    itemQuantityUnit: {
        fontSize: 14,
        color: '#999',
    },
    itemPrice: {
        fontSize: 18,
        fontWeight: '700',
        color: '#4CD964',
        marginTop: 5,
    },
    itemControls: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        borderRadius: 15,
        padding: 4,
    },
    quantityButton: {
        padding: 8,
    },
    quantityDisplay: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginHorizontal: 5,
    },
    favoriteButton: {
        padding: 8,
        marginLeft: 10,
    },
    // --- Footer/Checkout Styles ---
    footer: {
        paddingHorizontal: 20,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        backgroundColor: 'white',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    totalText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
    },
    totalValue: {
        fontSize: 24,
        fontWeight: '800',
        color: '#4CD964',
    },
    checkoutButton: {
        backgroundColor: '#4CD964',
        borderRadius: 12,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    checkoutButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
    },
    // --- Empty Bag Styles ---
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emojiWrapper: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    emoji: {
        fontSize: 40,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
        paddingHorizontal: 40,
    },
    // --- Order Confirmed Styles ---
    confirmedContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingVertical: 50,
    },
    confirmedContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmarkWrapper: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#4CD964',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.8,
        marginBottom: 30,
        borderWidth: 5,
        borderColor: 'rgba(76, 217, 100, 0.3)',
    },
    confirmedTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: '#333',
        marginBottom: 10,
    },
    confirmedSubtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    browseHomeButton: {
        backgroundColor: '#4CD964',
        borderRadius: 12,
        width: '100%',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    browseHomeText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
    },
});