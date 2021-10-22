import { Dataset } from "./dataset.model"

export class Group {
    id: string
    name: string
    dataset: Dataset[] = []

    constructor(id:string, name: string){
        this.id = id
        this.name = name
    }
}
