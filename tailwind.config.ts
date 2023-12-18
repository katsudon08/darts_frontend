import type { Config } from "tailwindcss"

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
            },
            rotate: {
                "18": "18deg",
                "36": "36deg",
                "54": "54deg",
                "72": "72deg",
                "90": "90deg",
                "108": "108deg",
                "126": "126deg",
                "144": "144deg",
                "162": "162deg",
                "198": "198deg",
                "216": "216deg",
                "234": "234deg",
                "252": "252deg",
                "270": "270deg",
                "288": "288deg",
                "306": "306deg",
                "324": "324deg",
                "342": "342deg",
                "360": "360deg"
            }
        }
    },
    plugins: []
}
export default config
