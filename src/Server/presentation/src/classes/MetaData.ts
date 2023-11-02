import { TableData, ColumnData } from "./Interfaces.ts";


export default class MetaData {
    _table: TableData;
    _columns: ColumnData[];

    constructor(tableData: TableData, columnData: ColumnData[]) {
        this._table = tableData;
        this._columns = columnData;
    }     


    get tableData() {
        return this._table;
    }

    get columnData() {
        return this._columns
    }

    toggleSelect(attr: string, value: boolean) {
        let index: number = this._columns.findIndex((column) => column.name === attr);

    
        if(index != -1)
            this._columns[index].selected = value
    }

    setLoaded(attrsToPull) {
        for(let col of this._columns) {
            if(attrsToPull.includes(col.name)) {
                col.loaded = true;
            }
        }
    }

    dataToPull() {
        let attrsToPull: string[] = []

        for(let attr of this._columns) {
            if(attr.selected && !attr.loaded)
                attrsToPull.push(attr.name)
        } 

        return attrsToPull
    }
}