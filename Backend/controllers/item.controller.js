import Item from  '../models/Item.model.js'
import cloudinary, { uploadOnCloudinary } from '../utils/cloudinary.js'


//Item creation logic for the Admin
const createitem = async(req ,res)=>{
    const {title ,description ,stock , price , category } = req.body;
    const imageurl = req.file?.path;
    try {
        if(!title || !price || !category){
            return res.status(400).json({message:"Invalid item data"})
        }
        const result = await uploadOnCloudinary(imageurl);
        console.log(result);
        const item = new Item({
            title ,
            description,
            category,
            price,
            stock,
            imageurl : result.secure_url
        })
        await item.save();

        if(!item){
            return res.status(400).json({message:"Item was not created "})
        }
        return res.status(201).json({message:"Item created Successfull", data:item});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"Error in Item Creation " , error:error.message});
    }
}

//Deletion logic for the Admin
const deleteitem = async(req , res)=>{
    const {id} = req.params;
    try {
        const deleteditem = await Item.findByIdAndDelete({_id:id});
        if(!deleteditem){
            return res.status(400).json({message:"Could Not delete item"})
        }
        return res.status(200).json({message:"Item Deleted Successfully"});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"Error in Item Deletion" , error:error.message});
    }
}

//Filtering logic for Customers or Admin
const filteritem = async(req,res)=>{
    try {
    const { category, minPrice, maxPrice } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);

    const items = await Item.find(filter);
    return res.status(200).json({ items });
  } catch (error) {
    console.error("Get Items Error:", error);
    return res.status(500).json({ message: "Error fetching items", error: error.message });
  }
}

//Updation of any item to be done by the Admin
const updateitem = async(req,res)=>{
    const {id} = req.params;
    const updateData = {...req.body};
    try {
        if(!id){
            return res.status(400).json({message:"Invalid Item Id"})
        }
        if(req.file){
            const result_url = await uploadOnCloudinary(req.file.path)
            updateData.imageurl = result_url.secure_url;
        }
        const updatedItem = await Item.findByIdAndUpdate(id,updateData ,{new:true});

        if(!updatedItem){
            return res.status(400).json({message:"Could Not Update the item"})
        }
        return res.status(200).json({message:"Item Updated Successfully" , data:updatedItem});
    } catch (error) {
         console.error("Get Items Error:", error);
    return res.status(500).json({ message: "Error Updating item", error: error.message });
    }
 }

export {
    createitem,
    deleteitem,
    updateitem,
    filteritem
}