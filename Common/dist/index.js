"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Updateblog = exports.Createblog = exports.SigninSchema = exports.SignupSchema = void 0;
const zod_1 = require("zod");
// signup Schema
exports.SignupSchema = zod_1.z.object({
    email: (0, zod_1.string)().email(),
    password: (0, zod_1.string)().min(6),
    name: (0, zod_1.string)().optional(),
});
// signin schema
exports.SigninSchema = zod_1.z.object({
    email: (0, zod_1.string)().email(),
    password: (0, zod_1.string)().min(6),
});
// create blog
exports.Createblog = zod_1.z.object({
    title: (0, zod_1.string)(),
    content: (0, zod_1.string)(),
    published: (0, zod_1.boolean)().optional(),
});
//update blog
exports.Updateblog = zod_1.z.object({
    title: (0, zod_1.string)(),
    content: (0, zod_1.string)(),
    id: (0, zod_1.number)(),
    published: (0, zod_1.boolean)().optional()
});
