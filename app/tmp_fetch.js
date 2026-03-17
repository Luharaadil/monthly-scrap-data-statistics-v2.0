fetch('https://docs.google.com/spreadsheets/d/1riSjXMnWzcGJuVXPvDO8aJ3QqwuhQyL-fHEp5tGtEhM/export?format=csv&gid=0').then(r=>r.text()).then(t=>console.log(t.split('\n').slice(0, 20).join('\n')));
