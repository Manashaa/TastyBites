import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import styles from '../../styles/HomeStyles';
import { Link } from 'expo-router';

// Reuse your existing recipes list
const recipes = [
  { id: '1', title: 'Avocado Toast', image: require('../../assets/images/Avocado01.jpeg'), category: 'Breakfast' },
  { id: '2', title: 'Chicken Rice Bowl', image: require('../../assets/images/Chicken01.jpeg'), category: 'Lunch' },
  { id: '3', title: 'Fruit Salad', image: require('../../assets/images/Fruit01.jpeg'), category: 'Healthy' },
  { id: '4', title: 'Chocolate Cake', image: require('../../assets/images/Cake01.jpeg'), category: 'Dessert' },
  { id: '5', title: 'Spicy Ramen', image: require('../../assets/images/Ramen01.jpeg'), category: 'Spicy' },
];

export default function Favorites() {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) loadFavorites();
  }, [isFocused]);

  const loadFavorites = async () => {
    try {
      const data = await AsyncStorage.getItem('favorites');
      if (data) setFavoriteIds(JSON.parse(data));
      else setFavoriteIds([]);
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const removeFavorite = async (id) => {
    const updatedFavorites = favoriteIds.filter((favId) => favId !== id);
    setFavoriteIds(updatedFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const favoriteRecipes = recipes.filter((item) => favoriteIds.includes(item.id));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>❤️ Your Favorites</Text>

      {favoriteRecipes.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 16, color: '#888' }}>
          You have no favorite recipes yet.
        </Text>
      ) : (
        <View style={styles.gridContainer}>
          {favoriteRecipes.map((item) => (
            <View key={item.id} style={styles.gridItem}>
              <Link href={`/recipe/${item.id}`} asChild>
                <TouchableOpacity>
                  <Image source={item.image} style={styles.gridImage} />
                  <Text style={styles.gridTitle}>{item.title}</Text>
                </TouchableOpacity>
              </Link>

              <TouchableOpacity
                onPress={() => removeFavorite(item.id)}
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: '#fff',
                  borderRadius: 20,
                  padding: 5,
                  elevation: 3,
                }}
              >
                <Text style={{ fontSize: 16 }}>❌</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
