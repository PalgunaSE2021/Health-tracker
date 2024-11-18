module.exports = {
  // Prefix ht means health tracker
  prefix: "ht-",
  content: ["./src/**/*.{html,ts,scss}"],
  theme: {
    extend: {
      fontSize: {
        "18-px": "18px",
        "24-px": "24px",
      },
      padding: {
        "2-px": "2px",
        "4-px": "4px",
        "8-px": "8px",
        "16-px": "16px",
        "24-px": "24px",
        "48-px": "48px",

        "90-px": "90px",
        "200-px": "200px",
      },
      margin: {
        "0-px": "0px",
        "4-px": "4px",
        "8-px": "8px",
        "12-px": "12px",
        "16-px": "16px",
        "24-px": "24px",
        "36-px": "36px",
        "48-px": "48px",
        "64-px": "64px",
        "90-px": "90px",
        "650-px": "650px",
      },
      borderRadius: {
        "8-px": "8px",
        "12-px": "12px",
      },
      boxShadow: {
        "project-card-shadow": "0px 0px 4px 2px #506486",
      },
    },
  },
  plugins: [],
};
