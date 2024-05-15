import moment from "moment";

export class TourController {
  private _conn: any;
  constructor(conn: any) {
    this._conn = conn;
  }

  async generate() {
    let values = [];
    for (let i = 1; i <= 30; i++) {
      const price = Math.floor(Math.random() * 20) + 1;
      const date = this._generateDate();
      values.push(
        `('Tour ${i}', '', ${price * 1000000}, '${date.start}', '${date.end}')`
      );
    }

    const sql = `INSERT INTO tours(name, image, price, start_time, end_time) VALUES ${values.join(
      ","
    )}`;
    await this._conn.execute(sql);

    return true;
  }

  async list(params: any) {
    try {
      let where = [];
      let sql = "SELECT * FROM tours";
      if (params.name) where.push(`name like '%${params.name}%'`);
      if (params.price) where.push(`price = ${params.price}`);
      if (params.price_from) where.push(`price >= ${params.price_from}`);
      if (params.price_to) where.push(`price <= ${params.price_to}`);
      if (params.start_time) where.push(`start_time >= ${params.start_time}`);
      if (params.end_time) where.push(`end_time >= ${params.end_time}`);

      if (where.length) sql += ` where ${where.join(" and ")}`;

      const [rows] = await this._conn.query(sql);

      return {
        status: false,
        message: "Lấy danh sách tour thành công",
        data: rows,
      };
    } catch (err) {
      return { status: false, message: "Lỗi hệ thống", data: null };
    }
  }

  async detail(id: any) {
    try {
      const sql = `SELECT * FROM tours WHERE tour_id = ${id}`;
      const [rows] = await this._conn.query(sql);

      if (rows.length) {
        let data = rows[0];
        return {
          status: true,
          message: "Lấy thông tin tour thành công",
          data: data,
        };
      } else
        return {
          status: false,
          message: "Không tìm thấy tour tương ứng",
          data: [],
        };
    } catch (err) {
      return { status: false, message: "Lỗi hệ thống", data: null };
    }
  }

  private _generateDate() {
    const start = Math.floor(Math.random() * 90) + 30;
    const end = start + Math.floor(Math.random() * 30) + 10;
    let startDate = moment().add(start, "day").format();
    let endDate = moment().add(end, "day").format();

    return { start: startDate, end: endDate };
  }
}
