import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../redux/slices/bookSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreatePage = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      title: 'Kitap Ekle',
    });
  }, []);

  const dispatch = useDispatch();

  const [name, setName] = useState();
  const [year, setYear] = useState();
  const [genre, setGenre] = useState();
  const [author, setAuthor] = useState();

  const handleSubmit = async () => {
    try {
      const uploadItem = {
        title: name,
        year,
        genre,
        author,
        id: Date.now(),
        image: 'https://picsum.photos/200',
      };

      // async storage' den gelen books verisini al vs Js formatına çevir,  eğer yoksa da boş dizi olarak al
      let books = await AsyncStorage.getItem('books');

      books = books ? JSON.parse(books) : [];

      // bu async storage' den gelen books verisine yukarıda oluşan kitabı ekle
      books = [...books, uploadItem];

      // sonrasında async storeage' deki veriyi güncelle
      await AsyncStorage.setItem('books', JSON.stringify(books));

      dispatch(addBook(uploadItem));

      Alert.alert('Başarılı', 'Kitabı başarıyla yayınladınız.');

      navigation.goBack();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 8 }}>
        <View>
          <Text style={styles.label}>İsim</Text>
          <TextInput
            style={styles.input}
            placeholder="Kitap ismi giriniz..."
            onChangeText={setName}
            value={name}
          ></TextInput>
        </View>

        <View>
          <Text style={styles.label}>Tür</Text>
          <TextInput
            style={styles.input}
            placeholder="Kitap türü giriniz..."
            onChangeText={setGenre}
            value={genre}
          ></TextInput>
        </View>

        <View>
          <Text style={styles.label}>Yıl</Text>
          <TextInput
            style={styles.input}
            placeholder="Kitap yılı giriniz..."
            onChangeText={setYear}
            value={year}
          ></TextInput>
        </View>

        <View>
          <Text style={styles.label}>Yazar</Text>
          <TextInput
            style={styles.input}
            placeholder="Kitap yazarını giriniz..."
            onChangeText={setAuthor}
            value={author}
          ></TextInput>
        </View>
      </View>

      <View style={{ flex: 2 }}>
        <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
          <Text style={styles.buttonText}>Kitabı Yayınla</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreatePage;

const styles = StyleSheet.create({
  label: {
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 5,
    fontSize: 16,
  },
  input: {
    marginHorizontal: 30,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  button: {
    marginHorizontal: 'auto',
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: 'rgba(50,150,250)',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 700,
  },
});
