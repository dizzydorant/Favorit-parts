import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = import.meta.env.DEV
  ? "/hs/hsprice/"
  : "https://favorit-parts.ru";

export const fetchBrandsByNumber = createAsyncThunk(
  "search/fetchBrands",
  async ({ apiKey, number }, { rejectWithValue }) => {
    try {
      const cleanNumber = encodeURIComponent(number.trim());
      const response = await fetch(
        `${BASE_URL}?key=${apiKey}&number=${cleanNumber}`,
      );

      if (!response.ok) {
        return rejectWithValue(`Ошибка сервера: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        return rejectWithValue(data.error);
      }

      if (
        !data.goods ||
        data.goods.length === 0 ||
        (data.goods.length === 1 && !data.goods[0].brand)
      ) {
        return [];
      }

      return data.goods;
    } catch (err) {
      return rejectWithValue(
        `Ошибка сети, перезагрузите страницу: ${err.message}`,
      );
    }
  },
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    apiKey: "00000000-0000-0000-0000-000000000001",
    number: "",
    brands: [],
    loading: false,
    error: null,
  },
  reducers: {
    setApiKey: (state, action) => {
      state.apiKey = action.payload;
    },
    setSearchNumber: (state, action) => {
      state.number = action.payload;
    },
    clearSearch: (state) => {
      state.brands = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrandsByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.brands = [];
      })
      .addCase(fetchBrandsByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })
      .addCase(fetchBrandsByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setApiKey, setSearchNumber, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
