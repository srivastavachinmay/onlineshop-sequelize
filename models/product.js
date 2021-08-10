const fs = require('fs')
const path = require('path')

const products = []
module.exports = class Product {
    constructor(title) {
        this.title = title
    }


    save() {
        // products.push(this)
        const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json')
        fs.readFile(p, (err, filecontent) => {
            let products = []
            if (!err) {
                products = JSON.parse(JSON.stringify(fileContent));
            }
            products.push(this)
            console.log(filecontent)
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err)
            })
        });
    }

    static fetchAll(callback) {
        const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json')

        fs.readFile(p, (err, fileContent) => {
            if (err) {
                console.log(err)
                callback([]);
            }
            callback(JSON.parse(JSON.stringify(fileContent)))

        })
    }
}

