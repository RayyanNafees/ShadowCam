const Q = (q) => document.querySelector(q);
const _Q = (q) => [...document.querySelectorAll(q)];
const getcss = (q, prop) => getComputedStyle(Q(q)).getPropertyValue(prop);
const setcss = (q, cssObj) => _Q(q).map((i) => Object.assign(i.style, cssObj));

export { Q, _Q, getcss, setcss };
export default Q;