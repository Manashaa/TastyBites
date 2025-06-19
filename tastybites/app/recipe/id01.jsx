import { useLocalSearchParams } from 'expo-router';
import { View, Text, Image, ScrollView } from 'react-native';

const recipes = [
  {
    id: 'no.001',
    title: 'Avocado Toast',
    image: require('../../assets/images/Avocado01.jpeg'),
    ingredients: ['Avocado', 'Bread', 'Salt', 'Pepper'],
    steps: [
      'Toast the bread slices.',
      'Mash the avocado with salt and pepper.',
      'Spread on toasted bread and serve.'
    ],
  },
  {
    id: 'no.002',
    title: 'Chicken Rice Bowl',
    image: require('../../assets/images/Chicken01.jpeg'),
    ingredients: ['Chicken Breast', 'Rice', 'Soy Sauce'],
    steps: [
      'Cook rice and set aside.',
      'Stir-fry chicken with soy sauce.',
      'Combine and serve hot.'
    ],
  },
  {
    id: 'no.003',
    title: 'Pasta Alfredo',
    image: require('../../assets/images/Pasta01.jpeg'),
    ingredients: ['Pasta', 'Cream', 'Cheese'],
    steps: [
      'Boil pasta.',
      'Cook cream sauce with cheese.',
      'Mix together and enjoy.'
    ],
  },
];

export default function RecipePage() {
  const { id } = useLocalSearchParams();
  const recipe = recipes.find(item => item.id === id);

  if (!recipe) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg text-red-500">Recipe not found!</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      <Image source={recipe.image} className="w-full h-60 rounded-xl mb-4" />
      
      <Text className="text-3xl font-bold text-orange-700 mb-2">{recipe.title}</Text>

      <Text className="text-lg font-semibold mb-1 text-gray-800">🧂 Ingredients:</Text>
      {recipe.ingredients.map((item, index) => (
        <Text key={index} className="text-base text-gray-600">• {item}</Text>
      ))}

      <Text className="text-lg font-semibold mt-4 mb-1 text-gray-800">📋 Steps:</Text>
      {recipe.steps.map((step, index) => (
        <Text key={index} className="text-base text-gray-600">{index + 1}. {step}</Text>
      ))}
    </ScrollView>
  );
}
