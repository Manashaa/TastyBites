import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import Header from '../components/Header'; 

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
    id: 'no.003',
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
    
    <ScrollView className="flex-1 bg-white px-4 py-6">
      <Text className="text-3xl font-bold text-center text-orange-600 mb-6">
        🍽️ TastyBites
      </Text>

      {recipes.map((item) => (
        <Link href={`/recipe/${item.id}`} asChild key={item.id}>
          <TouchableOpacity className="mb-6 bg-white rounded-xl shadow-lg">
            <Image source={item.image} className="w-full h-48 rounded-t-xl" />
            <View className="p-4">
              <Text className="text-xl font-bold text-gray-800">{item.title}</Text>
            </View>
          </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
  );
  <Header />
}
