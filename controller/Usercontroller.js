var config = require('../config');
const fetch = require('node-fetch');
const RX=require('rxjs/rx');

module.exports={
    getUsers:function(req,res){



        let myPromise=fetch('http://jsonplaceholder.typicode.com/users/');
        let jsonPromise=myPromise.then(x=>{return x.json();});

        jsonPromise.then(function(json) {
            data=json;
            res.render('./users.ejs',{users:json});
        });


// using observable
        RX.Observable.fromPromise(jsonPromise)
            .subscribe(function(data){
                //console.log(data);
                res.render('./users.ejs',{users:data});
            }, function(e){console.log(e)});


// using async and await
        async function findUsers(){

            try{
                let result=await jsonPromise;
                res.render('./users.ejs',{users:result});
            }
            catch(err)
            {
                console.log(err);
            }
        }
        findUsers();

    }


}
