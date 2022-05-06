import React, { useState } from 'react';
import {
  createAsyncThunk,
  createSlice,
  configureStore,
  createSelector,
} from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Input, Loader, Form } from 'semantic-ui-react';

const selectUsers = (state) => state.users;
const selectLoading = (state) => state.users.loading;

const selectUsersList = createSelector(selectUsers, ({ data }) =>
  data.map((user) => ({
    id: user.login.uuid,
    firstName: user.name.first,
    lastName: user.name.last,
    city: user.location.city,
    country: user.location.country,
    email: user.email,
    avatar: user.picture.large,
  }))
);

const initialState = {
  data: [],
  loading: false,
};

const fetchRandomUsersApi = createAsyncThunk('random/fetch', async (count) => {
  const url = `https://randomuser.me/api/?results=${count}`;
  let users;
  try {
    users = await fetch(url).then((response) => response.json());
  } catch (error) {
    console.error(error);
  }
  return users.results;
});
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRandomUsersApi.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRandomUsersApi.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchRandomUsersApi.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
  },
});

const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
  },
});

function UsersList() {
  const usersList = useSelector(selectUsersList);
  const isLoading = useSelector(selectLoading);
  const [count, setCount] = useState();
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(fetchRandomUsersApi(+count));
    setCount('');
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Input
          focus
          value={count}
          onChange={(e) => setCount(e.target.value)}
          placeholder="Enter count of users to fetch"
          type="number"
          min={1}
          max={10}
          className="long__input"
        />
      </Form>
      <Loader active={isLoading}>Loading</Loader>
      {usersList.length > 0 && (
        <div className="users-list">
          {usersList.map((user) => (
            <div key={user.id} className="card">
              <img src={user.avatar} className="card__avatar" />
              <p className="card__name">
                {user.firstName} {user.lastName}
              </p>
              <p className="card__address">
                {user.city}, {user.country}
              </p>
              <p className="card__email">{user.email}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default function Thunk() {
  return (
    <Provider store={store}>
      <UsersList />
    </Provider>
  );
}
