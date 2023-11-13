import { $authHost, $host } from "./index";

//genre
export const createGenre = async (name, description) => {
  const { data } = await $authHost.post("api/genre", { name, description });
  return data;
};

export const getGenre = async () => {
  const { data } = await $host.get("api/genre");
  return data;
};

export const getGenreDescription = async (name) => {
  const { data } = await $host.get(`api/genre/description/${name}`);
  return data;
};

//autors
export const createAutor = async ({ first_name, last_name }) => {
  const { data } = await $authHost.post("api/autor", { first_name, last_name });
  return data;
};

export const getAutors = async () => {
  const { data } = await $host.get("api/autor");
  return data;
};

export const deleteAutors = async (id) => {
  const { data } = await $authHost.post("api/autor/", { id });
  return data;
};

//books
export const getBooks = async () => {
  const { data } = await $host.get("api/books");
  return data;
};

export const getBookOneId = async (id) => {
  const { data } = await $host.get(`api/books/${id}`);
  return data;
};

//rate
//comments
export const getCommentsBook = async (bookId) => {
  const { data } = await $host.get(`api/comments/comment/${bookId}`);
  return data;
};

export const createComments = async ({ comment, userId, bookId }) => {
  try {
    const { data } = await $host.post("api/comments/", {
      comment,
      userId,
      bookId,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add comment");
  }
};

//basket

export const getBasketIdByUserId = async ({ userId }) => {
  try {
    const { data } = await $host.get(`api/basket/byUser/${userId}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add comment");
  }
};

export const createBasketBook = async ({ basketId, bookId }) => {
  try {
    const { data } = await $host.post("api/basket/create/", {
      basketId,
      bookId,
    });
    console.log("успешное добавление");
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add comment");
  }
};

export const getBasketBooksByUserId = async (userId) => {
  try {
    const { data } = await $host.get(`api/basket/basketbooks/${userId}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed getBasketBooksByUserId");
  }
};

export const increaseCount = async (bookId) => {
  try {
    if (bookId > 0) {
      const { data } = await $host.get(
        `api/basket/basketbooks/increaseCount/${bookId}`
      );
      return data;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed +1");
  }
};

export const decreaseCount = async (bookId) => {
  try {
    const { data } = await $host.get(
      `api/basket/basketbooks/decreaseCount/${bookId}`
    );
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed -1");
  }
};

export const deleteBasketBooksByUserByBook = async ({basketId, bookId}) => {
  try {
    const { data } = await $host.delete("api/basket/deleteBasketBooksByUserByBook/", {
  params: { basketId: basketId, bookId: bookId }
});
    return data;
  } catch (error) {
    console.error("error" + error);
    throw new Error("Failed delete book");
  }
};


