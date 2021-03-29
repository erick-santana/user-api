const { MONGO_PASS, MONGO_DATABASE } = process.env;

export const dbConnection = {
  url: `mongodb+srv://erick:${MONGO_PASS}@cluster0.w0yeb.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
};
