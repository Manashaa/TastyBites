// Updated /app/recipe/[id].jsx to fetch recipe data from Firestore

import { useLocalSearchParams, useRouter } from 'expo-router'; 
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../../styles/RecipeStyles';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../utils/firebaseConfig';

export default function RecipePage() {
  const { id } = useLocalSearchParams();
  const router = useRouter(); 
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const docRef = doc(db, 'recipes', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRecipe(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <Text style={{ padding: 20, color: '#3d1520' }}>Loading...</Text>;
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: '#f5f2ef' }]}>
      <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
      <Text style={[styles.title, { color: '#3d1520' }]}>{recipe.title}</Text>

      <Text style={[styles.sectionTitle, { color: '#8d5535' }]}>Ingredients</Text>
      {recipe.ingredients?.map((item, index) => (
        <Text key={index} style={[styles.textItem, { color: '#3d1520' }]}>• {item}</Text>
      ))}

      <Text style={[styles.sectionTitle, { color: '#8d5535' }]}>Steps</Text>
      <Text style={[styles.textItem, { color: '#3d1520' }]}>{recipe.steps}</Text>

      <TouchableOpacity onPress={() => router.back()} style={[styles.backButton, { backgroundColor: '#ca8150' }]}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>← Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
