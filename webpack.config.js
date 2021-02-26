const devCerts = require("office-addin-dev-certs");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");
const {join} = require('path')
const webpack = require("webpack");

const dotenv = require('dotenv').config({
    path: join(__dirname, '.env')
});

const urlDev = "https://localhost:3000/";
const urlProd = "https://www.contoso.com/"; // CHANGE THIS TO YOUR PRODUCTION DEPLOYMENT LOCATION

const listDirectories = p => fs.readdirSync(p).filter(f => fs.statSync(join(p, f)).isDirectory())

const viewFolders = listDirectories('./src/');
const viewsToTranspile = viewFolders.map((dir) => {
    return new HtmlWebpackPlugin({
        filename: `${dir}.html`,
        template: `./src/${dir}/${dir}.html`,
        chunks: ["polyfill", dir]
    });
})

const viewJS = viewFolders.reduce((reduced, current) => {
        reduced[current] = `./src/${current}/${current}.js`
        return reduced
}, {})

module.exports = async (env, options) => {
    const dev = options.mode === "development";
    const buildType = dev ? "dev" : "prod";
    const config = {
        devtool: "source-map",
        entry: {
            polyfill: "@babel/polyfill",
            ...viewJS
        },
        resolve: {
            extensions: [".ts", ".tsx", ".html", ".js"]
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"]
                        }
                    }
                },
                {
                    test: /\.html$/,
                    exclude: /node_modules/,
                    use: "html-loader"
                },
                {
                    test: /\.(png|jpg|jpeg|gif)$/,
                    loader: "file-loader",
                    options: {
                        name: '[path][name].[ext]',
                    }
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new webpack.DefinePlugin( {
                "process.env": dotenv.parsed
            }),
            ...viewsToTranspile,
            new CopyWebpackPlugin({
                patterns: [
                    {
                        to: "taskpane.css",
                        from: "./src/taskpane/taskpane.css"
                    },
                    {
                        to: "[name]." + buildType + ".[ext]",
                        from: "manifest*.xml",
                        transform(content) {
                            if (dev) {
                                return content;
                            } else {
                                return content.toString().replace(new RegExp(urlDev, "g"), urlProd);
                            }
                        }
                    }
                ]
            }),
        ],
        devServer: {
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            https: (options.https !== undefined) ? options.https : await devCerts.getHttpsServerOptions(),
            port: process.env.npm_package_config_dev_server_port || 3000
        }
    };

    return config;
};
