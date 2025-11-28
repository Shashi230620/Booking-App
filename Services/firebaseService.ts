// services/firebaseService.ts - UPDATED WITH MORE DEBUGGING
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';

export interface FirestoreProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  category: string;
  rating: number;
  unit: string;
}

export const productService = {
  async getAllProducts(): Promise<FirestoreProduct[]> {
    try {
      console.log('🚀 === FIRESTORE DEBUG - ULTRA DETAILED ===');
      console.log('📱 App Name:', db.app.name);
      console.log('🔑 Project ID:', db.app.options.projectId);
      console.log('🌐 Database ID:', db._databaseId);
      
      // Test with a simple collection that should always work
      console.log('🔄 Testing Firestore connection...');
      const productsCollection = collection(db, 'products');
      console.log('✅ Collection reference created:', productsCollection.path);
      
      const querySnapshot = await getDocs(productsCollection);
      console.log('✅ Query completed');
      console.log('📊 Query Metadata:');
      console.log('   - Size:', querySnapshot.size);
      console.log('   - Empty:', querySnapshot.empty);
      console.log('   - Has pending writes:', querySnapshot.metadata.hasPendingWrites);
      
      // Log each document with full details
      if (querySnapshot.size > 0) {
        console.log('🎉 DOCUMENTS FOUND:');
        querySnapshot.forEach((doc) => {
          console.log('   📄 Document ID:', doc.id);
          console.log('   📝 Document data:', JSON.stringify(doc.data(), null, 2));
          console.log('   🔧 All fields:', Object.keys(doc.data()));
        });
      } else {
        console.log('❌ NO DOCUMENTS FOUND in products collection');
        console.log('💡 Possible issues:');
        console.log('   - Collection is empty');
        console.log('   - Wrong database instance');
        console.log('   - Security rules blocking access');
      }
      
      const products: FirestoreProduct[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log('🛠️ Processing document:', doc.id);
        products.push({
          id: doc.id,
          name: data.name || 'No Name',
          description: data.description || 'No description',
          price: data.price || 0,
          imageUrl: data.imageUrl || 'https://placehold.co/100x80/EAEAEA/666666?text=No+Image',
          stock: data.stock || 50, // Default to 50 since your document might not have stock
          category: data.category || 'General',
          rating: data.rating || 4.5,
          unit: data.unit || '/kg'
        });
      });
      console.log('🏁 === FIRESTORE DEBUG - COMPLETE ===');
      console.log(`📦 Final: Fetched ${products.length} products`);
      return products;
    } catch (error) {
      console.error('💥 === FIRESTORE ERROR ===');
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error code:', error.code);
      console.error('Stack:', error.stack);
      return [];
    }
  }
};