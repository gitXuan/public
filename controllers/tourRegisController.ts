export class TourRegisController {
  private _conn: any;
  constructor(conn: any) {
    this._conn = conn;
  }

  async list(params: any) {
    try {
      let where = [];
      let sql = "SELECT * FROM tour_regis_informations";
      if (params.customer_id) where.push(`customer_id = ${params.customer_id}`);
      if (params.tour_id) where.push(`tour_id = ${params.tour_id}`);

      if (where.length) sql += ` where ${where.join(" and ")}`;

      const [rows] = await this._conn.query(sql);

      if (rows && rows.length) {
        let customer_list_id = rows.map(
          (a: { customer_id: any }) => a.customer_id
        );
        let tour_list_id = rows.map((a: { tour_id: any }) => a.tour_id);
        customer_list_id = [...new Set(customer_list_id)];
        tour_list_id = [...new Set(tour_list_id)];

        const c_sql = `SELECT * FROM customers WHERE customer_id IN (${customer_list_id.join(
          ","
        )})`;
        const [c_rows] = await this._conn.query(c_sql);

        const t_sql = `SELECT * FROM tours WHERE tour_id IN (${tour_list_id.join(
          ","
        )})`;
        const [t_rows] = await this._conn.query(t_sql);

        for await (let tour of rows) {
          tour.customer = c_rows.find(
            (a: { customer_id: any }) => a.customer_id == tour.customer_id
          );
          tour.tour = t_rows.find(
            (a: { tour_id: any }) => a.tour_id == tour.tour_id
          );
        }
      }

      return {
        status: false,
        message: "Lấy danh sách tour đăng ký thành công",
        data: rows,
      };
    } catch (err) {
      console.log("Lỗi tour reis controller list");
      return { status: false, message: "Lỗi hệ thống", data: null };
    }
  }

  async create(
    customer_id: number,
    tour_id: number,
    person: number,
    price: number,
    start_date: string,
    end_date: string
  ) {
    try {
      // Check valid
      const isValidParam = this._checkParams(customer_id, tour_id);
      if (!isValidParam.status)
        return { status: false, message: isValidParam.message, data: null };

      // Insert
      const sql = `INSERT INTO tour_regis_informations(customer_id, tour_id, person, price, start_date, end_date) VALUES (${customer_id}, ${tour_id}, ${person}, ${price}, '${start_date}', '${end_date}')`;
      await this._conn.execute(sql);

      return { status: true, message: "Đặt tour thành công", data: null };
    } catch (err) {
      return { status: false, message: "Lỗi hệ thống", data: null };
    }
  }

  async update(
    tour_regis_id: string|number,
    customer_id: number,
    tour_id: number,
    person: number,
    price: number,
    start_date: string,
    end_date: string,
    status: string|number|boolean
  ) {
    try {

      // Check exists
      const sqlSelect = `SELECT * FROM tour_regis_informations WHERE tour_regis_id = ${tour_regis_id}`;
      const [rows] = await this._conn.query(sqlSelect);

      if(!tour_id || !rows.length) {
        return {
          status: false,
          message: "Không tìm thấy thông tin",
          data: null,
        };  
      }

      // Check valid
      const isValidParam = this._checkParams(customer_id, tour_id);
      if (!isValidParam.status)
        return { status: false, message: isValidParam.message, data: null };

      customer_id = customer_id ? customer_id : rows[0].customer_id
      tour_id = tour_id ? tour_id : rows[0].tour_id
      person = person ? person : rows[0].person
      price = price ? price : rows[0].price
      start_date = start_date ? start_date : rows[0].start_date
      end_date = end_date ? end_date : rows[0].end_date
      status = status ? status : rows[0].status

      // Update
      const sql = `UPDATE tour_regis_informations SET 
                    customer_id = ${customer_id}, 
                    tour_id = ${tour_id}, 
                    person = ${person}, 
                    price = ${price}, 
                    start_date = ${start_date},
                    end_date = ${end_date},
                    status = ${status}
                    WHERE tour_regis_id = ${tour_regis_id}`;

      await this._conn.execute(sql);

      return { status: true, message: "Cập nhật thành công", data: null };
    } catch (err) {
      return { status: false, message: "Lỗi hệ thống", data: null };
    }
  }


  async detail(id: any) {
    try {
      const sql = `SELECT * FROM tour_regis_informations WHERE tour_regis_id = ${id}`;
      const [rows] = await this._conn.query(sql);

      if (rows.length) {
        let data = rows[0];

        data["customer"] = await this._getCustomerById(data.customer_id);
        data["tour"] = await this._getTourById(data.tour_id);
        return {
          status: true,
          message: "Lấy thông tin tour đăng ký thành công",
          data: data,
        };
      } else
        return {
          status: false,
          message: "Không tìm thấy tour đăng ký tương ứng",
          data: [],
        };
    } catch (err) {
      return { status: false, message: "Lỗi hệ thống", data: null };
    }
  }

  async delete(tour_regis_id: string|null|undefined) {
    try {

      const sqlSelect = `SELECT * FROM tour_regis_informations WHERE tour_regis_id = ${tour_regis_id}`;
      const [rows] = await this._conn.query(sqlSelect);

      if(!tour_regis_id || !rows.length) {
        return {
          status: false,
          message: "Không tìm thấy tour",
          data: null,
        };  
      }

      const sql = `DELETE FROM tour_regis_informations WHERE tour_regis_id = ${tour_regis_id}`
      const [result, fields] = await this._conn.query(sql); 
      return {
        status: true,
        message: "Xóa tour đăng ký thành công",
        data: result,
      };
    } catch (err) {
      return { status: false, message: "Lỗi hệ thống", data: null };
    }
  }

  private _checkParams(customer_id: number, tour_id: number) {
    if (!customer_id) {
      return { status: false, message: "Khách hàng là bắt buộc" };
    }
    if (!tour_id) {
      return { status: false, message: "Tour là bắt buộc" };
    }

    return { status: true, message: "" };
  }

  private async _getCustomerById(id: number) {
    let data = null;
    const sql = `SELECT * FROM customers WHERE customer_id = ${id}`;
    const [rows] = await this._conn.query(sql);

    if (rows && rows.length) {
      data = rows[0];
      delete data.token;
      delete data.password;
    }
    return data;
  }
  private async _getTourById(id: number) {
    let data = null;
    const sql = `SELECT * FROM tours WHERE tour_id = ${id}`;
    const [rows] = await this._conn.query(sql);

    if (rows && rows.length) data = rows[0];
    return data;
  }
}
