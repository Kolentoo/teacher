var path=require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var TransferWebpackPlugin = require('transfer-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var glob = require('glob');
var webpack = require('webpack');

module.exports = {
    entry:{
        app:'./src/app.js'
    },
    output:{
        path:path.resolve('./dist'),
        // filename:'[name]-[hash].js', 
        filename:'js/[name].js'
        // chunkhash等同于版本号来使用，md5用于文件的唯一性
        // publicPath:'http://www.baidu.com'
    },
    // externals: {
    //     jquery: 'window.$'
    // },
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
                                // limit: 100000,
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
        host:'192.168.1.227',
        //服务端压缩是否开启
        compress:true,
        //配置服务端口号
        port:86,
        historyApiFallback: true,
        // hot:true,
        inline: true
    },
    plugins:[
        new htmlWebpackPlugin({
            filename:'index.html',
            template:'./src/index.html',
            inject:'head',
            chunks:['app'],
            minify:{
                removeComments:true, //去注释
                collapseWhitespace:true  //去空格
            }
        }),
        new htmlWebpackPlugin({
            filename:'sign.html',
            template:'./src/sign.html',
            inject:'head',
            chunks:['app']
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
        new webpack.HotModuleReplacementPlugin(), //热加载
        new CopyWebpackPlugin([
            {
                from : './src/images',//定义要拷贝的源目录   __dirname + ‘/src/public’
                to : './images'//定义要拷贝的目标目录  __dirname + ‘/dist’
                //  toType : 'dir'//file 或者 dir , 可选，默认是文件
                //  force : 强制覆盖先前的插件 , 可选 默认false
                //  context : 不知道作用 , 可选 默认 base context 可用 specific context
                //  flatten :只拷贝文件不管文件夹 , 默认是false
                //  ignore : 忽略拷贝指定的文件 ,可以用模糊匹配
            }
        ]),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'    
        })
        // new TransferWebpackPlugin([
        //     {from: './src/images'}
        // ], path.resolve(__dirname,"./dist/images"))
        
    ]
}



