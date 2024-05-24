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

  async create(title: string, image: string, price: string|number, start_time: string, end_time: string) {
    try {

      if(!title) {
        return {
          status: false,
          message: "Tiêu đề là bắt buộc",
          data: null,
        };  
      }

      const sql = `INSERT INTO tours(name, image, price, start_time, end_time) VALUES('${title}', '${image}', '${price}', '${start_time}', '${end_time}')`
      const [result, fields] = await this._conn.query(sql); 
      return {
        status: true,
        message: "Thêm tour thành công",
        data: result,
      };
    } catch (err) {
      return { status: false, message: "Lỗi hệ thống", data: null };
    }
  }

  async update(tour_id: string, name: string, image: string, price: string|number, start_time: string, end_time: string) {
    try {

      const sqlSelect = `SELECT * FROM tours WHERE tour_id = ${tour_id}`;
      const [rows] = await this._conn.query(sqlSelect);

      if(!tour_id || !rows.length) {
        return {
          status: false,
          message: "Không tìm thấy tour",
          data: null,
        };  
      }

      name = name ? name : rows[0].name;
      image = image ? image : rows[0].image;
      price = price ? price : rows[0].price;
      start_time = start_time ? start_time : rows[0].start_time;
      end_time = end_time ? end_time : rows[0].end_time;

      const sql = `UPDATE tours SET name = '${name}', image = '${image}', price = ${price}, start_time = '${start_time}', end_time = '${end_time}' WHERE tour_id = ${tour_id}`
      const [result, fields] = await this._conn.query(sql); 
      return {
        status: true,
        message: "Cập nhật tour thành công",
        data: result,
      };
    } catch (err) {
      return { status: false, message: "Lỗi hệ thống", data: null };
    }
  }

  async delete(tour_id: string|null|undefined) {
    try {

      const sqlSelect = `SELECT * FROM tours WHERE tour_id = ${tour_id}`;
      const [rows] = await this._conn.query(sqlSelect);

      if(!tour_id || !rows.length) {
        return {
          status: false,
          message: "Không tìm thấy tour",
          data: null,
        };  
      }

      const sql = `DELETE FROM tours WHERE tour_id = ${tour_id}`
      const [result, fields] = await this._conn.query(sql); 
      return {
        status: true,
        message: "Xóa tour thành công",
        data: result,
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
