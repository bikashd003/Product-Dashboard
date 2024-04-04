import Product from "../Models/Products.model.js";
import axios from "axios";

const saveProducts = async (req, res) => {
    try {
        const response = await axios.get(
            "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
        );
        const products = response.data;

        // Insert products into the database
        await Product.insertMany(products);

        res.status(200).json({ message: "Products saved successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



const getTransactions = async (req, res) => {
    const { search, page = 1, limit = 10, month } = req.query;
    try {
        const skip = (page - 1) * limit;

        let query = {};
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ];
            const parsedSearch = parseFloat(search);
            if (!isNaN(parsedSearch)) {
                query.$or.push({ price: parsedSearch });
            }
        }
        if (month) {
            const pipeline = [
                {
                    $addFields: {
                        month: { $month: "$dateOfSale" },
                    }
                },
                {
                    $match: {
                        month: parseInt(month)
                    }
                }
            ];

            const result = await Product.aggregate(pipeline);
            const ids = result.map(item => item._id);
            query._id = { $in: ids };
        }
        const transactions = await Product.find(query)
            .skip(skip)
            .limit(limit)
            .lean();
        const totalCount = await Product.countDocuments(query);
        const totalPages = Math.ceil(totalCount / limit);

        res.status(200).json({
            transactions,
            totalCount,
            totalPages,
            currentPage: page,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
//create a getStatics controller where - Total sale amount of selected month - Total number of sold items of selected month - Total number of not sold items of selected month
const getStatistics = async (req, res) => {

    try {

        const { month } = req.query;

        const pipeline = [
            {
                $addFields: {
                    month: { $month: "$dateOfSale" }
                }
            },
            {
                $match: {
                    month: parseInt(month)
                }
            },
            {
                $group: {
                    _id: null,
                    totalSaleAmount: { $sum: "$price" },
                    totalSoldItems: { $sum: { $cond: [{ $eq: ["$sold", true] }, 1, 0] } },
                    totalNotSoldItems: { $sum: { $cond: [{ $eq: ["$sold", false] }, 1, 0] } }
                }
            },
            {
                $project: {
                    _id: 0
                }
            }
        ];

        // Execute the aggregation pipeline
        const result = await Product.aggregate(pipeline);
        res.status(200).json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}



const getPieChartData = async (req, res) => {
    try {
        const { month } = req.query;

        const pipeline = [
            {
                $addFields: {
                    month: { $month: "$dateOfSale" }
                }
            },
            {
                $match: {
                    month: parseInt(month)
                }
            },
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id",
                    count: 1
                }
            }
        ];

        const result = await Product.aggregate(pipeline);

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



const getBarChartData = async (req, res) => {
    try {
        const { month } = req.query;

        const pipeline = [
            {
                $addFields: {
                    month: { $month: "$dateOfSale" }
                }
            },
            {
                $match: {
                    month: parseInt(month)
                }
            },
            {
                $group: {
                    _id: {
                        $switch: {
                            branches: [
                                { case: { $and: [{ $gte: ["$price", 0] }, { $lte: ["$price", 100] }] }, then: "0 - 100" },
                                { case: { $and: [{ $gte: ["$price", 101] }, { $lte: ["$price", 200] }] }, then: "101 - 200" },
                                { case: { $and: [{ $gte: ["$price", 201] }, { $lte: ["$price", 300] }] }, then: "201 - 300" },
                                { case: { $and: [{ $gte: ["$price", 301] }, { $lte: ["$price", 400] }] }, then: "301 - 400" },
                                { case: { $and: [{ $gte: ["$price", 401] }, { $lte: ["$price", 500] }] }, then: "401 - 500" },
                                { case: { $and: [{ $gte: ["$price", 501] }, { $lte: ["$price", 600] }] }, then: "501 - 600" },
                                { case: { $and: [{ $gte: ["$price", 601] }, { $lte: ["$price", 700] }] }, then: "601 - 700" },
                                { case: { $and: [{ $gte: ["$price", 701] }, { $lte: ["$price", 800] }] }, then: "701 - 800" },
                                { case: { $and: [{ $gte: ["$price", 801] }, { $lte: ["$price", 900] }] }, then: "801 - 900" },
                                { case: { $gte: ["$price", 901] }, then: "901 - above" }
                            ]
                        }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    priceRange: "$_id",
                    count: 1
                }
            }
        ];

        const result = await Product.aggregate(pipeline);

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export { saveProducts, getTransactions, getBarChartData, getStatistics, getPieChartData };