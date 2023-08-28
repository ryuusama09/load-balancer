
const router = require('express').Router()
const bodyparser = require('body-parser')
router.use(bodyparser.json())
const {PriorityQueue} = require('@datastructures-js/priority-queue')
const {Queue} = require('./ds')
const queue = new Queue

let priority_queue = new PriorityQueue((a, b)=>{
    if(a.priority === b.priority )return a.size < b.size
    else return a.priority < b.priority
});

router.post('/', async (req)=>{
    queue.enqueue(req.body);
})

setInterval(()=>{
  let obj = queue.dequeue()
  if(obj !== null){
    console.log(obj)
    priority_queue.push(obj)
  }

},5000);





router.post('/login' , async (req) =>{
  //lavde
 const {user , password } = req.body
})

router.get("/get", async(req, res) =>{
  //mutthal
   console.log(priority_queue.back())
})

module.exports = router

1
2
3

