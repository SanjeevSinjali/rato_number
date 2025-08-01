const { Op } = require("sequelize");
const moment = require("moment");
const { OrderCar, Car } = require("../models");
const asyncHandler = require("../middleware/async");

exports.getDashboardStats = asyncHandler(async (req, res, next) => {
  try {
    const now = moment();
    const startOfThisMonth = now.clone().startOf("month").toDate();
    const endOfThisMonth = now.clone().endOf("month").toDate();
    const startOfLastMonth = now.clone().subtract(1, "month").startOf("month").toDate();
    const endOfLastMonth = now.clone().subtract(1, "month").endOf("month").toDate();

    const validStatuses = ["RENTED"];

    const thisMonthOrders = await OrderCar.findAll({
      where: {
        status: { [Op.in]: validStatuses },
        rentStartDate: { [Op.between]: [startOfThisMonth, endOfThisMonth] }
      }
    });

    const lastMonthOrders = await OrderCar.findAll({
      where: {
        status: { [Op.in]: validStatuses },
        rentStartDate: { [Op.between]: [startOfLastMonth, endOfLastMonth] }
      }
    });

    const thisMonthRented = thisMonthOrders.length;
    const lastMonthRented = lastMonthOrders.length;

    const thisMonthProfit = thisMonthOrders.reduce((sum, order) => sum + parseFloat(order.totalPrice), 0);
    const lastMonthProfit = lastMonthOrders.reduce((sum, order) => sum + parseFloat(order.totalPrice), 0);

    const calcChange = (current, previous) => {
      if (previous === 0 && current === 0) return { percent: 0, isIncrease: false };
      if (previous === 0) return { percent: 100, isIncrease: true };
      const diff = current - previous;
      const percent = (diff / previous) * 100;
      return { percent: Math.abs(percent), isIncrease: diff >= 0 };
    };

    const rentedChange = calcChange(thisMonthRented, lastMonthRented);
    const profitChange = calcChange(thisMonthProfit, lastMonthProfit);

    const response = [
      {
        id: 1,
        title: "Total Rented",
        value: thisMonthRented,
        percent: rentedChange.percent,
        isIncrease: rentedChange.isIncrease
      },
      {
        id: 2,
        title: "Total Profit",
        value: thisMonthProfit,
        percent: profitChange.percent,
        isIncrease: profitChange.isIncrease
      }
    ];

    res.json({
      success: true,
      data: response
    });
  } catch (error) {
    console.error("Error generating dashboard stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


exports.getRecentlyRentedCars = async (req, res) => {
  try {
    const recentOrders = await OrderCar.findAll({
      where: {
        status: { [Op.in]: ['RENTED'] }
      },
      include: [
        {
          model: Car,
          as: 'car',
          attributes: ['id', 'name', 'brand', 'price', 'seats', 'transmission', 'fuel', 'image']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: 10
    });

    res.json(recentOrders);
  } catch (error) {
    console.error('Error fetching recently rented cars:', error);
    res.status(500).json({ error: 'Failed to fetch recently rented cars' });
  }
};
