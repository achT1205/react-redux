import webpack from  'webpack';
import webpackConfig from '../webpack.config.prod';
import colors from 'colors';

process.env.NODE_ENV='production';//this assure the Babel dev config (for hot realoading ) doesn't apply 
console.log('Generation minified bundle for production via webpack. this will take a moment ...');

webpack(webpackConfig).run((err,stats) =>{
if(err){ // so a fatal error occured. Stop here 
console.log(err.bold.red);
return 1;
}

const jsonStats = stats.toJson();
if(jsonStats.hasErrors){
    return jsonStats.errors.map(error=> console.log(error.red));
}

if(jsonStats.hasErrors){
    console.log('webpackgenerated the following warnings :'.bold.yellow);
    jsonStats.warnings.map(warning => console.log(warning.yellow));
}

console.log(`webpack stats : ${stats}`);

//if we got this far, the build succeeded
console.log('Your app has been compiled in production mode and written to /dist. It \'s ready to roll!'.green);
return 0;
});