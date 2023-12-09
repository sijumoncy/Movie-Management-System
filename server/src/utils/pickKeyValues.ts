export const pickKeyValues = (object:{[key:string]:any}, keys:string[]) => {
    return keys.reduce((accObj:{[key:string]:any}, key:string) => {
        if(object && Object.prototype.hasOwnProperty.call(object, key)){
            accObj[key] = object[key]
        }
        return accObj
    }, {})
}