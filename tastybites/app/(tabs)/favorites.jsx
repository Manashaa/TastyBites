import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { Link } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../utils/firebaseConfig';
import styles from '../../styles/HomeStyles'; // Use your updated styled HomeStyles or replace inline

export default function Favorites() {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadFavorites();
      fetchRecipes();
    }
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

  const fetchRecipes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'recipes'));
      const firebaseData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllRecipes(firebaseData);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const removeFavorite = async (id) => {
    const updatedFavorites = favoriteIds.filter((favId) => favId !== id);
    setFavoriteIds(updatedFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const favoriteRecipes = allRecipes.filter((item) => favoriteIds.includes(item.id));

  return (
    <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: '#f5f2ef', flexGrow: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#3d1520' }}>
        ❤️ Your Favorites
      </Text>

      {favoriteRecipes.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 16, color: '#8d5535' }}>
          You have no favorite recipes yet.
        </Text>
      ) : (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {favoriteRecipes.map((item) => (
            <View
              key={item.id}
              style={{
                width: '48%',
                backgroundColor: '#fff',
                marginBottom: 15,
                borderRadius: 10,
                overflow: 'hidden',
                elevation: 3,
              }}
            >
              <Link href={`/recipe/${item.id}`} asChild>
                <TouchableOpacity>
                  <Image
                    source={item.imageUrl ? { uri: item.imageUrl } : require('../../assets/images/default.jpg')}
                    style={{ width: '100%', height: 120, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                  />
                  <Text
                    style={{
                      fontWeight: 'bold',
                      padding: 10,
                      color: '#3d1520',
                      fontSize: 16,
                    }}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              </Link>

              <TouchableOpacity
                onPress={() => removeFavorite(item.id)}
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: '#f5f2ef',
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
