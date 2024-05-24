import moment from "moment";

export class AdvertiseController {
  private _conn: any;
  constructor(conn: any) {
    this._conn = conn;
  }

  async generate() {
    let values = [];
    for (let i = 1; i <= 30; i++) {
      values.push(`('Bài viết ${i}', '', 'Mô tả bài viết ${i}')`);
    }

    const sql = `INSERT INTO advertises(title, image, description) VALUES ${values.join(
      ","
    )}`;
    await this._conn.execute(sql);

    return true;
  }

  async list(params: any) {
    try {
      let where = [];
      let sql = "SELECT * FROM advertises";
      if (params.title) where.push(`title like '%${params.title}%'`);
      if (params.description)
        where.push(`description like '%${params.description}%'`);

      if (where.length) sql += ` where ${where.join(" and ")}`;

      const [rows] = await this._conn.query(sql);

      return {
        status: false,
        message: "Lấy danh sách bài viết thành công",
        data: rows,
      };
    } catch (err) {
      return { status: false, message: "Lỗi hệ thống", data: null };
    }
  }

  async detail(id: any) {
    try {
      const sql = `SELECT * FROM advertises WHERE advertise_id = ${id}`;
      const [rows] = await this._conn.query(sql);

      if (rows.length) {
        let data = rows[0];
        return {
          status: true,
          message: "Lấy thông tin bài viết thành công",
          data: data,
        };
      } else
        return {
          status: false,
          message: "Không tìm thấy bài viết tương ứng",
          data: [],
        };
    } catch (err) {
      return { status: false, message: "Lỗi hệ thống", data: null };
    }
  }

  async create(title: string, image: string, description: string) {
    try {

      if(!title) {
        return {
          status: false,
          message: "Tiêu đề là bắt buộc",
          data: null,
        };  
      }

      const sql = `INSERT INTO advertises(title, image, description, created_at) VALUES('${title}', '${image}', '${description}', '${moment().format()}')`
      const [result, fields] = await this._conn.query(sql); 
      return {
        status: true,
        message: "Thêm bài viết thành công",
        data: result,
      };
    } catch (err) {
      return { status: false, message: "Lỗi hệ thống", data: null };
    }
  }

  async update(advertise_id: string, title: string, image: string, description: string) {
    try {

      const sqlSelect = `SELECT * FROM advertises WHERE advertise_id = ${advertise_id}`;
      const [rows] = await this._conn.query(sqlSelect);

      if(!advertise_id || !rows.length) {
        return {
          status: false,
          message: "Không tìm thấy bài viết",
          data: null,
        };  
      }

      title = title ? title : rows[0].title;
      image = image ? image : rows[0].image;
      description = description ? description : rows[0].description;

      const sql = `UPDATE advertises SET title = '${title}', image = '${image}', description = '${description}' WHERE advertise_id = ${advertise_id}`
      const [result, fields] = await this._conn.query(sql); 
      return {
        status: true,
        message: "Cập nhật bài viết thành công",
        data: result,
      };
    } catch (err) {
      return { status: false, message: "Lỗi hệ thống", data: null };
    }
  }

  async delete(advertise_id: string|null|undefined) {
    try {

      const sqlSelect = `SELECT * FROM advertises WHERE advertise_id = ${advertise_id}`;
      const [rows] = await this._conn.query(sqlSelect);

      if(!advertise_id || !rows.length) {
        return {
          status: false,
          message: "Không tìm thấy bài viết",
          data: null,
        };  
      }

      const sql = `DELETE FROM advertises WHERE advertise_id = ${advertise_id}`
      const [result, fields] = await this._conn.query(sql); 
      return {
        status: true,
        message: "Xóa bài viết thành công",
        data: result,
      };
    } catch (err) {
      return { status: false, message: "Lỗi hệ thống", data: null };
    }
  }
}
