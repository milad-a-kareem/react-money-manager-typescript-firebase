class Cost {
    id:string
    constructor(public title:string, public costAmount:number, public date:string){
        this.id = Math.round(Math.random()*10000000000).toString()
    }
}

export default Cost