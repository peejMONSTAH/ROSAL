const path = require('path');
const fs = require('fs');
const { Client } = require(path.join(__dirname, '../node_modules/pg'));

const envContent = fs.readFileSync(path.join(__dirname, '../.env.local'), 'utf8');
let dbUrl = '';
for (const line of envContent.split('\n')) {
  if (line.startsWith('DATABASE_URL=')) dbUrl = line.replace('DATABASE_URL=', '').trim();
}

const client = new Client({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } });

(async () => {
  await client.connect();

  // Create comments_bank table
  await client.query(`
    CREATE TABLE IF NOT EXISTS comments_bank (
      id TEXT PRIMARY KEY,
      tier TEXT NOT NULL,
      text TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log('Created comments_bank table.');

  // Seed comments_bank
  await client.query('DELETE FROM comments_bank');
  const comments = [
    { id: '1', tier: 'Advancing', text: 'Demonstrates good academic ability. More regular revision would help the student reach their full potential.' },
    { id: '2', tier: 'Advancing', text: 'Has the ability to achieve excellent results but needs to maintain consistent effort across all subjects.' },
    { id: '3', tier: 'Advancing', text: 'Shows good understanding of the lessons but could improve performance through more careful preparation.' },
    { id: '4', tier: 'Advancing', text: 'A capable student who has produced good results. Greater attention to detail would further improve academic performance.' },
    { id: '5', tier: 'Advancing', text: 'Has made good progress this term. More independent study and regular practice are encouraged.' },
    { id: '6', tier: 'Benchmarking', text: 'Has made a satisfactory start to the academic year. Greater consistency in study habits is needed.' },
    { id: '7', tier: 'Benchmarking', text: 'The student is capable of achieving better results but needs to demonstrate greater effort and consistency.' },
    { id: '8', tier: 'Benchmarking', text: 'Has achieved reasonable results this term but has room for improvement. More effort and regular revision are recommended.' },
    { id: '9', tier: 'Benchmarking', text: 'Demonstrates an adequate understanding of most concepts but needs to become more consistent with academic work.' },
    { id: '10', tier: 'Connecting', text: 'Has experienced some difficulty with academic demands. Regular practice and revision are strongly encouraged.' },
    { id: '11', tier: 'Connecting', text: 'Needs to strengthen understanding of key concepts and should seek assistance whenever difficulties arise.' },
    { id: '12', tier: 'Developing', text: 'Academic performance this term has been below expectations. The student needs to develop more effective study habits.' },
  ];

  for (const c of comments) {
    await client.query(
      `INSERT INTO comments_bank (id, tier, text) VALUES ($1, $2, $3)`,
      [c.id, c.tier, c.text]
    );
  }
  console.log(`Seeded ${comments.length} comments_bank rows.`);

  // Verify all tables
  const res = await client.query(`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name`);
  console.log('All tables:', res.rows.map(r => r.table_name));

  await client.end();
  console.log('Done.');
})();
