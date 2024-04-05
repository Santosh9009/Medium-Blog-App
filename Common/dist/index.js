"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Updateblog = exports.Createblog = exports.UpdateUser = exports.SigninSchema = exports.SignupSchema = void 0;
const zod_1 = require("zod");
// signup Schema
exports.SignupSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string().optional(),
});
// signin schema
exports.SigninSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
// update user
exports.UpdateUser = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().optional(),
    password: zod_1.z.string().optional()
});
// create blog
exports.Createblog = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
    publishDate: zod_1.z.string().optional(),
});
//update blog
exports.Updateblog = zod_1.z.object({
    id: zod_1.z.string(),
    title: zod_1.z.string().optional(),
    content: zod_1.z.string().optional(),
    publishDate: zod_1.z.string().optional()
});
