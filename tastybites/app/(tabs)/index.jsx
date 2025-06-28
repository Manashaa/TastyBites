import { View, Text, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles/HomeStyles';
import Header from '../../components/Header';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../utils/firebaseConfig';
import Animated, { FadeIn } from 'react-native-reanimated';

// Define your categories here
const categories = ['All', 'Breakfast', 'Lunch', 'Dessert', 'Healthy', 'Spicy'];

// 💡 Reusable CategoryButton Component
function CategoryButton({ label, isSelected, onPress }) {
  return (
    <Animated.View entering={FadeIn}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: isSelected ? '#ca8150' : '#8d5535',
          paddingVertical: 6,
          paddingHorizontal: 14,
          borderRadius: 20,
          marginHorizontal: 5,
          maxWidth: 120,
          flexShrink: 1,
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 14,
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const data = await AsyncStorage.getItem('favorites');
      if (data) setFavoriteIds(JSON.parse(data));
    };
    loadFavorites();
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'recipes'));
        const firebaseData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRecipes(firebaseData);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
    fetchRecipes();
  }, []);

  const toggleFavorite = async (id) => {
    const updated = favoriteIds.includes(id)
      ? favoriteIds.filter((favId) => favId !== id)
      : [...favoriteIds, id];
    setFavoriteIds(updated);
    await AsyncStorage.setItem('favorites', JSON.stringify(updated));
  };

  const filteredRecipes = recipes.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <ScrollView contentContainerStyle={{ backgroundColor: '#f5f2ef', flexGrow: 1, paddingBottom: 20 }}>
      <Header />

      {/* Search */}
      <TextInput
        placeholder="Search recipes..."
        placeholderTextColor="#8d5535"
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
          color: '#3d1520',
        }}
      />

      {/* Category Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 10 }}
        contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 4 }}
      >
        {categories.map((cat) => (
          <CategoryButton
            key={cat}
            label={cat}
            isSelected={selectedCategory === cat}
            onPress={() => setSelectedCategory(cat)}
          />
        ))}
      </ScrollView>

      {/* Recipe Grid */}
      <View style={[styles.gridContainer, { marginTop: 4 }]}>
        {filteredRecipes.map((item) => (
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
                <Text style={[styles.gridTitle, { color: '#3d1520' }]}>{item.title}</Text>
              </TouchableOpacity>
            </Link>
            <TouchableOpacity
              onPress={() => toggleFavorite(item.id)}
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                backgroundColor: '#f5f2ef',
                borderRadius: 20,
                padding: 5,
                elevation: 2,
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
  );
}
