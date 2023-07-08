const app = require ("./app");

// The port where the app to have access to it  
const PORT = process.env.PORT || 3000;

app.listen (PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});