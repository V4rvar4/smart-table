import {rules, createComparison} from "../lib/compare.js";

export function initSearching(searchField) {
    // @todo: #5.1 — настроить компаратор
    const compare = createComparison(
        rules.skipEmptyTargetValues,
        rules.searchMultipleFields(searchField, ['date', 'customer', 'seller'], false)
    );

    return (data, state, action) => {
        // @todo: #5.2 — применить компаратор
        if (!state || !state[searchField]) {
            return data;
        }
        
        const searchValue = state[searchField].toString().toLowerCase().trim();
        if (!searchValue) {
            return data;
        }
        
        // Создаем компаратор только когда есть значение для поиска
        const compare = createComparison(
            rules.skipEmptyTargetValues,
            rules.searchMultipleFields(searchField, ['date', 'customer', 'seller'], false)
        );
        
        return data.filter(row => compare(row, state));
    }
}