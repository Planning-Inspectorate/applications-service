// const { get, post } = require('../../../__tests__/unit/routes/router-mock');
//
// const aboutTheApplicationController = require('./documents/controller');
// const examinationController = require('./examination/examination');
//
// describe('routes/projects/documents', () => {
// 	// beforeEach(() => {
// 	// 	// eslint-disable-next-line global-require
// 	// 	require('../../routes/projects/documents');
// 	// });
//
// 	afterEach(() => {
// 		jest.resetAllMocks();
// 	});
// 	it('should define the expected routes', () => {
// 		expect(get).toHaveBeenCalledWith(
// 			'/:case_ref/documents/:page',
// 			aboutTheApplicationController.getAboutTheApplication
// 		);
// 		expect(post).toHaveBeenCalledWith(
// 			'/:case_ref/documents/search/:page',
// 			aboutTheApplicationController.postSearchDocument
// 		);
// 		expect(post).toHaveBeenCalledWith(
// 			'/:case_ref/documents/filter/:page',
// 			aboutTheApplicationController.postFilterDocument
// 		);
// 		expect(get).toHaveBeenCalledWith('/:case_ref', examinationController.getExamination);
// 		expect(post.mock.calls.length).toBe(2);
// 		expect(get.mock.calls.length).toBe(2);
// 	});
// });
