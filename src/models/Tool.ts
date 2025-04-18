import mongoose from 'mongoose';

const toolSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  subheading: { 
    type: String 
  },
  image: { 
    type: String 
  },
  url: { 
    type: String, 
    required: true 
  }
});

const Tool = mongoose.models.Tool || mongoose.model('Tool', toolSchema);

export default Tool;