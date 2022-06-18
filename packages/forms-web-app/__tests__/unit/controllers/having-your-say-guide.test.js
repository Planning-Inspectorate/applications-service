const interestedPartyGuideController = require('../../../src/controllers/having-your-say-guide');
const { mockReq, mockRes } = require('../mocks');
const { VIEW } = require('../../../src/lib/views');

describe('controllers/having-your-say-guide', () => {
	let req;
	let res;

	beforeEach(() => {
		req = {
			...mockReq(),
			session: {
				caseRef: 'EN010009',
				projectName: 'St James Barton Giant Wind Turbine',
				appData: {
					ProjectName: 'St James Barton Giant Wind Turbine',
					Region: 'eastern'
				}
			}
		};
		res = mockRes();
		jest.resetAllMocks();
	});

	describe('getHavingYourSayAboutProject', () => {
		it('should call the correct template', async () => {
			await interestedPartyGuideController.getHavingYourSayAboutProject(req, res);
			expect(res.render).toHaveBeenCalledWith(VIEW.INTERESTED_PARTY_GUIDE.INTERESTED_PARTY);
		});
	});

	describe('getHavingYourSayPreApp', () => {
		it('should call the correct template', async () => {
			await interestedPartyGuideController.getHavingYourSayPreApp(req, res);
			expect(res.render).toHaveBeenCalledWith(VIEW.INTERESTED_PARTY_GUIDE.HAVE_SAY_PRE_APPLICATION);
		});
	});

	describe('getRegisteringToHaveYourSay', () => {
		it('should call the correct template', async () => {
			await interestedPartyGuideController.getRegisteringToHaveYourSay(req, res);
			expect(res.render).toHaveBeenCalledWith(
				VIEW.INTERESTED_PARTY_GUIDE.REGISTER_TO_HAVE_YOUR_SAY,
				{
					projectName: 'St James Barton Giant Wind Turbine',
					nsipProjectLink:
						'https://infrastructure.planninginspectorate.gov.uk/projects/eastern/st-james-barton-giant-wind-turbine'
				}
			);
		});
		it('should call the correct template with blank project link if no app session data', async () => {
			req = {
				...mockReq(),
				session: {
					caseRef: 'EN010009',
					projectName: 'St James Barton Giant Wind Turbine'
				}
			};
			await interestedPartyGuideController.getRegisteringToHaveYourSay(req, res);
			expect(res.render).toHaveBeenCalledWith(
				VIEW.INTERESTED_PARTY_GUIDE.REGISTER_TO_HAVE_YOUR_SAY,
				{
					projectName: 'St James Barton Giant Wind Turbine',
					nsipProjectLink: ''
				}
			);
		});
	});

	describe('getInvolvedInPreliminaryMeeting', () => {
		it('should call the correct template', async () => {
			await interestedPartyGuideController.getInvolvedInPreliminaryMeeting(req, res);
			expect(res.render).toHaveBeenCalledWith(
				VIEW.INTERESTED_PARTY_GUIDE.GET_INVOLVED_PRELIMINARY_MEETING
			);
		});
	});

	describe('getHavingYourSayExamination', () => {
		it('should call the correct template', async () => {
			await interestedPartyGuideController.getHavingYourSayExamination(req, res);
			expect(res.render).toHaveBeenCalledWith(
				VIEW.INTERESTED_PARTY_GUIDE.HAVE_SAY_DURING_PROJECT_EXAMINATION
			);
		});
	});

	describe('getWhatYouCanDoAfterDecision', () => {
		it('should call the correct template', async () => {
			await interestedPartyGuideController.getWhatYouCanDoAfterDecision(req, res);
			expect(res.render).toHaveBeenCalledWith(
				VIEW.INTERESTED_PARTY_GUIDE.AFTER_MAKING_THE_DECISION
			);
		});
	});
});
