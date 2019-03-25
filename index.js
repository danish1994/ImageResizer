const app = require('express')();
const PORT = 3000;

const Jimp = require('jimp');

app.all('*', (req, res) => {
    let {query: {url, width, height, quality}} = req;
    if (url) {
        if (width || height || quality) {
            Jimp.read(url)
                .then((image) => {
                    width = Number(width);
                    if (isNaN(width)) {
                        width = undefined;
                    }

                    height = Number(height);
                    if (isNaN(height)) {
                        height = undefined;
                    }

                    image.resize(width || Jimp.AUTO, height || Jimp.AUTO);
                    if (quality) {
                        image.quality(quality);
                    }

                    image.getBufferAsync(Jimp.AUTO)
                        .then((data) => {
                            res.end(data);
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                })
                .catch((err) => {
                    res.end(err.message);
                });
        } else {
            res.end();
        }
    } else {
        res.end();
    }
});

app.listen(PORT, () => {
    console.log('Listening on: ', PORT)
})
