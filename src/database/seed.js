const db = require("./db");

const pessoas = [
  ["Maria", 30, "F"],
  ["João", 25, "M"],
  ["Ana", 40, "F"],
  ["Carlos", 35, "M"],
  ["Paula", 28, "F"],
  ["Pedro", 50, "M"],
  ["Julia", 22, "F"],
  ["Marcos", 33, "M"],
  ["Fernanda", 27, "F"],
  ["Ricardo", 45, "M"],
  ["Sofia", 19, "F"],
  ["Luiz", 60, "M"],
  ["Clara", 29, "F"],
  ["Roberto", 38, "M"],
  ["Helena", 31, "F"],
  ["Mateus", 26, "M"],
  ["Isabela", 34, "F"],
  ["Gabriel", 21, "M"],
  ["Camila", 36, "F"],
  ["André", 41, "M"]
];

pessoas.forEach(p => {
  db.run("INSERT INTO pessoas (nome, idade, sexo) VALUES (?, ?, ?)", p);
});

console.log("Seeds inseridos!");
