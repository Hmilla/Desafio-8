const {SQLite} = require('../db/db')

class Chat{
    constructor(connectionSQLite, table) {
        this.connectionDB = connectionSQLite;
        this.table = table;
    };

    async createDBChat() {
        try {
            const tableExist = await this.connectionDB.schema.hasTable(this.table);

            if(!tableExist) {
                await this.connectionDB.schema.createTable(this.table, productsTable => {
                    productsTable.increments('id').unique().notNullable().primary()
                    productsTable.string('mail', 80).notNullable()
                    productsTable.string('message', 200).notNullable()
                    productsTable.string('date',24).notNullable()
                });

                console.log('Table Created');
            };

        } catch (err) {
            console.log(err)
        };
    };

    async insertMessage(message) {
        try {
            await this.connectionDB(this.table).insert(message);
            console.log('Message inserted')

        } catch (err) {
            console.log(err)
        };
    };

    async getMessages() {
        try {
            return await this.connectionDB(this.table).select('*');
        } catch (err) {
            console.log(err)
        };
    };

    async updateProduct(id, data) {
        try {
            const message = data;
            message.id = id;
            await this.connectionDB(this.table).where({ id }).update(data);
        } catch (err) {
            console.log(err)
        };
    };

    async deleteMessage(id) {
        try {
            await this.connectionDB(this.table).where({ id }).del();
        } catch (err) {
            console.log(err)
        };
    };
}

module.exports = new Chat(SQLite, 'chat')