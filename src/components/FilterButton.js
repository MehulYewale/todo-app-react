import React from 'react';
function FilterButton(props) {
  return <button disabled={props.active} onClick={props.onFilter}> {props.children} </button>;
}

export default FilterButton;