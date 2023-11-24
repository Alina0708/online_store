import { $authHost, $host } from "./index";

//genre
export const createGenre = async (name, description) => {
  const { data } = await $authHost.post("api/genre/", { name, description });
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

export const deleteGenre = async ({id}) => {
  try{
    console.log("id", {id})
  const { data } = await $authHost.delete(`api/genre/${ id }`, );
  return data;
}catch(e){
  console.log("error", e )
}
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

export const deleteAutors = async ({id}) => {
  try{
    console.log("id", {id})
  const { data } = await $authHost.delete(`api/autor/${ id }`, );
  return data;
}catch(e){
  console.log("error", e )
}
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

export const getOrderBook = async () => {
  try {
    const { data } = await $host.get("api/order/orderbook/");
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed getBasketBooks");
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

export const deleteBasketBooksByUserByBook = async ({ basketId, bookId }) => {
  try {
    const { data } = await $host.delete(
      "api/basket/deleteBasketBooksByUserByBook/",
      {
        params: { basketId: basketId, bookId: bookId },
      }
    );
    return data;
  } catch (error) {
    console.error("error" + error);
    throw new Error("Failed delete book");
  }
};

//order
export const getOrders = async () => {
  try{
  const { data } = await $host.get("api/order/");
  return data;
}catch(e){
  console.log("error");
}
}; 

export const createOrder = async ({ userId, commonPrice }) => {
  try {
    const { data } = await $host.post("api/order/", { userId, commonPrice });
    return data;
  } catch (error) {
    console.error("error" + error);
    throw new Error("Failed create order");
  }
};

export const delOrderAndOrderBooks = async ({orderId}) => {
  try {
    const { data } = await $host.delete("api/order/deleteorderandorderbook", { data: {orderId} });
    return data;
  } catch (error) {
    console.error("error" + error);
    throw new Error("Failed delete orderBooks and order");
  }
};

//orderBooks
export const createOrderBook = async ({ orderId, bookId, count }) => {
  try {
    const { data } = await $host.post("api/order/orderbook/", { orderId, bookId, count });
    return data;
  } catch (error) {
    console.error("error" + error);
    throw new Error("Failed create orderBook");
  }
};

export const getOrderBookByUserId = async ({ userId}) => {
  try {
    const { data } = await $host.get(`api/order/orderbook/${userId}`,);
    return data;
  } catch (error) {
    console.error("error" + error);
    throw new Error("Failed create orderBook");
  }
};

export const getHistoryOrders = async ({ userId}) => {
  try {
    const { data } = await $host.get(`api/order/orderbook/history/${userId}`,);
    return data;
  } catch (error) {
    console.error("error" + error);
    throw new Error("Failed history");
  }
};

//BasketBooks
export const deleteBasketBookByUser = async ({basketId}) => {
  try {
    const { data } = await $host.delete("api/basket/basketbooks/deletebasket/", { data: { basketId } });
    return data;
  } catch (error) {
    console.error("error" + error);
    throw new Error("Failed delete basketBooks by user");
  }
};


//status
export const getStatusNameById = async ({ id}) => {
  try {
    const { data } = await $host.get(`api/status/name/${id}`,);
    return data;
  } catch (error) {
    console.error("error" + error);
    throw new Error("Failed status");
  }
};

export const changeOrderStatusOnPaid = async ({orderId}) => {
  try {
    const { data } = await $host.put('api/status/paid/',  { orderId } );
    return data;
  } catch (error) {
    console.error("error" + error);
    throw new Error("Failed status paid");
  }
};

//serach
export const findBooksByAuthorOrName = async ({bookOrAuthor}) => {
  try {
    const { data } = await $host.put("api/books/search/",  { bookOrAuthor } );
    return data;
  } catch (error) {
    console.log("This book not found");
  }
};

//rate
export const createRate = async ({ rate, userId, bookId }) => {
  try {
    const { data } = await $host.post("api/rate/",  { rate, userId, bookId } );
    return data;
  } catch (error) {
    console.log("This book not found");
  }
};

export const getRateByUser = async ({ userId, bookId }) => {
  try {
    console.log("api", userId, bookId)
    const { data } = await $host.get(`api/rate/userrate?userId=${userId}&bookId=${bookId}`);
    return data;
  } catch (error) {
    console.log("This rate not found");
  }
};