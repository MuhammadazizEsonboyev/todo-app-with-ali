import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { loadState } from "./storage"
import axios, { AxiosError } from "axios"
import { PREFIX } from "../helpers/Api"

export const JWT_PERSISTANT_STATE = "userData"

const initialState = {
  jwt: loadState(JWT_PERSISTANT_STATE)?.jwt ?? null
}

export const login = createAsyncThunk("user/login", async params => {
  try {
    const { data } = await axios.post(`${PREFIX}/auth/login`, {
      email: params.email,
      password: params.password
    })
    return data
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data.message)
    }
  }
})

export const register = createAsyncThunk("user/register", async params => {
  try {
    const { data } = await axios.post(`${PREFIX}/auth/register`, {
      email: params.email,
      password: params.password,
      name: params.name
    })
    return data
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data.message)
    }
  }
})

export const getProfile = createAsyncThunk(
  "task/get",
  async (_, thunkApi) => {
    const jwt = thunkApi.getState().user.jwt
    const { data } = await axios.get(`${PREFIX}/task/get`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    return data
  }
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: state => {
      state.jwt = null
    },
    clearLoginError: state => {
      state.loginErrorMessage = undefined
    },
    clearRegisterError: state => {
      state.registerErrorMessage = undefined
    }
  },
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action) => {
      if (!action.payload) {
        return
      }
      state.jwt = action.payload.access_token
    })
    builder.addCase(login.rejected, (state, action) => {
      state.loginErrorMessage = action.error.message
    })

    builder.addCase(getProfile.fulfilled, (state, action) => {
      console.log("PROFILE =============== ", action)
      state.profile = action.payload
    })

    builder.addCase(register.fulfilled, (state, action) => {
      if (!action.payload) {
        return
      }
      state.jwt = action.payload.access_token
    })
    builder.addCase(register.rejected, (state, action) => {
      state.registerErrorMessage = action.error.message
    })
  }
})

export default userSlice.reducer
export const userActions = userSlice.actions
