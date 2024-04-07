const itemsModel = require('../Models/ItemsModel');
const itemsValidation = require("../Utils/ItemsValidation")

const getAllItems = async (req, res) => {
    try 
    {
        const allItems = await itemsModel.find();
        return res.json(allItems);
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

const getItemByID = async (req, res) => {
    try 
    {
        const itemID = req.params.id;
        const foundItem = await itemsModel.findById(itemID);
        if (!foundItem) 
        {
            return res.status(404).json({ message: 'Item not found' });
        }
        return res.json(foundItem);
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

const createNewItem = async (req, res) => {
    try 
    {
        const itemData = new itemsModel(req.body);
        // console.log(itemData);
        if(itemsValidation(itemData))
        {
            await itemData.save();
            return res.status(201).json({ success: "Item saved successfully" });
        } else {
            // console.log(itemsValidation.errors[0]);
            return res.json(`${itemsValidation.errors[0].message}`)
        }
    } catch (err) {
        return res.status(400).json({ error: `Cannot save this item: ${err.message}` });
    }
}

const updateItemByID = async (req, res) => {
    try 
    {
        const itemID = req.params.id;
        if(itemsValidation(itemData))
        {
            const updatedItem = await itemsModel.findByIdAndUpdate(itemID, req.body, { new: true });
            if (!updatedItem) 
            {
                return res.status(404).json({ message: 'Item not found' });
            }
            return res.json({ success: "Item updated successfully" });
        } else {
            return res.json(`${itemsValidation.errors[0].message}`)
        }
    } catch (err) {
        return res.status(400).json({ error: `Cannot update this item: ${err.message}` });
    }
}

const deleteItemByID = async (req, res) => {
    try 
    {
        const itemID = req.params.id;
        const deletedItem = await itemsModel.findByIdAndDelete(itemID);
        if (!deletedItem) 
        {
            return res.status(404).json({ message: 'Item not found' });
        }
        return res.json({ success: "Item deleted successfully" });
    } catch (err) {
        return res.status(400).json({ error: `Cannot delete this item: ${err.message}` });
    }
}

module.exports = {
    getAllItems,
    getItemByID,
    createNewItem,
    updateItemByID,
    deleteItemByID
}
