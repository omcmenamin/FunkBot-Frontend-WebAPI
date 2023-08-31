import { SalesEmployee } from "../model/salesEmployee";
const axios = require('axios');

module.exports.getSalesEmployee= async function () {

    try {
        const response = await axios.get('http://localhost:8080/api/salesEmployees')

        return response.data
    } catch (e){
        return new Error('Could not get Sales Employee')
    }
}

module.exports.getSalesEmployeeById = async function (id: number): Promise<SalesEmployee> {
    try{
        const response = await axios.get('http://localhost:8080/api/salesEmployees/' + id)
    
        return response.data
    }catch(e){
        throw new Error ('Could not get Sales Employee')
    }
}

module.exports.createSalesEmployee = async function (SalesEmployee:SalesEmployee): Promise<number> { 
    
     try{
         const response = await axios.post('http://localhost:8080/api/salesEmployees', SalesEmployee)
 
         return response.data
     } catch(e){
         console.log(e)
         throw new Error('Could not create Sales Employee')
     }
 }