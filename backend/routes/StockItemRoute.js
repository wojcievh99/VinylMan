import express from 'express';
import { StockItem } from '../modules/StockItemModel.js';

    const StockItemRoute = express.Router(); // produkt
    
    StockItemRoute.get('/', async (req, res) => {
        try {
            const stockItems = await StockItem.find();
    
            return res.status(200).json({
                count: stockItems.length,
                data: stockItems,
            });
        } catch (error) {
            console.error(error.message);
            return res.status(500).send({ message: error.message })
        }
    });
    
    StockItemRoute.get('/:id', async (req, res) => {
        try {
    
            const { id } = req.params;
    
            const SI = await StockItem.findById(id);
    
            if (!SI) {
                return res.status(404).json({ message: 'Item not found.' });
            }
    
            return res.status(200).json(SI);
        } catch (error) {
            console.error(error.message);
            return res.status(500).send({ message: error.message })
        }
    });

    export default StockItemRoute;