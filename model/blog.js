const { Schema} =require('mongoose');
const { model} =require('mongoose');
const demo = new Schema({
   BlogID: { type: String, required: true },
   title: { type: String, required: true },
   author: { type: String, required: true },
   content: {type: String, required: true}
   // Add other fields as needed
});


const sample = model('sample1', demo);
module.exports= sample;