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
// Mock users for demo
const users = [
    {
        id: (0, uuid_1.v4)(),
        username: "admin@1",
        password: "12345",
        userType: "Admin",
        name: "John Doe",
    },
    {
        id: (0, uuid_1.v4)(),
        username: "verifier@1",
        password: "12345",
        userType: "Verifier",
        name: "John Okoh",
    },
    {
        id: (0, uuid_1.v4)(),
        username: "user@1",
        password: "12345",
        userType: "User",
        name: "Jane Smith",
    },
];
// Login route
router.post("/login", (req, res) => {
    const { username, password, userType } = req.body;
    const user = users.find((u) => u.username === username &&
        u.password === password &&
        u.userType === userType);
    if (user) {
        const { password: _ } = user, userWithoutPassword = __rest(user, ["password"]);
        return res.status(200).json({
            success: true,
            data: userWithoutPassword,
        });
    }
    return res.status(401).json({
        success: false,
        message: "Invalid credentials",
    });
});
exports.default = router;
