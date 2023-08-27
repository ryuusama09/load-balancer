
const router = require('express').router;
const {PriorityQueue} = require('@datastructures-js/priority-queue')
const {Queue} = require('./ds')
const queue = new Queue
let priority_queue = new PriorityQueue((a, b)=>{
    if(a.priority === b.priority )return a.size < b.size
    else return a.priority < b.priority
})
router.post('/', async (req)=>{
    queue.enqueue(req);     
}).then(()=>{
  while(!queue.empty){
    const req = queue.dequeue;
    priority_queue.push(req);
  }
});


router.post('/login' , async (req) =>{
 const {user , password } = req.body
  
})

router.get("/get", async(req, res) =>{
   console.log(priority_queue.back())
})
