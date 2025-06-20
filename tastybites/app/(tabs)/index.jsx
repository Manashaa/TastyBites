import { View, Text, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles/HomeStyles';
import Header from '../../components/Header';
import { LinearGradient } from 'expo-linear-gradient';

const categories = ['All', 'Breakfast', 'Lunch', 'Dessert', 'Healthy', 'Spicy'];

const recipes = [
  { id: '1', title: 'Avocado Toast', image: require('../../assets/images/Avocado01.jpeg'), category: 'Breakfast' },
  { id: '2', title: 'Chicken Rice Bowl', image: require('../../assets/images/Chicken01.jpeg'), category: 'Lunch' },
  { id: '3', title: 'Fruit Salad', image: require('../../assets/images/Fruit01.jpeg'), category: 'Healthy' },
  { id: '4', title: 'Chocolate Cake', image: require('../../assets/images/Cake01.jpeg'), category: 'Dessert' },
  { id: '5', title: 'Spicy Ramen', image: require('../../assets/images/Ramen01.jpeg'), category: 'Spicy' },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [favoriteIds, setFavoriteIds] = useState([]);

  // Load favorites from AsyncStorage
  useEffect(() => {
    const loadFavorites = async () => {
      const data = await AsyncStorage.getItem('favorites');
      if (data) setFavoriteIds(JSON.parse(data));
    };
    loadFavorites();
  }, []);

  // Toggle favorite state
  const toggleFavorite = async (id) => {
    const updated = favoriteIds.includes(id)
      ? favoriteIds.filter((favId) => favId !== id)
      : [...favoriteIds, id];
    setFavoriteIds(updated);
    await AsyncStorage.setItem('favorites', JSON.stringify(updated));
  };

  const filteredRecipes = recipes.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <LinearGradient colors={['#fff', '#f0f0f0']} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Header />

        {/*Search Bar */}
        <TextInput
          placeholder="Search recipes..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          style={{
            padding: 10,
            backgroundColor: '#fff',
            borderRadius: 10,
            marginHorizontal: 16,
            marginTop: 10,
            marginBottom: 5,
            elevation: 2,
          }}
        />

        {/* Category Scroll */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 10, paddingHorizontal: 8 }}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setSelectedCategory(cat)}
              style={{
                backgroundColor: selectedCategory === cat ? '#f39c12' : '#eee',
                paddingVertical: 6,
                paddingHorizontal: 12,
                borderRadius: 20,
                marginHorizontal: 5,
              }}
            >
              <Text style={{ color: selectedCategory === cat ? '#fff' : '#333', fontWeight: 'bold' }}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Recipe Cards */}
        <View style={styles.gridContainer}>
          {filteredRecipes.map((item) => (
            <View key={item.id} style={styles.gridItem}>
              <Link href={`/recipe/${item.id}`} asChild>
                <TouchableOpacity>
                  <Image source={item.image} style={styles.gridImage} />
                  <Text style={styles.gridTitle}>{item.title}</Text>
                </TouchableOpacity>
              </Link>
              <TouchableOpacity
                onPress={() => toggleFavorite(item.id)}
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  backgroundColor: 'rgba(255,255,255,0.7)',
                  borderRadius: 20,
                  padding: 5,
                }}
              >
                <Text style={{ fontSize: 18 }}>
                  {favoriteIds.includes(item.id) ? '❤️' : '🤍'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
