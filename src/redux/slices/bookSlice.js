import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      try {
        const item = {
          ...action.payload,
        };

        // en sonunda da state' e (geçici hafızaya) pushla.
        state.push(item);
      } catch (err) {
        console.error(err);
      }
    },
    deleteBook: (state, action) => {
      state = state.filter(book => book.id != action.payload);
      return state;
    },
    updateBook: (state, action) => {
      const { id, book } = action.payload;

      const index = state.findIndex(book => book.id == id);

      if (index !== -1) {
        state[index] = { ...state[index], ...book };
        console.log('Güncelleme başarıyla yapıldı.');
      }
      return state;
    },

    setBooks: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

// export reducer
export default bookSlice.reducer;

// export actions
export const { addBook, deleteBook, updateBook, setBooks } = bookSlice.actions;
