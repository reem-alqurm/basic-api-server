'use strict';

class Food {
    constructor() {
        this.id = 0;
        this.db = [

        ];
    }

    get(id) {
        if (id) {
            return this.db.find(record=> record.id === id);
        } else {
            return this.db;
        }
    }

    create(obj) {
        let record = {
            id: ++this.id,
            record: obj
        };
        this.db.push(record);
        return record;
    }

    update(id, obj) {
       for (let i=0; i< this.db.length; i++) {
           if (this.db[i].id == id) {
               this.db[i].record = obj;
               return this.db[i];
           }
       }
    }

    delete(id) {
        let deleted = false;
        this.db = this.db.filter((obj)=> {
            if (obj.id != id) {
                return true;
            } else {
                deleted = true;
                return false;
            }
        });
        return deleted;
    }
}

module.exports = Food;