// HomeStyles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f2ef', // Soft neutral background
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#3d1520', // Deep wine text
  },

  // Grid Styles
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 8,
    gap: 12,
  },
  
  gridItem: {
    width: '48%',
    backgroundColor: '#ca8150', // Light terracotta
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
  },
  gridImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  gridTitle: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3d1520', // Main text color
  },
});
