const server = require("./server");
const port = 3001;

server.listen(port || process.env.PORT, () => {
  console.log(`Backend is running on port ${port || process.env.PORT}`);
});
