/**
 * The loader this quanar uses. Quanarch fixes its shape (QuanLoader), never
 * its source: swap this export to load quans from a URL, an API, a database or
 * object storage. The quans themselves do not change.
 */
export { staticLoader as loader } from './static-loader';
