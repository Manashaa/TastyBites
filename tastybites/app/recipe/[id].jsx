import { useLocalSearchParams, useRouter } from 'expo-router'; 
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../../styles/RecipeStyles';

const recipeData = {
  '1': {
    title: 'Avocado Toast',
    image: require('../../assets/images/Avocado01.jpeg'),
    ingredients: ['Avocado', 'Bread', 'Salt', 'Pepper'],
    steps: ['Toast bread', 'Mash avocado', 'Spread on toast'],
  },
  '2': {
    title: 'Chicken Rice Bowl',
    image: require('../../assets/images/Chicken01.jpeg'),
    ingredients: ['Chicken', 'Rice', 'Soy Sauce'],
    steps: ['Cook rice', 'Grill chicken', 'Mix together'],
  },
};

export default function RecipePage() {
  const { id } = useLocalSearchParams();
  const router = useRouter(); 
  const recipe = recipeData[id];

  return (
    <ScrollView style={styles.container}>


   
      <Image source={recipe.image} style={styles.image} />
      <Text style={styles.title}>{recipe.title}</Text>

      <Text style={styles.sectionTitle}>Ingredients</Text>
      {recipe.ingredients.map((item, index) => (
        <Text key={index} style={styles.textItem}>• {item}</Text>
      ))}

      <Text style={styles.sectionTitle}>Steps</Text>
      {recipe.steps.map((step, index) => (
        <Text key={index} style={styles.textItem}>{index + 1}. {step}</Text>
      ))}

            {/*  Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      
    </ScrollView>
  );
}
