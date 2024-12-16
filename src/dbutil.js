//-- dbutil.js ---

//import sqlitedb
const sqlite3 = require("sqlite3").verbose();

//-- *nix
//const db_name = "data//testdb1.db";
//const db_name = "data//dashboarddb1.db";

//-- windows:
const db_name = "src\\data\\testdb1.db";
//const db_name = "src\\data\\dashboarddb1.db";

const login = function (username, password, logincb) {
    const _funnction_name = "login";
    let _msg = "";
    let _return = false;

    try {
        _msg = `** ${_funnction_name}`;

        const db = new sqlite3.Database(
            db_name,
            sqlite3.OPEN_READWRITE,
            (err) => {
                if (err) {
                    _msg = "## error connecting to db";
                    console.log(_msg);
                    console.log(err);
                } else {
                    _msg = "## Connected to db";
                    console.log(_msg);
                }
            },
        );

        const _uid = username;
        const _pwd = password;

        db.get(
            `SELECT id,username FROM user where username='${_uid}' and password = '${_pwd}' `,
            (err, row) => {
                if (err) {
                    _msg = "## select user error";
                    console.log(_msg);
                    //console.log(err);
                } else {
                    if (row) {
                        _msg = `##  user: ${row.id} - ${row.username}`;
                        console.log(_msg);
                        _return = true;
                        logincb(_return);
                    } else {
                        _msg = `** user not found `;
                        console.log(_msg);
                        logincb(_return);
                    }
                }
            },
        );

        db.close((err) => {
            if (err) {
                console.log("** error closing db");
                console.log(err);
            } else {
                console.log("** db closed ");
            }
        });
    } catch (error) {
        console.log(`** ${_funnction_name}::error`);
        console.log(error);
        _return = false;
    }

    return _return;
};

const insert_user = function (username, password, insertusercb) {
    const _funnction_name = "insert_user";
    let _msg = "";
    let _return = false;

    try {
        _msg = `** ${_funnction_name}`;

        const db = new sqlite3.Database(
            db_name,
            sqlite3.OPEN_READWRITE,
            (err) => {
                if (err) {
                    _msg = "## error connecting to db";
                    console.log(_msg);
                    console.log(err);
                } else {
                    _msg = "## Connected to db";
                    console.log(_msg);
                }
            },
        );

        const _uid = username;
        const _pwd = password;

        db.run(
            `INSERT INTO user(username,password) VALUES('${_uid}','${_pwd}')`,
            (err) => {
                if (err) {
                    _msg = "## insert error";
                    console.log(_msg);
                    //console.log(err);

                    _return = false;
                    insertusercb(_return);
                } else {
                    _msg = `## new userid: ${this.id}`;
                    //_msg = `## new userid: ${this.lastID}`;
                    console.log(_msg);

                    _return = true;
                    insertusercb(_return);
                }
            },
        );

        db.close((err) => {
            if (err) {
                console.log("** error closing db");
                console.log(err);
                _return = false;
            } else {
                console.log("** db closed ");
                _return = true;
            }
        });
    } catch (error) {
        console.log(`** ${_funnction_name}::error`);
        console.log(error);
        _return = false;
    }

    return _return;
};

module.exports = { login, insert_user };