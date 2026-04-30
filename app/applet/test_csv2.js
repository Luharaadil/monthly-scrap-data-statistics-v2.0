async function run() {
  try {
    const res = await fetch('https://docs.google.com/spreadsheets/d/1GHwq2tHt0ZDwuGHfTZSov6b2JgfURUKt7c8WLZWPGKs/export?format=csv&gid=359852687');
    const text = await res.text();
    console.log(text.substring(0, 500));
  } catch (e) {
    console.error(e);
  }
}
run();
