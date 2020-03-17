
const Item = require('../models/item');


const getAllItems = async (req, res, next) => {

    try{

        const items = await Item.find()
                                .sort({date: -1});

        res.status(200).json({
            status: 'success',
            data: {
                items: items
            }
        })

    }catch(err){
        console.log(err);

        res.status(400).json({
            status: 'fail',
            error: err
        });
    }


}



const createItem = async (req, res, next) => {

    try{

        const newItem = new Item({
            name: req.body.name,
            date: req.body.date
        });

        await newItem.save();

        res.status(201).json({
            status: 'success',
            data: {
                newItem: newItem
            }
        })
        

    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        })
    }

}


const deleteItem = async (req, res, next) => {

    const id = req.params.id;

    try{

        const item = await Item.findByIdAndDelete(id);
        if (!item){
            return res.status(404).json({
                status: 'fail',
                error: 'No items found'
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'Item successfully deleted'
        });

    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        })
    }
}


module.exports = {
    getAllItems: getAllItems,
    createItem: createItem,
    deleteItem: deleteItem
}