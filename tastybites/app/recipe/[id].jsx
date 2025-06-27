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
    return <Text style={{ padding: 20 }}>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{recipe.title}</Text>

      <Text style={styles.sectionTitle}>Ingredients</Text>
      {recipe.ingredients?.map((item, index) => (
        <Text key={index} style={styles.textItem}>• {item}</Text>
      ))}

      <Text style={styles.sectionTitle}>Steps</Text>
      <Text style={styles.textItem}>{recipe.steps}</Text>

      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
