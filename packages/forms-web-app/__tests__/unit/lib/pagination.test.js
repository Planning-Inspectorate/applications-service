/* eslint-disable */
const { getPaginationData, calculatePageOptions } = require('../../../src/lib/pagination');

describe('lib/pagination', () => {
	test(`get pagination data`, () => {
		let paginatedResults = { currentPage: 1, totalItems: 1, itemsPerPage: 20, totalPages: 1 };
		expect(getPaginationData(paginatedResults)).toEqual({
			currentPage: 1,
			totalItems: 1,
			itemsPerPage: 20,
			totalPages: 1,
			fromRange: 1,
			toRange: 1
		});
		paginatedResults = { currentPage: 1, totalItems: 40, itemsPerPage: 20, totalPages: 2 };
		expect(getPaginationData(paginatedResults)).toEqual({
			currentPage: 1,
			totalItems: 40,
			itemsPerPage: 20,
			totalPages: 2,
			fromRange: 1,
			toRange: 20
		});
		paginatedResults = { currentPage: 2, totalItems: 40, itemsPerPage: 20, totalPages: 2 };
		expect(getPaginationData(paginatedResults)).toEqual({
			currentPage: 2,
			totalItems: 40,
			itemsPerPage: 20,
			totalPages: 2,
			fromRange: 21,
			toRange: 40
		});
		paginatedResults = { currentPage: 50, totalItems: 987, itemsPerPage: 20, totalPages: 50 };
		expect(getPaginationData(paginatedResults)).toEqual({
			currentPage: 50,
			totalItems: 987,
			itemsPerPage: 20,
			totalPages: 50,
			fromRange: 981,
			toRange: 987
		});
	});
	test(`calculate page options`, () => {
		expect(calculatePageOptions({ currentPage: 1, totalPages: 6 })).toEqual([
			1,
			2,
			3,
			'...',
			6,
			'next'
		]);
		expect(calculatePageOptions({ currentPage: 2, totalPages: 6 })).toEqual([
			'prev',
			1,
			2,
			3,
			'...',
			6,
			'next'
		]);
		expect(calculatePageOptions({ currentPage: 3, totalPages: 6 })).toEqual([
			'prev',
			1,
			2,
			3,
			4,
			'...',
			6,
			'next'
		]);
		expect(calculatePageOptions({ currentPage: 4, totalPages: 6 })).toEqual([
			'prev',
			1,
			'...',
			3,
			4,
			5,
			6,
			'next'
		]);
		expect(calculatePageOptions({ currentPage: 5, totalPages: 6 })).toEqual([
			'prev',
			1,
			'...',
			4,
			5,
			6,
			'next'
		]);
		expect(calculatePageOptions({ currentPage: 6, totalPages: 6 })).toEqual([
			'prev',
			1,
			'...',
			4,
			5,
			6
		]);
		expect(calculatePageOptions({ currentPage: 1, totalPages: 7 })).toEqual([
			1,
			2,
			3,
			'...',
			7,
			'next'
		]);
		expect(calculatePageOptions({ currentPage: 2, totalPages: 7 })).toEqual([
			'prev',
			1,
			2,
			3,
			'...',
			7,
			'next'
		]);
		expect(calculatePageOptions({ currentPage: 3, totalPages: 7 })).toEqual([
			'prev',
			1,
			2,
			3,
			4,
			'...',
			7,
			'next'
		]);
		expect(calculatePageOptions({ currentPage: 4, totalPages: 7 })).toEqual([
			'prev',
			1,
			'...',
			3,
			4,
			5,
			'...',
			7,
			'next'
		]);
		expect(calculatePageOptions({ currentPage: 5, totalPages: 7 })).toEqual([
			'prev',
			1,
			'...',
			4,
			5,
			6,
			7,
			'next'
		]);
		expect(calculatePageOptions({ currentPage: 6, totalPages: 7 })).toEqual([
			'prev',
			1,
			'...',
			5,
			6,
			7,
			'next'
		]);
		expect(calculatePageOptions({ currentPage: 7, totalPages: 7 })).toEqual([
			'prev',
			1,
			'...',
			5,
			6,
			7
		]);
		expect(calculatePageOptions({ currentPage: 50, totalPages: 100 })).toEqual([
			'prev',
			1,
			'...',
			49,
			50,
			51,
			'...',
			100,
			'next'
		]);
	});
});
