const r = require('rethinkdb');

const {
  RDBUSER = 'contrast',
  RDBHOST = 'localhost',
  RDBDATABASE = 'test',
  RDBPASSWORD = 'contrast',
  RDBPORT = 28015,
  RDBTIMEOUT = 60
} = process.env;

const seedData = [
  {
    addresses: ['Sofia', 'Plovdiv'],
    age: 29,
    id: '06eadfb7-ed8c-4caa-98ac-c5acde784c62',
    name: 'Georgi',
    phone: '3453453453',
    secret: 'somethingsecret-georgi'
  },
  {
    addresses: ['Plovdiv', 'Varna'],
    age: 39,
    id: '8ec85b7c-c82a-4513-b28c-55cacc8176d1',
    name: 'Petyr',
    phone: '234234234',
    secret: 'somethingsecret-petyr'
  },
  {
    addresses: ['Varna', 'Burgas'],
    age: 28,
    id: 'a4745a9c-1a9c-496d-a852-0725e5098bc1',
    name: 'Kristina',
    phone: '7878787878',
    secret: 'somethingsecret-kristina'
  },
  {
    addresses: ['Burgas', 'Rouse'],
    age: 31,
    id: 'fd05e152-9214-4464-ac02-ca809dc7f623',
    name: 'Viktoria',
    phone: '3463453',
    secret: 'somethingsecret-viktoria'
  },
  {
    addresses: ['Rouse', 'Vidin'],
    age: 24,
    id: 'c1a5b7d3-92e0-4199-9ce7-9ab859732b13',
    name: 'Maria',
    phone: '345345345345',
    secret: 'somethingsecret-maria'
  },
  {
    addresses: ['Vidin', 'Veliko Tarnovo'],
    age: 35,
    id: 'e2c7a25e-f870-4b4f-86cb-6622bdae39ae',
    name: 'Ivaylo',
    phone: '35992834927',
    secret: 'somethingsecret'
  }
];

const dbInit = new Promise((resolve, reject) => {
  r.connect({
    host: RDBHOST,
    port: RDBPORT,
    db: RDBDATABASE,
    timeout: RDBTIMEOUT
  })
    .then((conn) => {
      r.tableList()
        .run(conn)
        .then((res) => {
          if (!res.includes('users')) {
            r.tableCreate('users')
              .run(conn)
              .then(() => {
                r.table('users')
                  .insert(seedData)
                  .run(conn);
              })
              .then(() => {
                r.db('rethinkdb')
                  .table('users')
                  .run(conn)
                  .then((res) => {
                    const users = [];
                    res.each(
                      function(err, user) {
                        users.push(user.id);
                      },
                      function() {
                        if (!users.includes(RDBUSER)) {
                          r.db('rethinkdb')
                            .table('users')
                            .insert({ id: RDBUSER, password: RDBPASSWORD })
                            .run(conn)
                            .catch((err) => {
                              reject(err);
                            });
                          r.db('test')
                            .table('users')
                            .grant(`${RDBUSER}`, { read: true, write: true })
                            .run(conn)
                            .then(() => {
                              resolve();
                            })
                            .catch((err) => {
                              reject(err);
                            });
                        }
                      }
                    );
                  });
              });
          } else {
            resolve();
          }
        });
    })
    .catch((err) => {
      console.log('ERROR CONNECTING TO RETHINKDB', err.msg);
    });
});

const connectionParams = {
  host: RDBHOST,
  port: RDBPORT,
  user: RDBUSER,
  password: RDBPASSWORD,
  db: RDBDATABASE,
  timeout: RDBTIMEOUT
};

const dotJsFnString = function(data) {
  return `(function (row) { return row.age > ${data}; })`;
};

module.exports = { r, dbInit, connectionParams, dotJsFnString };
