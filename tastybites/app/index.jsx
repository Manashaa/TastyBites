import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

const recipes = [
  {
    id: 'no.001',
    title: 'Avocado Toast',
    image: require('../assets/images/Avocado01.jpeg'),
    ingredients: ['Avocado', 'Bread', 'Salt', 'Pepper'],
    steps: [
      'Toast the bread slices.',
      'Mash the avocado with salt and pepper.',
      'Spread on toasted bread and serve.',
    ],
  },
  {
    id: 'no.002',
    title: 'Chicken Rice Bowl',
    image: require('../assets/images/Chicken01.jpeg'),
    ingredients: ['Chicken Breast', 'Rice', 'Soy Sauce'],
    steps: [
      'Cook rice and set aside.',
      'Stir-fry chicken with soy sauce.',
      'Combine and serve hot.',
    ],
  },
  {
    id: 'no.oo3',
    title: 'Pasta Alfredo',
    image: require('../assets/images/Pasta01.jpeg'),
    ingredients: ['Pasta', 'Cream', 'Cheese'],
    steps: [
      'Boil pasta.',
      'Cook cream sauce with cheese.',
      'Mix together and enjoy.',
    ],
  },
];

export default function Home() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-3xl font-bold text-center mb-2">🍽️ TastyBites</Text>
      <Text className="text-base text-gray-500 text-center mb-4">
        Your recipe app starts here!
      </Text>

      {recipes.map((recipe) => (
        <Link href={`/recipe/${recipe.id}`} key={recipe.id} asChild>
          <TouchableOpacity className="mb-4 bg-gray-100 rounded-xl overflow-hidden shadow">
            <Image
              source={recipe.image}
              className="w-full h-48"
              resizeMode="cover"
            />
            <View className="p-3">
              <Text className="text-xl font-semibold">{recipe.title}</Text>
              <Text className="text-gray-500">{recipe.ingredients.join(', ')}</Text>
            </View>
          </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
  );
}
