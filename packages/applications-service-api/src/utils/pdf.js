const { jsPDF } = require('jspdf');

const textToPdf = (text) => {
	const doc = new jsPDF();
	doc.setFontSize(10);
	doc.text(text, 10, 10);
	return Buffer.from(doc.output('arraybuffer'));
};

module.exports = {
	textToPdf
};
