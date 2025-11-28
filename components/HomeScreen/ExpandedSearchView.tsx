import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
    FlatList,
    Image,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

// Sample tags from your code
const SEARCH_TAGS = ['Mango', 'Avocado', 'Sweet Fruit', 'Grape', 'Bread', 'Pineapple', 'Raw Meat'];

interface ExpandedSearchViewProps {
    onBack: () => void;
    // Data passed from parent (filtered list)
    products: any[]; 
    // Action when user clicks a product
    onProductPress: (product: any) => void;
    // State passed from parent
    searchQuery: string;
    // Event to update parent state
    onSearchChange: (text: string) => void;
}

const ExpandedSearchView: React.FC<ExpandedSearchViewProps> = ({ 
    onBack, 
    products, 
    onProductPress, 
    searchQuery, 
    onSearchChange 
}) => {

    const handleClear = () => {
        onSearchChange('');
        Keyboard.dismiss();
    };

    const handleTagPress = (tag: string) => {
        onSearchChange(tag);
    };

    return (
        <View style={styles.expandedContainer}>
            {/* Header/Back Arrow Button */}
            <View style={styles.expandedHeader}>
                <TouchableOpacity onPress={() => { Keyboard.dismiss(); onBack(); }} style={styles.backButton}>
                    <AntDesign name="left" size={24} color="#333" /> 
                </TouchableOpacity>

                {/* Search Input Field */}
                <View style={styles.expandedSearchInputWrapper}>
                    <TextInput
                        style={styles.expandedSearchInput}
                        placeholder="Search fresh groceries"
                        placeholderTextColor="#999"
                        autoFocus={true}
                        value={searchQuery}
                        onChangeText={onSearchChange}
                    />
                    {/* If text exists, show Close 'X', otherwise show Magnify */}
                    {searchQuery.length > 0 ? (
                        <TouchableOpacity onPress={() => onSearchChange('')}>
                            <MaterialCommunityIcons name="close-circle" size={24} color="#ccc" />
                        </TouchableOpacity>
                    ) : (
                        <MaterialCommunityIcons name="magnify" size={24} color="#4CD964" />
                    )}
                </View>
            </View>

            {/* CONDITIONAL RENDERING */}
            
            {/* CASE 1: No Search Text -> Show Tags / Recent Searches */}
            {searchQuery.length === 0 ? (
                <View>
                    <View style={styles.tagsHeader}>
                        <Text style={styles.tagsTitle}>Recent Searches</Text>
                        <TouchableOpacity>
                            <Text style={styles.removeText}>clear</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.tagsContainer}>
                        {SEARCH_TAGS.map((tag, index) => (
                            <TouchableOpacity 
                                key={index} 
                                style={styles.tag}
                                onPress={() => handleTagPress(tag)}
                            >
                                <Text style={styles.tagText}>{tag}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            ) : (
                /* CASE 2: Has Search Text -> Show List of Products */
                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id.toString()}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ paddingBottom: 20 }}
                    ListEmptyComponent={
                        <View style={{ marginTop: 50, alignItems: 'center' }}>
                            <MaterialCommunityIcons name="emoticon-sad-outline" size={50} color="#ddd" />
                            <Text style={{ color: '#999', marginTop: 10 }}>No products found</Text>
                        </View>
                    }
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={styles.resultItem} 
                            onPress={() => onProductPress(item)}
                        >
                            <Image source={{ uri: item.imageUrl }} style={styles.resultImage} />
                            <View style={styles.resultInfo}>
                                <Text style={styles.resultName}>{item.name}</Text>
                                <Text style={styles.resultCategory}>{item.category}</Text>
                                <Text style={styles.resultPrice}>${item.price.toFixed(2)}</Text>
                            </View>
                            <MaterialCommunityIcons name="chevron-right" size={24} color="#eee" />
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

export default ExpandedSearchView;

const styles = StyleSheet.create({
    expandedContainer: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: 'white',
    },
    expandedHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10, // Added slight top margin
    },
    backButton: { 
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    },
    expandedSearchInputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#F0F0F0',
        borderRadius: 12,
        paddingHorizontal: 15,
        justifyContent: 'space-between', 
    },
    expandedSearchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        marginRight: 10,
    },
    
    // Tag Section Styles
    tagsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    tagsTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    removeText: {
        fontSize: 14,
        color: '#FF6347',
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    tag: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: '#F0F0F0',
        marginRight: 10,
        marginBottom: 10,
    },
    tagText: {
        fontSize: 14,
        color: '#333',
    },

    resultItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    resultImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        marginRight: 15,
    },
    resultInfo: {
        flex: 1,
    },
    resultName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    resultCategory: {
        fontSize: 12,
        color: '#999',
        marginBottom: 2,
    },
    resultPrice: {
        fontSize: 14,
        color: '#4CD964',
        fontWeight: '600',
    }
});