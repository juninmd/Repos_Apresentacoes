const { createApp } = require('./src/app');

const port = process.env.PORT || 8050;
const app = createApp();

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
