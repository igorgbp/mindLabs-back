function cadUser(req,res){
    async function run (){
        const file = req.body;
        console.log("route cad-user");
        const cad = await insertUser(file);
        console.log('cad', cad);
    }
    run()
}