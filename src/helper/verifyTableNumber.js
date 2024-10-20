const verifyTableNumber = (tableNumber) => {
    let tables = [
        { table: 1, randomTable: "KMBCqzzMDItvJ528IiXhaRezYfpcKcEx9uVnVqvd9Oig9viT7UOqnGsstVT4" },

        { table: 2, randomTable: "CV6EASnmklt77xknAnRmt5l2cODLPmZA2p1WwD3995XOsX3527dMjjM3NvSi" },

        { table: 3, randomTable: "j5rWlcE0tlXKgdN0hF3Capc2rr5ynHk1rM5HceQpyUAMzhsT3Xj7s7bFhrjN" },

        { table: 4, randomTable: "gdcV0JH4ST61EhVdvK2wQv5pDEdFsXPnLHESfbWG7dKbB90KfCZa9inQ0tYM" },

        { table: 5, randomTable: "eg9is71MvdEweR7ha6qSot8YsomXKma6yOPSGsXKknW1nMjVLXfb3giFspbH" },

        { table: 6, randomTable: "AGeGutWLZ8SfTauVRCForbRNiq1tvCtMF3JImIflPbbhkyd8xRJr9P8Sma8n" },

        { table: 7, randomTable: "XIAYWdF0F4F2eslyewxy1EHsVHCK6rcykJ6lNYCeygMfNE5hBXBsKvbtAMyo" },

        { table: 8, randomTable: "E3PcAzcyHTI5gSQyUytCVARQhCIuyHvln9SiZV6MoHq7sV1XACU8dLNCS7UG" },

        { table: 9, randomTable: "RZ1PepaEIRez6XaW2Oa651UKyiXM5VWQPjCvvhU1oLgIuNTaTqBUmIvYraZY" },

        { table: 10, randomTable: "04NRWIeYKASOtYJsWSL8nIe3Zc22WjN7rnLcSwvAq8ufMZjYIiKuphLBaVAU" },

        { table: 11, randomTable: "UcvDg7ZloINkneMOgobtEb0rENjfD3I1K8mutozc1wlhywKlzZdzk4sbnZOQ" },

        { table: 12, randomTable: "k9krVnbaLCHohPfI4DW7BwqAlFAYOV3XTdbydUR9OftdgEIZSIKo6EIiUcns" },

        { table: 13, randomTable: "auObLvafYl7Z8T6E6LlQ6WH0gm5n7DP1izuq85zplVxonYdIo29394PmLeMn" },

        { table: 14, randomTable: "LGFweGkWs7feRDvqTcczJhqNInbTsnyrLD4vet3nEfU41wWr1oely0Ylsdl6" },

        { table: 15, randomTable: "HHnwoYbw2FEQ6b4AG00AnkneJkH6WoHitb4MPh75WkWD5PUMtob7q2fksXzl" },

        { table: 16, randomTable: "dqEjGfil4U9exyNVYTeE0cVRtXeHme8tvtjVuU7C2N6C3PPRLxmFDk3Gmbwe" },

        { table: 17, randomTable: "wRWlZduIRMginSN7c5GFlfaE3jYJqKOlLQEkxg0vhVmnTEXp8uUNTpfqtmHX" },

        { table: 18, randomTable: "863HZqooeGpJQwgV79968Hgo2z3N52tG8GjUUAopthp8GNJXvVtiLEWYcQAP" },

        { table: 19, randomTable: "Wy47g23onjf59Ezhuq75y2HjaN2LQr21GQ57BdUSntpyGGbLWOkrrp31HQqx" },

        { table: 20, randomTable: "wzEnHwlLLoRwpPQ2fQJSDIQZxtDvjoi6rI3wHVBzsNqOmCTfwGvAFUeaAXW9" },
    ];

    if (tableNumber === null) {
        return false;
    }
    for (let i = 0; i < tables.length; i++) {
        if (tables[i].randomTable === tableNumber) {
            return tables[i].table;
        }
    }
};

export default verifyTableNumber;

// return { tableNumber: tableNumber, table: tables[i] };
