const e2p = (s) => s?.toString()?.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

const p2e = (s) => s?.toString()?.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

const sp = (number) => {
    if (!number) return 0;
    const seperatedNumber = number.toString().match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g);
    const joinedNumber = seperatedNumber?.join(",");
    return joinedNumber;
};

export { e2p, p2e, sp };
