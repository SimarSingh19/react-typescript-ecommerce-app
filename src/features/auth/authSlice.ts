import getApiErrorMessage from "../../utils/getApiErrorMessage";

import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";

import { loginAPI, fetchUserAPI, fetchAllUserDataAPI, } from "./authAPI";

import type { AuthUser, LoginCredentials, } from "../../types/auth";

type AuthState = {
  token: string | null;
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  allUserData: AuthUser[] | null;
};

const getToken = (): string | null => {
  try {
    const token = localStorage.getItem("token");
    return token ? token : null;
  } catch {
    return null;
  }
}
const getSavedUser = (): AuthUser | null => {
  try {
    const savedUser = localStorage.getItem("user");
    return savedUser ? (JSON.parse(savedUser) as AuthUser) : null;
  } catch {
    return null;
  }
};
const getSavedAllUsers = (): AuthUser[] | null => {
  try {
    const savedUsers = localStorage.getItem("allUser");
    return savedUsers ? (JSON.parse(savedUsers) as AuthUser[]) : null;
  } catch {
    return null;
  }
};

const initialState: AuthState = {
  token: getToken(),
  user: getSavedUser(),
  loading: false,
  error: null,
  allUserData: getSavedAllUsers(),
};

export const loginUser = createAsyncThunk<string,LoginCredentials,{rejectValue: string;}>("auth/loginUser", async (userData,thunkAPI) => {
      try {
        const token = await loginAPI(userData);
        return token;
      } catch (error) { 
          return thunkAPI.rejectWithValue(
            getApiErrorMessage(error, "Invalid Credentials 😵")
          );
        }
      }
    );
export const fetchUser = createAsyncThunk<AuthUser,void,{rejectValue: string;}>("auth/fetchUser", async ( _, thunkAPI) => {
      try {
        const user = await fetchUserAPI();
        return user;
      } catch (error) { 
          return thunkAPI.rejectWithValue(
            getApiErrorMessage(error, "Failed to fetch user 😵")
          );
        }
      }
    );

export const fetchAllUserData = createAsyncThunk<AuthUser[],void,{rejectValue: string;}>("auth/fetchAllUserData", async ( _, thunkAPI) => {
      try {
        const alluser = await fetchAllUserDataAPI();
        return alluser;
      } catch (error) { 
          return thunkAPI.rejectWithValue(
            getApiErrorMessage(error, "Failed to fetch users 😵")
          );
        }
      }
    );

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("allUser");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(loginUser.fulfilled,(state, action) => {
          state.loading = false;
          state.token = action.payload;
          localStorage.setItem("token", action.payload);
        }
      )
      .addCase(loginUser.rejected,(state, action) => {
          state.loading = false;
          state.error = action.payload || "Failed to login";
          state.user = null;
          state.token = null;
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      )
      .addCase(fetchUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(fetchUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
          localStorage.setItem("user", JSON.stringify(action.payload));
        }
      )

      // .addCase(fetchUser.fulfilled, (state, action) => {
      //   state.loading = false;
      //   const userWithRole = {...action.payload, role: action.payload.username === "emilys" ? "admin" : "user"};
      //   state.user = userWithRole;
      //   localStorage.setItem("user", JSON.stringify(userWithRole));
      // })

      .addCase(fetchUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch user";
          state.user = null;
          localStorage.removeItem("user");
        }
      )

      .addCase(fetchAllUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      
      .addCase(fetchAllUserData.fulfilled, (state, action) => {
          state.loading = false;
          state.allUserData = action.payload;
          localStorage.setItem("allUser", JSON.stringify(action.payload));
        }
      )

      .addCase(fetchAllUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch user 😵";
      });
      
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;