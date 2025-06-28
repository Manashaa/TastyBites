import { View, Text, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles/HomeStyles';
import Header from '../../components/Header';
import { LinearGradient } from 'expo-linear-gradient';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../utils/firebaseConfig';

const categories = ['All', 'Breakfast', 'Lunch', 'Dessert', 'Healthy', 'Spicy'];

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
    <LinearGradient colors={['#000', '#222']} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Header />

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

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 10, paddingHorizontal: 8 }}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setSelectedCategory(cat)}
              style={{
                backgroundColor: selectedCategory === cat ? '#f39c12' : '#444',
                paddingVertical: 6,
                paddingHorizontal: 12,
                borderRadius: 20,
                marginHorizontal: 5,
              }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.gridContainer}>
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
