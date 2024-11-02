const webpack = require("vortex-api/bin/webpack").default;


module.exports = {
    ...webpack("open-mod-in-2gameinfo", __dirname, 4),
    mode: 'production',
    devtool: false,
};
