const { getTimetables } = require("../../../src/services/timetable.service");

const mockFindAndCountAll = jest.fn();

jest.mock("../../../src/models", () => {
   return {
       Timetable: {
           findAndCountAll: (caseRef) => mockFindAndCountAll(caseRef)
       }
   };
});

describe("timetable service", () => {
    it("calls db with case_reference and limit", async () => {
        await getTimetables("SOMECASE");
        expect(mockFindAndCountAll).toBeCalledWith({
            where: {
                case_reference: "SOMECASE"
            },
            limit: 100
        });
    });
});