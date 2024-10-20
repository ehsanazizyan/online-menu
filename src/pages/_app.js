import store from "@/redux/app/store";
import "@/styles/globals.css";
import localFont from "next/font/local";
import { Provider } from "react-redux";

import { SessionProvider } from "next-auth/react";
import Layout from "@/components/layout/Layout";
import { ThemeProvider } from "@mui/material";
import theme from "@/mui/fonts";

const myFont = localFont({
    src: [
        {
            path: "../../public/fonts/YekanBakh-Light.woff2",
            weight: "200",
            style: "normal",
        },
        {
            path: "../../public/fonts/YekanBakh-Regular.woff2",
            weight: "300",
            style: "normal",
        },
        {
            path: "../../public/fonts/YekanBakh-Bold.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/fonts/YekanBakh-Heavy.woff2",
            weight: "500",
            style: "normal",
        },
        {
            path: "../../public/fonts/YekanBakh-Fat.woff2",
            weight: "600",
            style: "normal",
        },
    ],
    display: "swap",
});

export default function App({ Component, pageProps }) {
    return (
        <main className={myFont.className}>
            <SessionProvider session={pageProps.session}>
                <Provider store={store}>
                    <ThemeProvider theme={theme}>
                        <Layout style={{ minHeight: "100vh" }}>
                            <Component {...pageProps} />
                        </Layout>
                    </ThemeProvider>
                </Provider>
            </SessionProvider>
        </main>
    );
}
