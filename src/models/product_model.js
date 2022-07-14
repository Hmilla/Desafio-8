
const {MariaDB} = require('../db/db')

class Producto{
    constructor(connectionMariaDB, table) {
        this.connectionDB = connectionMariaDB;
        this.table = table;
    };

    async createDBProducts() {
        try {
            const tableExist = await this.connectionDB.schema.hasTable(this.table);

            if(!tableExist) {
                await this.connectionDB.schema.createTable(this.table, productsTable => {
                    productsTable.increments('id').unique().notNullable().primary()
                    productsTable.string('title', 50).notNullable()
                    productsTable.float('price').notNullable()
                    productsTable.string('thumbnail').notNullable()
                });

                console.log('Table Created');
            };
        } catch (err) {
            console.log(err)
        };
    };

    async insertProduct(product) {
        try {
            await this.connectionDB(this.table).insert(product);
            console.log('Product inserted')

        } catch (err) {
            console.log(err)
        };
    };

    async getProducts() {
        try {
            return await this.connectionDB(this.table).select('*');
        } catch (err) {
            console.log(err)
        };
    };

    async updateProduct(id, data) {
        try {
            const product = data;
            product.id = id;
            await this.connectionDB(this.table).where({ id }).update(data);
        } catch (err) {
            console.log(err)
        };
    };

    async deleteProduct(id) {
        try {
            await this.connectionDB(this.table).where({ id }).del();
        } catch (err) {
            console.log(err)
        };
    };
}

module.exports = new Producto(MariaDB, 'products')