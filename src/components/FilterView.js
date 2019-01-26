import React from 'react';
import FilterLink from '../container/FilterLink';
import * as Filter from '../actions/todo-actions';

const FilterView = () => (
  <div>
    <span>Show: </span>

     {/* here we are passing action in filter property ... it's not good approach but we can pass */}
    <FilterLink filter={Filter.FILTER_ALL}>
      All
    </FilterLink> &nbsp;
    <FilterLink filter={Filter.FILTER_ACTIVE}>
      Active
    </FilterLink> &nbsp;
    <FilterLink filter={Filter.FILTER_COMPLETED}>
      Completed
    </FilterLink>
  </div>
)

export default FilterView;