module.exports = (app) => {
    app.use((req, res, next) => {
        // middleware will run whenever requested page is not available
        res.status(404).render("not-found");
    });

    app.use((err, req, res, next) => {
        console.error("ERROR", req.method, req.path, err);

        // only render if the error ocurred before sending the response
        if(!res.headerSent) {
            res.status(500).render("error");
        }
    });
};