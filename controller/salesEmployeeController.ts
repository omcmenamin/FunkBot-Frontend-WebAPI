import { Application } from "express-serve-static-core";
import { SalesEmployee } from "../model/salesEmployee";
import { Request, Response } from "express";
import session = require("express-session");

const salesEmployeeService = require('../service/salesEmployeeService')

module.exports = function(app: Application){

    app.get('/salesEmployees', async (req: Request, res: Response) => {
        let data = [];

        try{
            data = await salesEmployeeService.getSalesEmployee()
        } catch(e){
            console.error(e);
        }
        console.log(data)
        res.render('list-sales-Employees', {SalesEmployees: data})

    })

    app.get('/salesEmployees/:id', async(req: Request, res: Response) => {
        let data: SalesEmployee;

        try{
            data = await salesEmployeeService.getSalesEmployeeById(req.params.id)

            console.log(data.SalesEmployeeID)
        }catch(e) {
            console.error(e);
        }

        res.render('view-sales-employees', {SalesEmployee: data})

    })

    app.get('/add-salesEmployee', async (req: Request, res: Response) => {
        res.render('add-salesEmployee')
    })

    app.post('/salesEmployees', async (req:Request, res: Response) => {
        let data: SalesEmployee = req.body
        let id: Number

       

        try{
            id = await salesEmployeeService.createSalesEmployee(data)


            res.redirect('/view-sales-employees/' + id)



        } catch(e) {
            console.error(e);

            res.locals.errormessage = e.message

            res.render('add-salesEmployee', req.body);
        }

    })
}