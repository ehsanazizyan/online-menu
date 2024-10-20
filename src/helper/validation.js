const validation = (email, password, phone) => {
    const phonePattern = /^09\d{9}$/;
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!email || !phone || !password) {
        return {
            error: "لطفا تمامی فیلدها را پر کنید",
            status: 401,
        };
    } else if (!emailPattern.test(email)) {
        return {
            error: "ایمیل وارد شده صحیح نیست",
            status: 401,
        };
    } else if (!phonePattern.test(phone)) {
        return {
            error: "شماره تلفن وارد شده صحیح نیست",
            status: 401,
        };
    } else {
        return { error: "", status: 200 };
    }
};

export default validation;
