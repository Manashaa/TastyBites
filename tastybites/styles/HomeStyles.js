// HomeStyles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },

  // Grid Styles
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor:'#996600',
  },
  
  gridItem: {
    width: '48%',
    backgroundColor: '#339966',
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
  },
});
