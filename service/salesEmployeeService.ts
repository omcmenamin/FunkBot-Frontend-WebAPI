import { SalesEmployee } from "../model/salesEmployee";
const axios = require('axios');

module.exports.getSalesEmployee= async function () {

    try {
        const response = await axios.get('http://localhost:8080/api/orders')

        return response.data
    } catch (e){
        return new Error('Could not get orders')
    }
}

module.exports.getSalesEmployeeById = async function (id: number): Promise<SalesEmployee> {
    try{
        const response = await axios.get('http://localhost:8080/api/order/' + id)
    
        return response.data
    }catch(e){
        throw new Error ('Could not get order')
    }
}