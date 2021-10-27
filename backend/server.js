require("dotenv").config();
const PORT = process.env.PORT;
const app = require("./app");
const cors = require("cors");

app.use(
    cors({
        origin: "*",
    })
);

const server = app.listen(PORT, () => {
    console.log(`Serving @${PORT}`);
});
