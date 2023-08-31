import { Application } from "express-serve-static-core";
import { SalesEmployee } from "../model/salesEmployee";
import { Request, Response } from "express";
import session = require("express-session");

const salesEmployeeService = require('../service/salesEmployeeService')

module.exports = function(app: Application){

    app.get('/salesEmployee', async (req: Request, res: Response) => {
        let data = [];

        try{
            data = await salesEmployeeService.getsalesEmployee()
        } catch(e){
            console.error(e);
        }

        res.render('list-salesEmployee', {salesEmployee: data})

    })

    app.get('/salesEmployee/:id', async(req: Request, res: Response) => {
        let data: SalesEmployee;

        try{
            data = await salesEmployeeService.getSalesEmployeeById(req.params.id)

            console.log(data.SalesEmployeeID)
        }catch(e) {
            console.error(e);
        }

        res.render('view-salesemployee', {SalesEmployee: data})

    })

    app.get('/add-salesemployee', async (req: Request, res: Response) => {
        res.render('add-salesEmployee')
    })

    app.post('/add-salesemployee', async (req:Request, res: Response) => {
        let data: SalesEmployee = req.body
        let id: Number

        try{
            id = await salesEmployeeService.createSalesEmployee(data)

            res.redirect('/salesemployee/' + id)

        } catch(e) {
            console.error(e);

            res.locals.errormessage = e.message

            res.render('add-salesEmployee', req.body);
        }

    })
}