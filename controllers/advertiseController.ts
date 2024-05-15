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
}
