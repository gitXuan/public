import express from "express";
import mysql from "mysql2/promise";
import { CustomerController } from "./controllers/customerController";
import { TourController } from "./controllers/tourController";
import { TourRegisController } from "./controllers/tourRegisController";
import { AdvertiseController } from "./controllers/advertiseController";

const routes = (conn: any) => {
  const router = express.Router();

  const customerController = new CustomerController(conn);
  const tourController = new TourController(conn);
  const tourRegisController = new TourRegisController(conn);
  const advertiseController = new AdvertiseController(conn);

  // Customer login
  router.post("/login", async (req, res, next) => {
    const params = req.body;

    const result = await customerController.login(
      params.username,
      params.password
    );

    return res.json({
      status: result.status,
      message: result.message,
      data: result.data,
    });
  });

  // Customer create
  router.post("/customer/create", async (req, res, next) => {
    const params = req.body;

    const result = await customerController.create(
      params.name,
      params.phone,
      params.email,
      params.username,
      params.password
    );

    return res.json({
      status: result.status,
      message: result.message,
      data: result.data,
    });
  });

  // Tour regis list
  router.get("/tour-regis/list", async (req, res, next) => {
    const params = req.query;
    const result = await tourRegisController.list(params);

    return res.json({
      status: result.status,
      message: result.message,
      data: result.data,
    });
  });

  // Tour regis create
  router.post("/tour-regis/create", async (req, res, next) => {
    const params = req.body;

    const result = await tourRegisController.create(
      params.customer_id,
      params.tour_id,
      params.person,
      params.price,
      params.start_date,
      params.end_date
    );

    return res.json({
      status: result.status,
      message: result.message,
      data: result.data,
    });
  });

  // Tour regis create
  router.get("/tour-regis/detail", async (req, res, next) => {
    if (req.query.id) {
      const result = await tourRegisController.detail(req.query.id);

      return res.json({
        status: result.status,
        message: result.message,
        data: result.data,
      });
    } else {
      return res.json({ status: false, message: "id không đúng", data: null });
    }
  });

  // Tour
  router.get("/tour/generate", async (req, res, next) => {
    await tourController.generate();
    return res.json({
      status: false,
      message: "Đã tạo 30 tour dữ liệu mẫu",
      data: null,
    });
  });

  // Tour list
  router.get("/tour/list", async (req, res, next) => {
    const params = req.query;
    const result = await tourController.list(params);

    return res.json({
      status: result.status,
      message: result.message,
      data: result.data,
    });
  });

  // Tour detail
  router.get("/tour/detail", async (req, res, next) => {
    if (req.query.id) {
      const result = await tourController.detail(req.query.id);

      return res.json({
        status: result.status,
        message: result.message,
        data: result.data,
      });
    } else {
      return res.json({ status: false, message: "id không đúng", data: null });
    }
  });

  // Advertise
  router.get("/advertise/generate", async (req, res, next) => {
    await advertiseController.generate();
    return res.json({
      status: false,
      message: "Đã tạo 30 advertise dữ liệu mẫu",
      data: null,
    });
  });

  // Advertises List
  router.get("/advertise/list", async (req, res, next) => {
    const params = req.query;
    const result = await advertiseController.list(params);

    return res.json({
      status: result.status,
      message: result.message,
      data: result.data,
    });
  });

  // Advertises detail
  router.get("/advertise/detail", async (req, res, next) => {
    if (req.query.id) {
      const result = await advertiseController.detail(req.query.id);

      return res.json({
        status: result.status,
        message: result.message,
        data: result.data,
      });
    } else {
      return res.json({ status: false, message: "id không đúng", data: null });
    }
  });

  return router;
};

export default routes;
