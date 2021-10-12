const { VIEW } = require('../lib/views');

exports.getBeforeApply = (_, res) => {
  res.render(VIEW.GUIDANCE_PAGES.BEFORE_APPLY, {
    currentUrl: '/before-you-apply',
    title: 'Lorem Ipsum',
  });
};
