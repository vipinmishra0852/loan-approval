"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const router = express_1.default.Router();
// Mock admins for demo
let admins = [
    {
        id: (0, uuid_1.v4)(),
        username: "admin@1",
        password: "12345",
        name: "John Doe",
    },
];
// Get all admins
router.get("/", (req, res) => {
    // Don't send passwords to client
    const adminsWithoutPasswords = admins.map((_a) => {
        var { password } = _a, admin = __rest(_a, ["password"]);
        return admin;
    });
    res.status(200).json({
        success: true,
        count: admins.length,
        data: adminsWithoutPasswords,
    });
});
// Add a new admin
router.post("/", (req, res) => {
    const { username, password, name } = req.body;
    const newAdmin = {
        id: (0, uuid_1.v4)(),
        username,
        password,
        name,
    };
    admins.push(newAdmin);
    // Don't send password to client
    const { password: _ } = newAdmin, adminWithoutPassword = __rest(newAdmin, ["password"]);
    res.status(201).json({
        success: true,
        data: adminWithoutPassword,
    });
});
// Remove an admin
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    // Prevent removing the last admin
    if (admins.length <= 1) {
        return res.status(400).json({
            success: false,
            message: "Cannot remove the last admin",
        });
    }
    const adminIndex = admins.findIndex((admin) => admin.id === id);
    if (adminIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Admin not found",
        });
    }
    admins = admins.filter((admin) => admin.id !== id);
    res.status(200).json({
        success: true,
        message: "Admin removed successfully",
    });
});
exports.default = router;
