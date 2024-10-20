import { compare, hash } from "bcryptjs";

async function hashPassword(password) {
    const hashPass = await hash(password, 12);
    return hashPass;
}

async function verifyPassword(password, hashPassword) {
    const verify = await compare(password, hashPassword);
    return verify;
}
export { hashPassword, verifyPassword };
