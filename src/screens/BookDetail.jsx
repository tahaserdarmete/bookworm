import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect } from 'react';
import { Edit, Trash } from 'iconsax-react-nativejs';
import { useDispatch } from 'react-redux';
import { deleteBook } from '../redux/slices/bookSlice';

const BookDetail = ({ navigation, route }) => {
  const { id, title, author, image, genre, year } = route.params.item;

  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      title,
    });
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.imgContainer}>
        <Image source={{ uri: image }} style={styles.img} resizeMode="cover" />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => {
              dispatch(deleteBook(id));
              navigation.goBack();
            }}
          >
            <Trash color="red" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Edit color="orange" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Yıl:</Text>
          <Text style={styles.fieldValue}>{year}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Yazar:</Text>
          <Text style={styles.fieldValue}>{author}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Tür:</Text>
          <Text style={styles.fieldValue}>{genre}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default BookDetail;

const styles = StyleSheet.create({
  img: {
    width: '70%',
    height: '250',
    marginVertical: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.4)',
  },
  imgContainer: {
    borderBottomWidth: 10,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center',
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  field: {
    flexDirection: 'row',
    gap: 3,
    justifyContent: 'start',
    padding: 30,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.3)',
  },
  fieldLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: 'rgba(0,0,0,0.6)',
  },
  fieldValue: {
    fontSize: 18,
    fontWeight: '400',
    color: 'rgba(0,0,0,1)',
    textAlign: 'right',
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 40,
    marginBottom: 20,
  },
});
