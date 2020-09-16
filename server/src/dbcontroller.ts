import * as path from "path";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

export interface IData {
    ID: number,
    product: string,
    time: number,
    sales: number
}

export class DAO {
    db: sqlite3.Database;

    constructor(dbFilePath: string) {
        this.db = new sqlite3.Database(dbFilePath);
    }

    /*
     * Retrieves all data from given database 
     * Must be in format of IData interface
     */
    public getData(table: string): Promise<IData[]> {
        return new Promise((resolve, reject) => {
            this.db.all("SELECT * FROM " + table, [], (err, rows) => {
                if (err) {
                    reject(err);
                }
                if (rows) {
                    let dataList: IData[] = [];
                    rows.forEach((row) => {
                        let data: IData = {
                            ID: row.id,
                            product: row.product,
                            time: row.time,
                            sales: row.sales
                        };
                        dataList.push(data);
                    });
                    resolve(dataList);
                }
                reject();
            });
        });
    }

    /*
     * Retrieves all tables on database
     */
    public listTables(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            this.db.all("SELECT * from sqlite_master where type='table'", (err, rows) => {
                if (err) {
                    reject(err);
                }
                if (rows) {
                    let tableList: string[] = [];
                    rows.forEach((row) => {
                        tableList.push(row.name);
                    });
                    resolve(tableList);
                }
                reject();
            });
        });
    }

    public initialize(): void {
        let list: string[] = [];
        list.push("INSERT INTO rawdata (ID, product, time, sales) VALUES (1, 'kleenex', 0, 100)");
        list.push("INSERT INTO rawdata (ID, product, time, sales) VALUES (2, 'wet wipes', 10, 50)");
        list.push("INSERT INTO rawdata (ID, product, time, sales) VALUES (3, 'huggies', 20, 20)");
        list.push("INSERT INTO rawdata (ID, product, time, sales) VALUES (4, 'scott', 30, 35)");
        list.push("INSERT INTO rawdata (ID, product, time, sales) VALUES (5, 'paper towel', 40, 110)");
        this.db.serialize(() => this.db.run("CREATE TABLE rawdata (ID INTEGER, product TEXT, time INTEGER, sales INTEGER)"));
        for (let sql of list) {
            this.db.run(sql);
        }
    }

    public delete(): void {
        this.db.run("DROP TABLE rawdata");
    }
}