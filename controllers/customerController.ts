import MD5 from "crypto-js/md5";
import jwt from "jsonwebtoken";
import moment from "moment";

export class CustomerController {
    private _conn: any
    constructor(conn: any) {
        this._conn = conn
    }

    async login(username: string, password: string) {
        try {
            const pw = MD5(password);
            const sql = `SELECT * FROM customers where user_name = '${username}' and password = '${pw}'`;
            const [rows] = await this._conn.query(sql);

            if(rows.length) {
                const token = jwt.sign({username: username, type: 'user', expire: moment().add(1, 'day').format()}, process.env.APP_KEY_AUTH||"middlekey");
                const sql = `UPDATE customers SET token = '${token}' where user_name = '${username}' and password = '${pw}'`;
                await this._conn.query(sql);

                return {status: true, message: "Đăng nhập thành công", data: {token: token}}
            } else {
                return {status: false, message: "Tài khoản hoặc mật khẩu không đúng", data: null}
            }
          } catch (err) {
            console.log("Lỗi Customer controller login")
            return {status: false, message: "Lỗi hệ thống", data: null}
          }
    }

    async create(name: string, phone: string, email: string, username: string, password: string) {
        try {
          // Check valid
          const isValidParam = this._checkParams(name, phone, email, username, password);
          if(!isValidParam.status) return {status: false, message: isValidParam.message, data: null}

          // Insert
          const sql = `INSERT INTO customers(name, phone_number, email, user_name, password) VALUES ('${name}', '${phone}', '${email}', '${username}', '${MD5(password)}')`;  
          const [result, fields] = await this._conn.execute(sql);
          
          return {status: true, message: "Tạo tài khoản thành công", data: null}
        } catch (err) {
          console.log("Lỗi Customer controller create")
          return {status: false, message: "Lỗi hệ thống", data: null}
        }
    }

    private _checkParams(name: string, phone: string, email: string, username: string, password: string) {
      if (phone && (phone.length > 13 || phone.length < 10) ) {
        return {status: false, message: "Số điện thoại không đúng"}
      }
      const emailIsValid = email.toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

      if (email && !emailIsValid) {
        return {status: false, message: "Email không đúng"}
      }

      if (!username) {
        return {status: false, message: "Tài khoản là bắt buộc"}
      }

      if (!password) {
        return {status: false, message: "Mật khẩu là bắt buộc"}
      }

      return {status: true, message: ""}
    }
}