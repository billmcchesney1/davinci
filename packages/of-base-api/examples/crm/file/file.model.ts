import { generateModel } from '../../../src/mongoose';
import File from './file.schema';

const model = generateModel(File);

export default model;
