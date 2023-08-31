const axios = require('axios');
import { DeliveryEmployee } from "../model/deliveryEmployee";
const API_BASE_URL: string='http://localhost:8080/api'


module.exports.getDeliveryEmployees = async function(): Promise<DeliveryEmployee[]>{
    try{
        const response =await axios.get('http://localhost:8080/api/deliveryEmployees')
        
        return response.data
    }catch (e) {
        throw new Error('Could not get Delivery Employees')
    }
}

module.exports.getDeliveryEmployeesById = async function (id: number): Promise<DeliveryEmployee> {
    try{
        const response =await axios.get('http://localhost:8080/api/deliveryEmployees/' + id)
    
        return response.data
    }catch (e) {
        throw new Error('Could not get Delivery Employees')
    }
    
}
module.exports.createDeliveryEmployee = async function (deliveryEmployee: DeliveryEmployee): Promise<number>{
    try{ 
        const response = await axios.post('http://localhost:8080/api/deliveryEmployees', deliveryEmployee)

        return response.data
    } catch(e){
        throw new Error('Could not create Delivery Employee')
    }
}
