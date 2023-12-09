// generate min-max query object for fields : expect i/p as {"fieldName" : {min:val , max:val}}
interface IminMaxObj {
    min?:number;
    max?:number
}

interface IminMaxField {
    [key:string]: IminMaxObj
}

export const generateMinMaxDbQuery = (compareInpObject:IminMaxField) => {

    try{
        const query:any = {}

        Object.entries(compareInpObject).forEach((fieldName:any, valObj:any) => {
            query[fieldName] = {}
            if(valObj.min !== undefined) {
                query[fieldName].$gte = valObj.min
            }
            if(valObj.max !== undefined) {
                query[fieldName].$lte = valObj.max
            }
        })

        return query
    } catch(err:any){
        throw new Error(err)
    }
}