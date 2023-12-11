import axios from "../api/axios"

export const deleteMovie = async (token:string, movieId:string) => {
    const resposne :{error:boolean, success:boolean , data: unknown} 
    = {error:false, success:true , data: null}
    try{
        const resposneAPi = await axios.delete(`/movies/${movieId}`,{
            headers: {'Content-Type':'application/json', 
                Authorization : `bearer ${token}`},
            withCredentials:true
            
          })
        console.log({resposneAPi});
        resposne.data = resposneAPi.data.data
        return resposne
    } catch (err) {
        resposne.error = true
        resposne.success = false
        resposne.data = undefined
        return resposne
    }
}