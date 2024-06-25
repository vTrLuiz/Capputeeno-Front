import { FilterType } from "@/types/filter-types";
import { PriorityTypes } from "@/types/priority-types";

export function getCategoryByType(type: FilterType){
    if(type == FilterType.MUGS) return "mugs"
    if(type == FilterType.SHIRT) return "t-shirts"
    return ""
}

export function getFieldByPriority(priority: PriorityTypes){
    if(priority === PriorityTypes.POPULARIDADE) return {field: "sales", order: "ASC"}
    if(priority === PriorityTypes.MAIOR_PRECO)  return {field: "price_in_cents", order: "ASC"}
    if(priority === PriorityTypes.MENOR_PREÇO) return {field: "price_in_cents", order: "DSC"}
    return {field: "created_at", order: "DSC"}
  }
  
  export const mountQuery = (type: FilterType, priority: PriorityTypes) => {
  const categoryFilter = getCategoryByType(type)
  const sortSettings = getFieldByPriority(priority)
  const searchParams = new URLSearchParams()
  if (categoryFilter){
    searchParams.set("category", categoryFilter)
  }

  if (priority) {
    searchParams.set("sortField", sortSettings.field);
    searchParams.set("sortOrder", sortSettings.order);
}

  return searchParams.toString()
    if(type === FilterType.ALL && priority === PriorityTypes.POPULARIDADE) return `query {
        allProducts(sortField: "sales", sortOrder: "DSC") {
          id
          name
          price_in_cents
          image_url
        }
      }
    `
    return `
    query {
        allProducts(sortField: "${sortSettings.field}", sortOrder: "${sortSettings.order}", ${categoryFilter ? `filter: { category: "${categoryFilter}"}`: ''}) {
          id
          name
          price_in_cents
          image_url
          category
        } 
      }
    `
}