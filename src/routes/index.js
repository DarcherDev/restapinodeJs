const { Router }  =require('express');
const router = Router();

router.get('/', (req, res) => {
    const data = {
        "name": "fazt"
    };
    res.json(data);
    //res.json({"title": "hello world"})
})

module.exports = router; 