const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { Pool } = require('pg');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const pool = new Pool({
  user: 'yourUsername',
  host: 'localhost',
  database: 'checkboxDB',
  password: 'password',
  port: 5432,
});

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

const getCheckboxes = async () => {
  const result = await pool.query('SELECT * FROM checkboxes');
  return result.rows;
};

const updateCheckbox = async (id, checked) => {
  await pool.query('UPDATE checkboxes SET checked = $1 WHERE id = $2', [checked, id]);
};

io.on('connection', async (socket) => {
  console.log('a user connected');

  const checkboxes = await getCheckboxes();
  socket.emit('initialState', checkboxes);

  socket.on('checkboxClicked', async (id) => {
    await updateCheckbox(id, true);
    io.emit('checkboxChecked', id);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const initializeCheckboxes = async () => {
  const result = await pool.query('SELECT COUNT(*) FROM checkboxes');
  const count = parseInt(result.rows[0].count, 10);
  if (count === 0) {
    for (let i = 0; i < 100; i++) {
      await pool.query('INSERT INTO checkboxes (id, checked) VALUES ($1, $2)', [i, false]);
    }
  }
};

initializeCheckboxes().then(() => {
  server.listen(3000, () => {
    console.log('listening on *:3000');
  });
}).catch(err => console.error('Error initializing checkboxes', err));
