const oredersModel = require('../Models/OrdersModel');
const orederValidation = require("../Utils/OredersValidation");

let getAllorders = async (req, res) => {
    try 
    {
        let allorders = await oredersModel.find();
        return res.json(allorders);
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

let getorderByID = async (req, res) => {
    try 
    {
        let orderID = req.params.id;
        let foundorder = await oredersModel.findById(orderID);
        if (!foundorder) 
        {
            return res.status(404).json({ message: 'order not found' });
        }
        return res.json(foundorder);
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

let createNeworder = async (req, res) => {
    try 
    {
        let orderData = new oredersModel(req.body);
        if(orederValidation(orderData))
        {
            await orderData.save();
            return res.status(201).json({ success: "order saved successfully" });
        } else {
            return res.json(`${orederValidation.errors[0].message}`)
        }
    } catch (err) {
        return res.status(400).json({ error: `Cannot save this order: ${err.message}` });
    }
}

let updateorderByID = async (req, res) => {
    try 
    {
        let orderID = req.params.id;
        if(orederValidation(req.body))
        {
            let updatedorder = await oredersModel.findByIdAndUpdate(orderID, req.body, { new: true });
            if (!updatedorder) 
            {
                return res.status(404).json({ message: 'order not found' });
            }
            return res.json({ success: "order updated successfully" });
        } else {
            return res.json(`${orederValidation.errors[0].message}`)
        }
    } catch (err) {
        return res.status(400).json({ error: `Cannot update this order: ${err.message}` });
    }
}

let deleteorderByID = async (req, res) => {
    try 
    {
        let orderID = req.params.id;
        let deletedorder = await oredersModel.findByIdAndDelete(orderID);
        if (!deletedorder) 
        {
            return res.status(404).json({ message: 'order not found' });
        }
        return res.json({ success: "order deleted successfully" });
    } catch (err) {
        return res.status(400).json({ error: `Cannot delete this order: ${err.message}` });
    }
}

module.exports = {
    getAllorders,
    getorderByID,
    createNeworder,
    updateorderByID,
    deleteorderByID
}
