// random generator
function generateGUID(): string {
return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
var r = Math.random() * 16 | 0,
v = c === 'x' ? r : (r & 0x3 | 0x8);
return v.toString(16);
});
}
const guid = generateGUID();
console.log(guid); // Output: "6f9619ff-8b86-d011-b42d-00c04fc964ff"

// crypto library (nodejs)
import { randomUUID } from 'crypto';
const guid = randomUUID();
console.log(guid); // Output: "2c5ea4c0-4067-11ec-9e99-8f0b7c0f93d1"

// timestamp
function generateGUID(): string {
const timestamp = new Date().getTime();
const randomNum = Math.floor(Math.random() * 1000000);
return `${timestamp}-${randomNum}`;
}
const guid = generateGUID();
console.log(guid); // Output: "1665869183562-784124"

// uuid library
// npm install uuid
import { v4 as uuidv4 } from 'uuid';
const guid = uuidv4();
console.log(guid); // Output: "2c5ea4c0-4067-11ec-9e99-8f0b7c0f93d1"

// guid-typescript
// npm install guid-typescript
import { Guid } from 'guid-typescript';
const guid = Guid.create().toString();
console.log(guid); // Output: "2c5ea4c0-4067-11ec-9e99-8f0b7c0f93d1"
