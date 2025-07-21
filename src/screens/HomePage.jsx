import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card';
import { pages } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setBooks } from '../redux/slices/bookSlice';

const HomePage = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      title: 'Ana Sayfa',
    });
  }, []);

  const dispatch = useDispatch();

  const books = useSelector(state => state.books);

  useEffect(() => {
    const loadBooks = async () => {
      // await AsyncStorage.clear();

      const data = await AsyncStorage.getItem('books');
      const books = JSON.parse(data) || [];

      console.log(books);
      dispatch(setBooks(books));
    };

    // sayfa ilk yüklendiğinde yerel depolamamızda tutulan kitaplarımızı getir.
    loadBooks();
  }, []);

  const { CREATEPAGE } = pages;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate(CREATEPAGE)}
        >
          <Text style={{ color: 'white' }}>Yeni Kitap Ekle</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        {books.length > 0 ? (
          <FlatList
            data={books}
            renderItem={({ item }) => <Card item={item} />}
            contentContainerStyle={styles.cardContainer}
            numColumns={2}
          />
        ) : (
          <Text style={{ textAlign: 'center', fontSize: 20, marginTop: 50 }}>
            Üzgünüz, hiç kitap bulunamadı.
          </Text>
        )}
      </View>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'rgb(50,150,255)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
    borderRadius: 5,
  },
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
