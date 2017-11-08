var path=require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var webpack = require('webpack');

module.exports = {
    entry:{
        app:'./src/app.js',
        ceshi:'./src/test.js'
    },
    output:{
        path:path.resolve('./dist'),
        // filename:'[name]-[hash].js', 
        filename:'js/[name].bundle.js'
        // chunkhash等同于版本号来使用，md5用于文件的唯一性
        // publicPath:'http://www.baidu.com'
    },
    module:{
        loaders:[
            {
                test:/\.html/,  //html结尾的文件
                loader:'html-loader'
            },
            {
                test:/\.js$/,  //js结尾的文件
                loader:'babel-loader',
                exclude:path.resolve(__dirname,'node_modules'), //排除打包的文件加快打包速度
                include:path.resolve(__dirname,'src'), //只打包src下的文件
                query:{
                    presets:['latest']
                }
            },
            {
                test:/\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test:/\.(png|jpg|gif|svg)$/i,  //i表示不区分大小写
                // loader:'file-loader',
                use:[
                        {
                            // loader: 'url-loader',
                            loader: 'file-loader',
                            options: {
                                // limit: 1000000000000,
                                // name: 'assets/[name]-[hash:5].[ext]'
                                name: 'images/[name].[ext]'
                            }
                        },
                        {
                            loader: 'img-loader'
                        }
                    ]
            }
        ]
    },
    devServer:{
        //设置基本目录结构
        contentBase:path.resolve(__dirname,'./dist/'),
        //服务器的IP地址，可以使用IP也可以使用localhost
        host:'localhost',
        //服务端压缩是否开启
        compress:true,
        //配置服务端口号
        port:84,
        historyApiFallback: true,
        hot:true,
        inline: true
    },
    plugins:[
        new htmlWebpackPlugin({
            filename:'index.html',
            template:'index.html',
            inject:'head',
            chunks:['app'],
            minify:{
                removeComments:true, //去注释
                collapseWhitespace:true  //去空格
            }
        }),
        new htmlWebpackPlugin({
            filename:'test1.html',
            template:'./src/test1.html',
            inject:'head',
            chunks:['ceshi']
        }),
        // JS压缩,热更新时需要注释，不然会报错
        // new UglifyJSPlugin({
        //     compress: {
        //         warnings: false,
        //         drop_console: true
        //     },
        //     output:{
        //         ascii_only:true
        //     }
        // }),
        new ExtractTextPlugin('css/[name].css'),
        new webpack.HotModuleReplacementPlugin() //热加载
        
    ]
}