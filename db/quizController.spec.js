import quizController from './quizController.js';
import db from './index.js';

describe('The quiz controller', () => {
  beforeEach(() => {
    //clear collection
    return db.quizzes.remove({})
  })
  it ('should create a question to an existing quiz successfully', () => {
    quizController.createQuestion() 
    )
  })
})

//create and also delete

