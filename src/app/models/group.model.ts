import { Dataset } from "./dataset.model"

export class Group {
    id: string
    name: string
    dataSet: Dataset[]

    constructor(id:string, name: string, dataset: Dataset[]){
        this.id = id
        this.name = name
        this.dataSet = dataset
    }
}
