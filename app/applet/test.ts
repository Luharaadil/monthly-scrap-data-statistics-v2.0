import fs from 'fs';
fetch("https://docs.google.com/spreadsheets/d/1riSjXMnWzcGJuVXPvDO8aJ3QqwuhQyL-fHEp5tGtEhM/export?format=csv&gid=0")
  .then(r => r.text())
  .then(t => {
     const lines = t.split('\n');
     console.log('Line 0:', lines[0]);
     console.log('Line 1:', lines[1]);
  });
