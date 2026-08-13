import userModel from "../../models/user.model.mjs";
import dbConnect from "../../dbConnect.js";
import dishModel from "../../models/dish.model.mjs";
import messageModel from "../../models/message.model.mjs";
import employeeModel from "../../models/employee.model.mjs";
import ingredientModel from "../../models/ingredient.model.mjs";
import categoryModel from "../../models/category.model.mjs";
import orderModel from "../../models/order.model.mjs";

/*

    Create new User

*/
export const seedUser = async (user) => {
   
    console.log('-- User --')
    console.log(user);
    console.log('--\n')

    await dbConnect();

    try {

        user.picture = process.env.SERVER_HOST + user.picture;
        let newUser = await userModel.create(user);

        return newUser
    } catch (error) {
        console.log(error)
    }

}

/*

    Create new Dish

*/
export const seedDish = async (dish) => {
   
    console.log('-- Dish --')
    console.log(dish);
    console.log('--\n')

    await dbConnect();

    try {

        dish.image = process.env.SERVER_HOST + dish.image;
        let newDish = await dishModel.create(dish);

        return newDish
    } catch (error) {
        console.log(error)
    }

}

/*

    Create new Message

*/
export const seedMessage = async (message) => {
   
    console.log('-- Message --')
    console.log(message);
    console.log('--\n')

    await dbConnect();

    try {

        let newMessage = await messageModel.create(message);
        return newMessage;

    } catch (error) {
        console.log(error)
    }

}

/*

    Create new Employee

*/
export const seedEmployee = async (employee) => {
   
    console.log('-- Employee --')
    console.log(employee);
    console.log('--\n')

    await dbConnect();

    try {
        employee.image = process.env.SERVER_HOST + employee.image;
        let newEmployee = await employeeModel.create(employee);
        return newEmployee;

    } catch (error) {
        console.log(error)
    }

}

/*

    Create new Ingredient

*/
export const seedIngredient = async (ingredient) => {
   
    console.log('-- Ingredient --')
    console.log(ingredient);
    console.log('--\n')

    await dbConnect();

    try {

        let newIngredient = await ingredientModel.create(ingredient);
        return newIngredient;

    } catch (error) {
        console.log(error)
    }

}


/*

    Create new Category

*/
export const seedCategory = async (category) => {
   
    console.log('-- Category --')
    console.log(category);
    console.log('--\n')

    await dbConnect();

    try {
        category.image = process.env.SERVER_HOST + category.image;
        let newCategory = await categoryModel.create(category);
        return newCategory;

    } catch (error) {
        console.log(error)
    }

}



/*

    Create new Order

*/
export const seedOrder = async (order) => {
   
    console.log('-- Order --')
    console.log(order);
    console.log('--\n')

    await dbConnect();

    try {
        
        let newOrder = await orderModel.create(order);
        return newOrder;

    } catch (error) {
        console.log(error)
    }

}
