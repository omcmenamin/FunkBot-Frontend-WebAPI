import { Application, Request, Response } from "express";
import { DeliveryEmployee } from "../model/deliveryEmployee";

const session = require ('express');
const deliveryEmployeeService = require('../service/deliveryEmployeeService');

module.exports = function(app: Application){
    app.get('/delivery-employees', async(req:Request, res: Response)=> {

        let data: DeliveryEmployee[] = []

        try{
            data = await deliveryEmployeeService.getDeliveryEmployees()
        }catch (e) {
            console.error(e);
        }
        res.render('list-delivery-employees', {deliveryEmployees: data})
    })

    app.get('/delivery-employees/:id', async (req: Request, res: Response)=> {
        let data: DeliveryEmployee 

        try{
            data = await deliveryEmployeeService.getDeliveryEmployeesById(req.params.id)
            res.render('view-delivery-employee', {deliveryEmployee: data})

        }catch (e) {
            console.error(e);
        }
        res.render('view-delivery-employee')

    })

    app.get('/add-delivery-employee', async (req:Request, res: Response)=>{
        res.render('add-delivery-employee')
    })

    app.post('/add-delivery-employee', async (req:Request, res: Response)=>{
        let data: DeliveryEmployee = req.body
        let id: Number

        try{
            id= await deliveryEmployeeService.createDeliveryEmployee(data)

            res.redirect('/delivery-employees/' +id)
        }catch (e) {
            console.error(e);

            res.locals.errormessage = e.message

            res.render('add-delivery-employee', req.body)
        }

    })
}