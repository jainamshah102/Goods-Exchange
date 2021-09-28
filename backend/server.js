require("dotenv").config();
const PORT = process.env.PORT;
const app = require("./app");
const cors = require("cors");

app.use(
    cors({
        origin: "*",
    })
);

app.listen(PORT, () => {
    console.log(`Serving @${PORT}`);
});
