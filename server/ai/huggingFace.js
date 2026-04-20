import { pipeline } from '@xenova/transformers';
// Create a feature-extraction pipeline - Modal
export const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');


