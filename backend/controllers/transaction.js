import { Transaction } from "../models/transaction.js";



export const getAllTransatcion = async (req, res) => {
  try { 
    const transactions = await Transaction.find({ user: req.user._id })
      .sort({ date: -1 });  

    res.json({ transactions });  
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getTransactionStat = async(req,res)=>{
    try{
        const transactions = await Transaction.find({user:req.user._id});
        const incomeTotal = transactions
            .filter(t=>t.type=='income')
            .reduce((sum,t)=>sum+t.amount,0);
        const expenseTotal = transactions
            .filter(t=>t.type=='expense')
            .reduce((sum,t)=>sum+t.amount,0);  
        
        const balance = incomeTotal - expenseTotal;
        const categoryStats = transactions.reduce((acc,t)=>{
            if (!t || !t.type || !t.category) return acc;
            if(!acc[t.category]) acc[t.category] = {income:0,expense:0};
            acc[t.category][t.type]+=t.amount;
            return acc;
        },{});
        const monthlyData = transactions.reduce((acc,t)=>{
            if (!t || !t.type || !t.category) return acc;
            const month = new Date(t.date).toLocaleDateString('en-Us',{
                month:'short',
                year:'numeric'
            })
            
            if(!acc[month]) acc[month] = {income:0,expense:0};
            acc[month][t.type] +=t.amount;
            return  acc;
        },{});
        res.json({
            incomeTotal,
            expenseTotal,
            balance,
            count:transactions.length,
            categoryStats,
            monthlyData
        })
    }catch(error){
        res.status(500).json({message:'Server error',error:error.message});
    }
}

export const getSingleTransaction = async(req,res)=>{
    try{
        const transaction = await Transaction.findOne({
            _id:req.params.id,
            user:req.user._id
        });
        if(!expense){
            res.status(404).json({message:'Transaction not fountd'});
        }
        res.json(transaction)
    }catch(error){
        res.status(500).json({message:'Server error',error:error.message});
    } 
} 

export const createTransaction  = async(req,res)=>{
    try{
        console.log(req.body)
        const {title,amount,category,date,type} = req.body;
        if(!title || !amount || !category){
            return res.status(400).json({message:'Fields missing'});
        }
        const transaction = new Transaction({
            user:req.user._id,
            title,
            amount,
            category,
            date:date || Date.now(),
            type,
        })
        await transaction.save();
        console.log(transaction)
        res.status(200).json(transaction);
    }catch(error){
        res.status(500).json({message:'Server error',error:error.message});
    } 
}

export const updateTranaction = async(req,res)=>{
    try{
        console.log(req.body)
        const {title,amount,category,date,type} = req.body 
        console.log(type)
        const transaction = await Transaction.findOneAndUpdate(
            {_id:req.params.id,user:req.user._id},
            {title,amount,category,date,type},
            {new:true,runValidators:true}
        )
        if(!transaction){
            return res.status(400).json({message:'Transaction not found'});
        } 
        res.json(transaction)
    }catch(error){
        res.status(500).json({message:'Server error',error:error.message});
    } 
}

export const deleteTransaction = async(req,res)=>{
    try{
        const transaction = await Transaction.findOneAndDelete({
            _id:req.params.id,
            user:req.user._id
        })
        if(!transaction){
            return res.status(400).json({message:'Transaction not found'});
        }
        res.json({message:'Transaction deleted'});
    }catch(error){
        res.status(500).json({message:'Server error',error:error.message});
    } 
}