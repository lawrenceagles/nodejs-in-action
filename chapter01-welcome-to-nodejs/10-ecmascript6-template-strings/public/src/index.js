"use strict";

var name = "Sergio";
console.log(`My name is ${name}`);

var user = { name: "Sergio" };
console.log(`My username is ${user.name}`);

var htmlBody = `
<body>
  <div class='container'>
    <h1>Hello, ${user.name}</h1>
  </div>
</body>
`;

console.log(htmlBody);
