import _ from "lodash";

export function pagination(items, currentPage, pageSize) {
  const startIdx = (currentPage - 1) * pageSize;
  return _(items).slice(startIdx).take(pageSize).value();
}
