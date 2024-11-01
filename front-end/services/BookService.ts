const getAllBooks = async () => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/books', {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
  
};
  
const BookService = {
    getAllBooks,
};
  
export default BookService;
  