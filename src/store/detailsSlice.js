import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAnaloguesAndPrices = createAsyncThunk(
  "details/fetchAnalogues",
  async ({ apiKey, number, brand }, { rejectWithValue }) => {
    try {
      const cleanNumber = encodeURIComponent(number.trim());
      const cleanBrand = encodeURIComponent(brand.trim());

      const response = await fetch(
        `/hs/hsprice/?key=${apiKey}&number=${cleanNumber}&brand=${cleanBrand}&analogues=on&info=on`,
      );

      if (!response.ok) {
        return rejectWithValue(`Ошибка сервера: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        return rejectWithValue(data.error);
      }

      if (!data.goods || data.goods.length === 0) {
        return [];
      }

      let allPositions = [];
      data.goods.forEach((item) => {
        allPositions.push(item);
        if (item.analogues && Array.isArray(item.analogues)) {
          allPositions.push(...item.analogues);
        }
      });

      return allPositions;
    } catch (err) {
      return rejectWithValue(
        `Ошибка сети, перезагрузите страницу: ${err.message}`,
      );
    }
  },
);

const detailsSlice = createSlice({
  name: "details",
  initialState: {
    selectedBrand: null,
    offers: [],
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedBrand: (state, action) => {
      state.selectedBrand = action.payload;
    },
    clearDetails: (state) => {
      state.selectedBrand = null;
      state.offers = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnaloguesAndPrices.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.offers = [];
      })
      .addCase(fetchAnaloguesAndPrices.fulfilled, (state, action) => {
        state.loading = false;
        state.offers = action.payload;
      })
      .addCase(fetchAnaloguesAndPrices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedBrand, clearDetails } = detailsSlice.actions;
export default detailsSlice.reducer;
