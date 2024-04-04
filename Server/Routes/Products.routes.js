import {saveProducts,getTransactions,getBarChartData,getStatistics,getPieChartData,getIntegratedData} from "../Controllers/Products.controller.js"
import {Router} from "express"


const productRouter = Router()
productRouter.get("/api/initialize", saveProducts)
productRouter.get("/api/get-transactions", getTransactions)
productRouter.get("/api/bar-chart", getBarChartData);
productRouter.get("/api/pie-chart", getPieChartData);
productRouter.get("/api/get-statistics", getStatistics);
productRouter.get("/api/integrated", getIntegratedData);
export default productRouter
