// src\models\Tool.ts
import mongoose from 'mongoose';

const toolSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true
  },
  subheading: {
    type: String,
    index: true
  },
  image: {
    type: String
  },
  url: {
    type: String,
    required: true
  }
});

toolSchema.index({ title: 'text', subheading: 'text', tags: 'text' });

toolSchema.virtual('tags').get(function() {
  const tagRegex = /#(\w+)/g;
  const matches = (this.subheading || '').matchAll(tagRegex);
  const tagsArray = Array.from(matches).map(match => match[1]);
  return [...new Set(tagsArray)];
});

const Tool = mongoose.models.Tool || mongoose.model('Tool', toolSchema);

export default Tool;