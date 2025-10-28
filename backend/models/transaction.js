import mongoose from 'mongoose';
const incomeCategories = [
    'Salary',
    'Freelance',
    'Business',
    'Investments',
    'Interest',
    'Gift',
    'Bonus',
    'Other'
];

const expenseCategories = [
    'Food',
    'Transport',
    'Entertainment',
    'Shopping',
    'Bills',
    'Health',
    'Education',
    'Other'
];
 
const transactionSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required :true,
    },
    title:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true, 
    },
    category: {
        type: String,
        required: true,
        validate: {
        validator: function (value) { 
            let type = this.type; 
            if (!type && this.getUpdate) {
                const update = this.getUpdate();
                type = update.type || update.$set?.type;
            }
            
            if (type === 'income') {
                return incomeCategories.includes(value);
            } else if (type === 'expense') {
                return expenseCategories.includes(value);
            }
            return false;
        },
        message: props => `${props.value} is not a valid category`
    }
    },
    date:{
        type:Date,
        required:true,
        default:Date.now
    },
    type:{
        type:String,
        enum:['income','expense'],
        required:true,
    },
},{
    timestamps:true
})

transactionSchema.index({user:1,date:-1})

export const Transaction = mongoose.model('Transaction',transactionSchema)