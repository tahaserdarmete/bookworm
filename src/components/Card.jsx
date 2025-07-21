import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { pages } from '../constants';

const Card = ({ item }) => {
  const navigation = useNavigation();

  const { BOOKDETAIL } = pages;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate(BOOKDETAIL, { item })}
    >
      <View style={styles.imgContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.img}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardSubtitle}>{item.year}</Text>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    padding: 15,
    backgroundColor: '#ddd',
    borderRadius: 8,
  },
  cardContainer: {
    padding: 10,
  },
  imgContainer: {
    width: '100%',
  },
  img: {
    width: '100%',
    height: 170,
    borderRadius: 10,
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
  },
  cardSubtitle: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10,
    color: 'gray',
  },
});
