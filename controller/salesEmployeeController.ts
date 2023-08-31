import { Application } from "express-serve-static-core";
import { SalesEmployee } from "../model/salesEmployee";
import { Request, Response } from "express";
import session = require("express-session");
import { responseEncoding } from "axios";

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
            data = await salesEmployeeService.getProductById(req.params.id)

            console.log(data.SalesEmployeeID)
        }catch(e) {
            console.error(e);
        }

        res.render('view-salesemployee', {SalesEmployee: data})

    })

    app.get('/add-salesemployee', async (req: Request, res: Response) => {
        res.render('add-product')
    })

    app.post('/add-salesemployee', async (req:Request, res: Response) => {
        let data: SalesEmployee = req.body
        let id: Number

        try{
            id = await salesEmployeeService.createProduct(data)

            res.redirect('/salesemployee/' + id)

        } catch(e) {
            console.error(e);

            res.locals.errormessage = e.message

            res.render('add-product', req.body);
        }

    })
}