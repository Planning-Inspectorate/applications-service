module.exports = (nunjucks) => (path, vars, t) => nunjucks.render(path, { ...vars, t });
