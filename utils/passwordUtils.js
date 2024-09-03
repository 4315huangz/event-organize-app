import bcrypt from'bcryptjs';

 export const hashPassword = async (pw) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPW = await bcrypt.hash(pw, salt);
    return hashedPW;
}

export const validatePassword = async (pw, hashedPW) => {
    const isMatch = await bcrypt.compare(pw, hashedPW);
    return isMatch;
}