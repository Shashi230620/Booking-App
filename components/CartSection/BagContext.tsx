import React, { createContext, ReactNode, useContext, useState } from 'react';

// --- TYPES ---
interface BagItem {
    id: number;
    name: string;
    price: number;
    unit: string;
    imageUrl: string;
    quantity: number;
}

type CheckoutStatus = 'Pending' | 'Confirmed';

interface BagContextType {
    items: BagItem[];
    total: number;
    status: CheckoutStatus;
    addItem: (product: Omit<BagItem, 'quantity'>, quantityToAdd: number) => void;
    updateItemQuantity: (id: number, newQuantity: number) => void;
    removeItem: (id: number) => void;
    proceedToCheckout: () => void;
    resetBag: () => void;
}

// --- Context Setup ---
const BagContext = createContext<BagContextType | undefined>(undefined);

// --- Provider Component ---
interface BagProviderProps {
    children: ReactNode;
}

export const BagProvider: React.FC<BagProviderProps> = ({ children }) => {
    const [items, setItems] = useState<BagItem[]>([]);
    const [status, setStatus] = useState<CheckoutStatus>('Pending');

    // Calculate the total price
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // --- Actions ---

    const addItem = (product: Omit<BagItem, 'quantity'>, quantityToAdd: number) => {
        setItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);

            if (existingItem) {
                // Update quantity of existing item
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantityToAdd }
                        : item
                );
            } else {
                // Add new item
                return [...prevItems, { ...product, quantity: quantityToAdd }];
            }
        });
        setStatus('Pending');
    };

    const updateItemQuantity = (id: number, newQuantity: number) => {
        setItems(prevItems => {
            if (newQuantity <= 0) {
                return prevItems.filter(item => item.id !== id);
            }
            return prevItems.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            );
        });
    };

    const removeItem = (id: number) => {
        setItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const proceedToCheckout = () => {
        // In a real app, this would involve payment logic.
        // For the UI simulation, we just confirm the order.
        setStatus('Confirmed');
    };

    const resetBag = () => {
        setItems([]);
        setStatus('Pending');
    };

    const contextValue: BagContextType = {
        items,
        total,
        status,
        addItem,
        updateItemQuantity,
        removeItem,
        proceedToCheckout,
        resetBag,
    };

    return <BagContext.Provider value={contextValue}>{children}</BagContext.Provider>;
};

// --- Custom Hook for easy access ---
export const useBag = () => {
    const context = useContext(BagContext);
    if (context === undefined) {
        throw new Error('useBag must be used within a BagProvider');
    }
    return context;
};