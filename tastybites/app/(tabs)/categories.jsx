import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../utils/firebaseConfig';
import styles from '../../styles/HomeStyles';
import { Link } from 'expo-router';

export default function CategoryPage() {
  const { category } = useLocalSearchParams();
  const [recipes, setRecipes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'recipes'));
        const firebaseData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        const filtered = firebaseData.filter(item => item.category === category);
        setRecipes(filtered);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, [category]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{category} Recipes</Text>

      {recipes.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20, color: '#777' }}>
          No recipes found for this category.
        </Text>
      ) : (
        <View style={styles.gridContainer}>
          {recipes.map((item) => (
            <View key={item.id} style={styles.gridItem}>
              <Link href={`/recipe/${item.id}`} asChild>
                <TouchableOpacity>
                  <Image
                    source={
                      item.imageUrl
                        ? { uri: item.imageUrl }
                        : require('../../assets/images/default.jpg')
                    }
                    style={styles.gridImage}
                  />
                  <Text style={styles.gridTitle}>{item.title}</Text>
                </TouchableOpacity>
              </Link>
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity
        onPress={() => router.back()}
        style={{ alignSelf: 'center', marginVertical: 20 }}
      >
        <Text style={{ color: '#f39c12', fontWeight: 'bold' }}>← Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
